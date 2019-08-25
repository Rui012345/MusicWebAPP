<template>
    <div class="play-list-container"> 
        <section class="play-list-detail-top" ref="palyListDesc">
          <section slot="ret" class="backbtn-container">
            <Back-btn class="backbutton"></Back-btn>
            <div class="song-info">
                <p class="song-name ellipsis">歌单</p>
                <marquee class="singers ellipsis">静心聆听音乐的魅力</marquee>
            </div>
          </section>
            <div class="top-container">
                <div class="img-wrap">
                    <img v-lazy = "coverImgUrl" class="cover-img">
                </div>
                <div class="user-wrap">
                    <h2 class="play-list-title">我喜欢的音乐</h2>
                    <img v-lazy = "avatarUrl" class="avatar-img">
                    <span class="nickname">{{nickname}}></span>  
                </div>
            </div>
        </section>
        <section class="play-list-detail-bottom">
            <!-- 播放全部 -->
            <div class="play-list-detail-control">
                 <div class="play-all">
                    <i class="iconfont icon-bofangquanbu"></i>
                    <span>播放全部（共{{trackCount}}首）</span>
                </div>
            </div>
            <SongList :track = "tracks"></SongList>
        </section>
    </div>
</template>
<script>
import {getPlayListDetail} from '../../api/PlayListDetail'
import SongList from "../../components/SongList"
import BackBtn from '../../components/BackBtn'
export default {
    name: "PlayListDetail",
    data() {
        return {
            coverImgUrl:"",//喜欢音乐的封面
            tracks:[],
            nickname: "",
            avatarUrl:"",
            trackCount:0

        }
    },
    components:{
        SongList,
        BackBtn
    },
    watch: {
      tracks:{
        handler(value){
          console.log("shendujianting1tracks:",value); 
        },
        deep:true
      }
    },
    methods: {
        getData(){
            getPlayListDetail(this.$route.query.id).then(res => {
            // 如果图片的方案行不通，就通过背景来设置歌单的封面
            // this.$refs.playListDesc.style.background = `url(${res.playlist.coverImgUrl})`;
            const { playlist } = res;
            // console.log("res",res); 
            this.coverImgUrl = playlist.coverImgUrl;
            this.nickname = playlist.creator.nickname;//用户名
            this.avatarUrl = playlist.creator.avatarUrl;//用户头像
            // this.updateTime = moment(playlist.updateTime).format("MMM Do");
            this.tracks = playlist.tracks;//喜欢的音乐list
            this.trackCount = playlist.trackCount;//喜欢的音乐数目
            // this.subscribedCount = playlist.subscribedCount;
            },error=>{
                console.log("error",error);      
            });
            
        }
    },
    created(){
        this.getData();
    }
    
   
    
}
</script>

<style lang="less" scoped>
.play-list-container{   
    .play-list-detail-top {
      position: relative;
      background:rgba(65, 59, 66, 0.562);
      .backbtn-container{
      padding-top: 1.2rem;
      height: 2rem;
      position: relative;
      .back-btn {
          width: 2rem;
          height: 2rem;
          text-align: center;
          position: absolute;
          left: 2%;
          position: absolute;
      }
      .song-info{
          position: absolute;
          left: 12%;
          color:#fff;
          .song-name{
              font-size:0.8rem;
              margin:0;
          }
          .singers{ 
              margin:0;
              font-size:0.26rem;
          }

          }

      }
      .top-container{
          height:6rem;
          padding: 2rem 1rem;
          display: flex;
          flex-flow:row;/*伸缩项目单行排列*/  
          .img-wrap{
              width: 30vw;
          .cover-img {
              width: 100%;
          }
          }
          .user-wrap{         
              flex:1;//填充满剩余空间
              margin-left:2rem;
              .play-list-title{
                  font-size: 0.8rem;
                  color: #fff;
              }
              .avatar-img{
                  border-radius: 50%;
                  width: 2rem;
                  height: 2rem;
                  vertical-align: middle;
              }
              .nickname{
                  display: inline-block;
                  font-size: 0.8rem;
                  transform: scale(0.8);
                  color: #fff;
                  vertical-align: middle;
              }
              
          }
      }
        

    }
    .play-list-detail-bottom{
        z-index: 2;
        .play-list-detail-control {
        display: flex;
        background: rgba(65, 59, 66, 0.562);
        height:3.2rem;
        border-radius: 0.1rem 0.1rem 0 0;
        border-bottom: 1px solid #e4e4e4;
        overflow: hidden;
        .play-all {
        background: #fff;
        // border:1px solid #f00;
        border-radius:1.2rem 1.2rem 0 0;
        padding-left:1rem;
        display: flex;
        align-items: center; // 垂直居中
        flex: 3; // 设置宽度比例
        font-size: 0.8rem;
        color: #2e3030;
        .iconfont {
            font-size:1rem;
            margin-right: 1rem;
        }
        }
        
    }
    }
}

</style>
