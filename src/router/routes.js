export const routes = [{
    path: '/',
    name: "Login",
    component: () =>
        import ('../views/Auth.vue'),
},
    {
        path: "/registration",
        component: () =>
            import ("../views/Registration.vue"),
        name: "Registration",
    },
    {
        path: "/profile",
        component: () =>
            import ("../views/Profile.vue"),
        name: "Registration",
    },
    {
        path: "/guest/{id?}",
        component: () =>
            import ("../views/Guest.vue"),
        name: "Guest",
    },
    {
        path: '/main',
        component: () =>
            import ('../views/Main.vue'),
        children: [
            {
                path: "/",
                component: () =>
                    import ("../views/Profile.vue"),
                name: "Sign",
            },
            {
                path: "/settings",
                component: () =>
                    import ("../views/ProfileSettings.vue"),
                name: "Sign",
            },
            {
                path: "/result",
                component: () =>
                    import ("../views/Result.vue"),
                name: "Sign",
            },
        ]

    },

    {
        path: '/admin',
        component: () =>
            import ('../components/AdminPanel.vue'),

        children: [{
            path: "/",
            component: () =>
                import ("../views/Auth.vue"),
            name: "Sign",
        },

            {
                path: "/orders",
                component: () =>
                    import ("../components/Orders.vue"),
                name: "Orders",
            },
            {
                path: "/profile",
                component: () =>
                    import ("../components/Profile.vue"),
                name: "Registration",
            },


        ]
    },


]