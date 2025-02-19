import { PageTitle } from '@/components/page-title';

import { UsingChatGPTEval } from './_components/using-chat-gpt-eval';

export default function UsingChatGPTEvalPage() {
  return (
    <div>
      <PageTitle>評価: ChatGPTを利用した手法</PageTitle>
      <div className="mt-8">
        <UsingChatGPTEval />
      </div>
    </div>
  );
}
