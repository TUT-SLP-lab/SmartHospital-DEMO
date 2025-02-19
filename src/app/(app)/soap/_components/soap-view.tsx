'use client';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EditableInputWithMenu } from '@/components/editable-input-with-menu';
import { RecordingButton } from '@/components/recording-button';
import { ReturnButton } from '@/components/return-button';
import { PlusButton } from '@/components/plus-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useASRInput } from '@/hooks/useASRInput';
import { usereturnTop } from '@/hooks/useReturnTop';
import { soapFromChatGPT } from '@/lib/api/soap';
import type { Summary } from '@/lib/typechat/soap';
import React from 'react';
// import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

const menuItems = ['s', 'o', 'a', 'p'] as const;

export const modelValue =
  'ちょっと血圧測りますねはい動いたときとかどうでした朝方はや早く起きたときはやくて六時ちょっとくらい前にあのあれをたい体重をはかり行ったじゃんうんうんほいで帰ってきてここきたらなんだかちょっと体がえらい感じしたもんねんでベッドの上横になって寝たら心臓がちょっと煽りだしたじゃんねどきどきしてたうんあそっかー今はじゃあ落ち着いただねああほいでしばらく休んどって七時ごろからあのトイレ行ったり顔洗ったりあれ歩きだしてからはそんなに肝心くなったけどねうんうん動き出したらうーん胸に違和感あったんー別になんにもないと思ったけどまあ体重は買ったときに四十七点九になっちゃったもんでいや思っただよあーこれだけあの体重が減るとうん体がかえって偉くなっちゃうもんねちょっとあれー歩くとき苦しいとかあるーあいやあのそれからはないあーないそれからはないうんうんちょっと熱測ったりしてきますはい今ねお薬はじめたもんでねまたなんか違和感あれこれ詰め終わった後こっちのがいいかなあったら言ってくださいはい熱測りますちょっと足も見ていいですうんうんだいぶ減ったねうんむくみまだちょっとあるけどねちょっと待ってよよいしょ三十六点七はいあごめんなさいねちょっと足触りますはい大丈夫ですありがとうございますそんなに冷たくないはいですねあ落ちちゃったスリッパそれ怖いね滑らないそのくああ大丈夫大丈夫なるべくね後ろある法の靴のほうがいいでねまだそんなにえあの外いけへんもんでうんうん外行くようならはいてっつって言われたであうんうん靴をねうんこのあれをくらうときにスリッパをくれるときに今日って便出ました今日はまだ出てないうんうんまた出たらはい教えてはいくださいね別にじゃあ動いたときも息苦しさはなあかった今はありませんうんうん咳や単はないはいうんあ単はたまに出るたんはあるうん痰ちゅうよりかはねばねばした唾だねあー透明のうんうん透明のねはいちょっとおなかの音と呼吸音はい聞きますね深呼吸ねーはいありがとうございますこの点滴入れてるところは痛くないあいいたくないねはいはいお願いします';

export const SOAPView = () => {
  const { value, setValue, toggleRecording, transcript, recording } = useASRInput({
    target: 'MAIN',
    continuous: true,
  });

  const [subjective, setSubjective] = useState<string[]>([]);
  const [objective, setObjective] = useState<string[]>([]);
  const [assessment, setAssessment] = useState<string[]>([]);
  const [plan, setPlan] = useState<string[]>([]);
  const [summary, setSummary] = useState<Summary>([]);
  const [structuring, setStructuring] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (recording || value === '') {
        return;
      }

      try {
        setStructuring(true);
        const result = await soapFromChatGPT({ text: value });
        if (result.success === false) {
          toast({
            variant: 'destructive',
            title: '構造化に失敗しました',
            description: 'もう一度お試しください',
          });
          return;
        }

        const { data } = result;

        console.log(data);

        data.SUBJECTIVE && setSubjective((prev) => [...prev, ...(data.SUBJECTIVE || [])]);
        data.OBJECTIVE && setObjective((prev) => [...prev, ...(data.OBJECTIVE || [])]);
        data.ASSESSMENT && setAssessment((prev) => [...prev, ...(data.ASSESSMENT || [])]);
        data.PLAN && setPlan((prev) => [...prev, ...(data.PLAN || [])]);
        data.SUMMARY && setSummary(data.SUMMARY);
      } catch (e) {
        toast({
          variant: 'destructive',
          title: '構造化に失敗しました',
          description: 'もう一度お試しください',
        });
      } finally {
        setStructuring(false);
      }

      setValue('');
    }

    void fetchData();
  }, [recording, setValue, value]);

  const handleClearAll = () => {
    setSubjective([]);
    setObjective([]);
    setAssessment([]);
    setPlan([]);
    setSummary([]);
    setValue('');
  };

  return (
    <>
      <div className="space-y-4">
        {recording ? <div>{value + transcript}</div> : <div>{value}</div>}

        {/* Subjective */}
        <div>
          <div className="flex items-center justify-between">
            <Label className='text-lg'>Subjective</Label>
            <PlusButton onClick={() => setSubjective((prev) => [...prev, ""])} />
          </div>
          <div className="space-y-3">
            {subjective.map((s, i) => (
              <EditableInputWithMenu
                key={i}
                value={s}
                onChange={(e) => {
                  const newSubjective = [...subjective];
                  newSubjective[i] = e.target.value;
                  setSubjective(newSubjective);
                }}
                onRemove={() => {
                  const newSubjective = [...subjective];
                  newSubjective.splice(i, 1);
                  setSubjective(newSubjective);
                }}
                menuItems={[...menuItems].filter((item) => item !== 's')}
                onMenuSelect={(item) => {
                  const newSubjective = [...subjective];
                  newSubjective.splice(i, 1);
                  setSubjective(newSubjective);

                  if (item === 's') {
                    setSubjective([...subjective, s]);
                  }
                  if (item === 'o') {
                    setObjective([...objective, s]);
                  }
                  if (item === 'a') {
                    setAssessment([...assessment, s]);
                  }
                  if (item === 'p') {
                    setPlan([...plan, s]);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Objective */}
        <div>
          <div className="flex items-center justify-between">
            <Label className='text-lg'>Objective</Label>
            <PlusButton onClick={() => setObjective((prev) => [...prev, ""])}/>
          </div>
          <div className="space-y-3">
            {objective.map((o, i) => (
              <EditableInputWithMenu
                key={i}
                value={o}
                onChange={(e) => {
                  const newObjective = [...objective];
                  newObjective[i] = e.target.value;
                  setObjective(newObjective);
                }}
                onRemove={() => {
                  const newObjective = [...objective];
                  newObjective.splice(i, 1);
                  setObjective(newObjective);
                }}
                menuItems={[...menuItems].filter((item) => item !== 'o')}
                onMenuSelect={(item) => {
                  const newObjective = [...objective];
                  newObjective.splice(i, 1);
                  setObjective(newObjective);

                  if (item === 's') {
                    setSubjective([...subjective, o]);
                  }
                  if (item === 'o') {
                    setObjective([...objective, o]);
                  }
                  if (item === 'a') {
                    setAssessment([...assessment, o]);
                  }
                  if (item === 'p') {
                    setPlan([...plan, o]);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Assessment */}
        <div>
          <div className="flex items-center justify-between">
            <Label className='text-lg'>Assessment</Label>
            <PlusButton onClick={() => setAssessment((prev) => [...prev, ""])}/>
          </div>
          <div className="space-y-3">
            {assessment.map((a, i) => (
              <EditableInputWithMenu
                key={i}
                value={a}
                onChange={(e) => {
                  const newAssessment = [...assessment];
                  newAssessment[i] = e.target.value;
                  setAssessment(newAssessment);
                }}
                onRemove={() => {
                  const newAssessment = [...assessment];
                  newAssessment.splice(i, 1);
                  setAssessment(newAssessment);
                }}
                menuItems={[...menuItems].filter((item) => item !== 'a')}
                onMenuSelect={(item) => {
                  const newAssessment = [...assessment];
                  newAssessment.splice(i, 1);
                  setAssessment(newAssessment);

                  if (item === 's') {
                    setSubjective([...subjective, a]);
                  }
                  if (item === 'o') {
                    setObjective([...objective, a]);
                  }
                  if (item === 'a') {
                    setAssessment([...assessment, a]);
                  }
                  if (item === 'p') {
                    setPlan([...plan, a]);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Plan */}
        <div>
          <div className="flex items-center justify-between">
            <Label className='text-lg'>Plan</Label>
            <PlusButton onClick={() => setPlan((prev) => [...prev, ""])} />
          </div>
          <div className="space-y-3">
            {plan.map((p, i) => (
              <EditableInputWithMenu
                key={i}
                value={p}
                onChange={(e) => {
                  const newPlan = [...plan];
                  newPlan[i] = e.target.value;
                  setPlan(newPlan);
                }}
                onRemove={() => {
                  const newPlan = [...plan];
                  newPlan.splice(i, 1);
                  setPlan(newPlan);
                }}
                menuItems={[...menuItems].filter((item) => item !== 'p')}
                onMenuSelect={(item) => {
                  const newPlan = [...plan];
                  newPlan.splice(i, 1);
                  setPlan(newPlan);

                  if (item === 's') {
                    setSubjective([...subjective, p]);
                  }
                  if (item === 'o') {
                    setObjective([...objective, p]);
                  }
                  if (item === 'a') {
                    setAssessment([...assessment, p]);
                  }
                  if (item === 'p') {
                    setPlan([...plan, p]);
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            {structuring ? (
              <Button size="lg" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                構造化中
              </Button>
            ) : (
              <Button size="lg" onClick={() => setValue(modelValue)}>
                モデルケースを試す
              </Button>
            )}

            {/* Summary */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" disabled={summary.length < 1}>
                  要約を見る
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="space-y-4">
                  {summary.map((s, i) => (
                    <div key={i}>
                      {s.speaker === 'patient' ? (
                        <p>患者の発言: {s.text}</p>
                      ) : (
                        <p>医者の発言: {s.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="secondary" onClick={handleClearAll}>
              送信
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 left-8 z-50">
        <ReturnButton onClick={usereturnTop} />
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <RecordingButton onClick={toggleRecording} recording={recording} loading={structuring} />
        {/*<RecordingButton onClick={toggleRecording} recording={recording} loading={structuring} />{/*AddRecButtonを作成*/}
      </div>
    </>
  );
};

export default SOAPView;
