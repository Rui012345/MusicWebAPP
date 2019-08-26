<template>
  <div>
    <HomeSwiper/>
    <FourCircles/>
    <RecommendSongList/>   
    
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
  }
  
}
</script>