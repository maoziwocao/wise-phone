<template>
  <div>
    <back :title="'订单详情'"> </back>
    <div class="order-status flex-center">{{status}}</div>
    <div class="contact">
      <div class="left flex-center">
        <img src="~images/location.png">
      </div>
      <div class="right">
        <p class="name">
          <span><span class="tips">收货人: </span><span>{{detail.recipientName}}</span></span>
          <span>{{detail.mobile}}</span>
        </p>
        <p class="location">
          <span class="tips">收货地址: </span>
          <span>{{`${detail.recipientAddress}`}}</span>
        </p>
      </div>
    </div>
    <div class="message">
      <div class="left flex-center">
        <img src="~images/message.png">
      </div>
      <div class="right">
        <p class="tips">买家留言</p>
        <p>{{detail.customerRemark || '暂无留言'}}</p>
      </div>
    </div>

    <div class="manager" v-if="detail.user">
      <p>公司名称： <span>{{detail.user.companyName}}</span></p>
      <p>账号： <span>{{detail.user.companyTel}}</span></p>
      <p>联系人： <span>{{detail.user.realName}}</span></p>
    </div>

    <div class="item" v-if="detail">
      <div class="top">
        <img src="~images/shop.png" class="shop-icon">
        <span>{{detail.dtManager.shopName}}</span>
      </div>
      <div class="content">
        <img v-lazy="detail.pic" class="left">
        <div class="center">
          <p class="name">{{detail.content.name}}</p>
          <p>技术服务: {{JSON.parse(detail.content.extContent.content).teac.join('、')}}</p>
        </div>
        <div class="right">
          <p class="price">¥{{detail.content.price}}</p>
          <p class="count">x{{detail.detail.quantity}}</p>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          商品编号:&nbsp;<span>{{detail.content.code}}</span>
        </div>
        <div class="right">
          合计:&nbsp;¥&nbsp;<span>{{detail.content.price * detail.detail.quantity}}</span>
        </div>
      </div>
    </div>

    <div class="des">
      <p>订单编号: <span>{{detail.orderNo}}</span> </p>
      <p>配送方式: <span>{{detail.receiving === 1 ? '快递' : '自提'}}</span> </p>
      <p>物流公司: <span>{{detail.company}}</span> </p>
      <p>物流编号: <span>{{detail.logisticsno}}</span> </p>
    </div>

  </div>
</template>

<script>
import Back from 'comp/index/back'
import NoData from 'comp/no-data'
import { BuyerService } from 'api/manage/buyerorder-service'
import { MgrService } from 'api/manage/mgrorder-service'
import { FormulationDetailStatus, roleType } from 'model/mgt-model'
import { Specs } from 'model/model-types'
import { Tools } from 'utils/tools'

export default {
  components: {
    Back,
    NoData
  },

  data () {
    return {
      id: '',
      detail: '',
      status: '',
      specs: Specs
    }
  },

  methods: {
    getOrderDetail () {
      this.orderMgrService.byId(this.id)
        .then(res => {
          if (res) {
            res.detail = res.details[0]
            res.content = JSON.parse(res.detail.mirror.content)
            // res.spec = JSON.parse(res.content.extContent.content).spec
            res.recipientAddress = `${res.province.name} ${res.city.name} ${res.county.name} ${res.address}`
            res.pic = res.content.imgs ? JSON.parse(res.content.imgs)[0] : ''
            this.detail = res
            // formulationStatus 订单状态
            // this.status = FormulationOrderStatus.filter(e => {
            //   return e.val === res.formulationStatus + ''
            // })[0].title
            this.status = FormulationDetailStatus[res.formulationStatus][Tools.getUser().sysRole.roleType]

            console.log(this.detail)
          }
        })
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.id = to.query.id
      // console.log(vm.id)
      if (Tools.getRoleType() === roleType.Buyer) {
        vm.orderMgrService = new BuyerService()
      } else if (Tools.getRoleType() === roleType.Formulators) {
        vm.orderMgrService = new MgrService()
      }
      vm.getOrderDetail()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.order-status {
  height: 1.2rem;
  font-size: 0.3rem;
  color: white;
  background: url('~images/mgtorderbg.png') no-repeat;
  background-size: contain;
}

.contact,
.message {
  display: flex;
  padding: 0 0.3rem;
  background: white;

  .left {
    height: 1.25rem;
    margin-right: 0.15rem;
    width: 0.5rem;
    flex-shrink: 0;

    & > img {
      width: 0.3rem;
      height: 0.34rem;
    }
  }

  .right {
    font-size: 0.26rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0.1rem 0;

    .tips {
      color: $text-french;
      flex-shrink: 0;
    }

    & > p {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }

    .name {
      display: flex;
      justify-content: space-between;
    }
  }
}

.message {
  border-bottom: 1px solid $border-gray;

  & > .left > img {
    width: 0.35rem;
    height: 0.3rem;
  }
}

.manager {
  background: white;
  margin-bottom: 0.2rem;
  text-align: left;
  padding: 0.2rem 0.4rem;
  font-size: 0.26rem;
  line-height: 2;
}

.item {
  background: white;
  margin-bottom: 0.2rem;
  text-align: left;

  & > .top {
    display: flex;
    align-items: center;
    height: 0.9rem;
    padding: 0 0.3rem;

    .shop-icon {
      width: 0.3rem;
      height: 0.28rem;
      margin-right: 0.1rem;
      flex-shrink: 0;
    }

    & > span {
      font-size: 0.26rem;
      flex-grow: 1;
    }

    .shop-detail {
      width: 0.15rem;
      height: 0.3rem;
      flex-shrink: 0;
    }
  }

  & > .content {
    background: #fafafa;
    padding: 0.2rem 0.3rem;
    display: flex;

    & > .left {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.15rem;
      flex-shrink: 0;
    }

    & > .center {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      p {
        font-size: 0.24rem;
        line-height: 0.4rem;
        color: $text-french;
      }

      p.name {
        color: $text-black;
        font-size: 0.28rem;
        margin-bottom: 0.1rem;
      }
    }

    & > .right {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      text-align: right;

      .price {
        font-size: 0.28rem;
        color: $text-red;
        margin-bottom: 0.2rem;
      }

      .count {
        font-size: 0.24rem;
        color: $text-french;
      }
    }
  }

  & > .bottom {
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;

    .left {
      color: $text-french;
      font-size: 0.24rem;

      span {
        color: $text-black;
      }
    }

    .right {
      font-size: 0.24rem;

      & > span {
        font-size: 0.26rem;
      }
    }
  }
}

.des {
  background: white;
  padding: 0.1rem 0.3rem;
  font-size: 0.24rem;
  color: $text-french;
  line-height: 0.5rem;
  text-align: left;
  margin-bottom: 0.2rem;
}
</style>
