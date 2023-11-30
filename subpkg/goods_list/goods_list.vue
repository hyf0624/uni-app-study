<template>
  <view>
    <view class="goods_list">
      <view
        v-for="(goods, index) in goodsList"
        :key="index"
        @click="gotoDetail(goods)"
      >
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryObj: {
        query: "", // 查询关键词
        cid: "", // 商品分类id
        pagenum: 1, // 页码值
        pagesize: 10, // 每页多少条
      },
      goodsList: [],
      total: 0,
      isLoading: false,
    };
  },
  methods: {
    // 获取商品列表数据的方法
    async getGoodsList(callback) {
      this.isLoading = true;
      // 发起请求
      const { data: res } = await uni.$http.get(
        "/api/public/v1/goods/search",
        this.queryObj
      );
      if (res.meta.status !== 200) return uni.$showMsg();
      this.isLoading = false;
      callback && callback();
      this.goodsList = [...this.goodsList, ...res.message.goods];
      this.total = res.message.total;
    },
    gotoDetail(item) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
      });
    },
  },
  // 上拉加载更多
  onReachBottom() {
    // 判断是否还有下一页数据
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
      return uni.$showMsg("数据加载完毕！");
    if (!this.isLoading) {
      this.queryObj.pagenum += 1;
      this.getGoodsList();
    }
  },
  onPullDownRefresh() {
    // 重置关键数据
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.isLoading = false;
    this.goodsList = [];

    // 重新发起数据请求
    this.getGoodsList(() => uni.stopPullDownRefresh());
  },
  onLoad(options) {
    this.queryObj.query = options.query || "";
    this.queryObj.cid = options.cid || "";
    // 调用获取商品列表数据的方法
    this.getGoodsList();
  },
};
</script>

<style lang="scss">
</style>