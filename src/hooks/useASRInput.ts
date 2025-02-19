import 'regenerator-runtime';

import { useCallback, useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { useStaticSWR } from './useStaticSWR';

export const useASRInput = ({
  target,
  continuous,
}: {
  target: ASRInputTarget;
  continuous?: boolean;
}) => {
  const { asrInputTarget, setASRInputTarget } = useASRInputTarget();
  const [inputValue, setInputValue] = useState('');
  const { transcript, listening, finalTranscript, resetTranscript } =
    useSpeechRecognition();
  const transcriptReturn = target === asrInputTarget ? transcript : '';
  const recordingReturn = target === asrInputTarget ? listening : false;
  const finalTranscriptReturn =
    target === asrInputTarget ? finalTranscript : '';

  const toggleRecording = () => {
    setASRInputTarget(target);
    if (listening) {
      void SpeechRecognition.stopListening();
    } else {
      void SpeechRecognition.startListening({
        continuous: continuous,
        language: 'ja-JP',
      });
    }
  };

  useEffect(() => {
    if (!listening) {
      resetTranscript();
    }
  }, [finalTranscript, listening, resetTranscript]);

  useEffect(() => {
    if (target !== asrInputTarget) return;

    if (!listening && finalTranscript) {
      setInputValue((prev) => prev + finalTranscript);
    }
  }, [finalTranscript, listening, target, asrInputTarget]);

  return {
    value: inputValue,
    setValue: setInputValue,
    transcript: transcriptReturn,
    finalTranscript: finalTranscriptReturn,
    recording: recordingReturn,
    toggleRecording,
  };
};

const ASRInputTargets = [
  'MAIN',
  'TEMPERATURE',
  'PULSE',
  'BLOOD_PRESSURE_HIGH',
  'BLOOD_PRESSURE_LOW',
  'RESPIRATION',
  'NOTE',
] as const;
export type ASRInputTarget = (typeof ASRInputTargets)[number];

const useASRInputTarget = () => {
  const { data: asrInputTarget, mutate } = useStaticSWR<ASRInputTarget>({
    key: 'INPUT_TARGET',
    initialData: 'MAIN',
  });

  const setASRInputTarget = useCallback(
    (data: Parameters<typeof mutate>[0]) => {
      void mutate(data, false);
    },
    [mutate],
  );

  return {
    asrInputTarget,
    setASRInputTarget,
  };
};
