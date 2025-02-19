'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSessionStorage } from 'react-use';

import { ExperimentStartAlertDialog } from '@/app/(experiment)/experiment/_components/experiment-start-alert-dialog';
import { RecordingButton } from '@/components/recording-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ExperimentEval } from '@/constants/experiment';
import { EXPERIMENT_EVAL_KEY } from '@/constants/experiment';
import { ROUNDS_ITEM_LABEL_WITH_UNIT } from '@/constants/rounds';
import { useModiSync } from '@/hooks/useModiSync';
import { useTimer } from '@/hooks/useTimer';

export const ModificationSyncView = () => {
  const {
    originalValue,
    setOriginalValue,
    temperature,
    pulse,
    bloodPressureHigh,
    bloodPressureLow,
    respiration,
    note,
    setTemperature,
    setPulse,
    setBloodPressureHigh,
    setBloodPressureLow,
    setRespiration,
    setNote,
    onFinishTemperatureChange,
    onFinishPulseChange,
    onFinishBloodPressureHighChange,
    onFinishBloodPressureLowChange,
    onFinishRespirationChange,
    onFinishNoteChange,
    toggleRecording,
    transcript,
    recording,
  } = useModiSync();
  const pathname = usePathname();
  const router = useRouter();
  const { startTimer, stopTimer, time } = useTimer();
  const [modiSyncEvalStorage, setModiSyncEvalStorage] =
    useSessionStorage<ExperimentEval>(EXPERIMENT_EVAL_KEY.MODI_SYNC);
  const [dialogOpen, setDialogOpen] = useState(true);

  const buttonDisabled =
    temperature.length === 0 ||
    pulse.length === 0 ||
    bloodPressureHigh.length === 0 ||
    bloodPressureLow.length === 0 ||
    respiration.length === 0 ||
    note.length === 0;

  const onClickSendButton = () => {
    stopTimer();
    setModiSyncEvalStorage({
      ...modiSyncEvalStorage,
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
        title="修正による連携"
        open={dialogOpen}
        onClose={onCloseDialog}
      />
      <div className="space-y-8">
        <p className="text-sm">所要時間: {Math.floor(time)}秒</p>
        {recording && <div>{originalValue + transcript}</div>}
        <Textarea
          value={originalValue}
          onChange={(e) => setOriginalValue(e.target.value)}
        />
        <section className="space-y-8">
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.TEMPERATURE}</Label>
            <Input
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              onBlur={onFinishTemperatureChange}
            />
          </div>
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.PULSE}</Label>
            <Input
              value={pulse}
              onChange={(e) => setPulse(e.target.value)}
              onBlur={onFinishPulseChange}
            />
          </div>
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.BLOOD_PRESSURE_HIGH}</Label>
            <Input
              value={bloodPressureHigh}
              onChange={(e) => setBloodPressureHigh(e.target.value)}
              onBlur={onFinishBloodPressureHighChange}
            />
          </div>
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.BLOOD_PRESSURE_LOW}</Label>
            <Input
              value={bloodPressureLow}
              onChange={(e) => setBloodPressureLow(e.target.value)}
              onBlur={onFinishBloodPressureLowChange}
            />
          </div>
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.RESPIRATION}</Label>
            <Input
              value={respiration}
              onChange={(e) => setRespiration(e.target.value)}
              onBlur={onFinishRespirationChange}
            />
          </div>
        </section>
        <div className="flex items-center justify-center">
          <Button
            size="lg"
            disabled={buttonDisabled}
            onClick={onClickSendButton}
          >
            送信
          </Button>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <RecordingButton onClick={toggleRecording} recording={recording} />
      </div>
    </>
  );
};
