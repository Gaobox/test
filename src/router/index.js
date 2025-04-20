import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			name: "redirect",
			// component: ()=> import('../views/HomeView.vue'),
			redirect: "/login",
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/login/index.vue"),
		},
		{
			path: "/home",
			name: "home",
			component: () => import("../views/homeview/index.vue"),
		},
		{
			path: "/home/hot",
			name: "homeHot",
			component: () => import("../views/homeview/HomeHot.vue"),
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue"),
		},
		{
			path: "/admin",
			name: "admin",
			component: () => import("../views/admin/index.vue"),
		},
	],
})
router.beforeEach((to, from, next) => {
	const user = JSON.parse(localStorage.getItem('user'))
	if (to.matched.some(record => record.meta.requiresAuth) && !user) {
	  // 如果访问的是需要登录的页面且没有用户信息，则跳转到登录页
	  next({ path: '/login' })
	} else {
	  next() // 继续访问目标页面
	}
  })
  

export default router
