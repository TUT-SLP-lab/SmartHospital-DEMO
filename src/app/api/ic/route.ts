import { icTranslator } from '@/lib/typechat/ic';

interface StructureBody {
  text: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as StructureBody;

  try {
    const response =
      await icTranslator.translate(`以下の本文は医師と患者のインフォームドコンセントを取る際の対話音声認識結果です。インフォームドコンセントの確認のために正確で忠実な対話履歴を残したい。
    ## 本文
    ${body.text}
    ## ルール
    - 対話は話者が識別されていない平文の状態で入力される
    - 本文から医療従事者(doctor)と患者(patient)のどちらが発話したのか話者識別を行う
    - 患者の発言は全て出力すること
    - 対話は医療従事者の説明中心に進んでいるため、患者の発言と思われる部分を見逃さないこと
    - 出力が大きくなっていいので対話を忠実に記録する
    - 要約を禁止
    - 患者への質問と質問に対する返事は絶対に出力する（例：はい）
    - 危険性や確認事項とそれに対する反応を絶対に出力する（例：はい）
    `);

    return Response.json(response);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
