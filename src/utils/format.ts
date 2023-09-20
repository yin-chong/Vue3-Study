/**
 * 时间格式化
 */
interface FORMATOBJ {
  'YYYYMMDD hh:mm:ss': string
}
function formatTime(time: Date, type: string = 'YYYYMMDD hh:mm:ss') {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let seconds = time.getSeconds();
    let m = String(month).padStart(2, '0');
    let d = String(day).padStart(2, '0');
    let h = String(hour).padStart(2, '0');
    let mm = String(minute).padStart(2, '0');
    let ss = String(seconds).padStart(2, '0');
    const formatObj: FORMATOBJ = {
        'YYYYMMDD hh:mm:ss': `${year}-${m}-${d} ${h}:${mm}:${ss}`
    };
    if (type in formatObj) {
        return formatObj[type];
      } else {
        throw new Error(`Unsupported format type: ${type}`);
      }
}

export {
    formatTime,
}