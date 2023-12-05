<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
    <!--  <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatar" :src="avatarUrl"></image>
    </button>
    <input type="nickname" class="weui-input" placeholder="请输入昵称" /> -->
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      // 获取用户的基本信息
      getUserInfo(e) {

        // 判断是否获取用户信息成功
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
        // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
        this.updateUserInfo(e.detail.userInfo)

        this.getToken(e.detail)
      },
      async getToken(info) {
        // 获取code 对应的值
        const [err, res] = await uni.login().catch(err => err)
        if (err || res.errMsg !== "login:ok") return uni.$showMsg('登录失败!')

        // 准备参数
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }

        // 换取 token
        const {
          data: loginResult
        } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        //if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        this.updateToken(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        )
        this.navigateBack()
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete() {
              this.updateRedirectInfo(null)
            }
          })
        }
      },
      onChooseAvatar(e) {
        const {
          avatarUrl
        } = e.detail
        this.avatarUrl = avatarUrl
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: ' ';
      display: block;
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #ffffff;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #C00000;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>