export const routes = [{
        path: '/',
        name: "Login",
        component: () =>
            import ('../views/Auth.vue'),
    },
    {
        path: '/admin',
        component: () =>
            import ('../components/AdminPanel.vue'),

        children: [{
                path: "/",
                component: () =>
                    import ("../components/News.vue"),
                name: "Admin",
            },

            {
                path: "/news",
                component: () =>
                    import ("../components/News.vue"),
            },
            {
                path: "/users",
                component: () =>
                    import ("../components/User.vue"),
            },


        ]
    },



]