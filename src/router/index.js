import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import ToDoList from '../components/ToDoList.vue'
import ToDoDetail from '../components/TodoDetail.vue'
import PostList from '@/components/PostList.vue'
import PostDetail from '@/components/PostDetail.vue'

const routes = [
    { path: '/', name: 'Home', component: ToDoList, meta: {requireAuth : true} },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/post', name: 'PostList', component: PostList, meta: {requireAuth : true}  },
    { path: '/todo/:id', name: 'ToDoDetail', component: ToDoDetail, props: true, meta: {requireAuth : true}  },
    { path: '/post/:id', name: 'PostDetail', component: PostDetail, props: true, meta: {requireAuth : true}  },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
//어디서 오고 어디로 가는지
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  //토큰 없는애 이동(인증x)
  if(to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})


  export default router