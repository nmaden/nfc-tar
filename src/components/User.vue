<template>

      <div>

        <div class="item__row item__ac">

            <h2>Пользователи</h2>

            <v-btn
                small
                class="mx-2"
                fab
                dark
                color="indigo"
                @click="chooseTypeFunction(1)"
                >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>

        </div>


        <v-data-table
            :headers="headers"
            :items="users"
            :page="page"
            :loading="loading"
            :options.sync="options"
            :server-items-length="totalPage"
        >

         <template v-slot:item.id="{ item,index  }">

            {{index+1}}

            
        </template>

        <template v-slot:item.role="{ item  }">

            <p v-if="item.role">{{item.role}}</p>

            
        </template>
        <template v-slot:item.created_at="{ item  }">

            {{formatDate(item.created_at)}}
        </template>
        <template v-slot:item.updated_at="{ item  }">

            {{formatDate(item.updated_at)}}
        </template>
          <template v-slot:item.action="{ item  }" >

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <i

                      class="mdi mdi-pencil "
                      @click="openEditModal(item)"
                      v-bind="attrs"
                      v-on="on"
                      v-if="me.role && me.role.role == 'admin'"
                    ></i>
                  </template>
                  <span>Редактировать</span>
                </v-tooltip>

                 <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <i
                        style="margin: 10px;"
                      class="mdi mdi-trash-can-outline"
                      @click="openDeleteModal(item)"
                      v-bind="attrs"
                      v-on="on"
                      v-if="me.role && me.role.role == 'admin'"
                    ></i>
                  </template>
                  <span>Удалить</span>
                </v-tooltip>

              </template>
        </v-data-table>

        <v-dialog v-model="destroyModal" width="500">
            <v-card class="pa-6">
                <h3 class="mb-4">Удалить запись</h3>
                 <v-btn
                    type="submit"
                    depressed
                    color="primary"
                    @click="deleteItem()"
                    >
                    Да
                </v-btn>

                 <v-btn
                    depressed
                    color="default"
                    @click="destroyModal=false"
                    >
                    Отмена
                </v-btn>
            </v-card>
        </v-dialog>
        <v-dialog v-model="newsModal" width="500">
            <v-card class="pa-6">
                <v-form
                    @submit.prevent="callFunction()"
                    ref="form"
                    class="sign__page__block"
                >

                <h3 class="mb-4" v-if="type==1">Создать пользователя</h3>
                <h3 class="mb-4" v-else>Редактирование пользователя</h3>

                <div class="item__column">
                    <v-text-field
                        v-model="name"
                        label="ФИО"
                        required
                        outlined
                        class="input"
                        :rules="nameRules"
                    ></v-text-field>
                </div>

                <div class="item__column">
                    <v-text-field
                        v-model="email"
                        label="Email"
                        required
                        outlined
                        class="input"
                        :rules="emailRules"
                    ></v-text-field>
                </div>
                <v-select
                    v-if="me.role && me.role.role == 'admin'"
                    :items="roles"
                    outlined
                    :hide-details="true"
                    :flat="true"
                    item-text="name_rus"
                    item-value="id"
                    item-color="#000"
                    dense
                    v-model="role"
                    required
                    class="mb-5"
                    label="Выберите роль"

                        :rules="nameRules"
                ></v-select>

                <div class="item__column" v-if="type==1">
                    <v-text-field
                        v-model="password"
                        label="Пароль"
                        required
                        outlined
                        class="input"
                        :rules="passwordRules"
                    ></v-text-field>
                </div>
                <div class="item__column" v-else>
                    <v-text-field
                        v-model="password"
                        label="Пароль"
                        required
                        outlined
                        class="input"
                        :rules="passwordRules"
                    ></v-text-field>
                </div>




                 <v-btn
                    type="submit"
                    depressed
                    color="primary"
                    v-if="type==1" >
                    Создать
                </v-btn>
                  <v-btn
                      type="submit"
                      depressed
                      color="primary"
                      v-else>
                    Редактировать
                  </v-btn>

                  <v-btn
                      depressed
                      color="default"
                      @click="newsModal=false"
                  >
                    Отмена
                  </v-btn>
                </v-form>



            </v-card>
        </v-dialog>

      </div>

</template>

<script>

export default {
  name: "User",
  data() {
    return {
        nameRules: [
            v => !!v || 'Заполните поле'
        ],
        emailRules: [
            v => !!v || 'Заполните поле',
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Не правильный email'
        ],
        passwordRules: [
            v => v && v.length>6 || 'Длина пароля меньше от 6'
        ],
        user: null,
        headers: [
            {
            text: "№",
            align: "start",
            sortable: false,
            value: "id",
            },
            { text: "ФИО", value: "name" },
            { text: "Email", value: "email" },
            { text: "Роль", value: "role.name_rus", sortable: true },
            { text: "Дата создание", value: "created_at" },
            { text: "Дата редактирование", value: "updated_at" },
            { text: 'Действие', value: 'action' },
        ],
         items: [],
         newsModal: false,

         description: '',


        files: [],
        type: 0,
        newsId:'',
        numberOfPages:null,
        totalPage : null,
        users:[],
        loading: true,
        page: 0,
        options: {
            itemsPerPage: 5,
            page: 1,
        },
        me: [],
        name: null,
        email: null,
        password: null,
        destroyModal: false,
        selectedUser: null,
        roles: [],
        role: null,
    };
  },
  methods: {
    getProfile() {
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
            this.user = response.data;
        })
        .catch((error) => {
            console.warn(error);
        });
    },
    getRoles() {
        this.$axios({
            method: "get",
            url:
            this.$API_URL +
            this.$API_VERSION +
            "role",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
        .then((response) => {
            this.roles = response.data;
        })
        .catch((error) => {
            console.warn(error);
        });
    },
    formatDate(date) {
      let d = date.split('T')[0].split('-');
      let time = date.split('T')[1].split(':');
      return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
    },
    openEditModal(item) {


        this.roles.forEach(element => {
               if(element.id==item.role.id) {
                   this.role = element;
               }
        });




        this.selectedUser = item;
        this.newsModal=true;
        this.name = item.name;
        this.email = item.email;
    },
    openDeleteModal(item) {
        this.destroyModal = true;
        this.selectedUser = item;
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
    fetch() {
        this.loading = true;
        // if (!this.options.sortBy[0]) {
        //     this.options.sortBy[0] = "id";
        // }
        this.$axios({
            method: "get",
            url:
            this.$API_URL +
            this.$API_VERSION +
            "user?per_page="+this.options.itemsPerPage+'&page='+this.options.page,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((response) => {
                this.loading = false;
                this.numberOfPages = response.data.total;
                this.totalPage = response.data.total;

                this.users = response.data.data;


            })
            .catch((error) => {
            console.warn(error);
            });
    },
      chooseTypeFunction(type) {
          this.type = type;
          this.newsModal = true;
      },
      callFunction() {
          this.type==1?this.create():this.update();
      },
      create() {
             this.$refs.form.validate()
            this.$axios 
                .post(this.$API_URL + this.$API_VERSION + "user", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    role: this.role
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,

                },
            })
            .then((response) => {
                console.log(response);
                this.$toast.open({
                    message: response.data.message,
                    type: "success",
                    position: "bottom",
                    duration: 4000,
                    queue: true,
                });

                this.name = '';
                this.email = '';
                this.password = '';
                this.role = '';
               

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
        show(id) {
            this.newsId = id;
            this.$axios({
            method: "get",
            url:
                this.$API_URL +
                this.$API_VERSION +
                "user/"+id,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {

                this.newsModal = true;
                this.title = response.data.title;
                this.description = response.data.description;
            })
            .catch((error) => {
            console.log(error);
            });
        },
        deleteItem() {
            this.$axios({
            method: "delete",
            url:
                this.$API_URL +
                this.$API_VERSION +
                "user/"+this.selectedUser.id,
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
              this.fetch();
              this.destroyModal = false;
            })
            .catch((error) => {
            console.log(error);
            });
        },
        update() {
            this.$axios
                .put(this.$API_URL + this.$API_VERSION + "user/"+this.selectedUser.id,
                {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    role: this.role
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

                this.newsModal = false;

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

  },


  mounted() {
      this.getUser();
      this.fetch();
      this.getRoles();
  },
  beforeMount() {

  },
watch: {
    options: {
      handler(val) {
        if (val.itemsPerPage < 0) {
          val.itemsPerPage = this.totalPage;
          this.fetch();
        } else {
          this.fetch();
        }
      },
    },

    deep: true,

  },
};
</script>


<style lang="scss">
.news__list {
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
}
</style>
