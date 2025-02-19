import { createLanguageModel, createJsonTranslator } from 'typechat';

// TODO: ファイル読み込みはうまくいかなかったので変更
export interface RoundsFromChatGPT {
  TEMPERATURE?: number | null;
  PULSE?: number | null;
  BLOOD_PRESSURE_HIGH?: number | null;
  BLOOD_PRESSURE_LOW?: number | null;
  RESPIRATION?: number | null;
  SPO?: number | null;
  NOTE?: string | null;
}

const schema = `
export interface RoundsFromChatGPT {
  TEMPERATURE?: number | null;
  PULSE?: number | null;
  BLOOD_PRESSURE_HIGH?: number | null;
  BLOOD_PRESSURE_LOW?: number | null;
  RESPIRATION?: number | null;
  SPO?: number | null;
  NOTE?: string | null;
}
`;

const model = createLanguageModel({
  OPENAI_MODEL: 'gpt-3.5-turbo',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});

export const translator = createJsonTranslator<RoundsFromChatGPT>(
  model,
  schema,
  'RoundsFromChatGPT',
);
