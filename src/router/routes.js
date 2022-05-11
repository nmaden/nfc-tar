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
            {
                path: "/contacts",
                component: () =>
                    import ("../components/Contacts.vue"),
            },
            {
                path: "/visitors",
                component: () =>
                    import ("../components/Visitors.vue"),
            },
            {
                path: "/gallery",
                component: () =>
                    import ("../components/Gallery.vue"),
            },
            {
                path: "/about",
                component: () =>
                    import ("../components/About.vue"),
            },


        ]
    },



]