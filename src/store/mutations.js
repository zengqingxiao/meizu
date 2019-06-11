//Mutation： 唯一修改状态的事件回调函数  commit监听
import Vue from 'vue' //下面用了Vue.set()方法

const mutations = {
  /**
   * state :就是state.js中的state对象,这个参数我默认就添加的
   * obj：是我们运行这个函数的时候传进去的参数，这里就是我们点击购物车需要添加的那个对象
   * 
   * 解析：这里并不是单单就是把传多来的对象push进去这么简单
   *  其一 我们要将num字段插入到infoData对象中从而方便渲染，为什么呢？因为我们肯定是要遍历那个数组的，但是数组中的中有2种不同类型的对象这么可以呢？
   *  
   *  其二 可能我们会多次点击用一个物体购买，我们要判断我们的物品是否已经存在  
   */
  ADD_SHOPCART(state, obj){
    // state.shopcartData.push(obj);
    //开始规范的写法
    let haveData = false; //用来判断是否已经存在了
    state.shopcartData.forEach(item => {
     if(item.id === obj.data.id){  //当存在相同的物品的时候
      haveData = true;
      item.count += parseInt(obj.num);
     }
    });
    if (!haveData){   //当不存在相同的物品
      Vue.set(obj.data, 'count' ,obj.num); //这里就是把num给赋值到data中去
      state.shopcartData.push(obj.data);
    }
    window.console.log(state.shopcartData);
  }
}
export default mutations