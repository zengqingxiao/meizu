<template>
  <div class="clearfix ad">
    <div class="fl ad-left">
      <a :href="data[0] && data[0].href">
        <img class="ad-img" :src="data[0] && data[0].imgUrl">
      </a>
    </div>
    <div class="fr">
      <div class="ad-right-top">
        <a :href="data[1] && data[1].href">
          <img class="ad-img" :src="data[1] && data[1].imgUrl">
        </a>
      </div>
      <div class="clearfix">
        <div class="fl ad-right-bottom">
          <a :href="data[2] && data[2].href">
          <img class="ad-img" :src="data[2] && data[2].imgUrl">
        </a>
        </div>
        <div class="fr ad-right-bottom">
          <a :href="data[3] && data[3].href">
            <img class="ad-img" :src="data[3] && data[3].imgUrl">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:{
    data:{
      type: Array,
      default(){
        return [];
      }
    }
  },
  components: {}
};
</script>
<style lang='less' scoped>
  .ad{
    font-size: 0px;
  }
  .ad-left{
    width: 615px;
    height: 450px;
  }
  .ad-right-top{
    width: 616px;
    height: 220px;
    margin-bottom: 10px;
  }
  .ad-right-bottom{
    width: 303px;
    height: 220px;
  }
  .ad-img{
    width: 100%;
    height: 100%;
  }
</style>