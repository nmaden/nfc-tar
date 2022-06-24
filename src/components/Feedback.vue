<template>
      <div>

          <div class="item__row item__ac">
            <h2>Заявки</h2>
          </div>


            <v-data-table
                  :headers="headers"
                  :items="feeds"
                  :page="page"
                  :loading="loading"
                  :options.sync="options"
                  :server-items-length="totalPage"
              >
              <template v-slot:item.id="{ item,index  }">
                  {{index+1}}
              </template>
              <template v-slot:item.created_at="{ item  }">
                  {{formatDate(item.created_at)}}
              </template>
              <template v-slot:item.updated_at="{ item  }">
                  {{formatDate(item.updated_at)}}
              </template>
            </v-data-table>


        <v-dialog v-model="sendModal" width="800">
          <v-card class="pa-6">
            <v-form
                @submit.prevent="callFunction()"
                ref="form"
                class="sign__page__block"
            >

              <h3 class="mb-4">Добавить сообщение</h3>
              <div class="item__column">
                <v-textarea
                    v-model="description"
                    filled
                    name="input-7-4"
                    label="Сообщение"
                ></v-textarea>
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
                  @click="sendModal=false"
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
  name: "Feedback",
  data() {
    return {
      feeds: [],
      me: null,
      sendModal: false,
      description:'',
      id:'',
      loading: false,
      numberOfPages: null,
      totalPage: null,
      page: 0,
      options: {
          itemsPerPage: 10,
          page: 1,
      },
      headers: [
            {
            text: "№",
            align: "start",
            sortable: false,
            value: "id",
            },
            { text: "ФИО", value: "name" },
            { text: "Email", value: "email" },
            { text: "Сообщение", value: "message" },
            { text: "Телефон", value: "phone" },
            { text: "Дата создание", value: "created_at" },
            { text: "Дата редактирование", value: "updated_at" },
      ],
    };
  },
  methods: {
    formatDate(date) {
      let d = date.split(' ')[0];
      let t = date.split(' ')[1];
      return d.split('-')[2]+'.'+d.split('-')[1]+'.'+d.split('-')[0]+' '+t;
    },
    openSendModal(item) {
      this.sendModal = true;
      this.id = item.id;

    },
    callFunction() {
      this.create();
    },
    fetch() {
        this.loading = true;
        this.$axios({
        method: "get",
        url:
            this.$API_URL +
            this.$API_VERSION +
            "feedback?per_page="+this.options.itemsPerPage+'&page='+this.options.page,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
        .then((response) => {
            this.feeds = response.data.data;
            this.loading = false;
            this.numberOfPages = response.data.total;
            this.totalPage = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    create() {
      this.$axios
          .post(this.$API_URL + this.$API_VERSION + "feedback/send/"+ this.id, {
            message:this.description,
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,

            },
          })
          .then((response) => {
            this.description = null;
            console.log(response);
            this.$toast.open({
              message: response.data.message,
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
    }
  },
  mounted() {
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
