/**
 * rtsp{intl.get('COMM.LSVP')}
 */
import intl from 'react-intl-universal';
import { message } from 'antd';

export function playRTSP() {
  let rtspActiveX = document.h3c_IMOS_ActiveX;

  if (rtspActiveX) {
    if (rtspActiveX.IMOSAX_InitOCX) {
      let url = rtspActiveX.getAttribute('rtspurl');
      let reg = /rtsp:\/\/([^/:]+):?(\d*)@?([^/:]+):?(\d*)/;
      let params = url.match(reg);

      if (!params) {
        return message.error(intl.get('analysis.model.video.rtsp.login.err'));
      }

      // {intl.get('COMM.PIL')}
      // 1 {intl.get('ASS.USER_NAME')} 2 密码 3 ip地址 4 端口号
      const isLogin = rtspActiveX.IMOSAX_InitOCX(
        params[3],
        params[4],
        params[1],
        params[2],
        1
      );

      if (isLogin !== 0) {
        return message.error(
          `${intl.get('analysis.model.video.rtsp.service.err')}：${isLogin}`
        );
      }

      rtspActiveX.IMOSAX_ChangeLayout('1');

      // {intl.get('COMM.PLAY_VIDEO')}
      const flag = rtspActiveX.IMOSAX_StartFrameLive(1, 'DAHUA22');
      if (flag !== 0) {
        return message.error(
          `${intl.get('analysis.model.video.rtsp.device.err')}：${flag}`
        );
      }
    } else {
      message.error(intl.get('analysis.model.video.rtsp.activeX.err'));
    }
  }
}
