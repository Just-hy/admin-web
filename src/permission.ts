import router from './router'
import { getToken, clearSession } from '@/utils/auth'
import { menuStore } from '@/store/menu/index'
//白名单
const whiteList = ['/login']
//全局守卫路由处理
router.beforeEach(async (to, from, next) => {
    const store = menuStore()
    //获取token
    const token = getToken()
    if (token) {
        if (to.path === '/login' || to.path === '/') {
            next({ path: '/' })
        } else {
            //从store里面获取菜单数据
            const hasRoles = store.menuList && store.menuList.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    //获取菜单、动态生成路由
                    await store.getMenuList(router)
                    //确保动态添加的路由已经被完全加载上去
                    next({ ...to, replace: true })
                } catch (error) {
                    clearSession()
                    next({ path: '/login' })
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) != -1) {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})