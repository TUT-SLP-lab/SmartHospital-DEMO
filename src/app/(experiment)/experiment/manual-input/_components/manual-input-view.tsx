'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSessionStorage } from 'react-use';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ExperimentEval } from '@/constants/experiment';
import { EXPERIMENT_EVAL_KEY } from '@/constants/experiment';
import { ROUNDS_ITEM_LABEL_WITH_UNIT } from '@/constants/rounds';
import { useTimer } from '@/hooks/useTimer';

import { ExperimentStartAlertDialog } from '../../_components/experiment-start-alert-dialog';

export const ManualInputView = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { startTimer, stopTimer, time } = useTimer();
  const [refSyncEvalStorage, setRefSyncEvalStorage] =
    useSessionStorage<ExperimentEval>(EXPERIMENT_EVAL_KEY.MANUAL_INPUT);
  const [dialogOpen, setDialogOpen] = useState(true);

  // Input states
  const [temperature, setTemperature] = useState('');
  const [pulse, setPulse] = useState('');
  const [bloodPressureHigh, setBloodPressureHigh] = useState('');
  const [bloodPressureLow, setBloodPressureLow] = useState('');
  const [respiration, setRespiration] = useState('');
  const [note, setNote] = useState('');

  const buttonDisabled =
    temperature === '' ||
    pulse === '' ||
    bloodPressureHigh === '' ||
    bloodPressureLow === '' ||
    respiration === '' ||
    note === '';

  const onClickSendButton = () => {
    stopTimer();
    setRefSyncEvalStorage({
      ...refSyncEvalStorage,
      time: time,
    });

    router.push(pathname + '/eval');
  };

  const onCloseDialog = () => {
    setDialogOpen(false);
    startTimer();
  };

  return (
    <>
      <ExperimentStartAlertDialog
        title="手動入力"
        open={dialogOpen}
        onClose={onCloseDialog}
      />
      <div className="space-y-4">
        <p className="text-sm">所要時間: {Math.floor(time)}秒</p>
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.TEMPERATURE}</Label>
          <Input
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            inputMode="numeric"
          />
        </div>
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.PULSE}</Label>
          <Input
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            inputMode="numeric"
          />
        </div>
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.BLOOD_PRESSURE_HIGH}</Label>
          <Input
            value={bloodPressureHigh}
            onChange={(e) => setBloodPressureHigh(e.target.value)}
            inputMode="numeric"
          />
        </div>
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.BLOOD_PRESSURE_LOW}</Label>
          <Input
            value={bloodPressureLow}
            onChange={(e) => setBloodPressureLow(e.target.value)}
            inputMode="numeric"
          />
        </div>
        <div>
          <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.RESPIRATION}</Label>
          <Input
            value={respiration}
            onChange={(e) => setRespiration(e.target.value)}
            inputMode="numeric"
          />
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center">
        <Button size="lg" onClick={onClickSendButton} disabled={buttonDisabled}>
          送信
        </Button>
      </div>
    </>
  );
};
