<template>
<section class="side-bar-menu">
    <div class="menu-top">
        <!-- 两个div一个未登录显示一个登陆显示 -->
        <div class="unlogin-style">
            <p class="login-desc1">登陆网易云音乐</p>
            <p class="login-desc2">手机电脑多端同步，尽享海量高品质音乐</p>
            <div class="login-btn-container">
                <button class="login-btn" @click="toLoginPage">立即登录</button>
            </div>
        </div>
        <div class="haslogin-style">
            <div class="img-container">
                <img v-lazy="imgUrl" alt class="avatar">
            </div>
            <h1 class="nickname">{{nickname}}</h1>
        </div>
    </div>
    <div class="menu-body">
        <div class="my-items">
             <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-xiaoxi" style="color: #f00;font-size:1.6rem"></i>
                    <p>我的消息</p>
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-yonghu" style="color: #f00;font-size:1.6rem"></i>
                    <p>我的好友</p>
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-huanfu" style="color: #f00;font-size:1.6rem"></i>
                    <p>个性换肤</p>
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-maikefeng" style="color:#f00;font-size:1.6rem"></i>
                    <p>听歌识曲</p>
                </button>
            </div>

        </div>
        <div class="items-container">
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-fujin-"></i>
                    附近的人
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-icon--"></i>
                    我的铃声
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-saoyisao"></i>
                   扫一扫
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-shouye"></i>
                    商城
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-timer"></i>
                    定时播放
                </button>
            </div>
        </div>
    </div>
    <div class="menu-footer">
        <div class="btn-wrap">
                <div>
                    <button class="logout-btn" >
                        <i class="iconfont icon-biaoqing"></i>
                        夜间模式
                    </button>
                </div>
                <div>
                    <!-- @click="logoutThenUpdateLoginStatus" -->
                    <button class="logout-btn" >
                        <i class="iconfont icon-shezhi1"></i>
                        设置
                    </button>
                </div>
                <div>
                    <button class="logout-btn">
                        <i class="iconfont icon-shut-down"></i>
                        退出
                    </button>
                </div>
            
        </div>
    </div>

</section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { logout, getUserDetail } from "../api/SideBar";
export default {
    props:['children'],
    data(){
        return{
            imgUrl:null,
            nickname:null
        }
    },
    computed: {
    ...mapGetters(["loginStatus"])
    },
    watch: {
        async loginStatus(hasLogined){
            if(hasLogined){ /* 登录成功则替换昵称和img*/
                try{
                    const res = await getUserDetail(localStorage.getItem("uid"));
                    this.imgUrl = res.profile.avatarUrl;
                    this.nickname = res.profile.nickname;
                }catch(error){
                    console.log(error);

                }
            }

        }
    },
    methods: {
        ...mapActions(['getThenSetLoginStatus']),
        async logoutThenUpdateLoginStatus(){/* 退出，则更新loginstatus */
            try{
                await logout();/* api中的logout axios get请求*/
                this.getThenSetLoginStatus();//更新vuex中的loginstatus状态
            }catch(error){
                console.log(error);
            }
        },

        toLoginPage() {
            /* 关闭侧滑栏，切换路由 */
            /* 侧滑栏属于app.vue的第二个子组件，所以children[1] */
            this.$props.children[0].slideout.close();/* $props当前组件接收到的props对象 */
            this.$router.push({name:"Login"});
            console.log("登录")
        }
        
    },
    
}
</script>
<style scoped lang='less'>
@bgcolor:#fefefe;
.side-bar-menu {
  background: @bgcolor;
  position: relative;
  height: 100vh;
  .menu-top{
    background: @bgcolor;
    padding-top: 0.4rem;
    .unlogin-style{
        text-align: center;
        .login-desc1,
        .login-desc2 {
            color: #333;
            text-align: center;
            padding-bottom: 0.02rem;
        }
        .login-btn-container{
            padding-top: 0.1rem;
            text-align: center;
            .login-btn{
                background: @bgcolor;
                border: 1px solid #aaa;
                padding: 0.15rem 1.45rem;
                border-radius: 0.88rem;
                color: #333;
            }
        }

    }
    .haslogin-style {
      .img-container {
        text-align: center;
        .avatar {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
        }
      }
      .nickname {
        font-weight: 400;
        font-size: 18px;
        text-align: center;
      }
    }
    }
    .menu-body {
    border-top: 1px solid #eee;
    padding: 0.8rem 0 ;
    background: @bgcolor;
    height: 10rem;
    .my-items{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-size: 0.4rem;
        div{
            margin-bottom:1rem;
            p{font-size:0.8rem;}
            .logout-btn,
            .iconfont {
                font-size: 16px;
                font-weight: 300;
            }
            .logout-btn{
                background: @bgcolor;
                border: 0;
                padding: 0.15rem 0.45rem;
                border-radius: 0.88rem;
                color: #333;
            }
        }

    }
    .items-container{
        border-top: 1px solid #eee;
        padding: 1.08rem 0 ;
        display: flex;
        flex-direction: column;
        div{
            margin-bottom:1rem;
            .logout-btn,
            .iconfont {
                font-size: 16px;
                font-weight: 300;
            }
            .logout-btn{
                background: @bgcolor;
                border: 0;
                padding: 0.15rem 0.45rem;
                border-radius: 0.88rem;
                color: #333;
            }
        }
    }
    }
    .menu-footer{  
        background: @bgcolor;
        position: fixed;
        width: 85%; // slideout指定的宽度85%
        bottom: 0;
        border-top: 1px solid #eee;
        padding: 0.8rem 0 ;
        .btn-wrap {
        display: flex;
        justify-content: space-around;
        .logout-btn,
        .iconfont {
            font-size: 16px;
            font-weight: 300;
        }
        .logout-btn{
            background: @bgcolor;
            border: 0;
            padding: 0.15rem 0.45rem;
            border-radius: 0.88rem;
            color: #333;
        }
    }

    }
  }
   
</style>