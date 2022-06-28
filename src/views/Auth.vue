<!-- template -->
<template>
        <div class="sign__page item__column item__ac">

        <div class="item__row item__ac langs">
            <p class="mr-2" @click="activeLang=1" v-bind:class="{'active__lang':activeLang==1}">RU</p>
            <p class="mr-2" @click="activeLang=2" v-bind:class="{'active__lang':activeLang==2}">EN</p>
        </div>
            
        <p class="sign__page__title">{{content.content.sign}}</p>
        <v-form
            @submit.prevent="sign"
            ref="form"
            class="sign__page__block"
        >
            <v-text-field
                v-model="login"
                label="Email"
                required
                outlined
                class="input"
                :rules="loginRules"

            ></v-text-field>

            <v-text-field
                :rules="passwordRules"
                v-model="password"
                :label="content.content.password"
                required
                outlined
                class="input"
                type="password"
            ></v-text-field>

            <v-btn
            type="submit"
            color="#003E74"
            class="mb-4 button"
            style="color:white"
            >
            {{content.content.sign}}
            </v-btn>
            <v-btn
              @click="$router.push('/registration')"
              color="#003E74"
              class="mb-4 button"
              style="color:white"
            >
            {{content.content.registration}}
            </v-btn>



        </v-form>
        </div>
</template>

<!-- scripts -->
<script>
    export default {
      data() {
          return {
            activeLang: 1,
            loginRules: [
                v => !!v || 'Заполните поле',
                v => /.+@.+\..+/.test(v) || 'Не правильный Email',
            ],
            email: '',
            passwordRules: [
                v => !!v ||  'Заполните поле'
            ],
            login: '',
            password: '',
            user: {
                role: ''
            },
            content: ''
          }
      },
      mounted() {
        if(localStorage.getItem('lang')) {
            this.activeLang = localStorage.getItem('lang');
            this.getContentWord(localStorage.getItem('lang'));
        }else {
            this.getContentWord(1);
        }


        this.role = localStorage.getItem('role');
      },
      
      watch: {
        activeLang(val) {
            localStorage.setItem('lang',val);
            this.getContentWord(val);
        }
      },
      methods: {
        getContentWord(val) {
            this.loading = true;
            let link = 'lang'
            this.$axios({
            method: "get",
            url:
                this.$API_URL +
                link,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    'Accept-Language': val==1?'ru':'en'
                },
                data: {
                    date: this.date
                }
            })
            .then((response) => {
                this.content = response.data;
            })
            .catch((error) => {
                    let errors = error.response.data.errors;
                for (let variable in errors) {
                    this.$toast.open({
                        message: errors[variable][0],
                        type: "warning",
                        position: "bottom",
                        duration: 4000,
                        queue: true,
                    });
                    continue;
                }
            });
        }, 
        sign() {
            let obj = {
                email: this.login,
                password: this.password,
            }

            this.$axios({
                method: 'post',
                url: this.$API_URL   + 'login',
                data: obj
            })
            .then((response) => {
                localStorage.setItem('access_token',response.data.token)
                response.data.role!=1?this.$router.push('/profile'):this.$router.push('/orders');
                localStorage.setItem('role',response.data.role);
            })
            .catch((error) => {
                let errors = error.response.data.errors;
                for (let variable in errors) {
                    this.$toast.open({
                        message: errors[variable][0],
                        type: "warning",
                        position: "bottom",
                        duration: 4000,
                        queue: true,
                    });
                    continue;
                }
            });
        },

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
      height: 100vh;

      @media only screen and (max-width: 764px) {
        width: 100%;
      }
      .sign__page__title {
        font-weight: bold;
        font-size: 26px;
        margin-bottom: 20px;
        color: #333;
          @media only screen and (max-width: 900px) {
             font-size: 18px;
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
      color :blue;
    }
</style>
