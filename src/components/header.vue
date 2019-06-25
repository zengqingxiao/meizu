<template>
  <div class="header">
    <div class="header-wrapper clearfix">
      <div class="header-logo fl" @click="goToIndex"></div>
      <div class="header-cart fr">
        <span class="icon-moon icon-cart"></span>
      </div>
      <div class="header-user fr">
        <span class="icon-moon icon-user"></span>
      </div>
      <div class="header-search fr">
        <input class="search-input" type="text" placeholder="购物车">
        <span class="icon-moon icon-search search-icon"></span>
      </div>
      <ul class="header-nav fr">
        <li v-for="(item,index) in navData" :key="index" @mouseenter="showChildren(item)">
          <a class="nav-item" href="javaScript:" @click="goToCategory">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <transition name="nav">
      <div class="nav-children" v-if="childrenShow" @mouseleave="heidChildren">
        <div class="children-wrapper">
          <transition-group tag="ul" @enter="enter">
            <!-- 这里的key必须每一个都不一样如果用index就是每一组都一样那么久再每一组切换的时候会没效果 -->
            <li class="children-item" v-for="(item, index) in childrenData" :key= 'item.pic' :data-index='index' :data-css='index' >
              <img :src="item.pic" alt>
              <p>{{item.name}}</p>
              <p>{{item.price}}</p>
            </li>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
const HTTP = axios.create({
  baseURL: " https://www.easy-mock.com/mock/5cf54545a48c5b4da964d533/example"
});
//引入velocity动画库
import velocity from 'velocity-animate'
export default {
  //name: 'vHeader',
  //这里的数据因为头部不管再那个页面复用都是相同的数据所以没必要,让数据从父级传过来
  data() {
    return {
      navData: [], //定义数据,从后台传过来的数据导航栏
      childrenData: [], //定义导航栏下面的动画部分的数据
      childrenShow: false
    };
  },
  components: {},
  mounted() {
    this.getNavData();
    // this.getChildrenData();
    //this.getMenuData();
  },
  methods: {
    //获取数据的方法
    async getNavData() {
      const { data } = await HTTP.post("/header"); //通过axios获取数据
      this.navData = data.data.nav; //将获得到的数据赋值给变量navData
    },
    async showChildren(item) {
      this.childrenShow = true;

      /**
       * 这里为什么要用$.nextTick很关键,很关键
       * 1.因为v-if要先生成DOM树再生成浏览器的渲染树,渲染树上的改变监听@enter事件，但是当我们v-if生成了DOM树的时候第一次，为了生成DOM的数据就已经再DOM树上，
       * 了所以第一次没有触发监听到数据改变，因为当这个DOM树给浏览器的渲染树的时候就已经是添加过第一次数据了的
       * 2.但是当我们给添加数据加上$.nextTick的时候我们就是先成了一次DOM树，这个DOM树没有执行数据的绑定，所以在再下一帧的时候上传数据这个浏览器渲染树上的数据的改变@enter事件就会被监听到，
       * 所以就和v-show就有相同的效果了因为v-show再DOM树上就本来一直就存在，所以浏览器的渲染树上也是有这给div，所以当DOM树上的数据发生了改变，浏览器的渲染树也就发生了改变@enter就监听到了；而
       * v-if再先生成DOM树的时候就代上了第一次的数据，同时也给了浏览器的渲染树，所以第一次@enter是没触发的。
       *
       * */
      this.$nextTick(function () {
        this.childrenData = item.children; //获取每一项数据中的值
      })
      // window.console.log(this.childrenData);
    },
    // async getMenuData() {
    //  const { data } = await HTTP.post('/meizu');
    //  // this.menuData = data.data;
    //   window.console.log(data)
    // },
    //离开nav的显示区域
    heidChildren() {
      this.childrenShow = false;
      this.childrenData = []; 
      /*
      这样每一次重新进去的时候数据就会重新渲染，防止离开后又点击同一个nav由于当时的this.childrenData还是原来的值，
      所以根据vue的原理他们的key相同他们就已经拥有了velocity中的动画属性了,所以动画就会失去效果,那么我们就需要清空数据，
      以便他们下一次绑定el元素给他们添加属性
      */
    },
    enter(el){
      /*
      el循环中的某一个子项,这样我们就可以获取到这个子项上的一些属性值,名为需要index,
      所以我们可以再元素上定义一个属性属性值为index,这样就可以传到el上面我们就可以获取到index的值
      */
     window.console.dir('触发了el');
      const timeOut = el.dataset.index * 150;
      //window.console.dir(el);
      setTimeout(function(){
        velocity(el,{
          'opacity': 1,
          'translateX': '-50px'  
        })
      }
      ,timeOut)
    },
    //点击跳转路由
    goToCategory () {
      this.$router.push({
        name: 'Category',
      })
    },
    goToIndex () {
       this.$router.push({
        name: 'Index',
      })
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  background-color: white;
  min-width: 1240px;
  position: relative;
  .header-wrapper {
    width: 1240px;
    margin: 0 auto;

    .header-logo {
      width: 140px;
      height: 26px;
      margin: 28px 0;
      background: url("../assets/images/logo.png") no-repeat center;
    }

    .header-cart,
    .header-user {
      padding: 29px 10px 0 20px;
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
    }
    .header-search {
      width: 172px;
      height: 32px;
      border: 1px solid #ddd;
      border-radius: 2px;
      position: relative;
      margin: 25px 0;

      .search-input {
        position: absolute;
        left: 5px;
        top: 6px;
        width: 127px;
        height: 20px;
        border: 0px;
        outline: none;
        font-size: 12px;
      }

      .search-icon {
        font-size: 16px;
        position: absolute;
        right: 10px;
        top: 8px;
      }
    }
    .header-nav {
      li {
        display: inline-block;
      }
      .nav-item {
        display: inline-block;
        padding: 33px 20px;
        font-size: 16px;
        line-height: 1;
        cursor: pointer;
        transition: color 0.1 ease;

        &:hover {
          color: #31a5e7;
        }
      }
    }
  }
  .nav-children {
    width: 100%;
    background-color: white;
    position: absolute;
    left: 0;
    top: 82px;
    border-bottom: 1px solid #e9e9e9;
    z-index: 1;
    // height: 156px; //定义进入过渡开始产生效果的时候的状态

    .children-wrapper {
      width: 1240px;
      padding-left: 150px;
      margin: 0 auto;
    }

    .children-item {
      display: inline-block;
      line-height: 1.5;
      width: 136px;
      height: 156px;
      opacity: 0;
      text-align: center;
      font-size: 12px;
      color: #666666;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
  .nav-enter-active {
    transition: height .3s ease-in-out;
  }

  .nav-enter-to,.nav-leave {
    height: 156px; //定义进入过渡开始产生效果的时候的状态
  }
  
  .nav-enter, .nav-leave-to {
    height: 0; //定义进入过渡的开始状态
  }
  //所以上面2个再一起就会由以高度为基准来进行动画
}
</style>
