import type { Result } from 'typechat';

import type { ICFromChatGPT } from '@/lib/typechat/ic';

// ChatGPTによってSOAPを作成するための関数
export const icFromChatGPT = async (args: { text: string }) => {
  const res = await fetch('/api/soap', {
    method: 'POST',
    body: JSON.stringify({
      text: args.text,
    }),
  });
  const data = (await res.json()) as Result<ICFromChatGPT>;
  return data;
};
