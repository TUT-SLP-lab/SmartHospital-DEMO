export const EXPERIMENT_EVAL_KEY = {
  MODI_SYNC: 'MODI_SYNC',
  REF_SYNC: 'REF_SYNC',
  USING_CHAT_GPT: 'USING_CHAT_GPT',
  MANUAL_INPUT: 'MANUAL_INPUT',
  SIMPLE_VOICE_INPUT: 'SIMPLE_VOICE_INPUT',
} as const;

export const EXPERIMENT_EVAL_KEYS = Object.values(EXPERIMENT_EVAL_KEY);

export interface ExperimentEval {
  easeOfUse: number;
  time: number;
}

export const EXPERIMENT_TARGET_PATH = {
  MODI_SYNC: '/experiment/modi-sync',
  REF_SYNC: '/experiment/ref-sync',
  USING_CHAT_GPT: '/experiment/using-chat-gpt',
  MANUAL_INPUT: '/experiment/manual-input',
  SIMPLE_VOICE_INPUT: '/experiment/simple-voice-input',
} as const;

export const EXPERIMENT_TARGET_PATHS = Object.values(EXPERIMENT_TARGET_PATH);
