<template>
    <div class="my-items">
             <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-rili" style="color: #fff;font-size:1.6rem"></i>
                    <p>每日推荐</p>
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-yonghu" style="color: #fff;font-size:1.6rem"></i>
                    <p>我的好友</p>
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-_huabanfuben" style="color: #fff;font-size:1.6rem"></i>
                    <p>排行榜</p>
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-huanfu" style="color: #fff;font-size:1.6rem"></i>
                    <p>个性换肤</p>
                </button>
            </div>
            <div>
                <button class="logout-btn" @click="logoutThenUpdateLoginStatus">
                    <i class="iconfont icon-maikefeng" style="color:#fff;font-size:1.6rem"></i>
                    <p>听歌识曲</p>
                </button>
            </div>

        </div>
</template>
<style lang="less" scoped>
.my-items{
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-size: 0.4rem;
        div{
            margin-bottom:1rem;
            p{
                padding-top: 0.12rem;
                font-size:0.2rem;
            }
            .logout-btn,
            .iconfont {
                font-weight: 300;
                border-radius: 50%;
                padding:0.4rem 0.4rem;
                background: #d44439;
            }
            .logout-btn{
                background: #ffffff;
                border: 0;
                padding: 0.15rem 0.45rem;
                border-radius: 0.88rem;
                color: #333;
            }
        }

    }
</style>
