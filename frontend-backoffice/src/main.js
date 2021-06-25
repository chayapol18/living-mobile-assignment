import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import '@/styles/main.css'
import VueDataTables from 'vue-data-tables/dist/data-tables.min.js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.use(VueDataTables)
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
  }).$mount('#app')