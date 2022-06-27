<!-- template -->
<template>
        <div class="sign__page item__column item__ac">
        <p class="sign__page__title">Вход</p>
        <v-form
            @submit.prevent="login_sign"
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
                label="Пароль"
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
            Вход
            </v-btn>



        </v-form>
        </div>
</template>
<script>
    export default {
      data() {
          return {
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
            }
          }
      },
      mounted() {
          if(localStorage.getItem('access_token')) {
              this.get_profile();
          }
      },
      methods: { 
        registration() {
            let obj = {
                email: this.login,
                password: this.password,
            }
            this.$axios({
                method: 'post',
                url: this.$API_URL + this.$API_VERSION + 'registration',
                data: obj
            })
            .then((response) => {
                localStorage.setItem('access_token',response.data.access_token);
                this.$router.push('/user');
            })
            .catch((error) => { 
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
</style>
