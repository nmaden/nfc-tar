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

        children: [

            {
                path: "/",
                component: () =>
                    import ("../views/Auth.vue"),
                name: "Sign",
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
                    import ("../components/Profile.vue"),
                name: "Registration",
            },



        ]
    },



]