<template>
      <v-container>
            <v-toolbar
                color="#003E74"
                dark
                class="mb-4"
                >
                <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

                <v-toolbar-title>
                     <img style="width: 30%" src="../assets/logo-farab.svg" />
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <div class="item__column header__user">
                    <h3 class="mb-0">{{me.name}}</h3>
                    <p class="mb-0" v-if="me.role">{{me.role.name_rus}}</p>
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

                        <!-- <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/users'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/users')">Пользователи</p>
                        </div> -->

                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/admin'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/admin?type=news&name=Новости')">Новости</p>
                        </div>
                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/books'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/books?type=books&name=Книги')">Книги</p>
                        </div>

                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/announcements'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/announcements?type=announcement&name=Анонсы')">Анонсы</p>
                        </div>

                        <div class="mb-2 item__row item__ac" v-bind:class="{'active':$route.path=='/partner'}">
                            <i class="mdi mdi-label-variant mr-2"></i>
                            <p class="pointer mb-0" @click="$router.push('/partner?type=partner&name=Партнеры')">Партнеры</p>
                        </div>
                    </v-card>
              </v-col>

              <v-col class="" sm="9">

                   <v-card
                    class="pa-5"
                    outlined
                    tile
                    >
                        <router-view  @callCreate="createData" @callUpdate="updateData" @callFormatDate="formatDate"></router-view>

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
    formatDate(date) {
        if(date) {
            let d = date.split('T')[0].split('-');
            let time = date.split('T')[1].split(':');
            return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
        }
    },
    createData(obj,files) {
            let contractForm = new FormData();
            contractForm.append("data", JSON.stringify(obj));
            contractForm.append("type", obj.type);

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
                    type: obj.type
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
    uploadFiles(files,id) {
            let contractForm = new FormData();
            for (var i = 0; i < files.length; i++) {
                contractForm.append("files[]", files[i]);
            }
            this.$axios
                .post(this.$API_URL + this.$API_VERSION + "page/files/"+ id, contractForm, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                this.title =null;
                this.description = null;
                console.log(response);
                this.$toast.open({
                    message: "Успешно создано",
                    type: "success",
                    position: "bottom",
                    duration: 4000,
                    queue: true,
                });

                this.newsModal = false;
                this.type = 0;
                this.$refs.form.reset();
                this.fetch();

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
