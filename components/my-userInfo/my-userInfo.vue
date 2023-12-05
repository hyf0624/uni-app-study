<template>
  <view class="my-userinfo-container">

    <!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <view class="nickname">{{userinfo.nickName}}</view>
    </view>

    <!-- 面板的列表区域 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <!-- panel 的主体区域 -->
        <view class="panel-body">
          <!-- panel 的 item 项 -->
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>

      <!-- 第二个面板 -->
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="/static/my-icons/icon1.png" class="icon" />
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" class="icon" />
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon3.png" class="icon" />
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png" class="icon" />
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  // 按需导入 mapState 辅助函数
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-userInfo",
    data() {
      return {

      };
    },
    computed: {
      // 将 m_user 模块中的 userinfo 映射到当前页面中使用
      ...mapState('m_user', ['userinfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress', 'updateUserInfo', 'updateToken']),
      async logout() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗?'
        }).catch(err => err)
        if (succ && succ.confirm) {
          this.updateToken('')
          this.updateAddress({})
          this.updateUserInfo({})
        }
      }
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    // 为整个组件的结构添加浅灰色的背景
    background-color: #f4f4f4;

    .top-box {
      height: 400rpx;
      background-color: #c00000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .avatar {
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid white;
        box-shadow: 0 1px 5px black;
      }

      .nickname {
        color: white;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }

  page,
  .my-container {
    height: 100%;
  }

  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;

    .panel {
      background-color: #fff;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0;
          font-size: 13px;

          .icon {
            width: 35px;
            height: 35px;
          }
        }
      }

    }
  }

  .panel-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding: 0 10px;
    line-height: 45px;
  }
</style>