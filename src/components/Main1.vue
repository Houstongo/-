<template>
  <el-row :gutter="20">
    <h1 style="text-align: center;padding: 30px;font-family:微软雅黑">单纳米通道尖端刻蚀仪</h1>
    <div class="grid-content" style="text-align: center;padding: 30px">
      刻蚀深度：<el-input
      placeholder="um"
      v-model="depth">
    </el-input>
    </div>
    <div class="grid-content" style="text-align: center;padding: 30px">
      刻蚀时间：<el-input
      placeholder="ns"
      v-model="time">
    </el-input>
    </div>
    <div class="grid-content" style="text-align: center;padding: 30px">
      刻蚀数量：<el-input
      v-model="number">
    </el-input>
    </div>
    <div class="grid-content" style="text-align: center;padding: 30px">
      <div class="grid-content" style="text-align: center;padding: 30px">
        升降台高度：
        <el-button round @click="moveUp"><i class="el-icon-arrow-up"></i></el-button>
        <el-button round @click="moveDown"><i class="el-icon-arrow-down"></i></el-button>
      </div>
      <div class="grid-content" style="text-align: center;padding: 30px">
        旋转台位置：
        <el-button round @click="rotateClockwise"><i class="el-icon-refresh-right"></i></el-button>
        <el-button round @click="rotateCounterclockwise"><i class="el-icon-refresh-left"></i></el-button>
      </div>
      <div class="grid-content" style="text-align: center;padding: 30px">
        <el-button @click="sendData">Start</el-button>
      </div>
    </div>
  </el-row>
</template>

<script>
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';

export default {
  name: "Main1",
  data() {
    return {
      depth: '',
      time: '',
      number: '',
      websocket: null,
    }
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
      this.websocket = new WebSocket('ws://localhost:8002/');
      this.websocket.onopen = () => {
        console.log('WebSocket connected successfully.');
      };
      this.websocket.onmessage = (message) => {
        console.log('Received message:', message.data);
      };
      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      this.websocket.onclose = () => {
        console.log('WebSocket connection closed.');
      };
    },
    sendData() {
      console.log('sendData called');
      if (this.websocket.readyState === WebSocket.OPEN) {
        const data = {
          depth: this.depth,
          time: this.time,
          number: this.number,
        };

        // WebSocket 发送控制设备的数据
        this.websocket.send(JSON.stringify(data));
        console.log('Data sent via WebSocket:', data);

        // 将数据发送到后端，存储到 MySQL 数据库
        axios.post('http://localhost:3000/api/save-experiment', data)
          .then(response => {
            console.log('Data saved to database:', response.data);
            MessageBox.alert(JSON.stringify(data), '发送的数据', {
              confirmButtonText: '确定',
              callback: action => {
                Message({
                  type: 'info',
                  message: `操作结果: ${ action }`
                });
              }
            });
          })
          .catch(error => {
            console.error('Error saving data to database:', error);
            Message({
              type: 'error',
              message: 'Error saving data to database'
            });
          });
      } else {
        console.log('WebSocket is not connected.');
        Message({
          type: 'error',
          message: 'WebSocket is not connected.'
        });
      }
    },
    moveUp() {
      this.sendData('up');
    },
    moveDown() {
      this.sendData('down');
    },
    rotateClockwise() {
      this.sendData('rotate_clockwise');
    },
    rotateCounterclockwise() {
      this.sendData('rotate_counterclockwise');
    }
  }
}
</script>

<style scoped>

.el-input {
  width: 200px;
  text-align: center;
}

</style>
