const YM_ID = 104279599;
const TMR_ID = '3804920';

export const trackGoal = (goal: string) => {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (w.ym) w.ym(YM_ID, 'reachGoal', goal);
  if (w._tmr) w._tmr.push({ type: 'reachGoal', id: TMR_ID, goal });
};
