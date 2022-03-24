<template>
      <div>

          <div  v-for="(feed,index) in feeds" :key="index">

              <p>{{feed.name}}</p>
              <div class="item__row item__ac">
                <i class="mdi mdi-phone mr-2"></i>
                <a class="" :href="'tel:'+feed.phone"> {{feed.phone}}</a>

              </div>


              <div class="item__row item__ac">
                <i class="mdi mdi-email mr-2"></i>
                <p class="mb-0">{{feed.email}}</p>
              </div>

              <div class="item__row item__ac">

                <i class="mdi mdi-clock-time-eight-outline mr-2"></i>
                <p class="mb-0">{{formatDate(feed.created_at)}}</p>

              </div>
              <v-divider></v-divider>
          </div>


      </div>
</template>

<script>

export default {
  name: "Feedback",
  data() {
    return {
      feeds: [],
      me: null
    };
  },
  methods: {
    formatDate(date) {  
      let d = date.split('T')[0].split('-');
      let time = date.split('T')[1].split(':');
      return d[2]+'-'+d[1]+'-'+d[0]+' '+time[0]+':'+time[1];
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
