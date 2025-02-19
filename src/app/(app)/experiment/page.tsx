import Link from 'next/link';

import { PageTitle } from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { EXPERIMENT_TARGET_PATH } from '@/constants/experiment';

import { ExperimentResultTable } from './_components/experiment-result-table';

export default function Experiment() {
  return (
    <div>
      <PageTitle>実験</PageTitle>
      <div className="mt-4 space-y-2">
        <p>
          音声入力を活用することで入力速度や入力精度がどのように変化するのかを実験します。
        </p>
        <p>
          被験者の方には別端末で表示されている仮のバイタルサインを入力してもらいます。
        </p>
        <p>
          入力が完了した後に、使いやすさについてのアンケートに回答してもらいます。
        </p>
        <p>
          この工程を音声入力を使わずに行った場合と、音声入力を使った場合の2パターンで行います。
        </p>
      </div>
      <section className="mt-8">
        <h3 className="text-xl font-bold">あなたの実験結果</h3>
        <div className="mt-4">
          <ExperimentResultTable />
        </div>
      </section>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Button size="lg" asChild>
          <Link href={EXPERIMENT_TARGET_PATH.MANUAL_INPUT}>
            従来の入力（手動入力）
          </Link>
        </Button>
        <Button size="lg" asChild>
          <Link href={EXPERIMENT_TARGET_PATH.SIMPLE_VOICE_INPUT}>
            項目別の音声入力
          </Link>
        </Button>
        <Button size="lg" asChild>
          <Link href={EXPERIMENT_TARGET_PATH.USING_CHAT_GPT}>
            項目横断的な音声入力
          </Link>
        </Button>
      </div>
    </div>
  );
}
