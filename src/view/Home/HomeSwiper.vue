<template>
    <div class="wrapper">
        <swiper :options="swiperOption" class="swiper" >
        <!-- slides -->
        <swiper-slide class="swiper-slide" v-for='item of swiperList' :key='item.id'>
            <div class="img-wrap">
                <img class="banner-img swiper-lazy" :data-src="item.imgUrl" alt>
                <div class="swiper-lazy-preloader"></div>
            </div>
        </swiper-slide>
        <!-- Optional controls ,显示小点-->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { getBanner } from "../../api/Home/Home";
export default {
    name:'HomeSwiper',
    //es6的写法，相当于data:function(){return{swiperOption:{}}}
    data(){
        return{
            swiperOption: {
              autoplay: {
              disableOnInteraction: false // 用户操作swiper后，不停止自动播放
              },
              loop: true,
              pagination: {
              el: ".swiper-pagination"
              },
              lazy: {
              loadPrevNext: true // 同时预加载前一个和后一个元素
              }
            },
            //三张轮播，使用变量循环
            swiperList:[
                {
                    id:'001',
                    imgUrl:"http://img1.qunarzz.com/piao/fusion/1805/d4/d41d77b6ba8aca02.jpg_750x200_ac3d9a73.jpg"
                },
                {
                    id:'002',
                    imgUrl:"http://img1.qunarzz.com/piao/fusion/1805/f1/e57bc93226317102.jpg_750x200_9ab37bd0.jpg"
                },
                {
                    id:'003',
                    imgUrl:"http://img1.qunarzz.com/piao/fusion/1804/c4/1cdd28811593b802.jpg_750x200_5fbb7c91.jpg"
                }
            ]
        }
    },
      
}
</script>
<style lang="less" scoped>
.swiper {
  .swiper-slide {  
    .img-wrap {
      margin: 0 auto; // 实现轮播图水平居中
      width: 100%;
      height: 6.2rem;
      .banner-img {
        width: 100%;
        border-radius: 1rem 1rem;
      }
    }
   
  }
  .swiper-pagination{
      .swiper-pagination-bullet-active{
        background:#f00 !important;
      }
}
}
</style>


