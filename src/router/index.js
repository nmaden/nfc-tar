import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from "./routes"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = router.push
router.push = function push(location, onResolve, onReject)
{
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject)
    }
 
    return originalPush.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            return err
        }
   
        return Promise.reject(err)
    })
}


export default router
