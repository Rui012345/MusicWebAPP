<template>
  <div class="home">
    <div class="home-header-container">
        <button class="toggle-button">
           <i class="iconfont icon-xiangmuxiangqing"></i>
        </button>
        <!-- <router-link> -->
        <button class="toggle-button">
           <span>我的</span>
        </button>
        <!-- </router-link> -->
        <!-- <router-link > -->
        <button :class="isActive?'active':''">
           <span>发现</span>
        </button>
        <!-- </router-link> -->
        <!-- <router-link > -->
        <button class="toggle-button">
            <i class="iconfont icon-sousuo"></i>
        </button>
        <!-- </router-link>   -->
    </div>
    <div class="home-content-container">
      <HomeSwiper/>
      <FourCircles/>
      <RecommendSongList/>   
    </div>
  </div>
</template>

<script>
import HomeSwiper from './HomeSwiper.vue';
import FourCircles from './FourCircles.vue';
import RecommendSongList from './RecommendSongList.vue';

export default {
  components: {
    HomeSwiper,
    FourCircles,
    RecommendSongList,
  },
  data(){
    return{
      isActive:true
    }
  }
};
</script>

<style lang="less" scoped>
@bgcolor:#d44439;
.home-header-container {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  background-color: #fff;
  display: flex;
  justify-content:space-between;//间隔分布
}
.home-header-container /deep/ .iconfont{
  color:#333;
}
.active{
  font-weight:bold;
  color: @bgcolor;
  font-size: 1rem;
}
.sousuo-btn{

}
</style>
