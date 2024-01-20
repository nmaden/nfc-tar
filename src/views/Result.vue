<template>
  <div class="result">
    <div class="result__inner">
      <div class="result__fio">
        <p class="result__fio">{{ fio}}</p>
      </div>
      <div class="result__top">
        <div class="result__photo result__gradient">
          <div class="result__image">
            <img :src="$BACK_URL+'storage/'+photo_path" alt="">
          </div>
        </div>
        <div class="result__right">
          <p>{{ name_business }}</p>

          <div class="result__own__info">
            <div class="result__own__info--line" v-for="(phone,i) in phones" :key="i">
              <a :href="'tel:'+phone.item">
                <i class="mdi mdi-phone"></i>
              </a>
              <p>{{ phone.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="result__socials">
        <div class="result__links">
          <div
              v-for="(link,link_index) in links" :key="link_index"
              @click="openLink(link.value)"
          >
            <div  v-if="link.show"  class="result__link">
              <div v-if="link.show">
                <i v-if="link.icon" :class="'mdi '+link.icon"></i>
                <i v-else class="mdi mdi-link-variant"></i>
              </div>
              <a v-if="link.show" class="result__link--name">{{ link.name }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      links: [],
      phones: [],
      fio: '',
      name_business: '',
      photo_path: ''

    }
  },
  beforeMount() {
    this.getResult()
  },
  methods: {
    openLink(link) {
      window.open(link, '_blank')
    },
    getResult() {
      this.$axios({
        method: 'get',
        url: `${this.$API_URL}profile`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      })
          .then(response => {
            console.log("ttt", response.data)
            if (response.data.links.length !== 0)
              this.links = response.data.links
            if (response.data.phones.length !== 0)
              this.phones = response.data.phones
            this.fio = response.data.name
            this.name_business = response.data.name_business
            this.photo_path = response.data.photo_path
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
p, a {
  margin: 0 !important;
  padding: 0 !important;
}

.btn {
  padding: 10px;
  border-radius: 5px;
  color: white;
  background: blue;

}

.result {
  display: flex;
  flex-direction: column;
  width: 100%;
  .result__own__info {

    display: flex;
    flex-direction: column;

    i {
      margin-right: 5px;
    }

    .result__own__info--line {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }


  .result__fio {
    font-weight: bold;
    color: #2c2727;
    font-size: 30px;
    margin-bottom: 20px;
  }
  .result__inner {
    padding: 20px;
  }

  .result__socials {
    .result__socials--title {
      font-size: 22px;
      margin-bottom: 10px;
      color: #2c2727;
      font-weight: bold;
    }

    .result__links {
      margin-top: 40px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      align-self: center;

      .result__link {
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        i {
          color: white;
          font-size: 32px;
        }
        a {
          text-align: center;
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          background-color: black;
          width: 65px;
          height: 65px;
          border-radius: 20%;
          margin-bottom: 15px;

        }
      }
    }

    .result__links::-webkit-scrollbar {
      width: 2px; /* Set the width of the scrollbar */
    }

    .result__links::-webkit-scrollbar-track {
      background-color: transparent; /* Set the background color of the track */
      border-radius: 10px; /* Set border-radius for rounded corners */
    }

    .result__links::-webkit-scrollbar-thumb {
      background-color: #888; /* Set the color of the scrollbar thumb */
      border-radius: 10px; /* Set border-radius for rounded corners */
    }
  }

  .result__top {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    .result__gradient {
      margin-right: 20px;
      width: 125px;
      height: 125px;
      border-radius: 50%;
      padding: 6px;
      background: linear-gradient(to right, red, orange);
    }
    .result__image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: white;
      img {
        object-fit: cover;
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .result__right--btns {
    margin-top: 20px;
    display: flex;
    flex-direction: row;

    .result__save {
      margin-right: 10px;
    }
  }

}
</style>