export type Status = typeof STATUS[keyof typeof STATUS];

export const STATUS = {
  SETTLED: "settled",
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
  NULL: null
};