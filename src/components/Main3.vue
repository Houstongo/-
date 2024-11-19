<template>
  <div>
  <el-row>
    <h1 style="text-align: center;padding: 30px;font-family:微软雅黑">单纳米通道自动抛光仪</h1>
    <el-container class="white-background">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-col :span="8" v-for="i in 6" :key="i">
            <el-button type="primary" circle>{{ i }}</el-button>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" v-for="i in range(7, 12)" :key="i">
            <el-button type="primary" circle>{{ i }}</el-button>
          </el-col>
        </el-col>

      </el-row>
    </el-container>
  </el-row>
  <el-row>
    <el-col :span="10">
      <div class="direction-pad">
        <div class="triangle up" @click="move('up')"></div>
        <div class="triangle right" @click="move('right')"></div>
        <div class="triangle down" @click="move('down')"></div>
        <div class="triangle left" @click="move('left')"></div>
        <el-button class="center-button" type="primary" plain>{{ centerNumber }}</el-button>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="el-start">
        <el-button circle type="primary" class="el-start">开始</el-button>
      </div>

    </el-col>
    <el-col :span="10">
      <div class="direction-pad">
        <div class="triangle up" @click="move('up')"></div>
        <div class="triangle right" @click="move('right')"></div>
        <div class="triangle down" @click="move('down')"></div>
        <div class="triangle left" @click="move('left')"></div>
        <el-button class="center-button" type="primary" plain icon="el-icon-location-outline"></el-button>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    // 创建一个方法来生成数字范围数组
    range(start, end) {
      const length = end - start + 1;
      return Array.from({ length }, (_, i) => start + i);
    },
  },
  data() {
    return {
      centerNumber: 1,
    };
}
};
</script>

<style scoped>
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  cursor: pointer;
  filter: drop-shadow(1px 1px 3px black);

}
.el-start{
  text-align: center;
  margin-top: 50px;
}
.white-background {
  background-color: white; /* 设置白色背景 */
  padding: 20px; /* 根据需要调整内边距 */
  height: 330px;
 margin-bottom: 50px;
}

.el-button {
  width: 100px; /* 按钮宽度设置为100%，以填满el-col */
  height: 100px;
  margin: 20px 0; /* 按钮间垂直间距 */
  margin-left: 0px;
  font-size: 24px;
  font-family: Bahnschrift;
  box-shadow: 2px 2px  5px  black;
}
.direction-pad {
  position: relative;
  width: 100%; /* 适当调整以适应您的布局 */
  height: 220px; /* 适当调整以适应您的布局 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

}

.center-button {
  height: 100px;
  width: 100px;
  z-index: 1;
}

/* 将这些值调整为适当的距离，使得按钮之间的距离相等 */
.up {
  border-width: 40px 30px 40px 30px;
  border-color: transparent transparent #409EFF transparent;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
}

.right {
  border-width: 30px 40px 30px 0;
  border-color: transparent #409EFF transparent transparent;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(-170px) rotate(180deg);
}

.down {
  border-width: 40px 30px 40px 30px;
  border-color: #409EFF transparent transparent transparent;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
}

.left {
  border-width: 30px 0 30px 40px;
  border-color: transparent transparent transparent #409EFF;
  top: 50%;
  left: 0;
  transform: translateY(-50%) translateX(170px) rotate(180deg);

}
</style>
