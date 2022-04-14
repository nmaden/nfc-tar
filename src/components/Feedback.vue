<template>
      <div>

          <div  v-for="(feed,index) in feeds" :key="index">

              <p>{{feed.name}} <v-btn
                  depressed
                  color="primary"
                  @click="openSendModal(feed)"
              >
                Добавить сообщение
              </v-btn></p>
              <div class="item__row item__ac">
                <i class="mdi mdi-phone mr-2"></i>
                <a class="" :href="'tel:'+feed.phone"> {{feed.phone}}</a>

              </div>
              <div class="item__row item__ac">
                <i class="mdi mdi-email mr-2"></i>
                <p class="mb-0">{{feed.email}}</p>
              </div>
            <div class="item__row item__ac">
              <i class="mdi mdi-email mr-2"></i>
              <p class="mb-0">{{feed.message}}</p>
            </div>
              <div class="item__row item__ac">

                <div  v-for="(getMessage,index) in feed.messages" :key="index">
                      <p class="mb-0">Отвечен : {{ getMessage.message}}</p>
                </div>
              </div>

              <div class="item__row item__ac">

                <i class="mdi mdi-clock-time-eight-outline mr-2"></i>
                <p class="mb-0">{{formatDate(feed.created_at)}}</p>

              </div>

              <v-divider></v-divider>
          </div>

        <v-dialog v-model="sendModal" width="500">
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
    };
  },
  methods: {
    formatDate(date) {
      let d = date.split('T')[0].split('-');
      let time = date.split('T')[1].split(':');
      return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
    },
    openSendModal(item) {
      this.sendModal = true;
      this.id = item.id;

    },
    callFunction() {
      this.create();
    },
    fetch() {
            this.$axios({
            method: "get",
            url:
                this.$API_URL +
                this.$API_VERSION +
                "feedback",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                this.feeds = response.data.data;
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
  watch: {},
};
</script>
