<template>
  <div>
    <back :title="'我的'"> </back>
    <div class="list">
      <div class="item"
            v-for="(item, index) in infos" :key="index">
        <router-link :to="`/manage${item.path}`" v-if="!item.roleTypes.length || item.roleTypes.indexOf(curRoleType) != -1">
          <img :src="item.img" class="left">
          <p>{{item.title}}</p>
          <img src="~images/information-more.png" class="right">
        </router-link>
      </div>
      <div class="item" @click="logout">
        <a href="javascript:;">
          <img src="~images/log-out.png" style="width"  class="left">
          <p>注销</p>
          <img src="~images/information-more.png" class="right">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Back from 'comp/index/back'
import icon1 from 'images/mine-icon1.png'
import icon2 from 'images/mine-icon2.png'
import icon3 from 'images/mine-icon3.png'
import icon4 from 'images/mine-icon4.png'
import icon5 from 'images/mine-icon5.png'
import icon6 from 'images/mine-icon6.png'
import icon7 from 'images/mine-icon7.png'
import { Tools } from 'utils/tools'
import {roleType} from 'model/mgt-model'
import { MessageBox } from 'mint-ui'
import { UserService } from 'api/user/user-service'

export default {
  components: {
    Back,
    MessageBox
  },

  data () {
    return {
      infos: [{
        title: '库存订单',
        img: icon1,
        path: '/stock',
        roleTypes: [roleType.Buyer, roleType.Supplier]
      }, {
        title: '配方订单',
        img: icon2,
        path: '/formula',
        roleTypes: [roleType.Buyer, roleType.Formulators]
      }, {
        title: '我的关注',
        img: icon3,
        path: '/follow',
        roleTypes: []
      }, {
        title: '地址管理',
        img: icon4,
        path: '/address',
        roleTypes: []
      }, {
        title: '投诉举报',
        img: icon5,
        path: '/complain',
        roleTypes: []
      }, {
        title: '意见反馈',
        img: icon6,
        path: '/feedback',
        roleTypes: []
      }, {
        title: '集采确认',
        img: icon7,
        path: '/deal',
        roleTypes: [roleType.Supplier]
      }],
      // 当前账号的roletype
      curRoleType: Tools.getRoleType()
    }
  },

  methods: {
    logout () {
      MessageBox({
        title: '提示',
        message: '是否要注销？',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          this.userService.logout().then(result => {
            Tools.logout()
            location.reload()
          })
        }
      })
    }
  },

  created () {
    this.userService = new UserService()
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.list{
  padding: 0 .3rem;
  background: white;

  .item > a {
    height: .9rem;
    box-sizing: border-box;
    border-bottom: 1px solid $border-gray;
    display: flex;
    align-items: center;

    .left {
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.2rem;
    }

    p {
      font-size: 0.3rem;
      flex-grow: 1;
      text-align: left;
    }

    .right {
      width: 0.2rem;
      height: 0.3rem;
    }
  }
}
</style>
