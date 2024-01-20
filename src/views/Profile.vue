<template>
  <div class="profile">
    <div class="profile__inner">
      <div class="profile__fio">
        <p class="profile__fio">{{ fio}}</p>
      </div>
      <div class="profile__top">
        <div class="profile__photo profile__gradient">
          <div class="profile__image">
            <img :src="$BACK_URL+'storage/'+photo_path" alt="">
          </div>
        </div>
        <div class="profile__right">
          <p>{{ name_business }}</p>

          <div class="profile__own__info">
            <div class="profile__own__info--line" v-for="(phone,i) in phones" :key="i">
              <a :href="'tel:'+phone.item">
                <i class="mdi mdi-phone"></i>
              </a>
              <p>{{ phone.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="profile__socials">
        <div class="profile__links">
          <div
              v-for="(link,link_index) in links" :key="link_index"
              class="profile__link"
          >
            <div class="profile__link--row item__column">
             <div class="profile__link--icon">
               <i v-if="link.icon" :class="'mdi '+link.icon"></i>
               <i v-else class="mdi mdi-link-variant"></i>
             </div>
             <a class="profile__link--name">{{ link.name }}</a>
            </div>
            <v-switch
                v-model="link.show"
                hide-details
                @change="updateVisibilityLink(link.id,link.show,link.value)"
            ></v-switch>
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
    this.getProfile()
  },
  methods: {
    updateVisibilityLink(id,show,value) {
      console.log(value)
      console.log(show)

      const new_value = show ? 1 : 0; // Convert boolean to integer

      this.$axios({
        method: 'put',
        url: `${this.$API_URL}link/show/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
          show: new_value,
          value: value
        }
      })
      .then(response => {
        console.log(response)
        this.getProfile()
      })
      .catch(error => {
        console.log(error);
      });

    },
    openLink(link) {
      window.open(link, '_blank')
    },
    getProfile() {
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

<style lang="scss">
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

.item__column {
  display: flex;
  flex-direction: column;
}

.profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  .profile__own__info {

    display: flex;
    flex-direction: column;

    i {
      margin-right: 5px;
    }

    .profile__own__info--line {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }


  .profile__fio {
    font-weight: bold;
    color: #2c2727;
    font-size: 30px;
    margin-bottom: 20px;
  }
  .profile__inner {
    padding: 20px;
    margin-bottom: 120px;
  }

  .profile__socials {
    .profile__socials--title {
      font-size: 22px;
      margin-bottom: 10px;
      color: #2c2727;
      font-weight: bold;
    }

    .profile__links {
      margin-top: 40px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-self: center;
      justify-content: space-between;

      .profile__link {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        background-color: #ccc;
        padding: 10px;
        border-radius: 15px;

        .v-input--selection-controls {
          margin-top: 0;
        }

        .profile__link--row {
          display: flex;
          flex-direction: row;
          align-items: center;


        }

        i {
          color: white;
          font-size: 32px;
        }
        a {
          text-align: center;
        }
        .profile__link--icon {
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          background-color: black;
          width: 60px;
          height: 60px;
          border-radius: 20%;
          margin-bottom: 10px;
        }
        .profile__link--name {
          margin-left: 20px !important;
        }
      }
    }

    .profile__links::-webkit-scrollbar {
      width: 2px; /* Set the width of the scrollbar */
    }

    .profile__links::-webkit-scrollbar-track {
      background-color: transparent; /* Set the background color of the track */
      border-radius: 10px; /* Set border-radius for rounded corners */
    }

    .profile__links::-webkit-scrollbar-thumb {
      background-color: #888; /* Set the color of the scrollbar thumb */
      border-radius: 10px; /* Set border-radius for rounded corners */
    }
  }

  .profile__top {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    .profile__gradient {
      margin-right: 20px;
      width: 125px;
      height: 125px;
      border-radius: 50%;
      padding: 6px;
      background: linear-gradient(to right, red, orange);
    }
    .profile__image {
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
  .profile__right--btns {
    margin-top: 20px;
    display: flex;
    flex-direction: row;

    .profile__save {
      margin-right: 10px;
    }
  }

}
</style>