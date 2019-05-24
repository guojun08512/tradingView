<template>
    <div class="table-modal">
      <el-container>
        <el-header>猎数中国</el-header>
        <el-main>
          <Main></Main>
        </el-main>
        <el-footer>
          <p>联系方式(qq:xxxx, 微信:xxxx) 版权备案</p>
        </el-footer>
      </el-container>
      <!-- <el-table :data='infos' border style="width: 100%">
        <el-table-column prop="id" width='90' label="序号"></el-table-column>
        <el-table-column prop="name" width='90' label="合约名称"></el-table-column>
        <el-table-column prop="lasted" label="最新"></el-table-column>
        <el-table-column prop="dell" label="成交量" width='160'></el-table-column>
        <el-table-column prop="amount" label="涨幅"></el-table-column>
        <el-table-column prop="begin" label="开盘"></el-table-column>
        <el-table-column prop="highest" label="最高"></el-table-column>
        <el-table-column prop="lowest" label="最低"></el-table-column>
      </el-table> -->
    </div>
</template>

<script>
import Main from '../Main.vue'
import socket from './socket/socket.js'
export default {
  components: {
    Main
  }
}
</script>
<style lang='stylus' scoped>
@import './index.styl'
</style>

