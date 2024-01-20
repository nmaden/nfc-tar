<!-- template -->
<template>
  <div class="sign__page item__column item__ac">

    <p class="sign__page__title">Жеке ақпарат</p>

    <img :src="$API_URL+'storage/'+photo_path" alt="">
    <v-form
        @submit.prevent="saveProfile"
        ref="form"
        class="sign__page__block"
    >
      <v-file-input
          v-model="photo"
          label="Сурет"
      ></v-file-input>
      <v-text-field
          v-model="fio"
          label="ТАӘ"
          required
          outlined
          class="input"
      ></v-text-field>
      <v-text-field
          v-model="name_business"
          label="Бизнес атауы"
          required
          outlined
          class="input"
      ></v-text-field>

      <div v-for="(item,index2) in phones" :key="'phone-' + index2">

        <div class="row align-center" v-if="!item.name">
          <v-text-field
              v-model="item.value"
              label="Телефон"
              required
              outlined
              class="input"
              type="text"
          ></v-text-field>
          
        </div>

        <div v-else class="row align-center">
          <v-text-field
              v-model="item.value"
              :label="item.name"
              required
              outlined
              class="input"
              type="text"
              :append-icon="item.icon"
          ></v-text-field>
          
        </div>

      </div>

      <v-btn
          color="#003E74"
          style="color:white"
          class="mb-4"
          @click="phone_modal = true"
      >
        Телефон қосу
      </v-btn>


      <div v-for="(item,index) in links"   :key="'link-' + index">
        <div class="row align-center">
          <v-text-field
              v-model="item.value"
              :label="item.name"
              required
              outlined
              class="input"
              type="text"
              :append-icon="item.icon ? item.icon : 'mdi-link-variant'"
          ></v-text-field>
          
        </div>
      </div>

      <v-btn
          color="#003E74" style="color:white" class="mb-4" @click="addLink()">
        Сілтеме қосу
      </v-btn>
      <v-btn
          type="submit"
          color="#003E74"
          class="mb-4 button"
          style="color:white"
      >
        Сақтау
      </v-btn>

    </v-form>

    <v-dialog width="500" v-model="link_modal">
      <v-card style="padding: 20px">
        <v-form
            @submit.prevent="updateLink"
            ref="form"
            class="sign__page__block"
        >

          <div class="row align-center">
            <v-text-field
                v-model="name"
                label="Сілтеме атауы"
                required
                outlined
                class="input"
                type="text"
            ></v-text-field>
          </div>
          <div class="row align-center">
            <v-text-field
                v-model="value"
                label="Сілтеме"
                required
                outlined
                class="input"
                type="text"
            ></v-text-field>
          </div>

          <v-btn
              type="submit"
              color="#003E74"
              class="mb-4 button"
              style="color:white"
          >
            Сақтау
          </v-btn>

        </v-form>
      </v-card>
    </v-dialog>



    <v-dialog width="500" v-model="phone_modal">
      <v-card style="padding: 20px">
        <v-form
            @submit.prevent="updatePhone"
            ref="form"
            class="sign__page__block"
        >

          <div class="row align-center">
            <v-text-field
                v-model="name"
                label="Сілтеме атауы"
                required
                outlined
                class="input"
                type="text"
            ></v-text-field>
          </div>
          <div class="row align-center">
            <v-text-field
                v-model="value"
                label="Сілтеме"
                required
                outlined
                class="input"
                type="text"
            ></v-text-field>
          </div>

          <v-btn
              type="submit"
              color="#003E74"
              class="mb-4 button"
              style="color:white"
          >
            Сақтау
          </v-btn>

        </v-form>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      value: '',
      link_modal: false,
      phone_modal: false,
      photo_path: '',
      photo: '',
      name_business: '',
      fio: '',
      login: '',
      password: '',
      phones: [
        {
          name: 'Телефон',
          value: '',
          icon: 'mdi-phone'
        },
      ],
      links: [
        {
          name: 'Сайт',
          value: '',
          icon: 'mdi-link-variant'
        },
        {
          name: 'Instagram',
          value: 'https://www.instagram.com/',
          icon: 'mdi-instagram'
        },
        {
          name: 'Facebook',
          value: 'https://www.facebook.com/',
          icon: 'mdi-facebook'
        },
        {
          name: 'Whatsapp',
          value: 'https://wa.me/',
          icon: 'mdi-whatsapp'
        },
        {
          name: 'TikTok',
          value: 'https://www.tiktok.com/',
          icon: 'mdi-music-box'
        },
        {
          name: '2Gis',
          value: 'https://2gis.kz/aktobe/geo/',
          icon: 'mdi-map'
        },
        {
          name: 'Kaspi',
          value: 'https://pay.kaspi.kz/pay/f8akehd6',
          icon: 'mdi-credit-card-multiple'
        },
      ]
    }
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.$axios({
        method: 'get',
        url: `${this.$API_URL}profile`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      })
          .then(response => {

            if (response.data.links.length !== 0)
              this.links = response.data.links
            if (response.data.phones.length !== 0)
              this.phones = response.data.phones
            this.fio = response.data.name
            this.name_business = response.data.name_business
            this.photo_path = response.data.photo_path
            this.profile_id = response.data.id
          })
          .catch(error => {
            console.log(error);
          });
    },
    addLink() {
      this.link_modal = true
      // this.links.push({name: '', value: '', icon: ''})
    },
    addPhone() {
      this.phones.push({name: '', value: '', icon: ''})
    },
    deletePhone(id) {
      this.$axios({
        method: 'post',
        url: `${this.$API_URL}delete/phone/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data', // Add this line for proper handling of form data
        },
        data: '', // Include the form data in the request
      })
          .then(response => {
            this.$toast.open({
              message: response.data.message,
              type: "success",
              position: "bottom",
              duration: 4000,
              queue: true,
            });
          })
          .catch(error => {
            console.log(error);
          });
    },
    deleteLink(id) {
      this.$axios({
        method: 'post',
        url: `${this.$API_URL}delete/link/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data', // Add this line for proper handling of form data
        },
        data: '', // Include the form data in the request
      })
          .then(response => {
            this.$toast.open({
              message: response.data.message,
              type: "success",
              position: "bottom",
              duration: 4000,
              queue: true,
            });
          })
          .catch(error => {
            console.log(error);
          });
    },
    updateLink() {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('value', this.value);


      this.$axios({
        method: 'post',
        url: `${this.$API_URL}profile/link`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data', // Add this line for proper handling of form data
        },
        data: formData,
      })
      .then(response => {
        this.$toast.open({
          message: response.data.message,
          type: "success",
          position: "bottom",
          duration: 4000,
          queue: true,
        });
        this.getProfile()
        this.link_modal = false
      })
      .catch(error => {
        console.log(error);
      });
    },
    updatePhone() {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('value', this.value);
      this.$axios({
        method: 'post',
        url: `${this.$API_URL}profile/phone`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data', // Add this line for proper handling of form data
        },
        data: formData,
      })
          .then(response => {
            this.$toast.open({
              message: response.data.message,
              type: "success",
              position: "bottom",
              duration: 4000,
              queue: true,
            });
            this.getProfile()
            this.phone_modal = false
          })
          .catch(error => {
            console.log(error);
          });
    },
    async saveProfile() {
      const formData = new FormData();
      formData.append('phones', JSON.stringify(this.phones));
      formData.append('links', JSON.stringify(this.links));
      formData.append('photo', this.photo);
      formData.append('fio', this.fio);
      formData.append('name_business', this.name_business);

      this.$axios({
        method: 'post',
        url: `${this.$API_URL}profile`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data', // Add this line for proper handling of form data
        },
        data: formData, // Include the form data in the request
      })
          .then(response => {
            this.$toast.open({
              message: response.data.message,
              type: "success",
              position: "bottom",
              duration: 4000,
              queue: true,
            });
            this.getProfile()
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped lang="scss">
.sign__page__top {
  align-self: center;
  text-align: center;
  width: 80%;
  font-size: 10px;
  font-weight: bold;
}

.sign__page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  @media only screen and (max-width: 764px) {
    width: 100%;
  }

  .sign__page__title {
    padding-top: 50px;
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 20px;
    color: #333;
    @media only screen and (max-width: 900px) {
      font-size: 22px;
    }
  }

  .sign__page__block {
    display: flex;
    flex-direction: column;
    width: 400px;
    @media only screen and (max-width: 900px) {
      width: 90%;
    }

    input {
      width: 100px;
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      @media only screen and (max-width: 764px) {
        width: 100%;

      }
    }

    ::placeholder {
      color: #333;
    }

    button {
      cursor: pointer;
      text-transform: uppercase;
      width: 100%;
      outline: none;
      border: none;
      background-color: cornflowerblue;
      padding: 20px;
      @media only screen and (max-width: 764px) {
        width: 100%;
      }

      p {
        color: white;
        font-weight: bold;
        margin-bottom: 0;

      }
    }

    button:hover {
      background-color: #285bb6;
    }
  }

}

.active__lang {
  color: blue;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>