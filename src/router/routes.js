
import {guard} from './guard'
export const routes = [
    {
      path: '/login',
      name: "Login",
      component: () =>
            import ('../views/Auth.vue'),
    },
    {
      path: '/admin',
      component: () => import ('../components/AdminPanel.vue'),
      beforeEnter:guard,
      children: [
        {
          path: "/",
          component: () => import("../components/News.vue"),
          beforeEnter:guard,
        },
        {
          path: "/feedback",
          component: () => import("../components/Feedback.vue"),
          beforeEnter:guard,
        },
        {
          path: "/document",
          component: () => import("../components/Document.vue"),
          beforeEnter:guard,
        },
        {
          path: "/users",
          component: () => import("../components/User.vue"),
          beforeEnter:guard,
        },
      ]
    },


    
]
