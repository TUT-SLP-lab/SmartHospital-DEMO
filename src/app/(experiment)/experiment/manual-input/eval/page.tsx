import { PageTitle } from '@/components/page-title';

import { ManualInputEval } from './_components/manual-input-eval';

export default function ManualInputPCEvalPage() {
  return (
    <div>
      <PageTitle>評価: 手動入力</PageTitle>
      <div className="mt-8">
        <ManualInputEval />
      </div>
    </div>
  );
}
