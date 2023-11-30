// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

// 按需导入 $http 对象
import {
	$http
} from '@escook/request-miniprogram'

uni.$http = $http

//  请求的根路径  https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata   https://www.uinav.com
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})
}


// 响应拦截器
$http.afterRequest = function() {
	// 关闭loading效果
	uni.hideLoading()
}

// 封装弹窗的方法
uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
Vue.config.productionTip = false

App.mpType = 'app'



const app = new Vue({
	...App,
	store
})
app.$mount()

// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif