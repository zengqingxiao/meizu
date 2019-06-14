<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      aa: this.$store.state
    };
  },
  name: "app",
  components: {
    //HelloWorld
  },
  mounted() {},
  methods: {
    ...mapMutations([
      "LOCAL_STORAGE_SHOPCART_DATA" //跟新数据
    ])
  },

  watch: {
    "aa.shopcartData": {
      handler:function() {
        window.console.log("aa");
        this.LOCAL_STORAGE_SHOPCART_DATA()
        },
      // 深度观察
      deep: true
    }
  }
};
</script>

<style>
#app {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
