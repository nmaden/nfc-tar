

export const routes = [
    {
      path: '/',
      name: "Login",
      component: () =>
            import ('../views/Auth.vue'),
    },
    {
      path: '/admin',
      component: () => import ('../components/AdminPanel.vue'),
    
      children: [
        {
          path: "/",
          component: () => import("../components/News.vue"),
          name: "Admin",
        },
        {
          path: "/feedback",
          component: () => import("../components/Feedback.vue"),
        
        },
        {
          path: "/document",
          component: () => import("../components/Document.vue"),
        
        },
        {
          path: "/users",
          component: () => import("../components/User.vue"),
          
        },
        {
          path: "/logs",
          component: () => import("../components/Logs.vue"),
        },
      ]
    },


    
]
