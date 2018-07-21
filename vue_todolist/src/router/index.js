import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '../components/TodoList'
import Login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'login',
      component:Login
    },
    {
      path: '/list/:username',
      name: 'todo_list',
      component: TodoList
    },
    {
			path:"/",
			redirect:"/index"
		},{
			path:"*",
			redirect:"/index"
		}

  ]
})
