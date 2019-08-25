import * as Types from './mutations-type'
export default{
  [Types.UPDATE_LOGIN_STATUS](state, payload) {
    state.loginStatus = payload
  },
  // like_list playload为json返回的喜欢音乐id数组
  [Types.SET_LIKE_LIST](state, payload) {
    state.likelist = payload
  },
  //  更新最近的播放列表
  [Types.UPDATE_RECENT_PLAYLIST](state, payload) {
    const { recentPlaylist } = state
    const strPayload = `${payload}` // 统一转成字符串
    if (recentPlaylist.indexOf(strPayload) === -1) recentPlaylist.push(strPayload)
  },
  // 将输入赋值给state
  [Types.SET_CURRENTTIME](state, playload) {
    state.currenttime = playload
  },
  [Types.SET_TOTALTIME](state, playload) {
    state.totaltime = playload
  },
  [Types.SET_SONG_INFO](state, playload) {
    state.songInfo = playload
  },
  [Types.SET_ISPLAYING](state, playload) {
    state.isPlaying = playload
  }
}
