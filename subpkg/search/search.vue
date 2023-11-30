<template>
	<view>
		<!-- 基本用法 -->
		<view class="search-box">
			<uni-search-bar focus :radius="100" @input="input" v-model="keyword" cancel-button="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @tap.stop="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" @tap.stop="cancelDeleteHistory" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text style="font-size: 16px;">搜索历史</text>
				<view v-if="!isDeleteHistory">
					<uni-icons type="trash" size="17" @tap.stop="clearHistory"></uni-icons>
				</view>
				<view class="deleteAll-box" v-else>
					<text class="all-text" @tap="deleteAllHistory">全部删除</text>
					<view class="line"></view>
					<text class="complete" @tap.stop="completeDelete">完成</text>
				</view>

			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<view class="tag-item" v-for="(item, i) in historyList" :key="i">
					<uni-icons class="delete-icon" v-if="isDeleteHistory" type="closeempty" size="12" @tap.stop="deleteHistory(i)"></uni-icons>
					<uni-tag size="normal" :circle="true" :text="item" @tap.stop="gotoGoodsList(item)"></uni-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import debounce from '@/utils/debounce.js'
	export default {
		data() {
			return {
				// 搜索关键字
				keyword: '',
				// 搜索结果
				searchResults: [],
				//搜索历史
				historyList: [],
				
				// 是否 点击删除历史的按钮
				isDeleteHistory: false
			};
		},
		methods: {
			input: debounce(function(value) {
				this.getSearchList(value)
			}, 500),
			async getSearchList(value) {
				// 判断关键词是否为空
				if (this.keyword === '') {
					this.searchResults = []
					return
				}
				// 发起请求，获取搜索建议列表
				const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keyword })
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				if (res.message.length) {
					// 查询到了数据
					this.historyList.unshift(value)
					this.historyList = Array.from(new Set(this.historyList))
					
					uni.setStorageSync('historyList', JSON.stringify(this.historyList))
				}

			},

			gotoDetail(id) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${id}`
				})
			},
			gotoGoodsList(item) {
				this.keyword = item
				// 跳转商品列表页面
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?query=${item}`
				})
			},
			// 清空搜索历史
			clearHistory() {
				this.isDeleteHistory = !this.isDeleteHistory
			
			},
			deleteHistory(index) {
				this.historyList.splice(index, 1)
			},
			// 完成删除
			completeDelete() {
				uni.setStorageSync('historyList', JSON.stringify(this.historyList))
				this.isDeleteHistory = false
			},
			// 全部删除历史记录
			deleteAllHistory(){
				this.historyList = []
				uni.setStorageSync('historyList', '[]')
			},
			// 取消删除
			cancelDeleteHistory() {
				this.historyList = JSON.parse(uni.getStorageSync('historyList') || '[]')
				this.isDeleteHistory = false
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('historyList') || '[]')
			
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;

			.deleteAll-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100px;

				.all-text {
					font-size: 12px;
					color: #383333b5;
				}

				.line {
					width: 1px;
					height: 12px;
					background: #00000059;
				}

				.complete {
					font-size: 12px;
					color: #ff0000ad;
				}
			}
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.tag-item {
				position: relative;

				.delete-icon {
					position: absolute;
					right: 12px;
					top: 0px;
				}

				.uni-tag {
					margin-top: 5px;
					margin-right: 8px;
					background: none;
					color: black;
					padding: 4px 18px;
				}
			}

		}
	}
</style>