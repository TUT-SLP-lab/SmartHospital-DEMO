'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RecordingButton } from '@/components/recording-button';
import { ReturnButton } from '@/components/return-button';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useASRInput } from '@/hooks/useASRInput';
import { usereturnTop } from '@/hooks/useReturnTop';
import { icFromChatGPT } from '@/lib/api/ic';
import type { Summary } from '@/lib/typechat/ic';
import React from 'react';


export const modelValue =
  '今回のペースメーカーのデコミということでお話をさせていただきます。状態としては、完全防湿ブロックという病名ですね。防湿ブロック。これは手術に伴って、なってしまう方もいるし、自然歴としてですね、なる人もいるんですけども、やはりご高齢の方がなりやすい状態、病気になります。正常な脈というのは、同系節、この上の方がね、発電所みたいなものがあるんですけど、ここからですね、ここから電気が出て、心臓、ずーっと電気が流れて、全体にこう、電気が行くとですね、流れると初めて心臓が動いてくれて、1回の脈に対して1回心臓が動くということになるわけですね。今起きているのはですね、電気を出す部分に関しては問題なく動いております。ただこの防湿結節という真ん中のところが、電気が通らなくなってきてしまっているということで、回路が切れてしまっているという状態なんですね。そうすると、下に電気が流れます。下に電気が流れませんので、心臓が動かないという状況ですね。今回なんでこういったことが起きるかと。一つはですね、防湿結節というのは、細胞はですね、やっぱり傷んできます。当然、発電ができなくなる人もいるんですけども、回路が切れてしまう人もやはり多いですね。そうなると、細胞がダメになると、復活させることができませんということなんですが、今回、手術の後になってしまった一つの要因としてはですね、もともと傷んでいるというのは当然あるわけなんですが、それプラスですね、大動脈弁というのはここにあるんですね。ここの病気です。ここの切開が細くなってきてしまって、ここに弁を、人工弁を置いたわけですね。この大動脈弁と回路というのはとても近いんですね。すぐ真横にあります。この大動脈弁をですね、開く、機械的に広げるとですね、どうしてもこの辺の圧が外にかかってしまいます。そうすると、もともと大丈夫な方は問題ないんですけども、弱っていると、こういった、こういったことでもですね、このダメージ、最後は一押しみたいになってしまって、この電気が悪くなってしまいます。当然その一時的なむくみみたいなもので、この流れがまた回復してきてくれるような方もいらっしゃいます。その場合は、このペースメーカーは必要ないんですけども、回復しない場合には、永久ペースメーカーを入れなきゃいけないなということで判断をします。今この管を入れて、回復してくるかどうかを見ているという段階なんですが、ちょっと見込みが少ないかなという。その見込みというのは、一つは経過としてつながってくるか、できるだけ良くなってくるか、もう一つは、実前からですね、新年度拝見すると、やっぱりもともとこの電気の流れが悪いような所見があります。そういった方はやっぱり、こういった手術に伴って、電気が流れにくくなってしまうことはありますので、今回、やはりここはなかなかね、つながりが悪いと考えると、ペースメーカーという機械を入れた方が安全かなというところですね。もう少し待ってみると言っても、なくはないんですけども、昨日抜けちゃったら、もう意識が遠のいてたら?こういった不安定なんですよね。長く留置すればするほどですね、バイキングハイリスクもありますので、この管は持っても1週間か2週間ですので、まずこの辺で判断しないといけないかなというところですね。今更はもうどうしようもないのね。今更はもうどうしようもないのね。もう元には戻らない。戻るかもしれないですけどね。具体的にどういった治療かというと、今入っているペースメーカーというのが、首から入れているのは、心臓のこの下の部分に電気を送っているだけなんですね。一時的なものというのはね。本来、永久ペースメーカーというものはですね、2本リード線を入れます。上の部屋と下の部屋です。上の部屋はですね、電気を流しているところの電気を感知して、これと全く同じ信号をバイパスするように下に送ってあげるんですね。ですので、ご自身の脈が上がれば上がるし、下がれば下がるということが連動してくれる2本を入れるわけです。その起電力がこのペースメーカーと機械になりますね。この入れ方は、鎖骨の下あたりに5センチぐらい、極小麻酔で傷をつくって、ここに静脈、血管が走っていますので、そこにリード線を2本、針を刺して入れていきます。先端スクリューになっているので、スクリューで止めてですね、電池につなげて塗っておしまいになりますね。見える傷は5センチぐらいですね。血管が細くなっているような場合、リード線を入れられない場合には、反対側、右側から2本入れますが、これは実前の造影検査で判断します。この人、反対についているってことだね。うん。なんで?血管が。それは動脈で、静脈はそうでもないんですが、ただ、リード線が十分2本入る隙間があるかどうかって話ですので、静脈に関しては細かろうが、日常生活困ることはないんですけど、このリードを入れるということに関しては、適するとか、右になることもありますので、右になるかもしれませんが、従前に評価をしています。従前に、手術の時に評価をしますね。前線しても、こういうことですね。治療としては、大体2時間ぐらい、極小麻酔で行っていきます。極小麻酔やって、怖いね。うん。聞こえるのが嫌らしい。まあ、うとうとするお薬をね、使いますね。聞こえるのが嫌なんだな。嫌だな。うん。で、実後1週間ですね。耳栓してるよ。耳栓。匂いみたいな。で、1週間見てですね、傷が大丈夫かどうか、あとリード線がずれないかどうかということなんですが、まあ、合併症としてリードオンドラブルというのが、やはりリード線はスクールで止めてくるんですけども、引っ張られると最初に抜けてしまうことがあります。大体1ヶ月ぐらい経てば完全に固着しますけども、それまで腕を大きく回したりとか、立ち上がった気持ちにですね、抜けてしまうと、再手術になってしまいます。はい。なので、ここだけ気をつけて最終1週間見ていくということですね。';

export const ICview = () => {
  const { value, setValue, toggleRecording, transcript, recording } =
    useASRInput({
      target: 'MAIN',
      continuous: true,
    });

  const [summary, setSummary] = useState<Summary>([  ]);
  const [structuring, setStructuring] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (recording || value === '') {
        return;
      }

      try {
        setStructuring(true);
        const result = await icFromChatGPT({ text: value });
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

  return (
    <>
      <div className="space-y-4">
        {recording ? <div>{value + transcript}</div> : <div>{value}</div>}

        <div>
          <Label>対話内容</Label>
            <div className="space-y-4">
                {summary.map((s, i) => (
                    <div key={i}>
                      {s.speaker === 'patient' ? (
                        <p>患: {s.text}</p>
                      ) : (
                        <p>医: {s.text}</p>
                      )}
                    </div>
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

          </div>
        </div>
      </div>
      <div className="fixed bottom-8 left-8 z-50">
        <ReturnButton
          onClick={usereturnTop}
        /> 
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <RecordingButton
          onClick={toggleRecording}
          recording={recording}
          loading={structuring}
        />
        
      </div>
    </>
  );
};
