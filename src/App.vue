<template>
  <div id="app">
    <Slideout
      menu="#menu"
      panel="#panel"
      :toggleSelectors="['.toggle-button']"
      @on-open="open"
      @on-close="close"
      easing="linear"
      ref="slideout"
    >
     <nav id="menu">
        <side-bar-menu :children="this.$children"></side-bar-menu>
      </nav>
      <main id="panel" ref="panel">
        <header>
        <button class="toggle-button logout-btn">
           <i class="iconfont icon-xiangmuxiangqing"></i>
        </button>   
        <!-- 显示路由跳转 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
       </header>
      </main>
    </Slideout>
  </div>
</template>

<script>
import Slideout from 'vue-slideout'
import SideBarMenu from './components/SideBarMenu'
import { mapActions } from "vuex";
/* eslint-disable */
export default {
  name:"app",
  components:{
    Slideout,
    SideBarMenu
  },
  methods: {
    ...mapActions(["getTheSetLoginStatus"]),
    open() {
      console.log('slideopen');
      this.$refs.panel.addEventListener("click", this.closeSlideout, true);
    },
    close() {
      console.log('slideclose');
      this.$refs.panel.removeEventListener("click", this.closeSlideout, true);
    },
    closeSlideout(e) {
      // e.stopPropagation();
      e.preventDefault(); // 阻止事件传播，以免触发主页元素的点击事件。这里很神奇，stopPropagation不起作用，反而preventDefault起到了阻止传播的作用
      this.$refs.slideout.slideout.close();
    }
  },
  created() {
    // 如果后台登录接口不稳定，可以用这种临时的解决方案：退出应用后，删除localStorage里的uid
    // localStorage.removeItem('uid');
    this.getTheSetLoginStatus();
  },
  mounted() {
    this.$refs.slideout.slideout.disableTouch(); // 禁止通过左滑打开侧边栏
  }
}
</script>

<style scoped lang='less'>
/* slideout样式 */
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

.slideout-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 85%;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 999;
  display: none;
  background-color: #1d1f20;
  color: white;
  box-shadow: 0 0 2rem #000;
}

.slideout-menu-left {
  left: 0;
}

.slideout-menu-right {
  right: 0;
}

.slideout-panel {
  // color: white;
  position: relative;
  z-index: 1;
  will-change: transform;
  min-height: 100vh;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
}

/* slideout样式 */

@bgcolor:#fefefe;
.logout-btn,
.iconfont {
    font-size: 16px;
    font-weight: 300;
}
.logout-btn{
    background: transparent;
    border: 0;
    padding: 0.15rem 0.45rem;
    color: #fff;
}
</style>
