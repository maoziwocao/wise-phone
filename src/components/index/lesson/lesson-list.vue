<template>
  <div>
    <sy-header ref="header"></sy-header>
    <div class="vedio-list">
      <div  class="item"
            v-for="(item, index) in vedios" :key="index"
            @click="onItemClick(item.id)">
        <div class="img-container">
          <div class="logo" :style="{backgroundImage:`url(${item.imgs})`}"></div>
          <img class="play" src="~images/vedio-play.png">
          <span>{{item.lastModifyTime}}</span>
        </div>
        <p class="name single-line">{{item.name}}</p>
        <p class="price">{{item.price}}</p>
      </div>
    </div>
    <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="vedios.length > 0"></load-more>
    <no-data v-show="vedios.length === 0"></no-data>
    <sy-footer></sy-footer>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import Footer from 'comp/index/footer'
import NoData from 'comp/no-data'
import { OpenCourseService } from 'api/index/oepncourse-service'
import { PageModel } from 'model/page-model'
import LoadMore from 'comp/loadmore'

export default {
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
    NoData,
    LoadMore
  },

  data () {
    return {
      vedios: [],
      pager: new PageModel()
    }
  },

  methods: {
    onItemClick (id) {
      this.$router.push({
        path: 'lesson/detail',
        query: {
          id
        }
      })
    },

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        this.openCourseService.list({
          start: this.pager.curPage,
          limit: this.pager.pageSize
        }).then(res => {
          if (res) {
            res.list.forEach(e => {
              this.vedios.push(e)
            })
            this.$refs.pageloader.close()
          }
        })
      } else {
        this.$refs.pageloader.close()
      }
    }
  },

  created () {
    this.openCourseService = new OpenCourseService()
  },

  mounted () {
    this.openCourseService.list({
      start: 0,
      limit: 10
    }).then(res => {
      if (res) {
        this.vedios = res.list
        this.pager.reset()
        this.pager.setTotal(res.total)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.vedio-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.2rem;

  .item {
    width: 3.7rem;
    margin-bottom: .1rem;
    background: white;
    text-align: left;

    .img-container {
      position: relative;
      font-size: 0;

      .logo {
        width: 100%;
        height: 2.2rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

      .play {
        width: .4rem;
        height: .4rem;
        position: absolute;
        left: .2rem;
        bottom: 0.4rem;
      }

      span {
        font-size: .12rem; padding: 2px;
        position: absolute;
        right: .1rem;
        bottom: 0.1rem;
        background: #f1f4f9;
      }
    }

    .name {
      font-size: .28rem;
      line-height: .65rem;
      text-indent: .2rem;
    }

    .price {
      text-indent: .2rem;
      color: $text-red;
      font-size: 0.24rem;
      margin-bottom: 0.25rem;

      &:before {
        content: '¥';
        margin-right: 5px;
      }
    }
  }
}
</style>
