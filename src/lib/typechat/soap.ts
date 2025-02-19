import { createJsonTranslator, createLanguageModel } from 'typechat';

export type Speaker = 'doctor' | 'patient';
export type Summary = {
  speaker: Speaker;
  text: string;
}[];

export interface SOAPFromChatGPT {
  SUBJECTIVE?: string[] | null;
  OBJECTIVE?: string[] | null;
  ASSESSMENT?: string[] | null;
  PLAN?: string[] | null;
  SUMMARY?: Summary | null;
}

const schema = `
export type Speaker = 'doctor' | 'patient';
export type Summary = {
  speaker: Speaker;
  text: string;
}[];
export interface SOAPFromChatGPT {
  SUBJECTIVE?: string[] | null;
  OBJECTIVE?: string[] | null;
  ASSESSMENT?: string[] | null;
  PLAN?: string[] | null;
  SUMMARY?: Summary | null;
}
`;

const model = createLanguageModel({
  OPENAI_MODEL: 'gpt-4o',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});

export const soapTranslator = createJsonTranslator<SOAPFromChatGPT>(
  model,
  schema,
  'SOAPFromChatGPT',
);
