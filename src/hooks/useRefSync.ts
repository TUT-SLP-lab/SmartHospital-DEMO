import { useMemo } from 'react';

import type { ROUNDS_ITEM } from '@/constants/rounds';

import { useASRInput } from './useASRInput';

/* 関連するカルテ項目をピックアップするためのキーワード **/
export const ROUNDS_KEY_WORDS = {
  TEMPERATURE: '体温は',
  PULSE: '脈拍は',
  BLOOD_PRESSURE_HIGH: '血圧上は',
  BLOOD_PRESSURE_LOW: '血圧下は',
  RESPIRATION: '呼吸数は',
  NOTE: '補足事項は',
  SPO2: 'SPO2は'
} as const satisfies Record<ROUNDS_ITEM, string>;

export type RoundsKeyWordValues =
  (typeof ROUNDS_KEY_WORDS)[keyof typeof ROUNDS_KEY_WORDS];

const ROUNDS_KEY_WORDS_LIST = Object.values(ROUNDS_KEY_WORDS);

export const useRefSync = () => {
  const { value, setValue, toggleRecording, transcript, recording } =
    useASRInput({
      target: 'MAIN',
      continuous: true,
    });

  const temperaturePositions = useMemo(
    () =>
      getPickedUpPositions(
        value,
        ROUNDS_KEY_WORDS.TEMPERATURE,
        ROUNDS_KEY_WORDS_LIST,
      ),
    [value],
  );

  const pulsePositions = useMemo(
    () =>
      getPickedUpPositions(
        value,
        ROUNDS_KEY_WORDS.PULSE,
        ROUNDS_KEY_WORDS_LIST,
      ),
    [value],
  );

  const bloodPressureHighPositions = useMemo(
    () =>
      getPickedUpPositions(
        value,
        ROUNDS_KEY_WORDS.BLOOD_PRESSURE_HIGH,
        ROUNDS_KEY_WORDS_LIST,
      ),
    [value],
  );

  const bloodPressureLowPositions = useMemo(
    () =>
      getPickedUpPositions(
        value,
        ROUNDS_KEY_WORDS.BLOOD_PRESSURE_LOW,
        ROUNDS_KEY_WORDS_LIST,
      ),
    [value],
  );

  const respirationPositions = useMemo(
    () =>
      getPickedUpPositions(
        value,
        ROUNDS_KEY_WORDS.RESPIRATION,
        ROUNDS_KEY_WORDS_LIST,
      ),
    [value],
  );

  const notePositions = useMemo(
    () =>
      getPickedUpPositions(value, ROUNDS_KEY_WORDS.NOTE, ROUNDS_KEY_WORDS_LIST),
    [value],
  );

  return {
    originalValue: value,
    setOriginalValue: setValue,
    transcript,
    recording,
    toggleRecording,
    temperaturePositions,
    pulsePositions,
    bloodPressureHighPositions,
    bloodPressureLowPositions,
    respirationPositions,
    notePositions,
  };
};

export type PickUpPosition = {
  startIndex: number;
  endIndex: number;
};

const getPickedUpPositions = (
  text: string,
  startText: string,
  endTexts: string[],
): PickUpPosition[] => {
  const startIndexList: number[] = [];
  const endIndexList: number[] = [];
  const positionList: PickUpPosition[] = [];

  let startNum = text.indexOf(startText);
  if (startNum === -1) {
    return [];
  }
  while (startNum >= 0) {
    startIndexList.push(startNum);
    startNum = text.indexOf(startText, startNum + 1);
  }

  startIndexList.forEach((startIndex) => {
    const endIndex = Math.min(
      ...endTexts
        .map((endText) => text.indexOf(endText, startIndex + 1))
        .filter((v) => v !== -1),
    );
    endIndexList.push(endIndex);
  });

  for (let i = 0; i < startIndexList.length; i++) {
    positionList.push({
      startIndex: startIndexList[i],
      endIndex: endIndexList[i],
    });
  }

  return positionList;
};
