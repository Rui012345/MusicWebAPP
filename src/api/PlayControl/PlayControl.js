import axios from '../api'
// 获取歌曲的url

export const getMusicUrl = musicId => axios.get('/song/url', {
  params: {
    id: musicId
  },
  withCredentials: true
})
