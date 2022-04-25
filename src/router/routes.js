export const routes = [{
        path: '/sign',
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
                path: "/books",
                component: () =>
                    import ("../components/Books.vue"),
            },
            {
                path: "/announcements",
                component: () =>
                    import ("../components/Announcements.vue"),
            },
            {
                path: "/partner",
                component: () =>
                    import ("../components/Partner.vue"),
            },
            {
                path: "/users",
                component: () =>
                    import ("../components/User.vue"),
            },


        ]
    },



]