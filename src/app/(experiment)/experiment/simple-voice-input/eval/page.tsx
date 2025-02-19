import { PageTitle } from '@/components/page-title';

import { SimpleVoiceInputEval } from './_components/simple-voice-input-eval';

export default function ManualInputPCEvalPage() {
  return (
    <div>
      <PageTitle>評価: 手動入力</PageTitle>
      <div className="mt-8">
        <SimpleVoiceInputEval />
      </div>
    </div>
  );
}
