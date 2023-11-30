import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './cart.js'
import user from './user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		'm_cart': Cart,
    'm_user': user
	}
})

export default store