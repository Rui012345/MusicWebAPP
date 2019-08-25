<template>
    <div>
        <!-- {{tracks}} -->
        <ul class="track-list">
            <li class="track-item" v-for="(item, index) in track" :key="index">
            <router-link :to="{path:'/song',query:{songId:item.id,songName:item.name,singer:item.ar[0].name,name:item.al.name,ImgUrl:item.al.picUrl}}" class="link-to-play-control">
                <div class="track-rank">{{index + 1}}</div>
                <div class="track-info">
                <p class="tracktitle ellipsis">{{item.name}}</p>
                <!-- item.ar=[{id:"",name:"歌手名"}]是只有一个对象元素的数组 item.al.name是专辑名字-->
                <p class="trackdesc ellipsis">{{item.ar[0].name}} - {{item.al.name}}</p>
                </div>
                <div class="trackplay">
                    <i class="iconfont icon-icon-test"></i>
                    <i class="iconfont icon-dian"></i>
                </div>
            </router-link>
            </li>
        </ul>
              
    </div>
</template>
<script>
export default {
    name: 'SongList',
    props:['track'],
    data() {
        return {
            tracksarr:[]//存储动态的父组件传过来的tracks
        }
    },
    //监听动态参数track
    watch: {
        track:function(newval,oldval){
            this.tracksarr = newval;
            console.log("this.tracksarr",this.tracksarr);
            console.log("this.tracksarr.al",this.tracksarr[0]);
            
        }
    }
}
</script>
<style scoped lang='less'>
// :to="{name: 'Song', query: {name: item.name, singers: formatSinger(item.ar), id:item.id}, params: {coverImgUrl: item.al.picUrl}}"
.track-list {
    list-style-type: none;
    margin: 0;
    padding:0;
    margin-bottom: 1rem;
  .track-item {
     
    .link-to-play-control {
        padding:0.1rem 0;
        display: flex;
        align-items: center;//纵轴对齐
        height: 3rem;
        border-bottom: 1px solid #e4e4e4;
        .track-rank {
            text-align: center;
            width: 12%;
            font-size: 0.8rem;
            // color: #757575;
        }
        .track-info{
            overflow: hidden;
            width: 68%;
            .tracktitle {
                color:rgb(24, 23, 23);
                margin: 0;
                font-size: 0.8rem;
            }
            .trackdesc{
                margin: 0;
                font-size: 0.8rem;
                transform-origin: 0 0;
                transform: scale(0.8);
                color: #757575;
            }
      }
        .trackplay{
            width: 20%;
            text-align: center;
            i{
                margin-right:.8rem;
                color: #757575;
            }
        }
    }
  }
}
</style>
