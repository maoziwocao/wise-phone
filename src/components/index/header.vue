<template>

 <div>
   <header id="header" :class="noMargin ? 'no-margin' : ''">
    <div class="controll">
      <img class="logo" src="../../assets/images/sy-logo.png" @click="toHome()">
      <div class="btns">
        <img :src="loginImg" @click="clickLogin" class="btn-login" ref="btnlogin">
        <img src="../../assets/images/service.jpg" v-show="!serviceVisible" @click="serviceVisible = true">
        <img src="../../assets/images/sy-service.png" v-show="serviceVisible" @click="closeServicePop">
        <img src="../../assets/images/navbar.png" @click="clickNavBarBtn">
      </div>
    </div>
    <div  class="search-bar"
          @click="searchbarVisible = true"
          v-show="showSearch">
      <div class="container">
        <div class="left">
          <input type="text" :placeholder="inputMsg" readonly="readonly">
        </div>
        <button class="right flex-center">
          <img src="~images/head-search.png">
        </button>
      </div>
    </div>
  </header>
    <mt-popup class="navbar-container"
            v-model="navbarVisible"
            position="right">
      <router-link to="/home" >首页</router-link>
      <router-link to="/star-formula" >明星配方</router-link>
      <router-link to="/techservice" >技术服务</router-link>
      <router-link to="/producer" >生产商之窗</router-link>
      <router-link to="/stock" >销库存</router-link>
      <router-link to="/purchase" >集中采购</router-link>
      <router-link to="/lab" >共享实验室</router-link>
      <router-link to="/information" >行业资讯</router-link>
      <router-link to="/lesson" >公开课</router-link>
      <router-link to="/manage" >我的</router-link>

      <div class="btns">
        <div class="btn-content" @click="onAuthClick">
          <img src="../../assets/images/identification.png">
          <span>入驻认证</span>
        </div>
        <div class="hr"></div>
        <div class="btn-content" @click="toHelp">
          <img src="../../assets/images/helpcenter.png">
          <span>帮助中心</span>
        </div>
        <div class="hr"></div>
        <div class="btn-content" @click="toMessage">
          <div class="icon">
            <img src="~images/information.png">
            <mt-badge class="badge" color="#9c36b5" v-if="messageLenth !== 0">{{messageLenth}}</mt-badge>
          </div>
          <span>消息</span>
        </div>
      </div>
  </mt-popup>

  <mt-popup class="popup-search"
            position="top"
            v-model="searchbarVisible"
            modal="false"
            closeOnClickModal="false">
    <div class="content">
      <img src="../../assets/images/return.png" @click="searchbarVisible = false">
      <div class="box">
        <p class="title">找原料</p>
        <div class="search-box">
          <input type="text" v-model="searchForm.goods" placeholder="请输入原料产品名/化学名/INCI名/分类">
          <button class="flex-center" @click="onSearchClick(1)">搜索</button>
        </div>
      </div>
      <div class="box">
        <p class="title">找配方</p>
        <div class="search-box">
          <input type="text" v-model="searchForm.formula" placeholder="请输入配方名称/分类/描述的关键词">
          <button class="flex-center" @click="onSearchClick(2)">搜索</button>
        </div>
      </div>
      <div class="box">
        <p class="title">找供应商</p>
        <div class="search-box">
          <input type="text" v-model="searchForm.shop" placeholder="请输入供应商名称/店铺名称">
          <button class="flex-center" @click="onSearchClick(3)">搜索</button>
        </div>
      </div>
    </div>
  </mt-popup>

   <mt-popup class="popup-service"
              position="top"
              v-model="serviceVisible"
              :class="serviceVisible ? 'pop-active' : ''">
      <div v-if="serviceVisible">
        <div class="page-header">
          <div class="page-tab flex-center" @click="onClickServicePager(1)" :class="activeServicePager === 'service-tab1' ? 'active' : '' ">找配方</div>
          <div class="page-tab flex-center" @click="onClickServicePager(2)" :class="activeServicePager === 'service-tab2' ? 'active' : '' ">找原料</div>
          <div class="page-tab flex-center" @click="onClickServicePager(3)" :class="activeServicePager === 'service-tab3' ? 'active' : '' ">找服务</div>
          <div class="page-tab flex-center" @click="onClickServicePager(4)" :class="activeServicePager === 'service-tab4' ? 'active' : '' ">实验室</div>
          <div class="page-tab flex-center" @click="onClickServicePager(5)" :class="activeServicePager === 'service-tab5' ? 'active' : '' ">答疑解惑</div>
        </div>
        <mt-tab-container class="pager-body" v-model="activeServicePager" :swipeable="true">
          <mt-tab-container-item id="service-tab1">
            <div class="service-container">
              <div class="head">
                <div class="title">分类查找</div>
                <router-link to="/star-formula">
                  <div class="seemore">
                    <span>查看更多</span><img src="../../assets/images/more.png" >
                  </div>
                </router-link>
              </div>
              <div class="content">
                <div  class="items single-line"
                      v-for="(item, index) in fomulaTypes" :key="index"
                      @click="onTagClick(0, item.name)">
                  {{item.name}}
                </div>
              </div>
              <div class="bottom">
                <p class="title">找配方</p>
                <textarea class="description" placeholder="请输入需求" v-model="tab1Form.description" maxlength="200"></textarea>
                <input type="text" class="name" placeholder="请输入联系人姓名" v-model="tab1Form.username">
                <input type="text" class="tel" placeholder="请输入联系电话"  v-model="tab1Form.mobile">
                <div class="btn-container">
                  <span class="service-submit flex-center" @click="onSubmitClick(2)">
                    一键提交
                  </span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="service-tab2">
            <div class="service-container">
              <div class="head">
                <div class="title">分类查找</div>
                <router-link to="/goods-result">
                  <div class="seemore">
                    <span>查看更多</span><img src="../../assets/images/more.png" >
                  </div>
                </router-link>
              </div>
              <div class="content">
                <div  class="items single-line"
                      v-for="(item, index) in stockTypes" :key="index"
                      @click="clickStockTag(item.name)">
                  {{item.name}}
                </div>
              </div>
              <div class="bottom">
                <p class="title">找原料</p>
                <input type="text" placeholder="请输入产品名称" v-model="tab2Form.title">
                <textarea class="description" placeholder="请输入需求" v-model="tab2Form.description" maxlength="200"></textarea>
                <input type="text" placeholder="请输入联系人姓名" v-model="tab2Form.username">
                <input type="text" placeholder="请输入联系电话"  v-model="tab2Form.mobile">
                <div class="btn-container">
                  <span class="service-submit flex-center"  @click="onSubmitClick(3)">
                    一键提交
                  </span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="service-tab3">
            <div class="service-container">
              <div class="bottom">
                <p class="title">找服务</p>
                <textarea class="description" placeholder="请输入需求" v-model="tab3Form.description" maxlength="200"></textarea>
                <input type="text" placeholder="请输入联系人姓名" v-model="tab3Form.username">
                <input type="text" placeholder="请输入联系电话"  v-model="tab3Form.mobile">
                <div class="btn-container">
                  <span class="service-submit flex-center"  @click="onSubmitClick(4)">
                    一键提交
                  </span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="service-tab4">
            <div class="introduction">
              <p class="">为配方师提供从实验场地-原料提供-小样保管-样品寄送-技术交流-自创品牌推广的一站式解决方案。</p>
              <router-link to="/lab" >查看详情</router-link>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="service-tab5">
            <div>
              <div class="introduction">
                <p>您是否对妆配库能提供给您的服务仍有疑问？您是否对配方中原料的应用仍有困惑？您也可以找到您需要的答案，欢迎您的提问和建议。</p>
               <router-link to="/question" >查看详情</router-link>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
    </div>
  </mt-popup>
 </div>

</template>

<script>
import { TabContainer, TabContainerItem, Popup, Badge, Toast, MessageBox } from 'mint-ui'
import { CategoryService } from 'api/index/category-service'
import { InquiryService } from 'api/index/inquiry-service'
import { MessageService } from 'api/index/message-service'
import { mapMutations } from 'vuex'
import { Tools } from 'utils/tools'
import defaultHead from 'images/default.png'
import userHead from 'images/logon.png'

export default {
  name: 'sy-header',

  props: {
    showSearch: {
      type: Boolean,
      default: true
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    inputPlaceHolder: {
      type: String,
      default: '请输入你要搜索的商品名称'
    }
  },

  data () {
    return {
      navbarVisible: false,
      searchbarVisible: false,
      serviceVisible: false,
      activeServicePager: 'service-tab1',
      loginImg: userHead,
      tab1Form: {
        username: '',
        mobile: '',
        description: ''
      },
      tab2Form: {
        title: '',
        username: '',
        mobile: '',
        description: ''
      },
      tab3Form: {
        username: '',
        mobile: '',
        description: ''
      },
      searchForm: {
        goods: '',
        formula: '',
        shop: ''
      },
      inputMsg: '请输入你要搜索的商品名称',
      user: ''
    }
  },

  computed: {
    fomulaTypes () {
      return this.$store.state.formulaTagsCache.filter((e, i) => i < 20)
    },

    stockTypes () {
      return this.$store.state.materialTagsCache.filter((e, i) => i < 20)
    },

    messageLenth () {
      return this.$store.state.unReadMsg || 0
    }
  },

  components: {
    TabContainer,
    TabContainerItem,
    Popup,
    Badge
  },

  methods: {
    toHome () {
      this.$router.push({
        path: '/'
      })
    },

    toHelp () {
      this.$router.push({
        path: '/help'
      })
    },

    onAuthClick () {
      MessageBox({
        title: '提示',
        message: '妆配库暂未开放手机端的认证，烦请至pc门户进行相关操作',
        showCancelButton: true
      })
    },

    toMessage () {
      this.$router.push({
        path: '/message'
      })
    },

    clickLogin () {
      this.$router.push({
        path: !this.user ? '/login' : '/manage'
      })
    },

    // pager切换
    onClickServicePager (index) {
      this.activeServicePager = `service-tab${index}`
      console.log(this.activeServicePager)
    },
    // 显示导航popup
    clickNavBarBtn () {
      // 先关闭其他的popup
      this.closeServicePop()
      this.navbarVisible = true
    },
    // 关闭服务的popup
    closeServicePop () {
      if (this.serviceVisible) {
        this.serviceVisible = false
      }
    },

    closeSearchPop () {
      this.searchbarVisible = false
    },

    onTagClick (type, id) {
      let paths = ['/star-formula', '']
      this.$router.push({
        path: paths[type],
        query: {
          cateId: id
        }
      })
    },

    // 一键提交
    onSubmitClick (type) {
      let formObj = this[`tab${type - 1}Form`]
      // 找原料多了一个 产品名称字段
      if (type === 3 && !formObj.title) {
        Toast('信息未填完整')
      } else if (!formObj.username || !formObj.mobile || !formObj.description) {
        Toast('信息未填完整')
      } else {
        this.inquiryService.add({
          type,
          title: formObj.title,
          userName: formObj.username,
          mobile: formObj.mobile,
          description: formObj.description
        }).then(res => {
          this.closeServicePop()
          formObj.title = ''
          formObj.username = ''
          formObj.mobile = ''
          formObj.description = ''
          Toast('提交成功')
        })
      }
    },

    onSearchClick (type) {
      let routerPath = ['', 'goods', 'formula', 'shop']
      let msg = ''

      if (type === 1) {
        msg = this.searchForm.goods
      } else if (type === 2) {
        msg = this.searchForm.formula
      } else if (type === 3) {
        msg = this.searchForm.shop
      }

      console.log(`msg=`, msg)

      if (msg.trim()) {
        this.$router.push({
          path: `/${routerPath[type]}-result`,
          query: {
            msg
          }
        })
      } else {
        Toast('搜索内容不能为空')
      }
    },

    clickStockTag (name) {
      this.$router.push({
        path: `/goods-result`,
        query: {
          msg: name
        }
      })
    },

    ...mapMutations({
      setFormulaTags: 'setFormulaTags',
      setMaterialTags: 'setMaterialTags',
      setUnReadMsg: 'setUnReadMsg'
    })
  },

  created () {
    this.categoryService = new CategoryService()
    this.inquiryService = new InquiryService()
    this.messageService = new MessageService()
  },

  mounted () {
    if (this.fomulaTypes.length === 0) {
      this.categoryService.listCache(3)
        .then(res => {
          this.setFormulaTags(res)
        })
    }
    if (this.stockTypes.length === 0) {
      this.categoryService.listCache(1)
        .then(res => {
          this.setMaterialTags(res)
        })
    }
    this.user = Tools.getUser()

    if (this.user) {
      console.log('login')
      this.loginImg = this.user.head || defaultHead
      this.$refs.btnlogin.style.borderColor = '#aaa'
      this.$refs.btnlogin.style.borderRadius = '50%'

      this.messageService.unRead()
        .then(res => {
          if (res) {
            this.setUnReadMsg(res.count)
          }
        })
    } else {
      this.$refs.btnlogin.style.borderRadius = '0%'
    }
  },

  watch: {
    serviceVisible () {
      document.body.style.overflow = this.serviceVisible ? 'hidden' : 'auto'
    },
    inputPlaceHolder () {
      this.inputMsg = this.inputPlaceHolder
    }
  },

  beforeDestroy () {
    document.body.style.overflow = 'auto'
  }

}
</script>

<style lang="scss">
.popup-service.pop-active + .v-modal {
  top: 1.18rem;
}

.mint-toast,
.mint-toast-text {
  z-index: 2016;
}
</style>

<style lang="scss" scoped>
@import '../../scss/shotcut.scss';

#header {
  background: white;
  padding: 0 0.3rem;
  margin-bottom: 0.1rem;

  &.no-margin {
    margin-bottom: 0;
  }

  .controll {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    height: 1rem;
    font-size: 0;

    .logo {
      width: 1.6rem;
      height: 0.53rem;
      background: white;
    }

    .btns > img {
      width: 0.4rem;
      height: 0.4rem;
      margin-left: 0.2rem;
    }

    .btns > .btn-login {
      border: 1px solid white;
    }
  }

  .search-bar {
    padding-top: 0.17rem;
    padding-bottom: 0.2rem;
    width: 6.9rem;
    height: 0.8rem;

    & > .container {
      width: 100%;
      height: 100%;
      border: 1px solid $text-green;
      border-radius: 4px;
      display: flex;
      overflow: hidden;
      box-sizing: border-box;

      & > .left {
        flex-grow: 1;

        input {
          width: 100%;
          height: 100%;
          font-size: 0.24rem;
          color: $text-french;
          text-indent: 1em;
          vertical-align: top;
        }
      }

      & > .right {
        flex-shrink: 0;
        width: 1rem;
        height: 100%;
        background-color: $text-green;
        border-radius: 0;

        img {
          width: 0.44rem;
          height: 0.44rem;
        }
      }
    }
  }
}

.navbar-container {
  width: 80%;
  height: 100%;
  background-color: white;
  font-size: 0;

  & > a {
    display: inline-flex;
    box-sizing: border-box;
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    border-bottom: 1px solid $border-gray;
    font-size: 0.3rem;
    color: $text-black;
    padding-left: 0.3rem;
  }

  .btns {
    box-sizing: border-box;
    height: 1rem;
    padding: 0.1rem 0;
    display: flex;
    align-items: center;
    margin-top: 0.3rem;

    div.hr {
      width: 1px;
      height: 0.5rem;
      background: $border-gray;
    }

    .btn-content {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      box-sizing: border-box;
      flex-grow: 1;

      & > img,
      .icon img {
        width: 0.4rem;
        height: 0.4rem;
        padding-bottom: 0.1rem;
      }

      .icon {
        position: relative;

        .badge {
          height: 0.18rem;
          position: absolute;
          top: 0;
          right: -40%;
          font-size: 0.14rem;
          padding: 2px 5px;
        }
      }

      & > span {
        font-size: 0.24rem;
        color: $text-black;
      }
    }
  }
}

.popup-search {
  background: #f2f2f2;
  width: 100%;
  height: 100%;

  .content {
    background: white;
    padding: 0.4rem 0.4rem 0;
    text-align: left;

    & > img {
      width: 0.3rem;
      height: 0.3rem;
      margin-bottom: 0.5rem;
      vertical-align: top;
    }

    .box {
      height: 1.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 0.8rem;
      .title {
        font-size: 0.36rem;
        color: $text-black;
      }

      .search-box {
        height: 0.7rem;
        display: flex;
        justify-content: space-between;
        & > input {
          height: 100%;
          box-sizing: border-box;
          font-size: 0.28rem;
          border-bottom: 1px solid #aaa;
          width: 5rem;
        }

        & > button {
          height: 100%;
          width: 1.2rem;
          font-size: 0.28rem;
          color: white;
          background: $text-green;
        }
      }
    }
  }
}

.popup-service {
  top: 1rem;
  width: 100%;
  .page-header {
    display: flex;
    height: 0.9rem;
    box-sizing: border-box;
    border-top: 1px solid $border-gray;
    border-bottom: 1px solid $border-gray;

    .page-tab {
      flex-grow: 1;
      font-size: 0.28rem;
      box-sizing: border-box;

      &.active {
        color: $text-green;
        border-bottom: 4px solid $text-green;
      }
    }
  }
  .pager-body {
    padding: 0 0.3rem;

    .head {
      display: flex;
      justify-content: space-between;
      height: 0.8rem;

      .title {
        font-size: 0.32rem;
        color: $text-black;
        display: flex;
        align-items: center;
      }

      .seemore {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        color: $text-black;
        text-align: right;
        height: 100%;

        & > img {
          width: 0.28rem;
          height: 0.28rem;
          margin-top: 3px;
          margin-left: 0.1rem;
        }
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid $border-gray;

      .items {
        width: 25%;
        text-align: left;
        line-height: 0.5rem;
        font-size: 0.24rem;
        color: $text-gray;
        border: 1px solid rgba(0, 0, 0, 0);
        box-sizing: border-box;
      }
    }

    .bottom {
      padding-bottom: 0.3rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .title {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.32rem;
        color: $text-black;
      }

      .description,
      & > input {
        margin-bottom: 0.2rem;
        box-sizing: border-box;
        border: 1px solid $border-gray;
        text-indent: 0.25rem;
        width: 6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.24rem;
      }

      .description {
        height: 1.2rem;
        resize: none;
        outline: none;
        line-height: 0.4rem;
      }

      .btn-container {
        padding-top: 0.1rem;
        display: flex;
        justify-content: center;
        width: 100%;

        .service-submit {
          background: $text-green;
          color: white;
          font-size: 0.24rem;
          width: 3rem;
          height: 0.6rem;
          display: inline-flex;
        }
      }
    }

    .introduction {
      color: $text-gray;
      font-size: 0.3rem;
      padding: 0.3rem;

      & > p {
        text-align: left;
      }

      & > a {
        border: 1px solid $border-gray;
        padding: 0.1rem 0.3rem;
        border-radius: 2px;
        margin-top: 0.2rem;
        display: inline-block;
      }
    }
  }
}
</style>
