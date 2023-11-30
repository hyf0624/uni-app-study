<template>
	<view>
		<!-- 使用自定义搜索组件 -->
		<my-search></my-search>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`" class="swiper-item">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list.slice(1)" :key="i2" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badegMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badegMix],
		data() {
			return {
				// 轮播图的数据列表
				swiperList: [],
				// 导航数据列表
				navList: [],
				// 楼层数据列表
				floorList: []
			}
		},

		methods: {
			async getSwiperList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status === 200) {
					this.swiperList = res.message
					//uni.$showMsg('数据请求成功')
				} else {
					uni.$showMsg()
				}
			},
			async getNavList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status === 200) {
					this.navList = res.message

				} else {
					uni.$showMsg()
				}
			},
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			async getFloorList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status === 200) {
					res.message.forEach(item => {
						item.product_list.forEach(prod => {
							prod.url = `/subpkg/goods_list/goods_list?${prod.navigator_url.split('?')[1]}`
						})
					})

					this.floorList = res.message
				} else {
					uni.$showMsg()
				}
			},

		},
		onLoad() {
			// 获取轮播图的数据
			this.getSwiperList()

			// 获取导航列表数据
			this.getNavList()

			// 获取首页楼层的数据
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			height: 100%;
			width: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>