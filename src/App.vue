<template>
  <el-row type="flex" class="row-bg">
    <el-col :span="4" class="sidebar" v-show="!collapsed">
      <el-menu
        default-active="this.$route.path"
        :router="true"
        class="el-menu-vertical-demo"
        style="height: 100vh"
        active-text-color="#000000">
        <h4 style="text-align: center; cursor: pointer;" @click="goHome">单纳米通道智造平台</h4>
        <el-menu-item index="/Main1">
          <i class="fas fa-pen menu-icon"></i>
          <span slot="title" class="menu-title">单纳米通道尖端刻蚀仪</span>
        </el-menu-item>
        <el-menu-item index="/Main2">
          <i class="fas fa-box menu-icon"></i>
          <span slot="title" class="menu-title">单纳米通道自动封装仪</span>
        </el-menu-item>
        <el-menu-item index="/Main3">
          <i class="fas fa-lightbulb menu-icon"></i>
          <span slot="title" class="menu-title">单纳米通道自动抛光仪</span>
        </el-menu-item>
        <el-menu-item index="/Main4">
          <i class="fas fa-video menu-icon"></i>
          <span slot="title" class="menu-title">单纳米通道远程显示仪</span>
        </el-menu-item>
        <el-menu-item index="/Main5">
          <i class="fas fa-database menu-icon"></i>
          <span slot="title" class="menu-title">单纳米通道刻蚀数据库</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="getMainContentSpan" :style="mainContainerStyle" class="main-content">
      <el-main>
        <button @click="toggleCollapse" :class="['collapse-button', { 'collapsed': collapsed, 'expanded': !collapsed }]">
          <i class="fas fa-columns"></i>
        </button>
        <router-view></router-view>
        <button @click="toggleVideoBar" :class="['video-bar-toggle-button', { 'collapsed': showVideoBar, 'expanded': !showVideoBar }]">
          <i :class="showVideoBar ? 'fas fa-times' : 'fas fa-video'"></i>
        </button>
      </el-main>
    </el-col>
    <el-col v-if="showVideoBar" :span="12" class="video-bar">
      <!-- 视频栏内容 -->
      <div id="app">
        <div id="player-container">
          <video id="testVideo"></video>
          <canvas id="testCanvas"></canvas>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: white; /* 设置整个页面的背景颜色 */
}

.el-menu-item {
  cursor: pointer;
  padding-right: 60px; /* 设置右边距 */
  display: flex; /* 使图标和文字在一行 */
  align-items: center; /* 垂直居中对齐 */
}

.el-menu-item:hover {
  background-color: #e0e0e0;
}

.el-menu-item.is-active {
  background-color: #e0e0e0 !important; /* 设置选中项的背景色加深 */
}

.sidebar {
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  width: 16.6667%; /* 4/24 * 100% */
  height: 100vh; /* 使侧边栏覆盖整个视口高度 */
  background-color: white; /* 设置侧边栏背景色为白色 */
  overflow: auto; /* 使内容可滚动 */
}

.main-content {
  transition: margin-left 0.3s ease, width 0.3s ease; /* 添加左外边距和宽度过渡效果 */
  height: 100vh; /* 使主内容区覆盖整个视口高度 */
  background-color: #f9fafc; /* 设置背景色 */
  width: calc(100% - 16.6667%); /* 主内容宽度减去侧边栏的宽度 */
}

.collapse-button{
  position: fixed;
  left:8px;
  top: 8px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* 设置按钮宽度为矩形 */
  height: 50px; /* 设置按钮高度 */
  border-radius: 5px; /* 设置按钮为矩形 */
  border: none; /* 移除边框 */
  box-shadow: none; /* 移除阴影效果 */
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease; /* 添加背景色过渡效果 */
}
.video-bar-toggle-button {
  position: fixed;
  top: 8px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* 设置按钮宽度为矩形 */
  height: 50px; /* 设置按钮高度 */
  border-radius: 5px; /* 设置按钮为矩形 */
  border: none; /* 移除边框 */
  box-shadow: none; /* 移除阴影效果 */
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease; /* 添加背景色过渡效果 */
}

.collapse-button.collapsed,
.video-bar-toggle-button.expanded {
  background-color: #f9fafc;
}

.collapse-button.expanded,
.video-bar-toggle-button.collapsed {
  background-color: white;
}

.collapse-button:hover,
.video-bar-toggle-button:hover {
  background-color: #e0e0e0; /* 鼠标悬停时改变背景色 */
}

.collapse-button:focus,
.video-bar-toggle-button:focus {
  outline: none; /* 移除点击后焦点样式 */
}

.collapse-button i,
.video-bar-toggle-button i {
  font-size: 20px;
  color: #000; /* 设置图标颜色，使其在白色背景上可见 */
}
.collapse-button:active,
.video-bar-toggle-button:active {
  background-color: #c0c0c0; /* 点击时按钮背景色加深 */
}
.video-bar-toggle-button {
  right: 8px; /* 位置设置在右上角 */
}

/* 新增样式 */
.menu-icon {
  font-size: 16px; /* 确保所有图标大小一致 */
  line-height: 24px; /* 确保图标和文字在同一行 */
  vertical-align: middle; /* 垂直居中对齐 */
}

.menu-title {
  font-size: 16px; /* 调整字体大小 */
  font-weight: 500; /* 调整字体粗细 */
  color: #000000; /* 调整字体颜色 */
  line-height: 24px; /* 确保文字和图标在同一行 */
  vertical-align: middle; /* 垂直居中对齐 */
  flex-grow: 1; /* 使文字占满剩余空间 */
  text-align: right; /* 使文字靠右对齐 */
}

.video-bar {
  background-color: white; /* 设置视频栏背景色 */
  padding: 10px;
  width: 50vw; /* 视频栏宽度为50%视口宽度 */
  height: 100vh; /* 视频栏高度为100%视口高度 */
  position: fixed; /* 固定位置 */
  top: 0;
  right: 0; /* 靠右 */

}

#player-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#testVideo, #testCanvas {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

</style>
<script>
export default {
  data() {
    return {
      collapsed: false,
      showVideoBar: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initializePlayerControl();
    });
  },
  watch: {
    showVideoBar(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.initializePlayerControl();
        });
      }
    }
  },
  computed: {
    mainContainerStyle() {
      return {
        marginLeft: this.collapsed ? '0' : '16.6667%',
        width: this.collapsed
          ? (this.showVideoBar ? 'calc(100% - 50vw)' : '100%')
          : (this.showVideoBar ? 'calc(100% - 50vw - 16.6667%)' : 'calc(100% - 16.6667%)')
      };
    },
    getMainContentSpan() {
      return this.showVideoBar ? 12 : (this.collapsed ? 24 : 20);
    }
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    toggleVideoBar() {
      this.showVideoBar = !this.showVideoBar;
    },
    initializePlayerControl() {
      // 确保 PlayerControl.js 已加载
      if (window.PlayerControl) {
        console.log('PlayerControl is loaded');

        const videoElem = document.getElementById('testVideo');
        const canvasElem = document.getElementById('testCanvas');

        console.log('videoElem:', videoElem);
        console.log('canvasElem:', canvasElem);

        if (!videoElem || !canvasElem) {
          console.error('Video or canvas element not found');
          return;
        }

        const options = {
          wsURL: 'ws://192.168.4.100:80/rtspoverwebsocket',
          rtspURL: 'rtsp://admin:XH123456.@192.168.4.100:554/cam/realmonitor?channel=1&subtype=0',
          username: 'admin',
          password: 'XH123456.'
        };

        const player = new PlayerControl(options);

        player.init(canvasElem, videoElem);

        player.connect();
      } else {
        console.error('PlayerControl is not loaded');
      }
    }
  }
}
</script>

