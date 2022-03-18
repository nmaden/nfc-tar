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

                <img src="http://127.0.0.1:8000/storage/news/sd.png" alt="">
                        
                        <div class="item__row item__ac" v-bind:class="{'active':$route.path=='/users'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/users')">Пользователи</p>
                        </div>
                        
                        <div class="item__row item__ac" v-bind:class="{'active':$route.path=='/admin'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/admin')">Новости</p>
                        </div>

                        <div class="item__row item__ac" v-bind:class="{'active':$route.path=='/feedback'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/feedback')">Feedback</p>


                        </div>

                        <div class="item__row item__ac" v-bind:class="{'active':$route.path=='/document'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/document')">Документы</p>

                        </div>


                        <div class="item__row item__ac" v-bind:class="{'active':$route.path=='/logs'}">
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
 
  name: "AdminPanel",
  data() {
    return {
   
    };
  },
  methods: {
      logout() {
          
            localStorage.clear();
          this.$router.push('/login');
      },
    formatDate(date) {  
      let d = date.split('T')[0].split('-');
      let time = date.split('T')[1].split(':');
      return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
    },
  },
  mounted() {
  
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

</style>
