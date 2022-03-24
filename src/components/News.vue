<template>
 
      <div>

        <div class="item__row item__ac">

            <h2>Новости</h2>

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
                
        <div class="item__column  pa-4 mb-2 news__list" v-for="item in items" :key="item.id">

            <div  class="item__row item__ac">
             
                <div v-for="image in item.images"  :key="image.id" >
                  
                    <img  :src="'http://127.0.0.1:8000/'+image.img_path" />
                </div>
                
                
            </div>
            <p class="mb-2">{{ item.title }}</p>
                <p>{{ item.description }}</p>
            <div class="item__row item__ac">
                <v-btn
                    small
                    class="mx-2 mr-2"
                    fab
                    dark
                    color="indigo"
                    @click="show(item.id)"
                    >
                    <v-icon dark>
                        mdi-pencil
                    </v-icon>
                </v-btn>

                <v-btn
                    v-if="me && me.role.role == 'admin'"
                    small
                    class="mx-2 mr-2"
                    fab
                    dark
                    color="indigo"
                    @click="deleteItem(item.id)"
                    >
                    <v-icon dark>
                        mdi-trash-can-outline
                    </v-icon>
                </v-btn>
            </div>

            <v-divider></v-divider>

        </div>


        <v-dialog v-model="newsModal" width="500">
            <v-card class="pa-6">
                <v-form
                    @submit.prevent="callFunction()"
                    ref="form"
                    class="sign__page__block"
                >

                <h3 class="mb-4" v-if="type==1">Создать новость</h3>
                <h3 class="mb-4" v-else>Редактировать новость</h3>
                <div class="item__column">
                    <v-text-field
                        v-model="title"
                        label="Название"
                        required
                        outlined
                        class="input"
                        :rules="nameRules"
                    ></v-text-field>
                </div>
                <div class="item__column">
                     <v-textarea
                         v-model="description"
                        filled
                        name="input-7-4"
                        label="Описание"

                        :rules="descriptionRules"
                        
                    ></v-textarea>
                </div>

                <div>
                     <v-file-input
                        chips
                        counter
                        multiple
                        show-size
                        small-chips
                        truncate-length="15"
                        v-model="files"
                    ></v-file-input>
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
         items: [],
         newsModal: false,
         title: '',
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
        me: null
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
      chooseTypeFunction(type) {
          this.type = type;
          this.newsModal = true;
      },
      callFunction() {
          this.type==1?this.create():this.update();
      },
      create() {
            let contractForm = new FormData();
            for (var i = 0; i < this.files.length; i++) {
                contractForm.append("images[]", this.files[i]);
            }
            contractForm.append("title", this.title);
            contractForm.append("description", this.description);
            this.$axios
                .post(this.$API_URL + this.$API_VERSION + "news", contractForm, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "multipart/form-data",
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
                "news/"+id,
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
        deleteItem(id) {
            this.$axios({
            method: "delete",
            url:
                this.$API_URL +
                this.$API_VERSION +
                "news/"+id,
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
                .put(this.$API_URL + this.$API_VERSION + "news/"+this.newsId, 
                {
                    title: this.title,
                    description: this.description
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
      fetch() {
        this.$axios({
          method: "get",
          url:
            this.$API_URL +
            this.$API_VERSION +
            "news",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
        .then((response) => {
            this.items = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      }
  },
  mounted() {
      this.fetch();
      this.getUser();
  },
  beforeMount() {

  },
  watch: {},
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