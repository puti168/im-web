import moment from 'moment';

const initVal = init();

export function formateTime(time: number | string): string {
  time = typeof time === 'number' ? time : new Date(time).getTime();
  return moment(time).utcOffset(initVal).format('YYYY-MM-DD HH:mm:ss');
}

export function formateTimeDate(time: number): string {
  time = typeof time === 'number' ? time : new Date(time).getTime();
  return moment(time).utcOffset(initVal).format('YYYY-MM-DD');
}

function init() {
  const offset = new Date() + '';
  let offsetGMT = offset.indexOf('GMT');
  let offsetGMTSub = offset.substring(offsetGMT + 3, offsetGMT + 8);
  return offsetGMTSub;
}
