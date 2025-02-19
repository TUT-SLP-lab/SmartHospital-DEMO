import { useEffect, useState } from 'react';

import type { ROUNDS_ITEM } from '@/constants/rounds';

import { useASRInput } from './useASRInput';

/* 関連するカルテ項目をピックアップするためのキーワード **/
const ROUNDS_KEY_WORDS = {
  TEMPERATURE: '体温は',
  PULSE: '脈拍は',
  BLOOD_PRESSURE_HIGH: '血圧上は',
  BLOOD_PRESSURE_LOW: '血圧下は',
  RESPIRATION: '呼吸数は',
  NOTE: '補足事項は',
  SPO2: 'SpO2は'
} as const satisfies Record<ROUNDS_ITEM, string>;

const ROUNDS_KEY_WORDS_LIST = Object.values(ROUNDS_KEY_WORDS);

export const useModiSync = () => {
  const { value, setValue, toggleRecording, transcript, recording } =
    useASRInput({
      target: 'MAIN',
      continuous: true,
    });

  const [temperature, setTemperature] = useState('');
  const [pulse, setPulse] = useState('');
  const [bloodPressureHigh, setBloodPressureHigh] = useState('');
  const [bloodPressureLow, setBloodPressureLow] = useState('');
  const [respiration, setRespiration] = useState('');
  const [note, setNote] = useState('');

  const onFinishTemperatureChange = () => {
    if (temperature === '') return;
    setValue((prev) => prev + ROUNDS_KEY_WORDS.TEMPERATURE + temperature);
  };
  const onFinishPulseChange = () => {
    if (pulse === '') return;
    setValue((prev) => prev + ROUNDS_KEY_WORDS.PULSE + pulse);
  };
  const onFinishBloodPressureHighChange = () => {
    if (bloodPressureHigh === '') return;
    setValue(
      (prev) => prev + ROUNDS_KEY_WORDS.BLOOD_PRESSURE_HIGH + bloodPressureHigh,
    );
  };
  const onFinishBloodPressureLowChange = () => {
    if (bloodPressureLow === '') return;
    setValue(
      (prev) => prev + ROUNDS_KEY_WORDS.BLOOD_PRESSURE_LOW + bloodPressureLow,
    );
  };
  const onFinishRespirationChange = () => {
    if (respiration === '') return;
    setValue((prev) => prev + ROUNDS_KEY_WORDS.RESPIRATION + respiration);
  };
  const onFinishNoteChange = () => {
    if (note === '') return;
    setValue((prev) => prev + ROUNDS_KEY_WORDS.NOTE + note);
  };

  // temperatureはvalueの最も後ろにあるものを採用する
  useEffect(() => {
    const pickedUpTemperatureText = pickUpMatchedText(
      value,
      ROUNDS_KEY_WORDS.TEMPERATURE,
      ROUNDS_KEY_WORDS_LIST,
    );
    setTemperature(pickedUpTemperatureText);

    const pickedUpPulseText = pickUpMatchedText(
      value,
      ROUNDS_KEY_WORDS.PULSE,
      ROUNDS_KEY_WORDS_LIST,
    );
    setPulse(pickedUpPulseText);

    const pickedUpBloodPressureHighText = pickUpMatchedText(
      value,
      ROUNDS_KEY_WORDS.BLOOD_PRESSURE_HIGH,
      ROUNDS_KEY_WORDS_LIST,
    );
    setBloodPressureHigh(pickedUpBloodPressureHighText);

    const pickedUpBloodPressureLowText = pickUpMatchedText(
      value,
      ROUNDS_KEY_WORDS.BLOOD_PRESSURE_LOW,
      ROUNDS_KEY_WORDS_LIST,
    );
    setBloodPressureLow(pickedUpBloodPressureLowText);

    const pickedUpRespirationText = pickUpMatchedText(
      value,
      ROUNDS_KEY_WORDS.RESPIRATION,
      ROUNDS_KEY_WORDS_LIST,
    );
    setRespiration(pickedUpRespirationText);

    const pickedUpNoteText = pickUpMatchedText(
      value,
      ROUNDS_KEY_WORDS.NOTE,
      ROUNDS_KEY_WORDS_LIST,
    );
    setNote(pickedUpNoteText);
  }, [value]);

  return {
    originalValue: value,
    setOriginalValue: setValue,
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
  };
};
export const pickUpMatchedText = (
  text: string,
  startText: string,
  endTexts: ReadonlyArray<string>,
) => {
  const startIndex = text.lastIndexOf(startText);
  if (startIndex === -1) {
    return '';
  }
  const endIndex = Math.min(
    ...endTexts
      .map((endText) => text.indexOf(endText, startIndex + 1))
      .filter((v) => v !== -1),
  );
  const matchedText = text.substring(startIndex + startText.length, endIndex);
  return matchedText;
};
