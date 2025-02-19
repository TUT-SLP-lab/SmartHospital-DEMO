'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2,Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ReturnButton } from '@/components/return-button';
import { RecordingButton } from '@/components/recording-button';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { EditableInputWithMenu } from '@/components/editable-input-with-menu';
import { DnPSelect } from '@/components/dnp-select';
import { PlusButton } from '@/components/plus-button';
import { useASRInput } from '@/hooks/useASRInput';
import { usereturnTop } from '@/hooks/useReturnTop';
import { ROUNDS_ITEM_LABEL_WITH_UNIT } from '@/constants/rounds';
import { swipeFromChatGPT } from '@/lib/api/swipe';
import type { Summary } from '@/lib/typechat/ic';
import { patients, doctors } from './Types/type';
import { UserCog } from 'lucide-react';

const menuItems = ['s', 'o', 'a', 'p'] as const

export const modelValue =
  'ちょっと血圧測りますねはい動いたときとかどうでした朝方はや早く起きたときはやくて六時ちょっとくらい前にあのあれをたい体重をはかり行ったじゃんうんうんほいで帰ってきてここきたらなんだかちょっと体がえらい感じしたもんねんでベッドの上横になって寝たら心臓がちょっと煽りだしたじゃんねどきどきしてたうんあそっかー今はじゃあ落ち着いただねああほいでしばらく休んどって七時ごろからあのトイレ行ったり顔洗ったりあれ歩きだしてからはそんなに肝心くなったけどねうんうん動き出したらうーん胸に違和感あったんー別になんにもないと思ったけどまあ体重は買ったときに四十七点九になっちゃったもんでいや思っただよあーこれだけあの体重が減るとうん体がかえって偉くなっちゃうもんねちょっとあれー歩くとき苦しいとかあるーあいやあのそれからはないあーないそれからはないうんうんちょっと熱測ったりしてきますはい今ねお薬はじめたもんでねまたなんか違和感あれこれ詰め終わった後こっちのがいいかなあったら言ってくださいはい熱測りますちょっと足も見ていいですうんうんだいぶ減ったねうんむくみまだちょっとあるけどねちょっと待ってよよいしょ三十六点七はいあごめんなさいねちょっと足触りますはい大丈夫ですありがとうございますそんなに冷たくないはいですねあ落ちちゃったスリッパそれ怖いね滑らないそのくああ大丈夫大丈夫なるべくね後ろある法の靴のほうがいいでねまだそんなにえあの外いけへんもんでうんうん外行くようならはいてっつって言われたであうんうん靴をねうんこのあれをくらうときにスリッパをくれるときに今日って便出ました今日はまだ出てないうんうんまた出たらはい教えてはいくださいね別にじゃあ動いたときも息苦しさはなあかった今はありませんうんうん咳や単はないはいうんあ単はたまに出るたんはあるうん痰ちゅうよりかはねばねばした唾だねあー透明のうんうん透明のねはいちょっとおなかの音と呼吸音はい聞きますね深呼吸ねーはいありがとうございますこの点滴入れてるところは痛くないあいいたくないねはいはいお願いします';

export const SWIPEView = () => {
  // type FormData = {
  //   name: string;
  //   ID: string;
  //   birthday: string;
  //   height: string
  //   weight: string
  // }

  // const{
  //   register,
  //   handleSubmit,
  //   formState: {errors}
  // } = useForm<FormData>({
  //   criteriaMode:"all",
  // })

  // const handleOnSubmit = (data:FormData) => {
  //   setName(data.name)
  //   setID(data.ID)
  //   setBirthday(data.birthday)
  //   setHeight(data.height)
  //   setWeight(data.weight)
  //   setOpen(false)
  // }

  const { value, setValue, toggleRecording, transcript, recording } = useASRInput({
    target: 'MAIN',
    continuous: true,
  });
  
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [open, setOpen] = useState(false);
  const [subjective, setSubjective] = useState<string[]>([]);
  const [objective, setObjective] = useState<string[]>([]);
  const [assessment, setAssessment] = useState<string[]>([]);
  const [plan, setPlan] = useState<string[]>([]);
  const [summary, setSummary] = useState<Summary>([]);
  const [temperature, setTemperature] = useState('');
  const [pulse, setPulse] = useState('');
  const [bloodPressureHigh, setBloodPressureHigh] = useState('');
  const [bloodPressureLow, setBloodPressureLow] = useState('');
  const [spo, setSpo] = useState('');
  const [patientID, setPatientID] = useState('');
  const [doctorID, setDoctorID] = useState('');
  // const [ID, setID] = useState('');
  // const [name, setName] = useState('');


  const [structuring, setStructuring] = useState(false);

  const handleDragEnd = (event: any, info: any) => {
    // ドラッグ終了時のスワイプ量に基づいて次のページに移動するか決定
    if (info.offset.x < -100 && index < pages.length - 1) {
      setIndex(index + 1);
    } else if (info.offset.x > 100 && index > 0) {
      setIndex(index - 1);
    }
    setIsDragging(false);
  };

  const handleClearAll = () => {
    setSubjective([]); setObjective([]); setAssessment([]); setPlan([]); setSummary([]);
    setTemperature(''); setPulse(''); setBloodPressureHigh(''); setBloodPressureLow(''); setSpo('');
    setValue('');
    setPatientID(''); setDoctorID('')
    //setName(''); setID(''); 
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (recording || value === '') {
        return;
      }
      try {
        setStructuring(true);
        const result = await swipeFromChatGPT({ text: value });
        if (result.success === false) {
          toast({
            variant: 'destructive',
            title: '構造化に失敗しました',
            description: 'もう一度お試しください',
          });
          return;
        }

        const { data } = result;
        const { SOAP, VITAL } = data;
        console.log(data);
        if (!SOAP || !VITAL)
          throw new Error();

        SOAP.SUBJECTIVE && setSubjective((prev) => [...prev, ...(SOAP.SUBJECTIVE || [])]);
        SOAP.OBJECTIVE && setObjective((prev) => [...prev, ...(SOAP.OBJECTIVE || [])]);
        SOAP.ASSESSMENT && setAssessment((prev) => [...prev, ...(SOAP.ASSESSMENT || [])]);
        SOAP.PLAN && setPlan((prev) => [...prev, ...(SOAP.PLAN || [])]);
        SOAP.SUMMARY && setSummary(SOAP.SUMMARY);

        VITAL.TEMPERATURE && setTemperature(VITAL.TEMPERATURE.toString());
        VITAL.PULSE && setPulse(VITAL.PULSE.toString());
        VITAL.BLOOD_PRESSURE_HIGH &&
          setBloodPressureHigh(VITAL.BLOOD_PRESSURE_HIGH.toString());
        VITAL.BLOOD_PRESSURE_LOW &&
          setBloodPressureLow(VITAL.BLOOD_PRESSURE_LOW.toString());
        VITAL.SPO && setSpo(VITAL.SPO.toString());
        
      } catch (e) {
        toast({
          variant: 'destructive',
          title: '構造化に失敗しました',
          description: 'もう一度お試しください',
        });
      } finally {
        setStructuring(false);
      }

      // 状態更新がすべて完了した後にクリア
      setValue('');
    }

    if (!recording && value !== '') {
      fetchData();
    }
  }, [recording, value]);

  const pages = [
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="space-y-2">
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.TEMPERATURE}</Label>
          <Input
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            inputMode="numeric"
          />
        </div>
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.PULSE}</Label>
          <Input
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            inputMode="numeric"
          />
        </div>
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.BLOOD_PRESSURE_HIGH}</Label>
          <Input
            value={bloodPressureHigh}
            onChange={(e) => setBloodPressureHigh(e.target.value)}
            inputMode="numeric"
          />
        </div>
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.BLOOD_PRESSURE_LOW}</Label>
          <Input
            value={bloodPressureLow}
            onChange={(e) => setBloodPressureLow(e.target.value)}
            inputMode="numeric"
          />
        </div>
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.SPO2}</Label>
          <Input
            value={spo}
            //placeholder='n%'
            onChange={(e) => setSpo(e.target.value)}
            inputMode="numeric"
            className="w-64"
          />
        </div>
      </div>
    </div>,
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '120px' }}>
      <div className="space-y-4 mt-4">
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
        <div className="mt-8 flex items-center justify-center pb-4 mb-4">
          <div className="mt-8 flex flex-col items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" disabled={summary.length < 1}>
                  対話履歴を見る
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div style={{overflow: 'hidden', position: 'relative', overflowY: 'auto', width: '100%', height: '80vh'}} className="space-y-3">
                  {summary.map((s, i) => (
                    <div key={i}>
                      {s.speaker === 'patient' ? (
                        <p>患者: {s.text}</p>
                      ) : (
                        <p>医者: {s.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>,
    ];

  return (
    <>
      <div className='flex flex-row items-center gap-2'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <UserCog className="h-4 w-4"/>
            </Button>
          </DialogTrigger>
          <DialogContent>  
            <div className="flex items-center space-x-1 mt-4">
              <p className="font-medium text-gray-700 w-36">ユーザ</p>
              <DnPSelect dummy={patients} onSelect={setPatientID} />
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <p className="font-medium text-gray-700 w-36">患者</p>
              <DnPSelect dummy={doctors} onSelect={setDoctorID} />
            </div>
            <div className='flex items-center justify-center'>
              <Button size="default" onClick={() => setOpen(false)} type="button">
                確定
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <p>{doctorID} : {patientID}</p> 
      </div>

      {recording ? <div>{value + transcript}</div> : <div>{value}</div>}
      <div style={{ overflow: 'hidden', position: 'relative', overflowY: 'auto', width: '100%', height: '100vh' }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2} // ドラッグの引っかかり具合を調整
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {pages[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="fixed bottom-20 left-8 right-8 z-50 flex justify-center items-center px-8">
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
      </div>

      <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-between items-center px-8">
        <div>
          <ReturnButton onClick={usereturnTop} />
        </div>
        <div>
          <RecordingButton onClick={toggleRecording} recording={recording} loading={structuring} />
        </div>
        <div>
          <Button size="icon2" variant="secondary" onClick={handleClearAll} className={cn('rounded-full')}>
            <Send/>
          </Button>
        </div>
      </div>
    </>
  );
};
