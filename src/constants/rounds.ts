export const ROUNDS_ITEMS = {
  /* 体調 **/
  TEMPERATURE: 'TEMPERATURE',
  /* 脈拍 **/
  PULSE: 'PULSE',
  /* 血圧上 **/
  BLOOD_PRESSURE_HIGH: 'BLOOD_PRESSURE_HIGH',
  /* 血圧下 **/
  BLOOD_PRESSURE_LOW: 'BLOOD_PRESSURE_LOW',
  /* 呼吸回数 **/
  RESPIRATION: 'RESPIRATION',
  /* 補足 **/
  NOTE: 'NOTE',
  /* 酸素飽和度 (オプショナル) **/
  SPO2: 'SPO2',
} as const;

export type ROUNDS_ITEM = (typeof ROUNDS_ITEMS)[keyof typeof ROUNDS_ITEMS];

export const ROUNDS_ITEM_LABEL = {
  TEMPERATURE: '体温',
  PULSE: '脈拍',
  BLOOD_PRESSURE_HIGH: '血圧上',
  BLOOD_PRESSURE_LOW: '血圧下',
  RESPIRATION: '呼吸数',
  NOTE: '補足',
  SPO2: 'SPO2',
} as const satisfies Record<ROUNDS_ITEM, string>;

export const ROUNDS_ITEM_LABELS = Object.values(ROUNDS_ITEM_LABEL);

/*export const ROUNDS_ITEM_UNITS = {
  TEMPERATURE: '度',
  PULSE: '回/分',
  BLOOD_PRESSURE_HIGH: 'mmHg',
  BLOOD_PRESSURE_LOW: 'mmHg',
  RESPIRATION: '回/分',
  SPO2: '%',
} as const satisfies Record<ROUNDS_ITEM, string>;*/

export const ROUNDS_ITEM_LABEL_WITH_UNIT = {
  TEMPERATURE: `${ROUNDS_ITEM_LABEL.TEMPERATURE}`,
  PULSE: `${ROUNDS_ITEM_LABEL.PULSE}`,
  BLOOD_PRESSURE_HIGH: `${ROUNDS_ITEM_LABEL.BLOOD_PRESSURE_HIGH}`,
  BLOOD_PRESSURE_LOW: `${ROUNDS_ITEM_LABEL.BLOOD_PRESSURE_LOW}`,
  RESPIRATION: `${ROUNDS_ITEM_LABEL.RESPIRATION}`,
  NOTE: `${ROUNDS_ITEM_LABEL.NOTE}`,
  SPO2: `${ROUNDS_ITEM_LABEL.SPO2}`, // (${ROUNDS_ITEM_UNITS.SPO2})
} as const satisfies Partial<Record<ROUNDS_ITEM, string>>; // SPO2をオプショナルにする
