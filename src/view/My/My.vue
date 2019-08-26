<template>
    <div>
       <ul class="play-list-group">
           <!-- 最近播放 -->
           <li class="play-list-item">
               <router-link :to="{name:'recentPlay'}">
                <div class="play-list-desc">
                  <i class="iconfont icon-tubiaozhizuomoban"></i>
                  <span class="play-list-title">最近播放</span>
                  <span class="play-list-count">（{{recentPlayCount}}）</span>
                </div>
               </router-link>
           </li>
            <!-- 创建歌单 -->
           <li class="play-list-item">
                <div class="play-list-desc">
                  <i class="iconfont icon-jiarugedan"></i>
                  <span class="play-list-title">创建的歌单</span>
                  <span class="play-list-count">（{{createCount}}）</span>
                </div>
           </li>
            <li class="play-list-item" v-if="index < createCount" v-for = "(item,index) in resUserPlayList " :key="index">
               <router-link :to="{path: '/play-list-detail',query:{ id: item.id }}">
                <div class="play-list-desc">
                  <img v-lazy="item.coverImgUrl">
                  <span class="play-list-title">{{item.name}}</span>
                  <span class="play-list-count">（{{item.trackCount}}）</span>
                </div>
               </router-link>   
           </li>
           <!-- //根据item.userId判断是否为收藏歌单 -->
           <!-- 收藏歌单 -->
           <li class="play-list-item">
                <div class="play-list-desc">
                  <i class="iconfont icon-xihuan"></i>
                  <span class="play-list-title">收藏的歌单</span>
                  <span class="play-list-count">（{{collectCount}}）</span>
                </div>
           </li>
           <li class="play-list-item" v-if="index >= createCount" v-for = "(item,index) in resUserPlayList " :key="index + item.name">
               <router-link :to="{path: '/play-list-detail',query:{ id: item.id }}">
                <div class="play-list-desc">
                  <img v-lazy="item.coverImgUrl">
                  <span class="play-list-title">{{item.name}}</span>
                  <span class="play-list-count">（{{item.trackCount}}）</span>
                </div>
               </router-link>   
           </li>
        </ul>
        
    </div>
</template>
<script>
// 喜欢的音乐数目和最近播放列表由vuex获取
import {mapActions,mapGetters} from 'vuex'
//playlist 获取用户歌单
import {getUserPlaylist} from '../../api/My'
export default {
    name:'My',
    data(){
        return {
          resUserPlayList:null,//歌单Object 存储格式 {'0':{},"1":{}}
          resUserPlayListCount:0,//歌单总数
          createCount:0,//自己创建的歌单数量
        }
    },
    computed:{
        ...mapGetters(['likelistCount','recentPlaylist']),
        recentPlayCount(){
            return this.recentPlaylist.length;
        },
        collectCount(){//收藏歌单的数量
          return this.resUserPlayListCount-this.createCount;
        }
    },
    methods: {
        ...mapActions(['getTheSetLikelist']),
        async getData(){
            const uid = localStorage.getItem("uid");
            console.log("欢迎进入我的音乐界面,",uid);
            this.getTheSetLikelist(uid);
            this.getLikeListId(uid);
        },
        async getLikeListId(uid){//输入用户id,获取喜欢列表的id数组
          try{
            //从返回的json数据中取id
              const  res = await getUserPlaylist(uid);
              this.resUserPlayList = res.playlist;
              this.resUserPlayListCount = res.playlist.length;
              console.log("woshiresUserPlayList",this.resUserPlayList.length);
              //统计创建歌单数目count
              let count = 0;
              for(let i=0;i<res.playlist.length;i++){//jsonresplaylist[i] object
                if(res.playlist[i].userId==uid){
                  count++;
                }else{
                   break;
                }
              }
              this.createCount = count;                         
          }catch(error){
              console.log(error);
          }
        }
    },
    created(){
        this.getData();
    }

}
</script>
<style lang="less" scoped>
a{
  display: inline-block;
  height: 100%;
}
.play-list-group{
    list-style: none;
    margin: 0;
    padding: 0;
    .play-list-item{//li 
    padding: .1rem .2rem;
    font-size: .8rem;  
    border-bottom: 1px solid #e4e4e4;
    .play-list-desc{
        padding: 0.4rem 0;
        height:10vw; 
        line-height: 10vw;
        .icon-container{
          vertical-align:middle
        }
        img{
          height: 100%;
          vertical-align:middle;
        }
        .play-list-title{
          width:70%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
    }

    }
}
</style>
