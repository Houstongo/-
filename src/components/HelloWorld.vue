<template>
  <el-row type="flex" class="row-bg">
    <el-col :span="3">

      <el-menu
        default-active="this.$route.path"
        :router='true'
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        style="height: 1050px">
        <h5 style="text-align: center">人工智能自动化纳米孔制备平台</h5>
        <el-menu-item  index='/Main1'>
          <i class="el-icon-location"></i>
          <span slot="title">步骤一</span>
        </el-menu-item>
        <el-menu-item index='/Main2'>
          <i class="el-icon-menu"></i>
          <span slot="title">步骤二</span>
        </el-menu-item>
        <el-menu-item index='/Main3'>
          <i class="el-icon-document"></i>
          <span slot="title">步骤三</span>
        </el-menu-item>
        <el-menu-item index='/Main4'>
          <i class="el-icon-setting"></i>
          <span slot="title">步骤四</span>
        </el-menu-item>
      </el-menu>

    </el-col>
    <el-col :span="21">
      <el-main>
      </el-main>
    </el-col>
  </el-row>
</template>

<style>

</style>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
