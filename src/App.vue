<template>
  <v-app>

    <!-- <vue-progress-bar></vue-progress-bar> -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "App",

  methods: {


  },

  watch: {},
};
</script>

<style lang="scss">


i {
  font-size: 24px;
  cursor: pointer;
}
.news__list {
  .item__row {
    margin-bottom: 20px;
  }
}
.agreement__lang {
}

.agreement__lang__type {
  padding: 5px 12px;
  background: #edf0f5;
  color: #135334;

  box-shadow: 0px 8px 50px rgba(0, 0, 0, 0.04);
  border-radius: 9px;
}
.agreement__lang__active {
  background: #135334;
  color: white;
}
input,
button {
  outline: none !important;
}
.item__abs {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item__row {
  display: flex;
  flex-direction: row;
}
.item__column {
  display: flex;
  flex-direction: column;
}
.item__ac {
  align-items: center;
}
.pointer {
  cursor: pointer;
}
.item__100 {
  width: 100%;
}
.item__jb {
  justify-content: space-between;
}
.pointer:hover {
  opacity: 0.7;
}

.comment__items {
}

.comment__block {
  margin-top: 15px;
}

.comment__done {
  color: #135334;
  font-weight: bold;
}
.comment__notdone {
  color: gray;
  font-weight: bold;
}

.comment__item {
  padding: 20px;
  border: 1px solid #bcc6d7;
  border-radius: 3px;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
}

.comment__role {
  font-size: 10px;
  color: gray;
}
.comment__circle {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background: #2a79f0;
  margin-right: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
}
.comment__circle__active {
  background: #135334;
}

.langs {
  p {
    cursor: pointer;
  }
}
</style>
