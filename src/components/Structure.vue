<template>
  <div>
    <div class="item__row item__ac">
      <h2>Структура</h2>
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
        <img v-if="item.image"  :src="'https://api.kazaerospace.crocos.kz/'+item.image" />
      </div>
      <p class="mb-2">ФИО:{{ item.name }}</p>
      <p>Должность : {{ item.responsible }}</p>
      <p>Биография : {{ item.about }}</p>
      <p>Дата создание : {{ formatDate(item.created_at) }}</p>
      <p>Приоритет : {{ item.priority }}</p>
      <div class="item__row item__ac">
        <v-btn
            small
            class="mx-2 mr-2"
            fab
            dark
            color="indigo"
            @click="show(item)"
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

          <h3 class="mb-4" v-if="type==1">Создать</h3>
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
            <v-text-field
                v-model="responsible"
                label="Должность"
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
                label="О себе"

                :rules="descriptionRules"

            ></v-textarea>
          </div>

          <div class="item__column">
            <v-text-field
                v-model="priority"
                filled
                name="input-7-4"
                label="Приоритет"
                type="number"
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

            <div class="item__column" v-if="uploadedFiles.length>0">
              <div  class="item__row item__ac pointer mb-3">
                  <p class="mr-2 mb-0">{{uploadedFiles}}</p>
                  <i class="mdi mdi-trash-can-outline" @click="removeFile(idItem)"></i>
              </div>
          </div>

       
          <v-btn
              type="submit"
              depressed
              color="primary"
              class="mr-2"
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
  name: "Team",
  data() {
    return {
      dateModal: false,
      timeModal: false,
      date: '',
      picker: '',
      items: [],
      newsModal: false,
      destroyModal: false,
      title: '',
      description: '',
      responsible: '',
      created_at: '',
      nameRules: [
        v => !!v || 'Заполните поле'
      ],
      descriptionRules: [
        v => !!v || 'Заполните поле'
      ],
      files: [],
      type: 0,
      idItem:'',
      me: null,
      selectedUser: null,
      options: {
        itemsPerPage: 2,
        page: 1
      },
      priority: 0,
      uploadedFiles: []
    };
  },
  methods: {
    removeFile(fileId) {
            this.$axios({
                method: "delete",
                url:
                this.$API_URL +
                this.$API_VERSION +
                "structure/file/"+fileId,
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
    formatDate(date) {
      let d = date.split('T')[0].split('-');
      let time = date.split('T')[1].split(':');
      return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
    },
    formatDateSecond(date) {
      let d = date.split('T')[0].split('-');
      let time = date.split('T')[1].split(':');
      return d[0]+'-'+d[1]+'-'+d[2]+' '+time[0]+':'+time[1];
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
      let contractForm = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        contractForm.append("images[]", this.files[i]);
      }

      contractForm.append("name", this.title);
      contractForm.append("about", this.description);
      contractForm.append("responsible", this.responsible);

      this.$axios
          .post(this.$API_URL + this.$API_VERSION + "structure", contractForm, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
              this.files = [];
              this.title = null;
              this.description = null;
              this.responsible = null;
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
    show(item) {
      console.log(item);
      this.idItem = item.id;
      this.uploadedFiles = item.image;
      this.newsModal = true;
      this.title = item.name;
      this.responsible = item.responsible;
      this.priority = item.priority;
      this.description = item.about;

    },
    openDeleteModal(item) {
      this.destroyModal = true;
      this.idItem = item;
    },
    deleteItem() {
      this.$axios({
        method: "delete",
        url:
            this.$API_URL +
            this.$API_VERSION +
            "delete/structure/"+this.idItem,
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
      let contractForm = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        contractForm.append("images[]", this.files[i]);
      }

      contractForm.append("name", this.title);
      contractForm.append("about", this.description);
      contractForm.append("responsible", this.responsible);
      contractForm.append("priority", this.priority);

      this.$axios
          .post(this.$API_URL + this.$API_VERSION + "show/structure/" + this.idItem, contractForm, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.files = [];
            this.title = null;
            this.description = null;
            this.responsible = null;
            this.priority = null;
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
            "structures",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
          .then((response) => {
              this.items = response.data;
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

.pointer {
  cursor: pointer;
}
.pointer:hover {
  opacity: 0.8;

}
</style>
