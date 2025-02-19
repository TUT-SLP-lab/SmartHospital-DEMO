'use client';

import { Label } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSessionStorage } from 'react-use';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import type { ExperimentEval } from '@/constants/experiment';
import { EXPERIMENT_EVAL_KEY } from '@/constants/experiment';

export const RefSyncEval = () => {
  const [refSyncEvalStorage, setRefSyncEvalStorage] = useSessionStorage<
    Partial<ExperimentEval> | undefined
  >(EXPERIMENT_EVAL_KEY.REF_SYNC);
  const [evalValue, setEvalValue] = useState([2]);
  const [time, setTime] = useState(refSyncEvalStorage?.time ?? 0);
  const router = useRouter();

  const onClickSendButton = () => {
    setRefSyncEvalStorage({
      time: time,
      easeOfUse: evalValue[0] + 1, // 0 ~ 4 -> 1 ~ 5
    });
    router.push('/experiment');
  };

  return (
    <div>
      <div className="space-y-1">
        <Label>時間</Label>
        <Input
          value={time}
          type="number"
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </div>
      <div className="mt-8 space-y-2">
        <Label>使いやすさ</Label>
        <Slider
          value={evalValue}
          onValueChange={setEvalValue}
          max={4}
          step={1}
        />
      </div>
      <div className="mt-12 flex justify-center">
        <Button onClick={onClickSendButton}>送信</Button>
      </div>
    </div>
  );
};
