import type { Result } from 'typechat';

import type { SwipeFromChatGPT } from '@/lib/typechat/swipe';

// ChatGPTによってSOAPを作成するための関数
export const swipeFromChatGPT = async (args: { text: string }) => {
  const res = await fetch('/api/swipe', {
    method: 'POST',
    body: JSON.stringify({
      text: args.text,
    }),
  });
  const data = (await res.json()) as Result<SwipeFromChatGPT>;
  return data;
};
