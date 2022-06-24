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
                path: "/artefacts",
                component: () =>
                    import ("../components/Artefacts.vue"),
            },
            {
                path: "/science",
                component: () =>
                    import ("../components/Science.vue"),
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
                path: "/about",
                component: () =>
                    import ("../components/About.vue"),
            },
            {
                path: "/feedback",
                component: () =>
                    import ("../components/Feedback.vue"),
            },


        ]
    },



]