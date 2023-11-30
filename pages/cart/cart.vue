<template>
	<view class="cart-container" v-if="cart.length">
    <!-- 收货地址组件 -->
    <my-address></my-address>
		<!-- 商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本区域 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="(goods, index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClick(goods)">
					<!-- 循环渲染购物车中的商品信息 -->
					<my-goods :goods="goods" :showRadio="true" @radioChange="radioChange" :showNum="true" @num-change="numChange"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
    
    <!-- 使用自定义的结算组件 -->
    <my-settle></my-settle>
	</view>
 <!-- 空白购物车的区域 -->
 <view class="empty-cart" v-else>
   <image src="/static/cart_empty@2x.png" class="empty-image"></image>
   <text class="empty-text">空空如也~</text>
 </view>
</template>

<script>
	import badegMix from '@/mixins/tabbar-badge.js'
	import { mapState, mapMutations } from 'vuex'
	export default {
		mixins: [badegMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChange(e) {
				this.updateGoodsState(e)
        this.setBadge()
			},
			numChange(e) {
				this.updateGoodsCount(e)
        this.setBadge()
			},
			swipeItemClick(goods) {
				this.removeGoodsById(goods.goods_id)
				this.setBadge()
			}
		}
	}
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
  
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-image {
      width: 90px;
      height: 90px;
    }
    .empty-text{
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>