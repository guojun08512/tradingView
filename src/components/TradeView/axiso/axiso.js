import Axios from 'axios'
const root = 'http://192.144.141.51:8000'
class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    this.queue = {}
  }
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  interceptors (instance, url) {
    instance.interceptors.response.use((res) => {
      let { data } = res
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
        }, 500)
      }
      if (data.code !== 200) {
        return data
      }
      return data
    }, (error) => {
      return Promise.reject(error)
    })
  }
  create (token) {
    let conf = {
      baseURL: root,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    return Axios.create(conf)
  }
  mergeReqest (instances = []) {
  }
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
const axios = new HttpRequest()
export default axios
