<template>

  <div>

    <div class="item__row item__ac">

      <h2>ТУР 360</h2>

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
      <div class="item__row item__ac">
        <img :src="'https://api.kazaerospace.crocos.kz/'+item.path"/>


      </div>
      <v-divider></v-divider>
      <div class="item__row item__ac">
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
          <h3 class="mb-4" v-else>Редактировать новость</h3>


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
      idItem: '',
      me: null,
      selectedUser: null,
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
      this.type == 1 ? this.create() : this.update();
    },
    create() {
      let contractForm = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        contractForm.append("images[]", this.files[i]);
      }
      this.$axios
          .post(this.$API_URL + this.$API_VERSION + "tur/store", contractForm, {
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
    update() {
      this.$axios
          .put(this.$API_URL + this.$API_VERSION + "news/" + this.newsId,
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
            "tur",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
          .then((response) => {
            this.items = response.data;
            console.log(this.items);
          })
          .catch((error) => {
            console.log(error);
          });
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
            "tur/"+this.idItem,
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
