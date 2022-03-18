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
            label="Логин"
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
            ></v-text-field>

        

            <v-btn
            type="submit"
            color="success"
            class="mb-4 button"
            >
            Вход
            </v-btn>


         
        </v-form>
        </div>                   
</template>

<!-- scripts -->
<script>
    import { mapActions } from 'vuex'
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
        getCountries() {
            this.$axios({
                method: 'get',
                url: this.$API_URL + this.$API_VERSION + 'guest/get/countries',
            })
            .then((response) => {
                this.questions = response.data
            })  
            .catch((error) => {
                console.log(error);
            });
        },
        ...mapActions([
            'SIGN_IN_USER',
        ]),
        login_sign() {
         
            let obj = {
                email: this.login,
                password: this.password,
            }
        
            this.$axios({
                method: 'post',
                url: this.$API_URL + this.$API_VERSION + 'login',
                data: obj
            })
            .then((response) => {
                localStorage.setItem('access_token',response.data.token)
                this.$router.push('/admin');
            })  
            .catch((error) => {
                console.log(error);
            });
        },
        get_profile() {   
            this.$axios({
                method: 'post',
                url: this.$API_URL + this.$API_VERSION + 'get/user/me',
                headers: {
                    'Authorization': `Bearer `+localStorage.getItem('access_token') 
                }
            })
            .then((response) => {
                if(response.data) {
                    this.$router.push('/main');
                }
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
             font-size: 26px;
          }
      }
      .sign__page__block {
        display: flex;
        flex-direction: column;
        width: 50%;
        input {
          width: 300px;
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