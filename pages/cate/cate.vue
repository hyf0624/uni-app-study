<template>
	<view>
		<!-- 使用自定义搜索组件 -->
		<my-search></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, index) in cateList" :key="index">
					<view :class="['left-scroll-view-item', index === active ? 'active' : '']" @click="activeChanged(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>

			<!-- 右侧滑动区 -->
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类 Item 项 -->
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodList(item3)">
							<!-- 图片 -->
							<!-- <image src="../../static/test.png" mode="widthFix"></image> -->
							<image :src="item3.cat_icon.replace('api-ugo-dev', 'api-ugo-web')" mode="widthFix"></image>
							<!-- 文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badegMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badegMix],
		data() {
			return {
				wh: 0,
				// 分类数据列表
				cateList: [],
				active: 0,
				// 二级分类的列表
				cateLevel2: [],
				scrollTop: 0
			};
		},
		methods: {
			async getCateList() {
				// 发起请求
				const { data: res } = await uni.$http.get('/api/public/v1/categories')
				// 判断是否获取失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 转存数据
				console.log(res.message, 'cateList')
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			activeChanged(i) {

				this.active = i
				this.cateLevel2 = this.cateList[i].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},

			// 跳转到商品列表页面
			gotoGoodList({ cat_id }) {
				console.log(cat_id)
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?cid=${cat_id}`
				})
			},
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			// 调用获取分类列表数据的方法
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				background: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						content: '';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #C00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%)
					}
				}
			}
		}

		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}

		.cate-lv3-list {
			display: flex;
			flex-wrap: wrap;

			.cate-lv3-item {
				width: 33.33%;
				margin-bottom: 10px;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 60px;
					height: 60px;
				}

				text {
					font-size: 12px;
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			margin-bottom: 10px;
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>