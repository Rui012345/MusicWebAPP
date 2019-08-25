import * as loginRegisterApi from '../api/SideBar'
import * as Types from './mutations-type'
// 把my api引入
import * as myApi from '../api/My/index'
import * as playcontrolApi from '../api/PlayControl/PlayControl'
export default{
  async getTheSetLoginStatus({ commit }) {
    try {
      await loginRegisterApi.getLoginStatus()/* 等待api中的get请求,获取登录状态 */
      commit(Types.UPDATE_LOGIN_STATUS, true)
    } catch (e) {
      if (e.code === 301) { /* 永久重定向 */
        commit(Types.UPDATE_LOGIN_STATUS, false)
      } else {
        console.log(e)
      }
    }
  },
  // 获取播放列表
  async getTheSetLikelist({ commit }, uid) {
    try {
      const res = await myApi.getUserLikelist(uid)
      const likelistIds = res.ids
      console.log('likelist:', likelistIds)
      commit(Types.SET_LIKE_LIST, likelistIds)
    } catch (e) {
      console.log('e', e)
    }
  },
  // 获取songInfo
  async getTheSongInfo({commit}, songData) {
    try {
      console.log('songData:', songData)
      const musicId = songData.id
      console.log('musicId:', musicId)
      // api 返回的请求数据
      const res = await playcontrolApi.getMusicUrl(musicId)
      const musicUrl = res.data[0].url
      // 同时将这首歌存入该用户的最近播放记录里
      commit(Types.UPDATE_RECENT_PLAYLIST, musicId)
      commit(Types.SET_SONG_INFO, {...songData, musicUrl})
    } catch (error) {
      console.log(error)
    }
  },
  // 获取歌曲的时长
  getTheTotalTime({commit}, time) {
    commit(Types.SET_TOTALTIME, time)
  },
  getTheCurrentTime({commit}, time) {
    commit(Types.SET_CURRENTTIME, time)
  },
  getIsPlaying({commit}, isPlaying) {
    commit(Types.SET_ISPLAYING, isPlaying)
  }
}
