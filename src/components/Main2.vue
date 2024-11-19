<template>
  <div>
  <el-row :gutter="40">
    <h1 style="text-align: center;padding: 30px;font-family:微软雅黑">单纳米通道自动封装仪</h1>
    <el-col :span="8"><div class="grid-content bg-purple"><h2 style="text-align: center;padding:20px;font-family:微软雅黑">升降系统控制台</h2>
      <div class="icon-container">
        <i class="el-icon-sort icon-large"></i>
      </div>
      <div class="grid-content" style="text-align: center;padding: 30px">
      <el-button @click="moveUp" icon="el-icon-bottom icon-medium" circle></el-button>
        <el-input el v-model="v1" placeholder="速度"></el-input>
      <el-button @click="moveDown" icon="el-icon-top icon-medium" circle></el-button>
      </div>
      <div class="grid-content" style="text-align: center;padding: 30px;">
      <el-button @click="positionheight" class="wide-button" icon="el-icon-location-outline" round>定位</el-button>
      </div>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"><h2 style="text-align: center;padding:20px;font-family:微软雅黑">旋转系统控制台</h2>
      <div class="icon-container">
        <i class="el-icon-refresh icon-large"></i>
      </div>
      <div class="grid-content" style="text-align: center;padding: 30px">
        <el-button @click="rotateClockwise"  icon="el-icon-refresh-right icon-medium" circle></el-button>
        <el-input el v-model="v2" placeholder="速度"></el-input>
        <el-button @click="rotateCounterclockwise" icon="el-icon-refresh-left icon-medium" circle></el-button>
      </div>
      <div class="grid-content" style="text-align: center;padding: 30px;">
        <el-button @click="positionrotate" class="wide-button" icon="el-icon-location-outline" round>定位</el-button>
      </div>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"><h2 style="text-align: center;padding:20px;font-family:微软雅黑">封装设置</h2>
      <div class="icon-container">
        <i class="el-icon-bottom icon-large"></i>
      </div>
      <div class="grid-content" style="text-align: center;padding: 30px">
        封装长度：<el-input
        placeholder="um"
        v-model="length">
      </el-input>
      </div>
      <div class="grid-content" style="text-align: center;padding: 30px">
        封装速度：<el-input
        placeholder="um/s"
        v-model="speed">
      </el-input>
      </div>
    </div></el-col>
  </el-row>
  <el-row style="text-align: center;padding: 75px">
    <el-switch
      style='zoom:1.6;'
      v-model="value1"
      active-text="封装开始"
      inactive-text="封装暂停">
    </el-switch>
<!--    <div class="grid-content" style="text-align: center;padding: 30px">-->
<!--      <el-button @click="sendData">Start</el-button>-->
<!--    </div>-->
  </el-row>
  </div>
</template>

<style>
input::placeholder {
  text-align: center;
}
input {
  text-align: center;
}
.el-input {
  width: 160px;

  text-align: center;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
  min-height: 540px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
}
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* 如果需要，可以设置容器的宽度和高度 */
  width: 100%; /* 根据实际需要调整 */
  height: 120px; /* 根据实际需要调整 */
  padding-bottom: 40px;
}

.icon-large {
  font-size: 50px; /* 设置图标大小 */
}
.icon-medium {
  font-size: 15px; /* 设置图标大小 */
}
.wide-button {
  width: 160px; /* 或者你需要的任何宽度 */
  font-weight: bold;
}
</style>
<script>
import {Message, MessageBox} from "element-ui";

export default {
  data() {
    return {
      length: '', // 初始值
      speed:'',
      v1:'',
      v2:'',
      value1: false
    };
  },
  mounted() {
    this.connect();
  },
  beforeDestroy() {
    if (this.websocket) {
      this.websocket.close();
    }
  },
  methods: {
    connect() {
      this.websocket = new WebSocket('ws://192.168.4.100:80/');
      // this.websocket = new WebSocket('ws://localhost:8002/');
      this.websocket.onopen = () => {
        console.log('WebSocket connected successfully.'); // 连接成功
        // 可以在这里发送一个初始化消息或执行其他逻辑
      };
      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error); // 连接遇到错误
      };
      this.websocket.onclose = () => {
        console.log('WebSocket connection closed.'); // 连接关闭
      };
      // 完成后设备向中控发送信号 开关自动关闭
      this.websocket.onmessage = (message) => {
        console.log('Received message:', message.data);
        const data = JSON.parse(message.data);
        // 假设设备发送的完成指令是 { status: "done" }
        if (data.status === 'done') {
          console.log('finish')
          this.value1 = false; // 设置开关为关闭状态
        }
      };
    },
    sendData(command) {
      console.log('sendData called');
      if (this.websocket.readyState === WebSocket.OPEN) {
        const command = this.value1 ? 'start' : 'stop';
        // this.websocket.send(JSON.stringify({ command })); // 发送命令
        //这里注意 明天该//
        //命令先传递了 会先传回来·命令而不是数据//
        console.log('Command sent:', command);
        // 可选：发送其他数据
        const data = {
          length: this.length,
          speed: this.speed
        };
        if (command ==='start') {
          this.websocket.send(JSON.stringify(data));
          console.log('Data sent:', data);
          // this.sendCommand('start');// 开始
          // 显示消息框
          MessageBox.alert(JSON.stringify(data), '发送的数据', {
              confirmButtonText: '确定',
              callback: action => {
                Message({
                  type: 'info',
                  message: `操作结果: ${action}`
                });
              },
            }
          );
        }
        else{
          console.log('Manba Out');
        }
      } else {
        console.log('WebSocket is not connected.');
        // 如果WebSocket未连接，也给出反馈
        Message({
          type: 'error',
          message: 'WebSocket is not connected.'
        });
      }
    },
    moveUp() {
      this.sendData('up');//升降系统向上
    },
    moveDown() {
      this.sendData('down');//升降系统向下
    },
    rotateClockwise() {
      this.sendData('rotate_clockwise');
    },// 旋转台顺时针转
    rotateCounterclockwise() {
      this.sendData('rotate_counterclockwise');
    },// 旋转逆时针转
    positionheight() {
      this.sendData('positionheight');
    },//升降台定位
    positionrotate() {
      this.sendData(' positionrotate');
    },//旋转台定位
},

  watch: {
    value1(newValue) {
      const command = newValue ? 'start' : 'stop';
      this.sendData(command); // 直接发送命令
    },
  },

};
</script>
