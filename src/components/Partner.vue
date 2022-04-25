<template>

      <div>

        <div class="item__row item__ac">

            <h2>{{$route.query.name}}</h2>

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
            <p class="mb-2" v-if="JSON.parse(item.data)">На каз: {{JSON.parse(item.data).link_kaz}}</p>
            <p class="mb-2" v-if="JSON.parse(item.data)">На рус: {{JSON.parse(item.data).link}}</p>
            <p class="mb-6" v-if="JSON.parse(item.data)">На анг: {{JSON.parse(item.data).link_eng}}</p>

            <div  class="item__row item__ac">
                <div v-for="image in item.files"  :key="image.id" >
                    <img  :src="'http://127.0.0.1:8000/'+image.path" />
                </div>
            </div>
           
            <div class="item__row item__ac">
                <v-btn
                    small
                    class="mx-2 mr-2"
                    fab
                    dark
                    color="indigo"
                    @click="show(item.id,JSON.parse(item.data),item.files)"
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
                    @click="openDeleteModal(item.id)"
                    color="indigo"
                    >
                    <v-icon dark>
                        mdi-trash-can-outline
                    </v-icon>
                </v-btn>
            </div>

            <v-divider></v-divider>

        </div>
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

                <h3 class="mb-4" v-if="type==1">Создать </h3>
                <h3 class="mb-4" v-else>Редактировать </h3>

                <div class="item__column">
                    <v-text-field
                        v-model="link_kaz"
                        label="Ссылка казахском"
                        required
                        outlined
                        class="input"
                        :rules="nameRules"
                    ></v-text-field>
                </div>

                <div class="item__column">
                    <v-text-field
                        v-model="link"
                        label="Ссылка на русском"
                        required
                        outlined
                        class="input"
                        :rules="nameRules"
                    ></v-text-field>
                </div>
         
                <div class="item__column">
                    <v-text-field
                        v-model="link_eng"
                        label="Ссылка английском"
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


                <div class="item__column">
                    <div v-for="file in uploadedFiles" :key="file.id" class="item__row item__ac pointer mb-3">
                        <p class="mr-2 mb-0">{{file.path.split('/')[file.path.split('/').length-1]}}</p>
                        <i class="mdi mdi-trash-can-outline" @click="removeFile(file.id)"></i>
                    </div>
                </div> 


                 <v-btn
                    type="submit"
                    depressed
                    color="primary"
                    >
                   Сохранить изменения
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
  name: "News",
  data() {
    return {
         items: [],
         newsModal: false,
         destroyModal: false,
     
            nameRules: [
                v => !!v || 'Заполните поле'
            ],
            descriptionRules: [
                v => !!v || 'Заполните поле'
            ],
        files: [],
        type: 0,
        newsId:'',
        me: null,
        selectedUser: null,
        uploadedFiles: [],
        link: null,
        link_eng: null,
        link_kaz: null,
    };
  },
  methods: {
        removeFile(fileId) {
            this.$axios({
                method: "delete",
                url:
                this.$API_URL +
                this.$API_VERSION +
                "page/file/"+fileId,
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
                this.newsModal = false;
            })
            .catch((error) => {
                console.warn(error);
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
      chooseTypeFunction(type) {
          this.type = type;
          this.newsModal = true;
      },
      callFunction() {
          this.type==1?this.create():this.update();
      },
      create() {
            let obj = {
                link: this.link,
                link_eng: this.link_eng,
                link_kaz: this.link_kaz,
                type: this.$route.query.type
            };
            this.$refs.form.validate();
            this.$emit('callCreate',obj,this.files);
            this.fetch();
            this.type = 0;
            this.newsModal = false;
            this.$refs.form.reset();
        },
        show(id,item,files) {
            console.log(item.description_eng);
            this.id = id;
            this.newsModal = true;
            this.link = item.link;
            this.description =  item.description;
            this.link_eng = item.link_eng;
            this.link_kaz = item.link_kaz;
            this.description_eng = item.description_eng;
            this.description_kaz = item.description_kaz;
            this.uploadedFiles = files;
    
        },
        makeJson(item) {
            if(item)
                return JSON.parse(item);
        },
        openDeleteModal(id) {
          this.destroyModal = true;
          this.selectedUser = id;
        },
        deleteItem() {
            this.$axios({
            method: "delete",
            url:
                this.$API_URL +
                this.$API_VERSION +
                "page/"+this.selectedUser,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                this.link = response.data.link;
                this.description = response.data.description;
                this.fetch();
                this.destroyModal = false
            })
            .catch((error) => {
            console.log(error);
            });
        },
      update() {
            let obj = {
                link: this.link,
                link_eng: this.link_eng,
                link_kaz: this.link_kaz,
                type: this.$route.query.type
            };
            this.$emit('callUpdate',obj,this.files,this.id);
            this.fetch();
      },
      fetch() {
        this.$axios({
          method: "get",
          url:
            this.$API_URL +
            this.$API_VERSION +
            "page?type="+this.$route.query.type,
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
