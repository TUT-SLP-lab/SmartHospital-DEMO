import type { Result } from 'typechat';

import type { SOAPFromChatGPT } from '@/lib/typechat/soap';

// ChatGPTによってSOAPを作成するための関数
export const soapFromChatGPT = async (args: { text: string }) => {
  const res = await fetch('/api/soap', {
    method: 'POST',
    body: JSON.stringify({
      text: args.text,
    }),
  });
  const data = (await res.json()) as Result<SOAPFromChatGPT>;
  return data;
};
