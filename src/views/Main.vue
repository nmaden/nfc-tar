<template>
  <div class="main">
    <Header />
 
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <div class="main__bottom">

        <div @click="$router.push('/result')" :class="{ 'active__route': current_route === '/result' }">
          <i class="mdi mdi-signal-variant"></i>
        </div>

        <div @click="$router.push('/main')" :class="{ 'active__route': current_route === '/main' }">
          <i class="mdi mdi-cards" ></i>
        </div>

        <div @click="$router.push('/settings')" :class="{ 'active__route': current_route === '/settings' }">
          <i class="mdi mdi-account"></i>
        </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Main",
  components: {
  },
  data() {
    return {
      current_route: this.$route.path,
      email: "",
      password: "",
      uploadedFiles: [],
      commentType: "",
      commentTypeId: "",
      attachment: "",
      openDownloader: false,
    }
  },
  methods: {

  },
  mounted() {

  },
  beforeMount() {

  },
  watch: {
    $route(to) {
      this.current_route = to.path;
    }
  },
  computed: {
    ...mapGetters(["GET_TOKEN", "GET_USER_DATA"]),
  },
};
</script>

<style>
.main {
  position: relative;
}

.active__route {
  color: rgb(0, 62, 116);
}

.main__bottom {
  position: fixed;
  bottom: 0;
  padding: 10px;
  background: white;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  div {
    padding: 10px;
    .mdi-settings {
      color: black;
    }
  }
}
</style>
