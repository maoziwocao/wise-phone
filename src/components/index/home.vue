<template>
  <div class="bg">

    <sy-header></sy-header>

    <section class="broadcast">
      <img src="../../assets/images/icon_notification.png" class="img">
      <div class="broadcast-list swiper-container">
         <span>{{notice}}</span>
        <!-- <div class="slider-wrapper">
          <div class="swiper-slide">
            <span>北京地区暂停发货！如有疑问，请联系客服。1</span>
          </div>
        </div> -->
      </div>
    </section>

    <section class="banner swiper-container" >
      <div class="swiper-wrapper">
        <div  class="swiper-slide"
              v-for="item in banners" :key="item.aideId">
          <img :src="item.image" alt="">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </section>

    <section class="viewpager">
      <div class="page-header">
        <div class="page-tab" @click="onClickPager(1)" :class="activePager === 'tab1' ? 'active' : '' ">最新配方师</div>
        <div class="page-tab" @click="onClickPager(2)" :class="activePager === 'tab2' ? 'active' : '' ">最新供应商</div>
        <div class="page-tab" @click="onClickPager(3)" :class="activePager === 'tab3' ? 'active' : '' ">最新技术服务</div>
      </div>
      <mt-tab-container class="pager-body" v-model="activePager" :swipeable='true'>
        <mt-tab-container-item id="tab1">
          <div class="item-container" v-for="(item, index) in formulators_back" :key="index" @click="onShopClick(item.id)">
            <img v-lazy="item.head">
            <div class="content">
              <p class="name single-line">{{item.nickName}}</p>
              <span class="des third-line">{{item.content || '暂无'}}</span>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab2">
          <div class="item-container" v-for="(item, index) in supplier_back" :key="index" @click="onShopClick(item.id)">
            <img v-lazy="item.head">
            <div class="content">
              <p class="name single-line">{{item.nickName}}</p>
              <span class="des third-line">{{item.content || '暂无'}}</span>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab3">
          <div class="item-container" v-for="(item, index) in technicalService_back" :key="index" @click="onServiceClick(item.id)">
            <img v-lazy="item.head">
            <div class="content">
              <p class="name single-line">{{item.nickName}}</p>
              <span class="des third-line">{{item.content || '暂无'}}</span>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="loadmore" @click="onLoadMoreClick">
        <div v-show="!isLoadmore" class="more-container">
          <span>查看更多</span>
          <img src="~images/more.png" >
        </div>
        <!-- <img src="../../assets/images/ajax-loader.gif" v-show="isLoadmore"> -->
        <mt-spinner type="snake" v-show="isLoadmore" class="spinner-snake"></mt-spinner>
      </div>
    </section>

    <section class="star-formula">
      <div class="title">
        明星配方
      </div>
      <div class="swiper-container star-formula-container" v-if="allData.starFormula.length > 0">
        <div class="swiper-wrapper" style="padding-bottom: .4rem;">
          <div  class="swiper-slide"
                v-for="(item, index) in allData.starFormula" :key="index"
                @click="onStarFormulaClick(item.id)">
            <img :src="item.head" alt="">
            <p class="title single-line">{{item.name}}</p>
            <p class="subject">{{item.subject}}</p>
          </div>
        </div>
      </div>
      <div class="loadmore" @click="onFormulaBannerClick">
        <div class="more-container">
          <span>查看更多</span>
          <img src="~images/more.png" >
        </div>
      </div>
    </section>

    <section class="advisor">
      <div class="title">
        最新专家顾问
      </div>
      <div class="list">
        <div class="item-container" v-for="(item, index) in allData.professor" :key="index">
          <img v-lazy="item.head">
          <div class="content">
            <p class="name single-line">{{item.title}}</p>
            <span class="des third-line">{{item.introduce || '暂无'}}</span>
          </div>
        </div>
      </div>
      <div class="loadmore" @click="onProfessorClick">
        <div class="more-container">
          <span>查看更多</span>
          <img src="~images/more.png" >
        </div>
      </div>
    </section>

    <section class="swap">
      <div class="title">销库存</div>
      <div class="message">
        <div class="left flex-center">成交信息</div>
        <div class="right flex-center">
          <!-- stockAdjustOrder -->
          <ul class="scroll-text" ref="scrollText">
            <li v-for="(item, index) in allData.stockAdjustOrder" :key="index">
              {{item.user.realName}}&nbsp;{{item.createTime}}&nbsp;成交了{{item.goods.name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="list">
        <!-- stockAdjustGoods -->
        <div  class="goods"
              v-for="(item, index) in allData.stockAdjustGoods" :key="index"
              @click="onGoodsClick(item.id)">
          <img v-lazy="item.head">
          <p class="name single-line">{{item.chemicalCall}}</p>
          <p class="price">{{item.price}}元</p>
          <p class="hr"></p>
          <p class="delivery-location">
            <span>发货地:</span>上海浦东区<span></span>
          </p>
          <p class="stock">
            <span>库存:</span>{{item.stock}}<span></span>
          </p>
        </div>
      </div>
      <div class="loadmore" @click="onSwapClick">
        <div class="more-container">
          <span>查看更多</span>
          <img src="~images/more.png" >
        </div>
      </div>
    </section>

    <section class="pur">
      <!-- centralizedPurchasingSupplier -->
      <div class="title flex-center">
        集中采购
      </div>
      <div class="content">
        <img src="../../assets/images/solution.jpg" @click="toPurchase">
        <div class="img-box">
          <!-- item.id为店铺的id -->
          <img  v-for="(item, index) in allData.centralizedPurchasingSupplier" :key="index"
                v-lazy="item.logo"
                @click="onShopClick(item.id)">
        </div>
      </div>
    </section>

    <section class="spread">
      <div class="title">推广服务</div>
      <div class="hint flex-center">即将推出, 敬请期待</div>
      <div class="img-box">
        <img src="../../assets/images/speard1.jpg">
        <img src="../../assets/images/speard2.jpg">
        <img src="../../assets/images/speard3.jpg">
      </div>
    </section>

    <sy-footer></sy-footer>
  </div>
</template>

<script>
import { HomeService } from 'api/index/home-service'
import { SysPropsService } from 'api/index/sysprops-service'
import { Tools } from 'utils/tools'
import Swiper from 'swiper'
import { TabContainer, TabContainerItem, Toast, Spinner, Popup, Badge } from 'mint-ui'
import Footer from './footer'
import Header from './header'

export default {
  components: {
    TabContainer,
    TabContainerItem,
    Spinner,
    Popup,
    Badge,
    [Footer.name]: Footer,
    [Header.name]: Header
  },

  data () {
    return {
      allData: {
        starFormula: []
      },
      professorOrigin: [], // 专家顾问的原数组
      notice: '',
      banners: '',
      formulators_back: [],
      supplier_back: [],
      technicalService_back: [],
      activePager: 'tab1',
      pagerIndex: 1,
      pagerArrays: ['formulators', 'supplier', 'technicalService'],
      isLoadmore: false
    }
  },

  methods: {
    onGoodsClick (id) {
      this.$router.push({
        path: 'stock/detail',
        query: {
          id
        }
      })
    },

    toPurchase () {
      this.$router.push({
        path: '/purchase'
      })
    },

    onShopClick (id) {
      this.$router.push({
        path: '/shop',
        query: {
          id
        }
      })
    },

    onServiceClick (id) {
      this.$router.push({
        path: '/techservice/detail',
        query: {
          id
        }
      })
    },

    onStarFormulaClick (id) {
      this.$router.push({
        path: '/star-formula/detail',
        query: {
          id
        }
      })
    },

    onFormulaBannerClick () {
      this.$router.push({
        path: '/star-formula'
      })
    },

    onSwapClick () {
      this.$router.push({
        path: '/stock'
      })
    },

    onClickPager (index) {
      this.activePager = `tab${index}`
    },

    onProfessorClick () {
      if (this.allData.professor.length > this.professorOrigin.length) {
        for (let i = this.allData.professor.length, count = 0; i < this.professorOrigin.length; i++) {
          if (count === 3) {
            break
          }
          this.allData.professor.push(this.professorOrigin[i])
        }
      } else {
        Toast('没有更多了')
      }
    },

    onLoadMoreClick () {
      let arr = this.allData[this.pagerArrays[this.pagerIndex - 1]]
      let arrBack = this[`${this.pagerArrays[this.pagerIndex - 1]}_back`]

      // 缓存的数组比当前数组条数多
      this.isLoadmore = true
      setTimeout(() => {
        console.log(arr.length, arrBack.length)
        if (arr.length > arrBack.length) {
          for (let i = arrBack.length, count = 0; i < arr.length; i++ , count++) {
            if (count === 3) {
              break
            }
            // 有item才去加
            if (arr[i]) {
              arrBack.push(arr[i])
            }
          }
        } else {
          Toast('没有更多了')
        }
        this.isLoadmore = false
      }, 1000)
    },

    initStarFomula () {
      // let rem = document.documentElement.style.fontSize.replace('px', '')

      this.starFormulaSwiper = new Swiper('.star-formula-container', {
        watchSlidesProgress: true,
        slidesPerView: 1.5,
        centeredSlides: true,
        autoplay: false,
        on: {
          progress: function (progress) {
            for (let i = 0; i < this.slides.length; i++) {
              let slide = this.slides.eq(i)
              // console.log(slide.css('width'))
              let silideWidth = slide.css('width').replace(/px/, '')
              let slideProgress = this.slides[i].progress
              let modify = 1
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
              }
              let translate = slideProgress * modify * (0.43 * silideWidth) + 'px'
              // let translate = 0
              let scale = 1 - Math.abs(slideProgress) / 5
              let zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
              slide.transform('translateX(' + translate + ') scale(' + scale + ')')
              slide.css('zIndex', zIndex)
              slide.css('opacity', scale)
              if (Math.abs(slideProgress) >= 2) {
                slide.css('opacity', 0)
              }
            }
          },
          setTransition: function (transition) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i)
              slide.transition(transition)
            }
          }
        }

      })
    },

    initScrollText () {
      let scrollText = this.$refs.scrollText
      // ul宽度
      let scrollTextWidth = scrollText.offsetWidth
      // 滚动长度
      let scrollWidth = 0
      // console.log(scrollText.offsetWidth)
      this.scrollTimer = setInterval(() => {
        if (scrollWidth > scrollTextWidth) {
          scrollWidth = 0
        } else {
          scrollWidth++
        }
        scrollText.style.transform = `translate3d(-${scrollWidth}px,0,0)`
      }, 30)
    }
  },

  computed: {
    // linkData () {
    //   return this.linksIndex === 0 ? this.links : this.cooper
    // }
  },

  watch: {
    activePager () {
      this.pagerIndex = parseInt(this.activePager.replace('tab', ''))
      console.log('change', this.pagerIndex)
    }
  },

  created () {
    this.homeServie = new HomeService()
    this.sysPropsService = new SysPropsService()
  },

  mounted () {
    /** 大部分数据
     */
    this.homeServie.data().then(res => {
      if (res) {
        // formulators 配方师
        res.formulators.map((e, i) => {
          if (i < 3) {
            this.formulators_back.push(e)
          }
          return Object.assign(e, {
            head: e.logo,
            nickName: e.user.realName,
            content: e.shopDesc
          })
        })
        // supplier 供应商
        res.supplier.map((e, i) => {
          if (i < 3) {
            this.supplier_back.push(e)
          }
          return Object.assign(e, {
            head: e.logo,
            nickName: e.shopName,
            content: e.shopDesc
          })
        })
        // technicalService 技术服务
        res.technicalService.map((e, i) => {
          if (i < 3) {
            this.technicalService_back.push(e)
          }
          return Object.assign(e, {
            head: Tools.getImgPath(e).imgPath,
            nickName: e.name,
            content: e.subject
          })
        })
        // starFormula 明星配方
        res.starFormula.map(e => {
          return Object.assign(e, {
            head: Tools.getImgPath(e).imgPath
          })
        })
        // stockAdjustGoods 库存调剂的4个产品
        res.stockAdjustGoods.map(e => {
          return Object.assign(e, {
            head: Tools.getImgPath(e).imgPath
          })
        })
        // 专家顾问只需要3条
        this.professorOrigin = res.professor.concat([])
        console.log(this.professorOrigin)
        res.professor.length = res.professor.length < 3
          ? res.professor.length
          : 3

        // 集中采购只需要3条
        res.centralizedPurchasingSupplier.length = res.centralizedPurchasingSupplier.length < 3
          ? res.centralizedPurchasingSupplier.length
          : 3
        this.allData = res

        this.$nextTick(() => {
          this.initScrollText()
          this.initStarFomula()
        })
      }
    })
    // 轮播图数据
    this.homeServie.banner().then(res => {
      if (res) {
        this.banners = res.list

        this.$nextTick(() => {
          this.banner = new Swiper('.banner', {
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets'
            },
            autoplay: true
          })
        })
      }
    })
    // 滚动公告数据 ，暂时只有一条
    this.sysPropsService.get({ propName: 'notice' }).then(res => {
      if (res) {
        this.notice = res[0] ? JSON.parse(res[0].propValue).content : `欢迎来到妆配库`
      }
    })
  },

  beforeDestroy () {
    clearInterval(this.scrollTimer)
  }

}
</script>

<style lang="scss">
@import 'swiper/dist/css/swiper.min.css';
.banner {
  .swiper-pagination {
    bottom: 0;
  }
  .swiper-pagination-bullet {
    width: 0.4rem;
    height: 4px;
    margin: 0 5px !important;
    background: white;
    border-radius: 0;
    opacity: 0.5;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }
}

.star-formula {
  & > .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    color: #333;
    height: 0.88rem;
  }

  .swiper-slide {
    box-shadow: 0 0 0.2rem #b7b7b7;
    overflow: hidden;
    height: 5.1rem;
    width: 6rem;
    background: white;

    & > img {
      width: 100%;
      height: 3rem;
      font-size: 0;
      vertical-align: bottom;
    }

    .title {
      font-size: 0.24rem;
      color: #333;
      line-height: 0.4rem;
      padding: 0.2rem 0.3rem 0;
    }

    .subject {
      font-size: 0.2rem;
      color: #999;
      line-height: 0.3rem;
      padding: 5px 0.3rem 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }
  }
}
</style>

<style scoped lang="scss">
@import '~scss/shotcut.scss';

section {
  margin-bottom: 0.2rem;
  background: white;
}

.bg {
  background-color: #f2f2f2;
}

.broadcast {
  height: 0.88rem;
  background: white;
  margin: 0.2rem 0;
  display: flex;
  align-items: center;

  & > .img {
    width: 0.3rem;
    height: 0.3rem;
    padding: 0 0.2rem 0 0.3rem;
    flex-shrink: 0;
  }

  .broadcast-list {
    flex-grow: 1;
    color: $text-black;
    font-size: 0.28rem;
    text-align: left;
  }
}

.banner {
  height: 4rem;
  margin-bottom: 0;

  .swiper-slide > img {
    width: 100%;
    height: 100%;
  }
}

.viewpager {
  margin-bottom: 0.2rem;

  .page-header {
    height: 0.9rem;
    font-size: 0.3rem;
    color: $text-gray;
    display: flex;
    background: white;
    box-sizing: border-box;
    border-bottom: 1px solid $border-gray;

    .page-tab {
      height: 100%;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      &.active {
        color: $text-green;
        border-bottom: 4px solid $text-green;
      }
    }
  }
  .pager-body {
    background: white;
    padding: 0.3rem 0.3rem 0;

    .item-container {
      padding: 0.3rem 0;
      border-bottom: 1px solid $border-gray;
      display: flex;
      justify-content: space-between;

      & > img {
        width: 1.8rem;
        height: 1.8rem;
        flex-shrink: 0;
      }

      .content {
        padding-left: 0.2rem;
        flex-grow: 1;
        // flex: 1;
        text-align: left;

        .name {
          display: flex;
          align-items: center;
          color: $text-black;
          font-size: 0.28rem;
          height: 0.5rem;
        }

        .des {
          color: $text-french;
          font-size: 0.22rem;
          padding-top: 0.1rem;
          line-height: 0.4rem;
        }
      }
    }
  }

  .loadmore {
    height: 0.86rem;
    font-size: 0.24rem;
    color: $text-black;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;

    .more-container {
      display: flex;
      align-items: center;
    }

    .loadmore {
      display: flex;
      align-items: center;
    }

    span {
      margin-right: 0.1rem;
    }

    img {
      width: 0.24rem;
      height: 0.24rem;
    }
  }
}

.loadmore {
  height: 0.86rem;
  font-size: 0.24rem;
  color: $text-black;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .more-container {
    display: flex;
    align-items: center;
  }

  .loadmore {
    display: flex;
    align-items: center;
  }

  span {
    margin-right: 0.1rem;
  }

  img {
    width: 0.24rem;
    height: 0.24rem;
  }
}

.advisor {
  background: white;

  .title {
    font-size: 0.3rem;
    height: 0.6rem;
    color: $text-black;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .list {
    padding: 0 0.3rem;

    .item-container {
      padding: 0.3rem 0;
      border-bottom: 1px solid $border-gray;
      display: flex;
      justify-content: space-between;
      &:nth-last-child(1) {
        border-bottom: none;
      }

      & > img {
        width: 1.8rem;
        height: 1.8rem;
        flex-shrink: 0;
      }

      .content {
        padding-left: 0.2rem;
        flex-grow: 1;
        flex: 1;
        text-align: left;

        .name {
          display: flex;
          align-items: center;
          color: $text-black;
          font-size: 0.28rem;
          height: 0.5rem;
        }

        .des {
          color: $text-french;
          font-size: 0.22rem;
          padding-top: 0.1rem;
          line-height: 0.4rem;
        }
      }
    }
  }
}

.swap {
  padding: 0 0.3rem 0.3rem;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    color: $text-black;
    height: 0.88rem;
  }

  .message {
    height: 0.8rem;
    box-sizing: border-box;
    border: 1px solid $border-gray;
    display: flex;

    .left {
      width: 1.8rem;
      box-sizing: border-box;
      background: #eeeeee;
      border-right: 1px solid $border-gray;
      font-size: 0.28rem;
      flex-shrink: 0;
    }

    .right {
      overflow: hidden;
      padding: 0 0.25rem;
      font-size: 0.18rem;
      position: relative;
      width: 100%;

      .scroll-text {
        height: 0.4rem;
        display: inline;
        white-space: nowrap;
        position: absolute;
        left: 0.2rem;

        & > li {
          height: 0.4rem;
          line-height: 0.4rem;
          // float: left;
          white-space: nowrap;
          display: inline-block;
          margin-right: 0.2rem;
        }
      }
    }
  }

  .list {
    padding-top: 0.15rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    .goods:nth-last-child(1),
    .goods:nth-last-child(2) {
      margin-bottom: 0;
    }
    .goods {
      padding: 0.2rem;
      border: 1px solid $border-gray;
      box-sizing: border-box;
      text-align: left;
      width: 3.35rem;
      margin-bottom: 0.2rem;

      & > img {
        width: 1.8rem;
        height: 1.2rem;
        vertical-align: bottom;
      }

      .name {
        font-size: 0.24rem;
        color: $text-black;
        line-height: 0.4rem;
        padding-top: 0.1rem;
      }

      .price {
        font-size: 0.24rem;
        color: $text-green;
        padding-bottom: 0.1rem;
      }

      p.hr {
        background: $border-gray;
        margin-bottom: 0.1rem;
      }

      .delivery-location,
      .stock {
        font-size: 0.18rem;
        line-height: 0.3rem;
        color: $text-french;
        padding-bottom: 0.1rem;
      }
    }
  }
}

.pur {
  padding: 0 0.3rem 0.4rem;

  .title {
    height: 0.9rem;
    font-size: 0.3rem;
    color: $text-black;
  }

  .content {
    & > img {
      width: 100%;
      height: 3.6rem;
    }

    .img-box {
      display: flex;
      justify-content: space-between;
      & > img {
        width: 2.2rem;
        height: 1.4rem;
        border: 1px solid $border-gray;
        box-sizing: border-box;
      }
    }
  }
}

.spread {
  padding: 0 0.3rem 0.3rem;

  .title {
    height: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 0.3rem;
    color: $text-black;
  }

  .hint {
    font-size: 0.24rem;
    color: #f57627;
    height: 0.7rem;
  }

  .img-box {
    display: flex;
    justify-content: space-between;
    & > img {
      width: 2.2rem;
      height: 1.8rem;
    }
  }
}

.see-more {
  height: 1rem;
  width: 90%;
  margin: 0 auto;
  font-size: 0.2rem;
  border-top: 1px solid #ddd;
}
</style>
