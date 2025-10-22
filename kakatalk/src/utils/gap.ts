import { resWidth } from './dimensions';

const GAP_MAP = {
  xs_4: 4,
  s_8: 8,
  m_12: 12,
  l_16: 16,
  xl_20: 20,
  xxl_24: 24,
} as const;

const GAP = Object.freeze(
  Object.fromEntries(
    Object.entries(GAP_MAP).map(([key, value]) => [key, resWidth(value)]),
  ) as Record<keyof typeof GAP_MAP, number>,
);

export default GAP;
