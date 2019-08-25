<template>
    <div>
       <ul class="play-list-group">
           <!-- 最近播放 -->
           <li class="play-list-item">
               <router-link :to="{name:'recentPlay'}">
                <div class="icon-container">
                    <i class="iconfont icon-tubiaozhizuomoban"></i>
                </div>
                <div class="play-list-desc">
                    <span class="play-list-title">最近播放</span>
                    <span class="play-list-count">（{{recentPlayCount}}）</span>
                </div>
               </router-link>
               
           </li>
           <!-- 我喜欢的音乐 -->
           <li class="play-list-item">
               <router-link :to="{path: '/play-list-detail',query:{ id: likelistId }}">
                <div class="icon-container">
                    <i class="iconfont icon-xihuan"></i>
                </div>
                <div class="play-list-desc">
                    <span class="play-list-title">我喜欢的音乐</span>
                    <span class="play-list-count">（{{likelistCount}}）</span>
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
            likelistId:null,//歌单的id
        }
    },
    computed:{
        ...mapGetters(['likelistCount','recentPlaylist']),
        recentPlayCount(){
            return this.recentPlaylist.length;
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
        async getLikeListId(uid){//获取喜欢列表的id数组
          try{//从返回的json数据中取id
              const resUserPlayList = await getUserPlaylist(uid);
              console.log("/user/playlist:",resUserPlayList);
              this.likelistId = resUserPlayList.playlist[0].id;//获取喜欢音乐的数组id
              console.log("this.likelistId:",this.likelistId);
              
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
.play-list-group{
    list-style: none;
    margin: 0;
    padding: 0;
    .play-list-item{//li
    padding: 0.1rem 0;
    font-size: 0.8rem;
    .icon-container{
        box-sizing: border-box;
        display: inline-block;
        .iconfont{
            font-size: 0.8rem;
            vertical-align: middle;//水平居中
        }
    }
    .play-list-desc{
        padding: 0.6rem 0;
        border-bottom: 1px solid #e4e4e4;
        box-sizing: border-box;
        display: inline-block;
        width:90%;
        >span{
            vertical-align: middle;
        }

    }

    }
}
</style>
