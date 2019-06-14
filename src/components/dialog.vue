<template>
  <transition name="dialog">
    <div v-show="show" class="dialog-mask">
      <div class="dialog-box">
        <div class="dialog-wrapper" :style="dialogBox">
          <div class="dialog-header" :class="{'dialog-title': title}" v-if="dialogHeaderShow">
            {{title}}
            <i class="icon-font icon-close dialog-close" @click="close"></i>
          </div>
          <div class="dialog-conter">
            <slot></slot>
          </div>
          <div class="dialog-footer" v-if="confirmButtonShow || cancelButtonShow">
            <button v-if="confirmButtonShow" class="btn success mr20 w100" @click="confirm">{{confirmButtonText}}</button>
            <button v-if="cancelButtonShow" class="btn cancel mr20 w100" @click="cancel">{{cancelButtonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      //用于控制组件显示或隐藏
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 1000
    },
    title: {
      /**
       * 头部内容
       */
      type: String,
      default: ""
    },
    confirmButtonShow: {
      /**
       * 是否需要确认按钮，默认需要
       */
      type: Boolean,
      default: true
    },
    cancelButtonShow: {
      /**
       * 是否需要取消按钮，默认需要
       */
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      /**
       * 确认按钮的文字，默认为：确定
       */
      type: String,
      default:'确定'
    },
    cancelButtonText: {
       /**
       * 取消按钮的文字，默认为：取消
       */
      type: String,
      default:'取消'
    },
    dialogHeaderShow: {
      //头部X , 默认显示
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  components: {},
  computed:{
    dialogBox () {
      return {
        width: `${this.width}px`
      }
    },
    dialogContent(){
      return { 
        height: `${this.height}px`
      }
    }
  },
  methods: {
    //子组件改变父组件的另一种方法
    close() {
      this.$emit("update:show", false);
    },
    //点击确认
    confirm() {
      this.$emit("confirm");
    },
    //点击取消
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style lang='less' scoped>
.dialog-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(153, 153, 153, 0.6);
  display: table;

  .dialog-box {
    display: table-cell;
    vertical-align: middle;
  }

  .dialog-wrapper {
    margin: 0 auto;
    background-color: #fff;
    text-align: center;
   

    .dialog-header {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 4px 4px 0 0;
      font-size: 18px;
      font-weight: blod;
      color: #333;
      position: relative;
     
     .dialog-title{
        border-bottom: 1px solid #efefef;
     }

      .dialog-close {
        position: absolute;
        right: 26px;
        color: #dbdbdb;
        top: 16px;
      }
    }

    .dialog-conter {
     
    }

    .dialog-footer {
      padding-bottom: 30px;
    }
    .mr20 {
      margin-right: 20px;
    }
    .w100 {
      width: 100px;
    }
  }
}
.dialog-enter-active {
  transition: opacity 0.3s;
}
.dialog-enter {
  opacity: 0;
}
</style>