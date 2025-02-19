import { createJsonTranslator, createLanguageModel } from 'typechat';

export type Speaker = 'doctor' | 'patient';
export type Summary = {
  speaker: Speaker;
  text: string;
}[];

export type RoundsFromChatGPT = {
    TEMPERATURE?: string | null;
    PULSE?: string | null;
    BLOOD_PRESSURE_HIGH?: string | null;
    BLOOD_PRESSURE_LOW?: string | null;
    RESPIRATION?: string | null;
    SPO?: string | null;
  }

export type SoapFromChatGPT = {
  SUBJECTIVE?: string[] | null;
  OBJECTIVE?: string[] | null;
  ASSESSMENT?: string[] | null;
  PLAN?: string[] | null;
  SUMMARY?: Summary | null;
}

export type Patient = {
  ID : string;
  NAME : string;
  BIRTHDAY : string;
  HEIGHT : string;
  WEIGHT : string;
}

export interface SwipeFromChatGPT{
    VITAL?: RoundsFromChatGPT;
    SOAP?: SoapFromChatGPT;
}

const schema = `
export type Speaker = 'doctor' | 'patient';
export type Summary = {
  speaker: Speaker;
  text: string;
}[];
export type RoundsFromChatGPT = {
    TEMPERATURE?: number | null;
    PULSE?: number | null;
    BLOOD_PRESSURE_HIGH?: number | null;
    BLOOD_PRESSURE_LOW?: number | null;
    RESPIRATION?: number | null;
    SPO?: number | null;
  }
export type SoapFromChatGPT = {
  SUBJECTIVE?: string[] | null;
  OBJECTIVE?: string[] | null;
  ASSESSMENT?: string[] | null;
  PLAN?: string[] | null;
  SUMMARY?: Summary | null;
}
export interface SwipeFromChatGPT{
    VITAL?: RoundsFromChatGPT;
    SOAP?: SoapFromChatGPT;
}
`;

const model = createLanguageModel({
  OPENAI_MODEL: 'gpt-4o',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});

export const swipeTranslator = createJsonTranslator<SwipeFromChatGPT>(
  model,
  schema,
  'SwipeFromChatGPT',
);
