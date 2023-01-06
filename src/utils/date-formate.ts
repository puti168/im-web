import moment from 'moment';

const initVal = init();

export function formateTime(time: number): string {
  return moment(time).utcOffset(initVal).format('YYYY-MM-DD HH:mm:ss');
}

export function formateTimeDate(time: number): string {
  return moment(time).utcOffset(initVal).format('YYYY-MM-DD');
}

function init() {
  const offset = new Date() + ''; //将时间格式转为字符串
  let offsetGMT = offset.indexOf('GMT');
  let offsetGMTSub = offset.substring(offsetGMT + 3, offsetGMT + 8);
  return offsetGMTSub; //给了你定义的一个字段，在拿到数据后使用
}
