import { LocalStorage } from 'quasar'

// "async" is optional
export default ({ router }) => {
  router.beforeEach((to, from, next) => {  // 三個值不可省略
    let loggedIn = LocalStorage.getItem('loggedIn')
    if (!loggedIn && to.path !== '/auth') {
      next('/auth')
    }
    else next()
  })
}