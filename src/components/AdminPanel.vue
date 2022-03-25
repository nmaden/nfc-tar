<template>
      <v-container>  
            <v-toolbar
                color="cyan"
                dark
                class="mb-4"
                >
                <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

                <v-toolbar-title>KazAeroSpace</v-toolbar-title>

                <v-spacer></v-spacer>

                <div class="item__column header__user">
                    <h3 class="mb-0">{{me.name}}</h3>
                    <p class="mb-0">{{me.role.name_rus}}</p>
                </div>


                <v-btn icon @click="logout()">
                    <v-icon >mdi-logout</v-icon>
                </v-btn>

            </v-toolbar>

          <v-row>
             
              <v-col class="" sm="3">

                   <v-card
                    class="pa-5"
                    outlined
                    tile
                    >

                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/users'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/users')">Пользователи</p>
                        </div>
                        
                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/admin'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/admin')">Новости</p>
                        </div>

                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/feedback'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/feedback')">Feedback</p>


                        </div>

                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/document'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/document')">Документы</p>

                        </div>

                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/projects'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/projects')">Наши проекты</p>
                        </div>


                        <!-- <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/team'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/team')">Наша команда</p>
                        </div> -->

                        <!-- <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/partners'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/team')">Партнеры</p>
                        </div> -->
                        
                        <!-- 
                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/gallery'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/team')">Галерея</p>
                        </div> -->

                        <!-- <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/about'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/about')">О компании</p>
                        </div> -->
                        <!-- 
                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/contacts'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/contacts')">Контакты</p>
                        </div> -->
                        
                    

                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/logs'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/logs')">Журналирования событий</p>
                        </div>
                        
                        

                    </v-card>
              </v-col>

              <v-col class="" sm="9">

                   <v-card
                    class="pa-5"
                    outlined
                    tile
                    >  
                        <router-view></router-view>

                    </v-card>
              </v-col>


              
          </v-row>
      </v-container>

</template>

<script>
export default {
  data() {
    return {
        me: ''
    };
  },
  methods: {
    getUser() {
           this.$axios({
            method: "get",
            url:
            this.$API_URL +
            this.$API_VERSION +
            "me",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
        .then((response) => {
            this.me = response.data;
        })
        .catch((error) => {
        console.warn(error);
        });
    },
      logout() {  
        localStorage.clear();
        this.$router.push('/');
      },
    formatDate(date) {  
      let d = date.split('T')[0].split('-');
      let time = date.split('T')[1].split(':');
      return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
    },
  },
  mounted() {
      this.getUser();
  },
  beforeMount() {

  },
  watch: {},
};
</script>

<style lang="scss">
.pointer {
    cursor:point;
}
.active {
    color: #AF9778;
}

.header__user {
    p {
        font-size: 12px;
    }
}

</style>
