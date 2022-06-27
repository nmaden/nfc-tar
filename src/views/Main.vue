<template>
  <div>
    <Header />
 
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Header from "../components/Header";
import TopInfo from "../components/TopInfo";
export default {
  name: "Main",
  components: {
    Header,
    TopInfo,
  },
  data() {
    return {
      email: "",
      password: "",
      uploadedFiles: [],
      commentType: "",
      commentTypeId: "",
      attachment: "",
      openDownloader: false,
    };
  },
  methods: {
    ...mapActions(["SIGN_OUT_USER", "REDIRECT_FALSE", "SIGN_IN_USER"]),
    getToday() {
      let today = new Date();
      let date =
        today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

      return date;
    },
    downloadAttachment(contract, attachment, id) {
      let type = this.GET_USER_DATA.admin == true ? "admin" : "user";
      this.$axios({
        method: "get",
        url:
          this.$API_URL +
          this.$API_VERSION +
          type +
          "/documents/" +
          contract.type.name +
          "/attachment/show?id=" +
          id +
          "&type=pdf",
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_kcmr")}`,
        },
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            contract.user.name +
              " - " +
              attachment.type.title +
              " - № " +
              id +
              this.getToday() +
              ".pdf"
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.warn(error);
        });
    },
    downloadContract(contract, id) {
      console.log(contract);
      this.$parent.commentType = "contract";
      this.$parent.commentTypeId = id;

      let type = this.GET_USER_DATA.admin == true ? "admin" : "user";
      this.$axios({
        method: "get",
        url:
          this.$API_URL +
          this.$API_VERSION +
          type +
          "/documents/" +
          contract.type.name +
          "/show?id=" +
          id +
          "&type=pdf",

        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_kcmr")}`,
        },
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",

            contract.user.name +
              " - " +
              contract.type.full_name_ru +
              " - № " +
              id +
              this.getToday() +
              ".pdf"
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.warn(error);
        });
    },
  },
  mounted() {
    if (!this.GET_TOKEN[0]) {
      this.$router.push("/sign");
    }
  },
  beforeMount() {
    // if (this.GET_USER_DATA.admin) {
    //   if (this.GET_USER_DATA.role.name == "MAIN") {
    //     this.$router.push("/admin/panel");
    //   } else {
    //     this.$router.push("/kcmr");
    //   }
    // } else {
    //   this.$router.push("/");
    // }
  },
  watch: {},
  computed: {
    ...mapGetters(["GET_TOKEN", "GET_USER_DATA"]),
  },
};
</script>
