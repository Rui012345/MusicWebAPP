import axios from '../api'
// 加random的作用是使得get请求不走缓存。
export const getUserLikelist = uid => axios.get('/likelist', {
  params: {
    uid,
    random: Math.random()
  },
  withCredentials: true
})

// 获取用户歌单
export const getUserPlaylist = uid => axios.get('/user/playlist', {
  params: {
    uid
  }
})
