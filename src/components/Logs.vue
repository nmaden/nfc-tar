<template>
 
      <div>

        <div class="item__row item__ac">
            <h2>Журналирования событий</h2>
        </div>


        <v-data-table
            :headers="headers"
            :items="users"
            :page="page"
            :loading="loading"
            :options.sync="options"
            :server-items-length="totalPage"
        >
        <template v-slot:item.created_at="{ item  }">

            {{formatDate(item.created_at)}}
        </template>
        <template v-slot:item.updated_at="{ item  }">

            {{formatDate(item.updated_at)}}
        </template>
          <template v-slot:item.action="{ item  }">
               
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <i
                      class="mdi mdi-pencil"
                      @click="openEditModal(item)"
                      v-bind="attrs"
                      v-on="on"
                      v-if="me.role.role == 'admin'"
                    ></i>
                  </template>
                  <span>Редактировать</span>
                </v-tooltip>

                 <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <i
                      class="mdi mdi-trash-can-outline"
                      @click="openDeleteModal(item)"
                      v-bind="attrs"
                      v-on="on"
                      v-if="me.role.role == 'admin'"
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
                    type="submit"
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
                        :rules="nameRules"
                    ></v-text-field>
                </div>

                 <div class="item__column">
                    <v-text-field
                        v-model="password"
                        label="Пароль"
                        required
                        outlined
                        class="input"
                        :rules="nameRules"
                    ></v-text-field>
                </div>

                 <v-btn
                    type="submit"
                    depressed
                    color="primary"
                    >
                    Создать
                </v-btn>

                </v-form>



            </v-card>
        </v-dialog>

      </div>

</template>

<script>

export default {
  name: "News",
  data() {
    return {
        headers: [
            {
            text: "№",
            align: "start",
            sortable: false,
            value: "id",
            },
            { text: "Инициатор", value: "user.name" },
            { text: "Действие", value: "message" },
            { text: "Дата создание", value: "created_at" }
        ],
         items: [],
         newsModal: false,
       
         description: '',
            nameRules: [
                v => !!v || 'Заполните поле'
            ],
            descriptionRules: [
                v => !!v || 'Заполните поле'
            ],
        files: [],
        type: 0,
        newsId:'',
        numberOfPages:null,
        totalPage : null,
        users:[],
        loading: true,
        page: 0,
        options: {
            itemsPerPage: 2,
            page: 1,
        },
        me: [],
        name: null,
        email: null,
        password: null,
        destroyModal: false,
        selectedUser: null
    };
  },
  methods: {
    formatDate(date) {  
      let d = date.split('T')[0].split('-');
      let time = date.split('T')[1].split(':');
      return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
    },
    openEditModal(item) {
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
            "logs?per_page="+this.options.itemsPerPage+'&page='+this.options.page,
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
          
            this.$axios
                .post(this.$API_URL + this.$API_VERSION + "user", {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  
                },
            })
            .then((response) => {
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
                this.title = response.data.title;
                this.description = response.data.description;
                this.fetch();
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
                    password: this.password
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                console.log(response);
                this.$toast.open({
                    message: "Успешно создано",
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