export default{
  loginStatus(state) {
    return state.loginStatus
  },
  likelist(state) {
    return state.likelist
  },
  likelistCount(state) {
    return state.likelist.length
  },
  recentPlaylist(state) {
    return state.recentPlaylist
  },
  isPlaying(state) {
    return state.isPlaying
  },
  // 音乐播放进度条
  totaltime(state) {
    return state.totaltime
  },
  currenttime(state) {
    return state.currenttime
  },
  // songinfo
  songInfo(state) {
    return state.songInfo
  }
  // musicId(state) {
  //   return state.songInfo.musicId
  // },
  // musicname(state) {
  //   return state.songInfo.musicname
  // },
  // musicUrl(state) {
  //   return state.songInfo.musicUrl
  // },
  // coverImgUrl(state) {
  //   return state.songInfo.coverImgUrl
  // },
  // singer(state) {
  //   return state.songInfo.singer
  // }
}
