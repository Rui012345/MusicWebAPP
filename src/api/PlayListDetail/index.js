import axios from '../api'

// 加random的作用是使得get请求不走缓存。
export const getPlayListDetail = id => axios.get('/playlist/detail', {
  params: {
    id,
    random: Math.random()
  }
})
