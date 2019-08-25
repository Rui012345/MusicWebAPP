# MusicWebAPP
musicApp based MusicNet NodeJS API  


&nbsp;
## 1. Download and execute：
&nbsp;
*  ```npm install ```
*  ```npm run dev```

## 2. /src/ tree：
```
|-- src
    |-- App.vue
    |-- main.js
    |-- router.js
    |-- api
    |   |-- api.js
    |   |-- Home
    |   |   |-- Home.js 
    |   |-- Login
    |   |   |-- index.js          //验证登录信息，api:'/login/cellphone'（phone, password,）
    |   |-- My
    |   |   |-- index.js
    |   |-- PlayControl           //播放音乐页面，通过音乐id获取当前歌曲url，'/song/url'(id)
    |   |   |-- PlayControl.js
    |   |-- PlayListDetail
    |   |   |-- index.js
    |   |-- Sidebar
    |   |   |-- index.js
    |   |-- SongDetail
    |       |-- index.js
    |-- assets
    |   |-- logo.png
    |-- components
    |   |-- BackBtn.vue         //顶部返回按钮
    |   |-- BackHeader.vue      //主页面返回
    |   |-- Reminder.vue        //忘记密码
    |   |-- SideBarMenu.vue     //侧滑页面（登录、设置、退出等）
    |   |-- SongList.vue        //歌曲列表
    |-- iconfont                //阿里iconfont网站的图标
    |   |-- demo.css
    |   |-- demo_index.html
    |   |-- iconfont.css
    |   |-- iconfont.eot
    |   |-- iconfont.js
    |   |-- iconfont.svg
    |   |-- iconfont.ttf
    |   |-- iconfont.woff
    |   |-- iconfont.woff2
    |-- store
    |   |-- actions.js
    |   |-- getters.js
    |   |-- index.js
    |   |-- mutations-type.js
    |   |-- mutations.js
    |   |-- state.js
    |-- style
    |   |-- index.less        //全局样式
    |-- utils
    |   |-- utils.js
    |-- view
        |-- Home              //主页面
        |   |-- FourCircles.vue       //四个大的路由按钮 ：每日推荐 、我的好友、排行棒、个性换肤
        |   |-- Home.vue
        |   |-- HomeSwiper.vue        //轮播图
        |   |-- RecommendSongList.vue //推荐歌单
        |-- Login
        |   |-- Login.vue            //登录
        |-- My
        |   |-- My.vue              //我的音乐信息页面
        |-- PlayControl
        |   |-- PlayControl.vue     //当前音乐播放页面
        |-- PlayListDetail
            |-- PlayListDetail.vue  //likeList播放列表页面

```
