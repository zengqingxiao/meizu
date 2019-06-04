<template>
  <div class="header">
    <div class="header-wrapper clearfix">
      <div class="header-logo fl"></div>
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
          <a class="nav-item">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <transition name="nav">
      <div class="nav-children" v-show="childrenShow" @mouseleave="heidChildren">
        <div class="children-wrapper">
          <transition-group tag="ul" @enter='enter'>
            <!-- 这里的key必须每一个都不一样如果用index就是每一组都一样那么久再每一组切换的时候会没效果 -->
            <li class="children-item" v-for="(item, index) in childrenData" :key= 'item.pic' :data-index='index'>
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
      const { data } = await HTTP.post("/meizu"); //通过axios获取数据
      this.navData = data.data.nav; //将获得到的数据赋值给变量navData
    },
    async showChildren(item) {
      this.childrenData = item.children; //获取每一项数据中的值
      // window.console.log(this.childrenData);
      this.childrenShow = true;
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
      const timeOut = el.dataset.index * 150;
      //window.console.dir(el);
      setTimeout(function(){
        velocity(el,{
          'opacity': 1,
          'translateX': '-50px'  
        })
      }
      ,timeOut)
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
    height: 156px;
    background-color: white;
    position: absolute;
    left: 0;
    top: 82px;
    border-bottom: 1px solid #e9e9e9;
    z-index: 1;

    .children-wrapper {
      width: 1240px;
      padding-left: 150px;
      margin: 0 auto;
    }

    .children-item {
      display: inline-block;
      line-height: 1.5;
      width: 136px;
      height: 145px;
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
    height: 156px; //定义进入过渡开始产生效果的时候的状态
    transition: height 0.3s ease-in-out;
  }
  .nav-enter {
    height: 0; //定义进入过渡的开始状态
  }
  //所以上面2个再一起就会由以高度为基准来进行动画
}
</style>
