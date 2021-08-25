/**
 * 防抖函数
 * @param func
 * @param delay
 * @returns {(function(...[*]=): void)|*}
 */
export function debounce (func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数-》多久执行一次
 * @param func
 * @param wait
 * @returns {(function(...[*]): void)|*}
 */
export function throttle (func, wait) {
  // 上次函数执行的时间
  let previous = +new Date()
  return function (...args) {
    let now = +new Date()
    // 将当前执行时间的函数与上一次执行函数的时间previous对比
    if (now - previous > wait) {
      previous = now
      func.apply(this, ...args)
    }
  }
}

// throttle-》demo
// const logFunc = throttle(() => console.log('throttle-run'), 5000)
// setInterval(logFunc, 10)

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

