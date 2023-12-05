export default {
  // 开启命名空间
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    // 用户信息对象
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    
    // 重定向的Object 对象
    redirectInfo: ''
  }),
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    updateToken(state, token){
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state){
      uni.setStorageSync('token', state.token)
    },
    updateRedirectInfo(state, info){
      state.redirectInfo = info
      console.log(state.redirectInfo)
    }
  },
  getters: {
    addStr(state) {
      if (Object.keys(state.address).length) {
        // 拼接 省，市，区，详细地址 的字符串并返回给用户
        return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
      }
    },
  },
}