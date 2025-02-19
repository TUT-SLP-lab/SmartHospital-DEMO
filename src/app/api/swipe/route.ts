import { swipeTranslator } from '@/lib/typechat/swipe';

interface StructureBody {
  text: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as StructureBody;

  try {
    const response =
      await swipeTranslator.translate(`以下の本文は看護師と患者の回診の際の対話音声の書き起こしです。これをもとに電子カルテのSOAPの項目を生成してください。また、バイタル項目を抜き出してください。
      ## 本文
      ${body.text}
      ## ルール
      - 言い淀みやフィラーが多く存在します。これらは無視してください。
      - 方言やフレンドリーな話し言葉を考慮してください。
      - 音声認識結果によって誤字が多く生じます。できるだけ自然で適切な文に変換しながら作業してください。
      - 対話は話者が識別されていない平文の状態です。一方の発言の途中にもう一方の相槌が入ることがあります。これを考慮してください。
      - 対話は主に医師、看護師主導で行われます。
      - まず対話文を医師または看護師と患者のどちらが発話したのかを識別し、発話文を要約したものをSUMMARYとして出力してください。
      - SUMMARYは会話の時系列順に並べてください。
      - 次に電子カルテの記法であるSOAP記法におけるSUBJECTIVEとOBJECTIVEとASSESSMENTとPLANについての情報をそれぞれSubject,Object,Assessment,Planとして抽出してください。
      - 簡潔な形として句読点を用いず、1つの要約項目に1つの内容を入れてください。
      - 医療的でない雑談部分は項目化しない（例：今日は暑いね）
      - Objectiveは簡潔な形であること （例: 頭痛あり）
      - Subjectiveは患者の話し言葉を引用しながらわかりやすい短文にしてください（例: ～のときは～だった）
      - 数値に関するデータは指摘しているときは数値のみを適切な符号をつける（例: 体温: 36.5)
      - と発言した、と述べている、と訴えているなどの説明口調を使用しない(頭痛がする)
      - 患者は、看護師がなどの誰が発言したかの情報を文の先頭に使用しない
      - 多くの問いかけが分かりづらいので留意してください（例：～してた？、～とかある？、～ない？）
      - 質問とその答えはまとめてObjectiveにしてください（例 : ～痛い？痛くない → ～痛みなし）
      - Subjectiveにおいて特定の時間帯の症状の場合は時間帯と合わせて記入してください（例 : 朝方頭が痛くて～ → 朝方：頭痛あり）
      - Planは極力抽出しない、医療方針の変更や薬の投与、機材の交換、患者への指導などの情報のみ抽出する
      - バイタルや体調の確認をPlanに出力しない
      `);

    return Response.json(response);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
