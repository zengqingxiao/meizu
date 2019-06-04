<template>
  <div class="swiper" :style="swiperSize">
    <ul :style="listWrapper" >
      <li class="swiper-list" v-for="(item, index) in data" :key="index">
        <a :href="item.href">
          <img :style="swiperSize" :src="item.imgUrl" alt>
        </a>
      </li>
      <li v-if="data.length > 1" class="swiper-list" :key="data.length + 1">
        <!-- 这里为空是因为异步拿的data数据,这个时候data的数据为默认值空数组data[0].href为undefined报错，而上面空数组是没关系的最多就是遍历不了 -->
        <a :href="data[0].href">
          <img :style="swiperSize" :src="data[0].imgUrl" alt>
        </a>
      </li>
    </ul>
    <ul class="swiper-pagination">
      <!-- 再组件上使用data中的数据不用加this -->
      <li
        v-for="(item, index) in data"
        :key="index"
        @click="changImg(index)"
        :class="index === activeIndex ? 'active' : ''"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  //因为这个组件的一些配置要是父级组件发过来的所以用props
  props: {
    //内容数据
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    //设置样式数据
    height: {
      type: Number,
      default: 500
    },
    width: {
      type: Number,
      default: 1240
    },
    //延迟时间
    delay: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      activeIndex: 0, //默认的第一张图片
      timer: null, //定时器
      haveDuration: true //控制是否需要过渡
    };
  },
  mounted() {
    this.setTimer(); //启动定时器
  },
  methods: {
    //自动切换
    setTimer() {
      //清除定时器
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.activeIndex === this.data.length) {
          this.activeIndex = 0;
          //  //控制滚动时间
          //这里关闭了要再其他地方再开启
          this.haveDuration = false;
        } else {
          this.haveDuration = true;
          this.activeIndex++;
        }
      }, this.delay);
    },
    //点击按钮触发事件
    changImg(index) {
      this.haveDuration = true;
      this.activeIndex = index;
    },
    //为什么这样就可以，因为放上面的时候定时器有规定时间例如5S我们要等5S过了才开始按钮有样式,下面的会再0.3S切换后就可以按钮有样式
    //那么为什么我们以前写的时候就可以放上面因为以前的写法图片的移动不是说index一变他们动画就会改变而是会执行下面我们写的动画代码,所以是不一样的，我们这里index一遍就会是响应的发生改变,
    //所以这里再0.3s的滚动事件结束的瞬间，把按钮样式改回来(this.activeIndex = 0),
    //问题 ： 为什么会想到这里用事件监听
    //1.事件监听是瞬间的,而定时器是有一个定时时间
    //2.其实也可以加一个0.3S的定时器去改变，再定时器中设置this.activeIndex = 0;

    setDuration() {
      if(this.activeIndex === this.data.length){
        this.activeIndex = 0;
        //控制滚动时间
        this.haveDuration = false;
      }
     
    }
  },
  components: {},
  computed: {
    //计算轮播图，图片和内联元素显示区域的宽高
    swiperSize() {
      window.console.log(`${this.width}px`);
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    //计算轮播图ul的宽度
    listWrapper() {
      return {
        width: `${(this.data.length + 1) * this.width}px`,
        height: `${this.height}`,
        transform: `translateX(-${this.activeIndex * this.width}px)`,
        transitionDuration: this.haveDuration ? ".3s" : ""
      };
    }
  }
};
</script>
<style lang='less' scoped>
.swiper {
  width: 1240px;
  height: 500px;
  position: relative;
  overflow: hidden;
  font-size: 0;

  .swiper-list {
    display: inline-block;
  }
  .swiper-pagination {
    position: absolute;
    left: 30%;
    bottom: 20px;

    li {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 5px;
      background-color: #ffffff;
      cursor: pointer;

      &.active {
        background-color: transparent;
        border: 1px solid #ffffff;
      }
    }
  }
}
</style>