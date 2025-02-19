import { ROUNDS_ITEM_LABELS } from '@/constants/rounds';
import { translator } from '@/lib/typechat';

interface StructureBody {
  text: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as StructureBody;

  try {
    const response =
      await translator.translate(`以下の本文、ルール、項目から、項目に関連度の高い情報を抽出せよ。
    ## 本文
    ${body.text}
    ## ルール
    - 抽出した情報が文だった場合、文末を整える（例：「改善されており」→「改善されている」）
    - 数字が入った情報は数字のみ抽出する（例:「1,000円」→「1,000」）
    ## 項目
    ${ROUNDS_ITEM_LABELS.join('\n')}
    `);

    return Response.json(response);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
