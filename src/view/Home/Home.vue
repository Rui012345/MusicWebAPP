<template>
  <div class="home">
    <div class="home-header-container">
        <button class="toggle-button">
           <i class="iconfont icon-xiangmuxiangqing"></i>
        </button>
        <router-link to="/home/my">我的</router-link>
        <router-link to="/home/find">发现</router-link>
        <!-- <router-link > -->
        <button class="toggle-button">
            <i class="iconfont icon-sousuo"></i>
        </button>
        <!-- </router-link>   -->
    </div>
    <div class="home-content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
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
  display: inline-flex;
  justify-content:space-between;//间隔分布
}
.home-header-container /deep/ .iconfont{
  color:#333;
}
.router-link-active{
  font-weight:bold;
  color:#d44439;
  font-size: 1rem;
}
.sousuo-btn{

}
</style>
