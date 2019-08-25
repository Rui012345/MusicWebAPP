
<template>
<!-- 音乐播放界面 -->
    <div class="play-container" ref="pageWrap">
        <section class="top-container">
            <Back-btn class="back-btn"></Back-btn>
            <div class="song-info">
                <marquee  class="song-name ellipsis">{{this.musname}} ({{this.mualname}})</marquee>
                <p class="singers ellipsis">{{this.musinger}} ></p>
            </div>
        </section>
        <section class="img-container">
            <div class = "cover-img-wrap">
                <div  class="img-wrap" ref="rotateImg"  >
                    <img class="cover-img"  v-lazy= "this.musimgurl" alt="">
                </div>
            </div>
        </section>
        <section class="play-info">
            <div class="play-progress">
                <!-- currentTime | formatTime -->
                <span class="has-played-time">{{curtime | formatTime}}</span>
                <!-- span嵌套实现进度条 -->
                <span class="total-progress">
                  <span class="has-played-progress"  ref="progress"></span>
                </span>
                <!-- duration | formatTime -->
                <span class="total-time">{{alltime | formatTime}}</span>
            </div>
            <div class="play-button">
                <button class="btn" @click="preSong">
                    <i class="iconfont icon-shangyiqu"></i>
                </button>
                <button class="btn center-btn" @click="toggleStatus">
                    <!--iconfont icon-bofang -->
                    <i :class="iconClassname"></i>
                </button>
                <button class="btn" @click="nextSong">
                    <i class="iconfont icon-xiayiqu"></i>
                </button>
                <audio src="" @canplaythrough='loaded()' @timeupdate="updatetime()" @ended="end()"  ref="audio" autoplay></audio>
            </div>
        </section> 
    </div>
</template>
<script>
import { mapActions, mapGetters,mapState } from 'vuex';
import BackBtn from '../../components/BackBtn.vue'
import {getUserLikelist} from '../../api/My/index.js'
import { getSongDetail } from '../../api/SongDetail/index.js'
export default {

    name:"PlayControl",
    data() {
        return {
            iconClassname:"iconfont icon-bofang",
            curtime:0,
            alltime:0,
            musid:"",
            musname:"",
            musimgurl:"",
            musinger:"",
            musurl:"",
            mualname:""
        }
    },
    computed: {
        ...mapGetters([
            'isPlaying',
            'likelist'
            ]) ,   
    },
    methods: {
        ...mapActions([
            'getTheSongInfo',
            'getIsPlaying',
            'getTheSetLikelist'//获取likelist，切换上一曲，下一曲   
        ]),
        // 设置页面高度为铺满整个屏幕
        getScreenHeight(){
            return `${document.documentElement.clientHeight}px`;
        },
        setPageHeight() {
            this.$refs.pageWrap.style.height = this.getScreenHeight();
            console.log("页面总高度：",this.$refs.pageWrap.style.height);
        },
        //歌曲加载完播放
        loaded(){
           this.$refs.audio.play(); //没有就播放 
           this.curtime = 0;  
           this.alltime = this.$refs.audio.duration;
        },
        //事件timeupdate(当目前的播放位置已更改时触发)触发
        // 此时更新currrentime
        updatetime(){
          this.curtime = this.$refs.audio.currentTime;
          this.$refs.progress.style.width = `${(this.curtime/ this.alltime) * 100}%` ;
        },
        //播放暂停切换css样式
        toggleToPlaying(){          
            //播放icon  iconfont icon-zantingtingzhi
            //转动coverImg
            this.iconClassname = "iconfont icon-zantingtingzhi";
            this.$refs.rotateImg.classList.add('rotate');
            //播放
            this.$refs.audio.play(); //没有就播放         
            console.log("播放中.....url: ",this.$refs.audio.src);              
        },    
        toggleToStopPlaying(){
            //播放icon  iconfont icon-zantingtingzhi
            //转动coverImg
            this.iconClassname = "iconfont icon-bofang";
            this.$refs.rotateImg.classList.remove('rotate');
            //暂停
            this.$refs.audio.pause(); 
        },  
        toggleStatus(){
        // 切换播放和暂停状态,修改isPlaying状态
            this.getIsPlaying(!this.isPlaying);
        },
        // ///进度条拖放事件...算了不写了。。。。。
        // handleTouchStart(){
        //   this.$ref.progress.addEventListener('touchmove',this.handleTouchMove);
        // },
        // handleTouchMove(e){
        //   console.log("拖动事件触发.......changedTouches:",e.changedTouches[0]);
        //   console.log("拖动事件坐标.......:",e.changedTouches[0].clientX);
        // }
        //更新当前页data及vuex状态
        updatesongDetail(musicId){
          getSongDetail(musicId).then((res)=>{
            let item = res.songs[0];
            this.musid = item.id;
            this.musname = item.name;
            this.musinger = item.ar[0].name;
            this.musimgurl = item.al.picUrl;
          },(err)=>{
            console.log("err",err); 
          })
          this.getTheSongInfo({
            id:this.musid,
            musicname:this.musname,
            coverImgUrl:this.musimgurl,
            singer:this.musinger
          });
          this.$refs.audio.src = 'https://music.163.com/song/media/outer/url?id='+this.musid+'.mp3';
          this.getIsPlaying(true);  
        },
        preSong(){
          let tempIndex = this.likelist.indexOf(this.musid);
          this.musid = this.likelist[tempIndex === 0 ? this.likelist.length-1 : tempIndex-1];
          this.updatesongDetail(this.musid);    
        },
        nextSong(){
          let tempIndex = this.likelist.indexOf(this.musid);
          this.musid = this.likelist[tempIndex === this.likelist.length-1 ?  0 : tempIndex+1];
          this.updatesongDetail(this.musid);    
        }
    },
    components:{
        BackBtn,
    },
    watch:{
        isPlaying(newVal,oldVal){
            // 切换播放和暂停状态,即更改css样式
            this.loaded();
            console.log("watch created likelist:")
            newVal ? this.toggleToPlaying():this.toggleToStopPlaying()
        },
    },
    filters:{
         //格式化事件的函数
        formatTime: function(time) {
          // 取整且补零
          const mm = `${Math.floor(time / 60)}`.padStart(2, '0');
          const ss = `${Math.floor(time % 60)}`.padStart(2, '0');
          return `${mm}:${ss}`;
      }

    },  
    created(){
      //更新data
      this.musid = this.$route.query.songId;
      this.musname = this.$route.query.songName;
      this.musimgurl = this.$route.query.ImgUrl;
      this.musinger = this.$route.query.singer;
      this.mualname = this.$route.query.name;
      this.getTheSongInfo({
          id:this.musid,
          musicname:this.musname,
          coverImgUrl:this.musimgurl,
          singer:this.musinger
      })
      console.log("播放界面的likelist:",this.likelist);
      
      // 在state中取likelist
      // // 获取用户的收藏歌曲列表以确定爱心按钮的样式
      // this.getThenSetLikelist(uid);
    },
    mounted(){
        //渲染完,高度设置为整屏
        this.setPageHeight(); 
        this.getIsPlaying(true);    
        this.$refs.audio.src =  'https://music.163.com/song/media/outer/url?id='+this.musid+'.mp3';
    }
}
</script>

<style lang="less" scoped>
// lazy-load样式
@bgurl:rgba(72, 75, 73,0.8);
img[lazy="loading"] {
  width: 100%;
  height: 100%;
}
//动画：
@keyframes infiniteRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate {
  animation: infiniteRotate 10s infinite linear;
}
button:hover{
  color:red;
}

.play-container{
    position: relative;
    background: @bgurl;
    color: #fff;
    .top-container{
        padding-top: 1.2rem;
        height: 4rem;
        position: relative;
        .back-btn {
            width: 2rem;
            height: 2rem;
            text-align: center;
            position: absolute;
            left: 2%;
        }
        .song-info{
            position: absolute;
            left: 12%;
            .song-name{
                font-size:0.8rem;
                margin:0;
            }
            .singers{ 
                color: #b5b5b5;
                margin:0;
                font-size:0.8rem;
            }

        }

    }
    
    .img-container{
        height:50%;
        .cover-img-wrap{//圆形
        margin:0 auto;
        margin-top:10vw;  
        width: 60vw;
        height: 60vw;
        background-color: #2e3030;
        border-radius: 50%;
        overflow: hidden;
        .img-wrap {
            width: 70%;
            height: 70%; // 设置高度以让子元素宽高相同
            margin: 15% auto;
            border-radius: 50%;
            overflow: hidden;
            .cover-img {
            width: 100%;
            }
        }
        } 
    }

    .play-info{
        width: 100%;
        position: absolute;
        bottom: 10%;
        text-align: center;
        color:lightgray;
        .play-progress{
            width: 100%;
            display: flex;
            align-items: center;//垂直对齐
            justify-content: space-around;
            font-size: .8rem;
            .total-progress{
                margin:0 .5rem 0 .5rem;
                height: .1rem;
                border-radius:.02rem;
                width: 60%;
                background: lightgrey;
                .has-played-progress{
                    display: block;
                    width: 0;
                    height: 100%;
                    background: red;

              }
            }
            

        }
    }
    .play-button{
        margin-top:2rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .play-button /deep/ .btn{
        color:lightgray;
       
    }
    .btn /deep/ .iconfont{
         font-size: 1.6rem;

    }
    .center-btn /deep/ .iconfont{
        font-size: 2rem;
    }

}

</style>

