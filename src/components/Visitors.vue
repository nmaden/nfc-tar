<template>

      <div>

        <div class="item__row item__ac">

            <h2>{{$route.query.name}}</h2>

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
            <p class="mb-2" v-if="JSON.parse(item.data)">На каз: <span v-html="JSON.parse(item.data).graph_work_kaz"></span></p>
            <p class="mb-2" v-if="JSON.parse(item.data)">На рус: <span v-html="JSON.parse(item.data).graph_work"></span></p>
            <p class="mb-6" v-if="JSON.parse(item.data)">На анг: <span v-html="JSON.parse(item.data).graph_work_eng"></span></p>

            <div  class="item__row item__ac">
                <div v-for="image in item.files"  :key="image.id" >
                    <img  :src="'https://api.library.crocos.kz/'+image.path" />
                </div>
            </div>
           
            <div class="item__row item__ac">
                <v-btn
                    small
                    class="mx-2 mr-2"
                    fab
                    dark
                    color="indigo"
                    @click="show(item.id,JSON.parse(item.data))"
                    >
                    <v-icon dark>
                        mdi-pencil
                    </v-icon>
                </v-btn>

                <v-btn
                   
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

            <v-divider></v-divider>

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

        <v-dialog v-model="openModal" width="500">
            <v-card class="pa-6">
                <v-form
                    @submit.prevent="callFunction()"
                    ref="form"
                    class="sign__page__block"
                >

                <h3 class="mb-4" v-if="type==1">Создать </h3>
                <h3 class="mb-4" v-else>Редактировать </h3>

                <div class="item__column mb-2">
                    <p >График работы на казахском</p>
                    <vue-editor v-model="graph_work_kaz" />
                </div>
                <div class="item__column mb-2">
                    <p >График работы на русском</p>
                    <vue-editor v-model="graph_work" />
                </div>
                <div class="item__column mb-2">
                    <p >График работы на английском</p>
                    <vue-editor v-model="graph_work_eng" />
                </div>


                <div class="item__column mb-2">
                    <p >ГРАФИК ЭКСКУРСИЙ на казахском</p>
                    <vue-editor v-model="graph_trip_kaz" />
                </div>
                <div class="item__column mb-2">
                    <p >ГРАФИК ЭКСКУРСИЙ на русском</p>
                    <vue-editor v-model="graph_trip" />
                </div>
                <div class="item__column mb-2">
                    <p >ГРАФИК ЭКСКУРСИЙ на английском</p>
                    <vue-editor v-model="graph_trip_eng" />
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
                    @click="openModal=false"
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
  props: [
      'showModal',
      'items',
      'loading',
      'numberOfPages',
      'totalPage'
  ],
  name: "News",
  data() {
    return {
        openModal: this.showModal,
        destroyModal: false,
        nameRules: [
            v => !!v || 'Заполните поле'
        ],
        descriptionRules: [
            v => !!v || 'Заполните поле'
        ],
        type: 0,
        graph_work: null,
        graph_work_kaz: null,
        graph_work_eng: null,
        graph_trip: null,
        graph_trip_kaz: null,
        graph_trip_eng: null
    };
  },
  methods: {
        removeFile(fileId) {
            this.$axios({
                method: "delete",
                url:
                this.$API_URL +
                this.$API_VERSION +
                "page/file/"+fileId,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                this.$toast.open({
                    message: response.data.message,
                    type: "success",
                    position: "bottom",
                    duration: 4000,
                    queue: true,
                });
                this.$emit('fetchData',null);
                this.openModal = false;
            })
            .catch((error) => {
                console.warn(error);
            });
        },
      chooseTypeFunction(type) {
          this.type = type;
          this.openModal = true;
      },
      callFunction() {
          this.type==1?this.create():this.update();
      },
      create() {
            let obj = {
                graph_work: this.graph_work,
                graph_work_kaz: this.graph_work_kaz,
                graph_work_eng: this.graph_work_eng,
                graph_trip: this.graph_trip,
                graph_trip_kaz: this.graph_trip_kaz,
                graph_trip_eng: this.graph_trip_eng,
                type: this.$route.query.type
            };
            this.$refs.form.validate();
            this.$emit('callCreate',obj,this.files);
              this.$emit('fetchData',null);
            this.type = 0;
            this.$refs.form.reset();
        },
        show(id,item) {
            this.id = id;
            this.openModal = true;

            this.graph_work = item.graph_work;
            this.graph_work_kaz = item.graph_work_kaz;
            this.graph_work_eng = item.graph_work_eng;
            this.graph_trip = item.graph_trip;
            this.graph_trip_kaz = item.graph_trip_kaz;
            this.graph_trip_eng = item.graph_trip_eng;
    
        },
        makeJson(item) {
            if(item)
                return JSON.parse(item);
        },
        openDeleteModal(id) {
          this.destroyModal = true;
          this.selectedUser = id;
        },
        deleteItem() {
            this.$axios({
            method: "delete",
            url:
                this.$API_URL +
                this.$API_VERSION +
                "page/"+this.selectedUser,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                this.link = response.data.link;
                this.description = response.data.description;
                this.$emit('fetchData',null);
                this.destroyModal = false
            })
            .catch((error) => {
            console.log(error);
            });
        },
      update() {
            let obj = {
                graph_work: this.graph_work,
                graph_work_kaz: this.graph_work_kaz,
                graph_work_eng: this.graph_work_eng,
                graph_trip: this.graph_trip,
                graph_trip_kaz: this.graph_trip_kaz,
                graph_trip_eng: this.graph_trip_eng,
                type: this.$route.query.type
            };
            this.$emit('callUpdate',obj,this.files,this.id);
            this.$emit('fetchData',null);
      },
  },
  mounted() {
    this.$emit('fetchData',null);
  },
  beforeMount() {

  },
  watch: {
      openModal(val) {
          if(val==false) {
            this.graph_work = null;
            this.graph_work_kaz = null;
            this.graph_work_eng = null;
            this.graph_trip = null;
            this.graph_trip_kaz = null;
            this.graph_trip_eng = null;
          }
      }

  },
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
