'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSessionStorage } from 'react-use';

import { ExperimentStartAlertDialog } from '@/app/(experiment)/experiment/_components/experiment-start-alert-dialog';
import { RecordingButton } from '@/components/recording-button';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ExperimentEval } from '@/constants/experiment';
import { EXPERIMENT_EVAL_KEY } from '@/constants/experiment';
import { ROUNDS_ITEM_LABEL_WITH_UNIT } from '@/constants/rounds';
import { ROUNDS_KEY_WORDS, useRefSync } from '@/hooks/useRefSync';
import { useTimer } from '@/hooks/useTimer';

import { RefSyncInputs } from './ref-sync-inputs';

export const RefSyncView = () => {
  const {
    originalValue,
    setOriginalValue,
    recording,
    transcript,
    toggleRecording,
    temperaturePositions,
    pulsePositions,
    bloodPressureHighPositions,
    bloodPressureLowPositions,
    respirationPositions,
    notePositions,
  } = useRefSync();
  const pathname = usePathname();
  const router = useRouter();
  const { startTimer, stopTimer, time } = useTimer();
  const [refSyncEvalStorage, setRefSyncEvalStorage] =
    useSessionStorage<ExperimentEval>(EXPERIMENT_EVAL_KEY.REF_SYNC);
  const [dialogOpen, setDialogOpen] = useState(true);

  const buttonDisabled =
    temperaturePositions.length === 0 ||
    pulsePositions.length === 0 ||
    bloodPressureHighPositions.length === 0 ||
    bloodPressureLowPositions.length === 0 ||
    respirationPositions.length === 0 ||
    notePositions.length === 0;

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
        title="参照による連携手法"
        open={dialogOpen}
        onClose={onCloseDialog}
      />
      <div className="space-y-8">
        <p className="text-sm">所要時間: {Math.floor(time)}秒</p>
        {recording && <div>{transcript}</div>}
        <Textarea
          value={originalValue}
          onChange={(e) => setOriginalValue(e.target.value)}
        />
        <section className="space-y-8">
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.TEMPERATURE}</Label>
            <RefSyncInputs
              originalText={originalValue}
              startText={ROUNDS_KEY_WORDS.TEMPERATURE}
              pickUpPositions={temperaturePositions}
              onChange={setOriginalValue}
            />
          </div>
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.PULSE}</Label>
            <RefSyncInputs
              originalText={originalValue}
              startText={ROUNDS_KEY_WORDS.PULSE}
              pickUpPositions={pulsePositions}
              onChange={setOriginalValue}
            />
          </div>
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.BLOOD_PRESSURE_HIGH}</Label>
            <RefSyncInputs
              originalText={originalValue}
              startText={ROUNDS_KEY_WORDS.BLOOD_PRESSURE_HIGH}
              pickUpPositions={bloodPressureHighPositions}
              onChange={setOriginalValue}
            />
          </div>
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.BLOOD_PRESSURE_LOW}</Label>
            <RefSyncInputs
              originalText={originalValue}
              startText={ROUNDS_KEY_WORDS.BLOOD_PRESSURE_LOW}
              pickUpPositions={bloodPressureLowPositions}
              onChange={setOriginalValue}
            />
          </div>
          <div className="space-y-1">
            <Label>{ROUNDS_ITEM_LABEL_WITH_UNIT.RESPIRATION}</Label>
            <RefSyncInputs
              originalText={originalValue}
              startText={ROUNDS_KEY_WORDS.RESPIRATION}
              pickUpPositions={respirationPositions}
              onChange={setOriginalValue}
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
