<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="!isShow">
      <button class="btnChooseAddress" type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
    </view>

    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="userName">收货人: {{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话: {{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址:
        </view>
        <view class="row2-right">
          {{addStr}}
        </view>
      </view>
    </view>
    <!-- 底部的比框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {};
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addStr']),
      isShow() {
        console.log(this.address)
        return Object.keys(this.address).length
      },
     
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      // 选择收货地址
      async chooseAddress() {
        // 直接调用小程序中的chooseAddress()方法，即可使用选择收费地址的功能
        //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const [err, result] = await uni.chooseAddress({}).catch(err => err)
        if (err === null && result.errMsg === 'chooseAddress:ok') {
          this.updateAddress(result)
        }
        // 用户没授权
        if (err && err.errMsg === 'chooseAddress: fail auth deny' || err.errMsg ==='chooseAddress:fail authorize no response') {
          this.reAuth() // 调用this.reAuth() 方法，向用户重新发起授权申请
        }
      },
      // 让用户重新授权
      async reAuth() {
        const {
          err2,
          confirmResult
        } = await uni.showModal({
          content: "检测到您没打开地址权限，是否去设置打开?",
          confirmText: "确认",
          cancelText: "取消"
        })
        if (!err2) return
        if (confirmResult.cancel) return uni.$showMsg('取消了授权')
        if (confirmResult.confirm) return uni.openSetting({
          success: (settingResult) => {
           if(!settingResult.authSetting['scope.address']) return uni.$showMsg('取消了授权!')
           if(settingResult.authSetting['scope.address'])return uni.$showMsg('授权成功!')
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }

  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-left {

        .userName {}
      }

      .row1-right {
        display: flex;
        justify-content: space-between;

        .phone {}
      }
    }

    .row2 {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
        margin-right: 10px;
      }

      .row2-right {}
    }
  }
</style>