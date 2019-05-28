<template>
  <div class="table-modal">
    <div class="content">
      <el-table :data='infos' border style="width: 100%">
        <el-table-column width='80' label="序号" prop='id'></el-table-column>
        <el-table-column width='90' label="名称" prop='name'>
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="最新">
          <template slot-scope="scope">
            {{ scope.row.lasted ? scope.row.lasted : '-'  }}
          </template>
        </el-table-column>
        <el-table-column label="成交量" width='160'>
          <template slot-scope="scope">
            {{ scope.row.deal ? scope.row.deal : '-' }}
          </template> 
        </el-table-column>
        <el-table-column width='120' label="涨幅">
          <template slot-scope="scope">
            {{ scope.row.amount ? scope.row.amount : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="开盘">
          <template slot-scope="scope">
            {{ scope.row.open ? scope.row.open : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="最高">
          <template slot-scope="scope">
            {{ scope.row.highest  ? scope.row.highest : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="最低">
          <template slot-scope="scope">
            {{ scope.row.lowest ? scope.row.lowest : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="">
            <template slot-scope="scope">
              <el-button type="text"
                @click="handleHistory(scope.$index, scope.row)">下载历史数据</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import socket from './TradeView/socket/socket'
export default {
  data() {
    return {
      socket: new socket(),
      interval: null,
      lastTime: null,
      isLoading: true,
      infos: [
      ],
      count: 0,
      pageCount: 0,
      curPage: 1, 

      titleList: ["中国股市", "中国期货","国际外汇","数字货币","国际股市"],
      createTitle: [] 
    }
  },
  mounted () {
    this.$set(this.infos, 'e', 0)
    // this.onMessage()
    this.$api.get('http://39.105.138.26:8000/v1/stock/alldata').then(res => {
      this.infos = res.data.data.data
      this.$nextTick(() => {
        this.fun()
      })
    })
    // this.$api.get('http://127.0.0.1:8000/v1/stock/alldata').then(res => {
    //   this.infos = res.data.data.data
    //   this.$nextTick(() => {
    //     this.fun()
    //   })
    // })
  },
  created() {
    this.tips()
    this.socket.doOpen()
    this.socket.on('message', this.onMessage)
    this.$nextTick(() => {
      this.fun()
    })
  },
  methods: {
    onMessage(data) {
      if (data.cmd === 'data') {
        const msg = JSON.parse(data.args)
        this.infos = msg
        this.$nextTick(() => {
          this.fun()
        })
      }
    },
    handleHistory(index, row) {
      console.log('ttt', index, row)
    },
    tips() {
      const USER_AGENT = navigator.userAgent.toLowerCase()
      const isIE = /.*(ie)\/([\w.]+).*/
      if (isIE.test(USER_AGENT)) {
        this.$message('您的浏览器版本太低，请更换使用浏览器，例如：chrome ...')
      }
    },
    fun(){
      let tbody =  document.getElementsByTagName('tbody')[0]
      var title = document.querySelectorAll('.title')
      const titleList = this.titleList
      for (var j = 0; j < tbody.getElementsByTagName('tr').length; j++) {
        var div = document.createElement("div")
        div.className = 'title'
        if (j == 0 && this.createTitle[0] !== titleList[0]) {
          div.innerText = titleList[0]
          tbody.getElementsByTagName('tr')[j].before(div)
          this.createTitle[0] = titleList[0]
        }
        if (j == 8 && this.createTitle[1] !== titleList[1]) {
          div.innerText = titleList[1]
          tbody.getElementsByTagName('tr')[j].before(div)
          this.createTitle[1] = titleList[1]
        }
        if (j == 15 && this.createTitle[2] !== titleList[2]) {
          div.innerText = titleList[2]
          tbody.getElementsByTagName('tr')[j].before(div)
          this.createTitle[2] = titleList[2]
        }
        if (j == 24 && this.createTitle[3] !== titleList[3]) {
          div.innerText = titleList[3]
          tbody.getElementsByTagName('tr')[j].before(div)
          this.createTitle[3] = titleList[3]
        }
        if (j == 25 && this.createTitle[4] !== titleList[4]) {
          div.innerText = titleList[4]
          tbody.getElementsByTagName('tr')[j].before(div)
          this.createTitle[4] = titleList[4]
        }
      }
    }
  }
}
</script>
