export const isRecord = (record: unknown): record is Record<string, unknown> =>
  typeof record === 'object' && record !== null;
