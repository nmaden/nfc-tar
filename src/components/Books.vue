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



        <v-data-table
            :headers="headers"
            :items="items"
            :page="page"
            :loading="loading"
            :options.sync="options"
            :server-items-length="totalPage"
        >  

         
        <template v-slot:item.data="{ item  }">
       
            <p class="mb-2" v-if="JSON.parse(item.data)">На каз: {{JSON.parse(item.data).title_kaz}}</p>
            <p class="mb-2" v-if="JSON.parse(item.data)">На рус: {{JSON.parse(item.data).title}}</p>
            <p class="mb-6" v-if="JSON.parse(item.data)">На анг: {{JSON.parse(item.data).title_eng}}</p>

            <p class="mb-2" v-if="JSON.parse(item.data)">На каз: {{JSON.parse(item.data).description_kaz}}</p>
            <p class="mb-2" v-if="JSON.parse(item.data)">На рус: {{JSON.parse(item.data).description}}</p>
            <p class="mb-2" v-if="JSON.parse(item.data)">На анг: {{JSON.parse(item.data).description_eng}}</p>
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
                      @click="show(item.id,JSON.parse(item.data),item.files)"
                      v-bind="attrs"
                      v-on="on"
                    ></i>
                  </template>
                  <span>Редактировать</span>
                </v-tooltip>

                 <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <i
                        style="margin: 10px;"
                      class="mdi mdi-trash-can-outline"
                      @click="openDeleteModal(item.id)"
                      v-bind="attrs"
                      v-on="on"
                    ></i>
                  </template>
                  <span>Удалить</span>
                </v-tooltip>

              </template>
        </v-data-table>

   
        <!-- <div class="item__column  pa-4 mb-2 news__list" v-for="item in items" :key="item.id">
            <p class="mb-2" v-if="JSON.parse(item.data)">На каз: {{JSON.parse(item.data).title_kaz}}</p>
            <p class="mb-2" v-if="JSON.parse(item.data)">На рус: {{JSON.parse(item.data).title}}</p>
            <p class="mb-6" v-if="JSON.parse(item.data)">На анг: {{JSON.parse(item.data).title_eng}}</p>

            <p class="mb-2" v-if="JSON.parse(item.data)">На каз: {{JSON.parse(item.data).description_kaz}}</p>
            <p class="mb-2" v-if="JSON.parse(item.data)">На рус: {{JSON.parse(item.data).description}}</p>
            <p class="mb-2" v-if="JSON.parse(item.data)">На анг: {{JSON.parse(item.data).description_eng}}</p>
            <div  class="item__row item__ac">
                <div v-for="image in item.files"  :key="image.id" >
                    <img  :src="'https://api.library.crocos.kz/'+image.path" />
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
        </div> -->


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

        <v-dialog v-model="showModal" width="500">
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

                <div class="item__column">
                    <v-text-field
                        v-model="title_eng"
                        label="Название английском"
                        required
                        outlined
                        class="input"
                        :rules="nameRules"
                    ></v-text-field>
                </div>
                <div class="item__column">
                     <v-textarea
                         v-model="description_eng"
                        filled
                        name="input-7-4"
                        label="Описание английском"

                        :rules="descriptionRules"

                    ></v-textarea>
                </div>

                <div class="item__column">
                    <v-text-field
                        v-model="title_kaz"
                        label="Название казахском"
                        required
                        outlined
                        class="input"
                        :rules="nameRules"
                    ></v-text-field>
                </div>
                <div class="item__column">
                     <v-textarea
                         v-model="description_kaz"
                        filled
                        name="input-7-4"
                        label="Описание казахском"

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


                <div class="item__column">
              
                    <div v-for="file in uploadedFiles" :key="file.id" class="item__row item__ac pointer mb-3 images">
                        <!-- <p class="mr-2 mb-0">{{file.path.split('/')[file.path.split('/').length-1]}}</p> -->

                        <img class="mr-2" :src='"https://api.library.crocos.kz/"+file.path' />
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
                    @click="showModal=false"
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
  props: ['showModal'],
  name: "News",
  data() {
    return {
        numberOfPages:null,
        totalPage : null,
        loading: true,
        page: 0,
        options: {
            itemsPerPage: 5,
            page: 1,
        },
         items: [],
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
        title: null,
        description: null,
        title_eng: null,
        title_kaz: null,
        description_eng: null,
        description_kaz: null,
        headers: [
            {
            text: "№",
            align: "start",
            sortable: false,
            value: "id",
            },
            { text: "Данные", value: "data" },
            { text: "Дата создание", value: "created_at" },
            { text: "Дата редактирование", value: "updated_at" },
            { text: 'Действие', value: 'action' },
        ],
    };
  },
  methods: {
          formatDate(date) {
                if(date) {
                    let d = date.split(' ')[0].split('-');
                    let time = date.split(' ')[1].split(':');
                    return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
                }
            },
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
                this.showModal = false;
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
          this.showModal = true;
      },
      callFunction() {
          this.type==1?this.create():this.update();
      },
      create() {
            let obj = {
                title: this.title,
                description: this.description,
                title_eng: this.title_eng,
                description_eng: this.description_eng,
                title_kaz: this.title_kaz,
                description_kaz: this.description_kaz,
                type: this.$route.query.type
            };
            this.$refs.form.validate();
            this.$emit('callCreate',obj,this.files);
            this.fetch();
            this.type = 0;
            this.$refs.form.reset();
        },
        show(id,item,files) {
            this.id = id;
            this.showModal = true;
            this.title = item.title;
            this.description =  item.description;
            this.title_eng = item.title_eng;
            this.title_kaz = item.title_kaz;
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
                this.title = response.data.title;
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
                title: this.title,
                description: this.description,
                title_eng: this.title_eng,
                description_eng: this.description_eng,
                title_kaz: this.title_kaz,
                description_kaz: this.description_kaz,
                type: this.$route.query.type
            };
            this.$emit('callUpdate',obj,this.files,this.id);
            this.fetch();
      },
      fetch() {
        this.loading = true;
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
            this.loading = false;
            this.numberOfPages = response.data.total;
            this.totalPage = response.data.total;

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
