/*
 * 用户网络状态检测
 * 应对情况: Android 小程序中 window.navigator.onLine 一直为 true
 * @Author: CntChen
 * @Date: 2018-11-19
 */

const us = window.navigator.userAgent;
const isMiniProgram = /miniProgram/i.test(ua) || window.__wxjs_environment === 'miniprogram';
const isAndroid = /android/i.test(ua);

const getNetworkStatusPromiseFun = (resolve) => {
  try {
    // 官方文档: https://developers.weixin.qq.com/miniprogram/dev/api/device/network/wx.getNetworkType.html
    // 文档有差异, 无网络下会进入 fail
    wx && wx.getNetworkType({
      success: (res) => {
        if (res.networkType === 'none') {
          resolve(false);
        } else {
          resolve(true);
        }
      },
      fail: (res) => {
        resolve(false);
      },
    })
  } catch (e) {
    resolve(true);
  }
}

export function getNetworkStatus() {
  return (isAndroid && isMiniProgram) ? new Promise(getNetworkStatusPromiseFun) : Promise.resolve(window.navigator.onLine);
}

export default {
  getNetworkStatus,
}
