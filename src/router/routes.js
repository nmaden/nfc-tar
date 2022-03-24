

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
        {
          path: "/team",
          component: () => import("../components/Team.vue"),
        },
        {
          path: "/partners",
          component: () => import("../components/Partners.vue"),
        },
        {
          path: "/projects",
          component: () => import("../components/Projects.vue"),
        },
        {
          path: "/gallery",
          component: () => import("../components/Gallery.vue"),
        },
      ]
    },


    
]
