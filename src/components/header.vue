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
        <li>
          <a class="nav-item">魅族手机</a>
        </li>
        <li>
          <a class="nav-item">魅族手机</a>
        </li>
        <li>
          <a class="nav-item">魅族手机</a>
        </li>
        <li>
          <a class="nav-item">魅族手机</a>
        </li>
        <li>
          <a class="nav-item">魅族手机</a>
        </li>
      </ul>
    </div>
    <transition name="nav">
      <div class="nav-children">
        <div class="children-wrapper">
          <ul>
            <li class="children-item">
              <img
                src="https://openfile.meizu.com/group1/M00/04/57/Cgbj0VrxPbKAPw-1AAJWqasMn_A309.png"
                alt
              >
              <p>魅族手机</p>
              <p>￥2999</p>
            </li>
            <li class="children-item">
              <img
                src="https://openfile.meizu.com/group1/M00/04/57/Cgbj0VrxPbKAPw-1AAJWqasMn_A309.png"
                alt
              >
              <p>魅族手机</p>
              <p>￥2999</p>
            </li>
            <li class="children-item">
              <img
                src="https://openfile.meizu.com/group1/M00/04/57/Cgbj0VrxPbKAPw-1AAJWqasMn_A309.png"
                alt
              >
              <p>魅族手机</p>
              <p>￥2999</p>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  //name: 'vHeader',
  data() {
    return {};
  },
  components: {}
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
      padding-left: 108px;
      margin: 0 auto;
    }

    .children-item {
      display: inline-block;
      line-height: 1.5;
      width: 136px;
      height: 145px;
      text-align: center;
      font-size: 12px;
      color: #666666;
      img{
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>
