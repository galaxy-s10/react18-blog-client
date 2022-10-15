/** 模拟ajax请求 */
export const mockAjax = (flag?: boolean) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (flag) {
        resolve({
          code: 200,
          data: {
            id: 1,
            name: '张三',
            age: 18,
            token: Math.random(),
          },
        });
      } else {
        rejected({
          code: 400,
          msg: '请求失败',
        });
      }
    }, 500);
  });
};

/**
 * 获取日期当天的开始时间到结束时间
 */
export function dateStartAndEnd(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  // eslint-disable-next-line
  const startTime = `${y}-${m}-${d} 00:00:00`;
  // eslint-disable-next-line
  const endTime = `${y}-${m}-${d} 23:59:59`;
  return {
    startTime,
    endTime,
  };
}

// 解析ip
export const parseIpInfo = (ipInfo) => {
  if (ipInfo.province.length <= 0) {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const str = `${ipInfo.province} - ${ipInfo.city}`;
  return str;
};
