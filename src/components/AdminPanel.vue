<template>
      <v-container>
            <v-toolbar
                color="white"
                dark
                class="mb-4"
                >
                <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

                <v-toolbar-title>
                    <div class="toolbar__logo item__row item__ac">
                         <!-- <img style="width: 80%" src="../assets/logo-turkic.svg" /> -->
                         <p class="mb-0 ml-4">RENT OFFICE</p>
                    </div>

                  
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <div class="item__row item__ac langs">
                    <p class="mr-2" @click="activeLang=1" v-bind:class="{'active__lang':activeLang==1}">RU</p>
                    <p class="mr-2" @click="activeLang=2" v-bind:class="{'active__lang':activeLang==2}">EN</p>
                </div>
                    
                <p style="color: black; margin-bottom: 0; cursor: pointer" @click="$router.push('/')">Выйти</p>


                <v-btn icon @click="logout()">
                    <v-icon >mdi-logout</v-icon>
                </v-btn>

            </v-toolbar>

          <v-row>

              <v-col class="menu" sm="3">

                   <v-card
                    class="pa-5"
                    outlined
                    tile
                    >

                 
                        <div class="mb-2 item__row item__ac menu__label"  v-if="role!=1" v-bind:class="{'active':$route.path=='/admin'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/profile?type=news&name='+content.content.offices)">{{content.content.offices}}</p>
                        </div>

                        <div class="mb-2 item__row item__ac menu__label" v-if="role==1"  v-bind:class="{'active':$route.path=='/orders'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/orders?type=news&name=')">Заказы</p>
                        </div>

                        
                    
                    </v-card>
              </v-col>

              <v-col class="" sm="9">

                   <v-card
                    class="pa-5"
                    outlined
                    tile
                    >
            
                        <router-view 
                            :lang="content"
                            :items="items"
                            :loading="loading"
                            :numberOfPages="numberOfPages"
                            :totalPage="totalPage"
                            :showModal="showModal" 


                            @callCreate="createData" 
                            @callUpdate="updateData" 
                            @callFormatDate="formatDate"

                            @fetchData="fetch"
                        
                        >
                        
                        </router-view>

                    </v-card>
              </v-col>



          </v-row>
      </v-container>

</template>

<script>
export default {
  data() {
    return {
        content: {
            content: {
                offices: ''
            }
        },
        me: '',
        showModal: false,
        items: [],
        loading:null,
        numberOfPages: null,
        totalPage: null,
        activeLang: 1,
        role: ''
    };
  },
  methods: {
    fetch(options=null) {
        this.loading = true;
        let url = "page?type="+this.$route.query.type;
        if(options)
            url = "page?type="+this.$route.query.type+'&per_page='+options.itemsPerPage+'&page='+options.page;
        this.$axios({
          method: "get",
          url:
            this.$API_URL +
            this.$API_VERSION +
            url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
        .then((response) => {
            this.items = response.data.data;
           
            this.loading = false;
            this.numberOfPages = response.data.total;
            this.totalPage = response.data.total;

        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(date) {
        if(date) {
            let d = date.split(' ')[0].split('-');
            let time = date.split(' ')[1].split(':');
            return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
        }
    },
    createData(obj,files=null) {
            let contractForm = new FormData();
            contractForm.append("data", JSON.stringify(obj));
            contractForm.append("type", this.$route.query.type);
    
            if(files)
                for (var i = 0; i < files.length; i++) {
                    contractForm.append("files[]", files[i]);
                }  
            this.$axios
                .post(this.$API_URL + this.$API_VERSION + "page", contractForm, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                this.showModal = false;
                this.$toast.open({
                    message: response.data.message,
                    type: "success",
                    position: "bottom",
                    duration: 4000,
                    queue: true,
                });
            })
            .catch((error) => {
                if (error.response && error.response.status == 422) {
                    this.$toast.open({
                    message: "Заполните все поля",
                    type: "error",
                    position: "bottom",
                    duration: 4000,
                    queue: true,
                    });
                }
            });
    },
    updateData(obj,files,id) {

            this.$axios.put(this.$API_URL + this.$API_VERSION + "page/"+id,
                {
                    data: JSON.stringify(obj),
                    type: this.$route.query.type
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                this.$toast.open({
                    message: response.data.message,
                    type: "success",
                    position: "bottom",
                    duration: 4000,
                    queue: true,
                });

                if(files.length>0)
                    this.uploadFiles(files,id);

                 this.showModal = false;
            })
            .catch((error) => {
                if (error.response && error.response.status == 422) {
                    this.$toast.open({
                    message: "Заполните все поля",
                    type: "error",
                    position: "bottom",
                    duration: 4000,
                    queue: true,
                    });

                }
            });     
    },
    logout() {
        localStorage.clear();
        this.$router.push('/');
    },
    getContentWord(val) {
            this.loading = true;
            let link = 'lang'
            this.$axios({
            method: "get",
            url:
                this.$API_URL +
                link,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    'Accept-Language': val==1?'ru':'en'
                },
                data: {
                    date: this.date
                }
            })
            .then((response) => {
                this.content = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }, 

  },
  mounted() {
    if(localStorage.getItem('lang')) {
        this.activeLang = localStorage.getItem('lang');
        this.getContentWord(localStorage.getItem('lang'));
    }else {
        this.getContentWord(1);
    }


    this.role = localStorage.getItem('role');
    
  },
  beforeMount() {

  },
  watch: {
    activeLang(val) {
        localStorage.setItem('lang',val);
        this.getContentWord(val);
    }
  },
};
</script>

<style lang="scss">
.langs {
    p {
        color: black;
        margin-bottom: 0;
        cursor: pointer;
    }
}
.active__lang {
    color: blue !important;
}
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

.images {
    img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 10px;
    }
}
.toolbar__logo {
    p {
        color: black;
    }
}
.menu {
    .menu__label {
        margin-bottom: 40px;
    }
    p {
        font-size: 19px;
    }
    i {
        font-size: 26px;
    }
}
</style>
