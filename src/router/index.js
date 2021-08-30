import {
  createRouter,
  createWebHistory
} from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    component: Home,
  },
  {
    path: '/category',
    name: '分类',
    component: Category
  },
  {
    path: '/cart',
    name: '购物车',
    component: Cart
  },
  {
    path: '/profile',
    name: '我的',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
