<template>

      <div>
        <div class="item__column">
            <h2>{{$route.query.name}}</h2>
       
            <div class="item__row item__ac"> 
                <v-text-field
                    v-model="filter.name"
                    :label="lang.content.search"
                    required
                    outlined
                    class="input"
                ></v-text-field>
            </div>


            <div class="item__row item__ac"> 

                <v-text-field
                    v-model="filter.area"
                    :label="lang.content.area"
                    required
                    outlined
                    class="input mr-2"
                    :hide-details="true"
                ></v-text-field>


                <v-text-field
                    
                    v-model="filter.count_seats"
                    :label="lang.content.count_seats"
                    required
                    outlined
                    class="input mr-2"
                    :hide-details="true"
                ></v-text-field>

                <v-select
                    class="mr-2"
                    :label="lang.content.city"
                    :items="cities"
                    :hide-details="true"
                    :flat="true"
                    item-text="name_ru"
                    item-value="id"
                    item-color="#000"
                    solo
                    dense
                    v-model="filter.city"
                ></v-select>

                <v-select
                    class="mr-2"
                    :label="lang.content.service"
                    :items="services"
                    :hide-details="true"
                    :flat="true"
                    item-text="label"
                    item-value="value"
                    item-color="#000"
                    solo
                    dense
                    multiple
                    v-model="filter.service"
                ></v-select>
            </div>
        
        </div>


        <div class="item__column offices mt-10">

            <div class="office item__row mb-10"  v-for="item in items" :key="item.id">
                    
                    <img class="mr-4"  src="../assets/office1.jpeg" />

                    <div class="item__column">
                        <p>{{item.name}}</p>

                        <p>{{item.price}}</p>

                        <div class="item__row">
                            <p class="mr-2">{{lang.content.city}}:</p>
                            <p>{{item.city.name_ru}}</p>
                        </div>
                        <div class="item__row">
                            <p class="mr-2">{{lang.content.area}}:</p>
                            <p>{{item.area}} м2</p>
                        </div>
                        <div class="item__row">
                            <p class="mr-2">{{lang.content.count_seats}}:</p>
                            <p>{{item.count_seats}}</p>
                        </div>
                        <div class="item__row">
                            <p class="mr-2">{{lang.content.service}}:</p>
                            <p class="mr-2"  v-if="item.wifi">WIFI</p>
                            <p class="mr-2"  v-if="item.coffee_machine">COFFEE machine</p>
                            <p class="mr-2"  v-if="item.tv">TV</p>
                        </div>

                        <v-btn @click="openOrderModal(item.id)" class="primary">{{lang.content.btn_book_text}}</v-btn>
                    </div>
            </div>
        </div>

        
        <v-dialog width="290" v-model="dateModal">
            <v-card>
                <v-date-picker v-model="date" :locale="getCalendarLang()" ></v-date-picker>
            </v-card>
        </v-dialog>
        <v-dialog v-model="openModal" width="800">
            <v-card class="pa-6">
                <v-form
                    @submit.prevent="order()"
                    ref="form"
                    class=""
                >

                    <p class="date__value" @click="dateModal=true">{{lang.content.select_date}}</p>
                    
                    <p>{{date}}</p>

                    <v-btn type="submit" class="primary">{{lang.content.btn_book_text}}</v-btn>
                </v-form>

            </v-card>
        </v-dialog>
      </div>

</template>

<script>
export default {
  props: [
    'lang'
  ],
  name: "Profile",
  data() {
    return {
        content: '',
        date: '',
        dateModal: false,
        items: [],
        openModal: false,
        cities: [],
        filter: {
            name: '',
            area: '',
            count_seats: '',
            city: '',
            service: ''
        },
        services: [
            {       
                label: 'wi fi',
                value: 1
            },
            {
                label: 'tv',
                value: 2
            },
            {
                label: 'coffee machine',
                value: 3
            }
        ],
        page: 0,
        options: {
            itemsPerPage: 5,
            page: 1,
        },
        selectedId: null
    };
  },
  methods: {
     
        openOrderModal(id) {
            this.selectedId = id;
            this.openModal=true;
        },
        fetch() {
            this.loading = true;
            let link = 'offices?per_page='+this.options.itemsPerPage+'&page='+this.options.page
            +'&name='+this.filter.name
            +'&area='+this.filter.area
            +'&count_seats='+this.filter.count_seats
            +'&city_id='+this.filter.city
            +'&service='+this.filter.service
            this.$axios({
            method: "get",
            url:
                this.$API_URL +
                link,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                this.items = response.data.data;
                this.loading = false;
                this.numberOfPages = response.data.total;
                this.totalPage = response.data.total;
                this.openModal = false;
                this.type = 0;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        order() {
            this.loading = true;
            let link = 'rent/office/'+this.selectedId
            this.$axios({
            method: "put",
            url:
                this.$API_URL +
                link,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    'Accept-Language': localStorage.getItem('lang')==1?'ru':'en'
                },
                data: {
                    date: this.date
                }
            })
            .then((response) => {
                this.$toast.open({
                    message: response.data.message,
                    type: "success",
                    position: "bottom",
                    duration: 4000,
                    queue: true,
                });
                this.openModal = false;
            })
            .catch((error) => {
                this.$toast.open({
                    message: error.response.data.message,
                    type: "warning",
                    position: "bottom",
                    duration: 4000,
                    queue: true,
                });
                this.openModal = false;
            });
       
        },
        fetchCities() {
            let link = 'cities'
            this.$axios({
            method: "get",
            url:
                this.$API_URL +
                link,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                this.cities = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        getCalendarLang() {
            if(this.lang.content.search=="Search") {
                return 'en-in';
            }else {
                return 'ru-in';
            }
        } 
  },
  mounted() {
      this.fetch();
      this.fetchCities();
  },
  beforeMount() {
  },
  watch: {
    options: {
      handler(val) {
        if (val.itemsPerPage < 0) {
          val.itemsPerPage = this.totalPage;
            this.$emit('fetchData',this.options);
        } else {
            this.$emit('fetchData',this.options);
        }
      },
    },
    filter: {
        handler() {
            this.fetch()
        },
        deep: true,
    },
    openModal(val) {
        if(!val) {
            this.title = '';
            this.description = '';
            this.title_eng = '';
            this.description_eng = '';
            this.title_kaz = '';
            this.description_kaz = '';
        }
    },

    deep: true,

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

.offices {
    .office {
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        img {
            width: 280px;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
        }
    }
}
.date__value {
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
}

</style>
