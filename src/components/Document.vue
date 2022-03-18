<template>
 
      <div>

        <div class="item__row item__ac">

            <h2>Документы</h2>

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


            <p class="mb-2">{{ item.name }}</p>


            <a  class="mb-10" v-for="file in item.files" :key="file.id" :href="'http://127.0.0.1:8000/'+file.document_path" target="_blank" download> {{file.document_path}} </a>


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

        </div>


        <v-dialog v-model="newsModal" width="500">
            <v-card class="pa-6">
                <v-form
                    @submit.prevent="callFunction()"
                    ref="form"
                    class="sign__page__block"
                >

                <h3 class="mb-4" v-if="type==1">Создать документ</h3>
                <h3 class="mb-4" v-else>Редактировать документ</h3>
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
        newsId:''
    };
  },
  methods: {
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
                .post(this.$API_URL + this.$API_VERSION + "document", contractForm, {
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
                "document/"+id,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                this.newsModal = true;
                this.title = response.data.name;
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
                "document/"+id,
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
                .put(this.$API_URL + this.$API_VERSION + "document/"+this.newsId, 
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
                this.uploadFiles();
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
      uploadFiles() {
            let contractForm = new FormData();
            for (var i = 0; i < this.files.length; i++) {
                contractForm.append("images[]", this.files[i]);
            }
            this.$axios
                .post(this.$API_URL + this.$API_VERSION + "document/file", contractForm, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response);
             
                this.files = [];
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
      fetch() {
        this.$axios({
          method: "get",
          url:
            this.$API_URL +
            this.$API_VERSION +
            "document",
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