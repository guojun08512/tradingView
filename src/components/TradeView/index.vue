<template>
    <div class="table-modal">
      <el-table :data='infos' border style="width: 100%">
        <el-table-column prop="id" width='90' label="序号"></el-table-column>
        <el-table-column prop="name" width='90' label="合约名称"></el-table-column>
        <el-table-column prop="lasted" label="最新"></el-table-column>
        <el-table-column prop="dell" label="成交量" width='160'></el-table-column>
        <el-table-column prop="amount" label="涨幅"></el-table-column>
        <el-table-column prop="begin" label="开盘"></el-table-column>
        <el-table-column prop="highest" label="最高"></el-table-column>
        <el-table-column prop="lowest" label="最低"></el-table-column>
      </el-table>
    </div>
</template>

<script>
import socket from './socket/socket.js'
export default {
  data() {
    return {
      socket: new socket(),
      interval: null,
      lastTime: null,
      isLoading: true,
      infos: [],
      count: 0,
      pageCount: 0,
      curPage: 1,
    }
  },
  created() {
    this.socket.doOpen()
    this.socket.on('message', this.onMessage)
  },
  methods: {
    onMessage(data) {
      if (data.cmd === 'data') {
        console.log('data === ', JSON.parse(data.args))
        const msg = JSON.parse(data.args)
        this.infos.push(msg[0])
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../assets/css/common.styl'
</style>

