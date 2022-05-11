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
                {{item.files}}
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

        <v-dialog v-model="openModal" width="500">
            <v-card class="pa-6">
                <v-form
                    @submit.prevent="callFunction()"
                    ref="form"
                    class="sign__page__block"
                >

                <h3 class="mb-4" v-if="type==1">Создать </h3>
                <h3 class="mb-4" v-else>Редактировать </h3>


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
                        <img class="mr-2" :src='"http://127.0.0.1:8000/"+file.path' />
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
                    @click="openModal=false"
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
  props: [
      'showModal',
      'items',
      'loading',
      'numberOfPages',
      'totalPage'
  ],
  name: "News",
  data() {
    return {
        openModal: this.showModal,
        page: 0,
        options: {
            itemsPerPage: 5,
            page: 1,
        },
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
            { text: "Дата создание", value: "created_at" },
            { text: "Дата редактирование", value: "updated_at" },
            { text: 'Действие', value: 'action' },
        ],
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
                this.$emit('fetchData',this.options);
                this.openModal = false;
            })
            .catch((error) => {
                console.warn(error);
            });
        },
      chooseTypeFunction(type) {
          this.type = type;
          this.openModal = true;
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
            this.$refs.form.reset();
            this.openModal = false;
            this.$emit('fetchData',this.options);
        },
        show(id,item,files) {
            this.id = id;
            this.openModal = true;
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
                this.$emit('fetchData',this.options);
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
            this.$emit('fetchData',this.options);
            this.openModal = false;
      },
  },
  mounted() {
      this.$emit('fetchData',this.options);
  },
  beforeMount() {

  },
  watch: {
    options: {
      handler(val) {
        if (val.itemsPerPage < 0) {
          val.itemsPerPage = this.totalPage;
            this.$emit('fetchData',this.options);
        } else {
            this.$emit('fetchData',this.options);
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
