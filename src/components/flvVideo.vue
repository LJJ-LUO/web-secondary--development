<template>
  <div class="live_box">
    <video :id="videoID" class="centeredVideo"></video>
  </div>
</template>

<script>
import mpegtFlvs from "mpegts.js";
export default {
  name: "flvVideo",
  props: {
    mettItem: Object,
    videoID: String,
  },

  data: function () {
    return {
      // 直播数据
      videoItemsId: "",
      videoLive: {}, // video标签
      mpegtsPlayer: null, // flv对象
    };
  },

  destroyed() {
    this.mpegts_destroy();
  },
  methods: {
    // 初始化直播窗口
    initMpegts() {
      if (mpegtFlvs.isSupported()) {
        this.videoLive = {};
        this.mpegtsPlayer = null;
        // this.videoLive = this.$refs.videoLive;
        this.videoLive = document.getElementById(this.videoID);
        mpegtFlvs.LoggingControl.forceGlobalTag = true;
        this.mpegtsPlayer = mpegtFlvs.createPlayer(
          {
            type: "flv",
            isLive: true,
            url: this.mettItem.video_url,
          },
          {
            autoCleanupSourceBuffer: true, // 是否自动清理缓存
          }
        );

        this.mpegtsPlayer.attachMediaElement(this.videoLive);
        this.mpegtsPlayer.load();
        this.mpegtsPlayer.play();

        if (this.videoLive.paused === true) {
          this.mpegtsPlayer.unload();
          this.mpegtsPlayer.detachMediaElement();
        }

        // 监听错误事件
        this.mpegtsPlayer.on(mpegtFlvs.Events.ERROR, (err, errdet) => {
          // 参数 err 是一级异常，errdet 是二级异常
          if (err == mpegtFlvs.ErrorTypes.MEDIA_ERROR) {
            console.log("媒体错误");
            if (this.mpegtsPlayer) this.mpegts_destroy();
            if (errdet == mpegtFlvs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
              console.log("媒体格式不支持");
              if (this.mpegtsPlayer) this.mpegts_destroy();
            }
          }
          if (err == mpegtFlvs.ErrorTypes.NETWORK_ERROR) {
            console.log("网络错误");
            if (this.mpegtsPlayer) this.mpegts_destroy();
            if (errdet == mpegtFlvs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
              console.log("http状态码异常");
              if (this.mpegtsPlayer) this.mpegts_destroy();
            }
          }
          if (err == mpegtFlvs.ErrorTypes.OTHER_ERROR) {
            console.log("其他异常：", errdet);
            if (this.mpegtsPlayer) this.mpegts_destroy();
          }
        });
      }
    },
    // 销毁flv
    mpegts_destroy() {
      if (this.videoLive.paused === false) {
        this.mpegtsPlayer.pause();
        this.mpegtsPlayer.unload();
        this.mpegtsPlayer.detachMediaElement();
      }
      if (this.mpegtsPlayer != null) this.mpegtsPlayer.destroy();
      this.mpegtsPlayer = null;
      this.videoLive = {};
    },
    mpegtsClick() {
      if (this.videoLive.paused === true) {
        // 已断流，重新拉流播放
        this.mpegtsPlayer.attachMediaElement(this.videoLive);
        this.mpegtsPlayer.load();
        this.mpegtsPlayer.play();
      } else {
        this.mpegtsPlayer.unload();
        this.mpegtsPlayer.detachMediaElement();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.live_box {
  width: 100%;
  height: 100%;
  .centeredVideo {
    pointer-events: none;
    display: block;
    width: 100%;
    height: 100%;
    background: #333;
  }
  /* 控件 */
  video::-webkit-media-controls-enclosure {
    display: none;
  }
  /* 进度条 */
  video::-webkit-media-controls-timeline {
    display: none;
  }
  video::-webkit-media-controls-current-time-display {
    display: none;
  }
  /* 音量按钮 */
  video::-webkit-media-controls-mute-button {
    display: none;
  }
  /* 音量的控制条 */
  video::-webkit-media-controls-volume-slider {
    display: none;
  }
  /*  播放按钮 */
  video::-webkit-media-controls-play-button {
    display: none;
  }
  video::-webkit-media-controls-toggle-closed-captions-button {
    display: none;
  }
}
</style>
