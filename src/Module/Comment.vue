<template>
  <div class="wrapper">
    <div class="row mt-10">
      <div class="col-lg-4">
        <h3>Коментарии к договору</h3>
        <button type="submit" class="sign__button mr-2" @click="dialogStatus = true">
          Добавить комментарий
        </button>

        <div class="comment__items">
          <div class="comment__item" v-for="(item, index) in comments" :key="index">
            <p class="comment__circle">{{ index + 1 }}</p>
            <p class="comment__text">{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="word__contract col-lg-8" id="word__contract" v-html="document"></div>
    </div>

    <v-dialog v-model="dialogStatus" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Добавить комментарий </v-card-title>

        <form class="comment__form" @submit.prevent="addComment()">
          <input v-model="comment" placeholder="Комментарий" required />

          <button class="sign__button" type="submit">Добавить</button>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["contract"],
  components: {},
  data() {
    return {
      statuses: [],
      comment: "",
      comments: [],
      dialogStatus: false,
      selectedStatus: false,
      contract: "",
    };
  },
  methods: {
    addComment() {
      this.$axios({
        method: "post",
        url: this.$API_URL + this.$API_VERSION + "create/comment",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_kcmr")}`,
        },
        data: {
          id: this.contract.id,
          text: this.comment,
        },
      })
        .then((response) => {
          if (response.data) {
            this.showToggle = true;
            this.message = "Комментарий успешно добавлено";
            this.messageColor = "success";
            setTimeout(() => (this.showToggle = false), 2000);
          }
          this.getComments(this.contract.id);
        })
        .catch((error) => {
          console.warn(error);
        });
    },
  },
  mounted() {
    this.getComments(this.contract.id);
  },
  watch: {},
};
</script>

<style lang="scss">
.word__contract {
  width: 873px;
  overflow-y: auto;
  height: 939px;
}
.statuses__toggle {
  min-width: 270px;
}
.statuses__items {
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: white;
}
.statuses__item {
  cursor: pointer;
}
.statuses__item:hover {
  color: #2a79f0;
}

.comment__item {
  padding: 20px;
  border: 1px solid #bcc6d7;
  border-radius: 3px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.comment__circle {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background: #2a79f0;
  margin-right: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
}
</style>
