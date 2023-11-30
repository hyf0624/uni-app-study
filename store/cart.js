export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),

  // 模块的 mutations 方法 
  mutations: {
    // 添加购物车
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      // 存储到storage中
      this.commit('m_cart/saveToStorage')
    },

    // 存储到Storage中
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      const result = state.cart.find(item => item.goods_id === goods.goods_id)
      if (result) {
        result.goods_state = goods.goods_state
        // 存储到storage中
        this.commit('m_cart/saveToStorage')
      }
    },

    //更新商品的数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
     
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },

    // 根据 Id 从购物车中删除对应的商品信息
    removeGoodsById(state, goods_id) {
      // 调用数组的 filter 方法进行过滤
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },

    // 更新购物车中所有商品的状态
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }
  },

  // 模块的 getters 属性
  getters: {
    // 商品的总数量
    total(state) {
      return state.cart.reduce((p, c) => {
        return p + c.goods_count
      }, 0)
    },
    // 勾选商品的数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((p, c) => p += c.goods_count, 0)
    },

    // 勾选商品的总价格
    totalPrice(state) {
     
      return state.cart.filter(item => item.goods_state).reduce((p, c) => p += c.goods_price * c.goods_count, 0).toFixed(2)
    }
  },
}