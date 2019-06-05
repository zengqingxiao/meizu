<template>
  <div class="footer">
    <div class="footer-wrapper">
      <div class="clearfix">
        <ul class="fl footer-service">
          <li v-for="(item, index) in serviceLinkData" :key="index">
            <a :href="item.href">
              <img :src="item.icon">
              <span>{{item.name}}</span>
            </a>
          </li>
        </ul>
        <div class="fr online-service">
          <span>周一至周日 730~2400</span>
          <p>400-788-3333</p>
          <a href="#">在线客服</a>
        </div>
      </div>
      <hr class="footer-hr">
      <div class="clearfix">
        <div class="fl">
          <ul class="external-link">
            <li v-for="(item, index) in externalLinkData" :key="index">
              <a :href="item.href">{{item.name}}</a>
            </li>
          </ul>
          <div class="footer-rights">这里是一些版权信息</div>
        </div>
        <div class="fr subscribe">
          <a href>
            <i class="icon-font icon-weibo"></i>
          </a>
          <a href>
            <i class="icon-font icon-weixin"></i>
          </a>
          <a href>
            <i class="icon-font icon-qqzone"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const HTTP = axios.create({
  baseURL: " https://www.easy-mock.com/mock/5cf54545a48c5b4da964d533/example"
});
export default {
  //因为这里的数据不会说是会因为在不用的页面所显示的数据不一样所以数据一样
  data() {
    return {
      serviceLinkData: [],
      externalLinkData: []
    };
  },
  components: {},
  mounted() {
    this.getServiceLink();
  },
  methods: {
    async getServiceLink() {
      const { data } = await HTTP.post("/backup");
      this.serviceLinkData = data.data.serviceLink;
      window.console.log(this.serviceLinkData);
      this.externalLinkData = data.data.externalLink;
    }
  }
};
</script>
<style lang='less' scoped>
.footer {
  background-color: #fff;
  padding: 48px 0 20px;
  border: 1px solid #efefee;

  .footer-wrapper {
    width: 1240px;
    margin: 0 auto;

    .footer-service {
      width: 1000px;

      li {
        display: inline-block;
        width: 240px;
        height: 57px;
        font-size: 12px;
        color: #999;

        img,
        span {
          vertical-align: middle; //居中
        }
      }
    }
    .online-service {
      text-align: right;

      span {
        font-size: 12px;
        color: #999;
      }
      p {
        color: #00c3f5;
        font-size: 30px;
        font-weight: 400;
      }
    }
    .footer-hr {
      margin: 20px 0 28px;
      display: block;
      border: 0;
      border-top: 1px solid #eee;
    }
    .external-link {
      li {
        display: inline-block;
        padding-right: 15px;
        margin-right: 15px;
        border-right: 1px solid #d6d6d6;
        font-size: 12px;
        color: #999;

        &:last-child {
          border-right: none;
        }
      }
    }
    .footer-rights {
      font-size: 12px;
      color: #999;
      padding-top: 8px;
    }
    .subscribe{
      margin-top: 18px;
      a{
        color: #999;
        padding-right: 10px;
        margin-right: 10px;
        border-right: 1px solid #d6d6d6;
        transition: color .3s;
        &:last-child{
          border-right:none;
        }

        &:hover{
          color: #31a5e7;
        }
      }
    }
  }
}
</style>