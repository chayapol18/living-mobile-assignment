import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
		path: '/',
		name: 'Main',
		component: Main,
		children: [
			{
				path: '/',
				name: 'StorePage',
				component: () => import('../components/Store'),
      },
      {
				path: '/category',
				name: 'CategoryPage',
				component: () => import('../components/Category'),
      },
      {
				path: '/menu',
				name: 'MenuPage',
				component: () => import('../components/Menu'),
      },
    ]
  }
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router