import type { Result } from 'typechat';

import type { RoundsFromChatGPT } from '../typechat';

export const roundsFromChatGPT = async (args: { text: string }) => {
  const res = await fetch('/api/rounds', {
    method: 'POST',
    body: JSON.stringify({
      text: args.text,
    }),
  });
  const data = (await res.json()) as Result<RoundsFromChatGPT>;
  return data;
};
