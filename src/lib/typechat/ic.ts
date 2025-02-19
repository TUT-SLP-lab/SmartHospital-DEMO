import { createJsonTranslator, createLanguageModel } from 'typechat';

export type Speaker = 'doctor' | 'patient';
export type Summary = {
  speaker: Speaker;
  text: string;
}[];

export interface ICFromChatGPT {
  SUMMARY?: Summary | null;
}

const schema = `
export type Speaker = 'doctor' | 'patient';
export type Summary = {
  speaker: Speaker;
  text: string;
}[];
export interface ICFromChatGPT {
  SUMMARY?: Summary | null;
}
`;

const model = createLanguageModel({
  OPENAI_MODEL: 'gpt-4o',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});

export const icTranslator = createJsonTranslator<ICFromChatGPT>(
  model,
  schema,
  'ICFromChatGPT',
);
