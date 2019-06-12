//Getter： 在组件内部获取store中状态的函数，可以认为是 store 的计算属性
//全局计算属性
const getters = {
  /**
   * 功能：当所有的物品的默认选中的情况下,函数返回true
   * 
   * 解析：
   *  1.因为这个是不需要点击事件就需要触发的一些函数,所以要用计算属性
   *  2.先定义一个变量为true,在遍历物品如果有一个是没选中的就会返回false
   */
  isAllChecked (state){
    let checked = true;
    state.shopcartData.forEach(item => {
      if (!item.checked){
        checked = false;
      }
    });
    return checked;
  }
}
export default getters