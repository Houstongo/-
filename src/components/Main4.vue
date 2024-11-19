<!--<template>-->
<!--  <div id="app">-->
<!--    <h1>Vue H5Player Example</h1>-->
<!--    <div id="player-container">-->
<!--      <video id="testVideo"></video>-->
<!--      <canvas id="testCanvas"></canvas>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'App',-->
<!--  mounted() {-->
<!--    this.initializePlayerControl();-->
<!--  },-->
<!--  methods: {-->
<!--    initializePlayerControl() {-->
<!--      // 确保 PlayerControl.js 已加载-->
<!--      if (window.PlayerControl) {-->
<!--        console.log('PlayerControl is loaded');-->

<!--        const videoElem = document.getElementById('testVideo');-->
<!--        const canvasElem = document.getElementById('testCanvas');-->

<!--        console.log('videoElem:', videoElem);-->
<!--        console.log('canvasElem:', canvasElem);-->

<!--        if (!videoElem || !canvasElem) {-->
<!--          console.error('Video or canvas element not found');-->
<!--          return;-->
<!--        }-->

<!--        const options = {-->
<!--          wsURL: 'ws://192.168.4.100:80/rtspoverwebsocket',-->
<!--          rtspURL: 'rtsp://admin:XH123456.@192.168.4.100:554/cam/realmonitor?channel=1&subtype=0',-->
<!--          username: 'admin',-->
<!--          password: 'XH123456.'-->
<!--        };-->

<!--        const player = new PlayerControl(options);-->

<!--        player.init(canvasElem, videoElem);-->

<!--        player.connect();-->
<!--      } else {-->
<!--        console.error('PlayerControl is not loaded');-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--#player-container {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  width: 100vw;-->
<!--  height: 100vh;-->
<!--  overflow: hidden;-->
<!--}-->

<!--#testVideo, #testCanvas {-->
<!--  max-width: 100%;-->
<!--  max-height: 100%;-->
<!--  width: auto;-->
<!--  height: auto;-->

<!--}-->
<!--</style>-->
