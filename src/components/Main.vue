<template>
  <div class="table-modal">
    <div class="content">
      <div class="title">中国股市</div>
      <el-table :data='infos' border style="width: 100%">
        <el-table-column type='index' width='90' label="序号"></el-table-column>
        <el-table-column prop="name" width='90' label="合约名称"></el-table-column>
        <el-table-column prop="lasted" label="最新"></el-table-column>
        <el-table-column prop="dell" label="成交量" width='160'></el-table-column>
        <el-table-column prop="amount" label="涨幅"></el-table-column>
        <el-table-column prop="begin" label="开盘"></el-table-column>
        <el-table-column prop="highest" label="最高"></el-table-column>
        <el-table-column prop="lowest" label="最低"></el-table-column>
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
        {
          name: '上证指数'
        },
        {
          name: '深证成指'
        },
        {
          name: '浦发银行'
        },
        {
          name: '中国核建'
        },
        {
          name: '航天信息'
        },
        {
          name: '特锐德'
        },
        {
          name: '万科A'
        },
        {
          name: '国农科技'
        },
        {
          name: 'PTA主力'
        },
        {
          name: '铁矿主力'
        },
        {
          name: '橡胶主力'
        },
        {
          name: '沥青主力'
        },
        {
          name: '螺纹主力'
        },
        {
          name: '原油主力'
        },
        {
          name: '沪金主力'
        },
        {
          name: '伦敦金'
        },
        {
          name: 'EUR/USD'
        },
        {
          name: ' GBP/USD'
        },
        {
          name: 'USD/JPY'
        },
        {
          name: 'USD/AUD'
        },
        {
          name: 'USD/CAD'
        },
        {
          name: 'USD/CHF'
        },
        {
          name: 'NZD/USD'
        },
        {
          name: '离岸CNH'
        },
        {
          name: '比特币'
        },
        {
          name: ' 恒生指数'
        },
        {
          name: ' 道指工业'
        },
        {
          name: '纳斯达克'
        },
        {
          name: '富时100'
        },
        {
          name: '日经225'
        }
      ],
      count: 0,
      pageCount: 0,
      curPage: 1
    }
  },
  created() {
    this.socket.doOpen()
    this.socket.on('message', this.onMessage)
    this.$nextTick(() => {
      let tbody =  document.getElementsByTagName('tbody')[0]
      var titleList = ["中国期货","国际外汇","数字货币","国际股市",]
      for (var j = 0; j < tbody.getElementsByTagName('tr').length; j++) {
        var div = document.createElement("div")
        div.className = 'title'
        if (j == 7) {
          div.innerText = titleList[0]
          tbody.getElementsByTagName('tr')[j].after(div)
        }
        if (j == 14) {
          div.innerText = titleList[1]
          tbody.getElementsByTagName('tr')[j].after(div)
        }
        if (j == 23) {
          div.innerText = titleList[2]
          tbody.getElementsByTagName('tr')[j].after(div)
        }
        if (j == 24) {
          div.innerText = titleList[3]
          tbody.getElementsByTagName('tr')[j].after(div)
        }
      }
    })
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
