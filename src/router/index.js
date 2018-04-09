// vue相关插接件
import Vue from 'vue'
import Router from 'vue-router'
// index相关组件
import Home from '@/components/index/home'
// 明星配方
import StarFormula from '@/components/index/formula/star-formula'
import StarFormulaList from '@/components/index/formula/formula-list'
import StarFormulaDetail from '@/components/index/formula/formula-detail'
// 技术服务
import TechService from '@/components/index/techservice/techservice'
import TechServiceList from '@/components/index/techservice/tech-list'
import TechServiceDetail from '@/components/index/techservice/tech-detail'
// 生产商之窗
import Producer from '@/components/index/producer/producer'
import ProducerList from '@/components/index/producer/producer-list'
import ProducerDetail from '@/components/index/producer/producer-detail'
// 销库存
import Stock from '@/components/index/stock/sell-stock'
import StockList from '@/components/index/stock/stock-list'
import StockDetail from '@/components/index/stock/stock-detail'
// 公开课
import Lesson from '@/components/index/lesson/lesson'
import LessonList from '@/components/index/lesson/lesson-list'
import LessonDetail from '@/components/index/lesson/lesson-detail'
// 行业资讯
import Information from '@/components/index/information/information'
import InformationList from '@/components/index/information/information-list'
import InformationDetail from '@/components/index/information/information-detail'
// 答疑解惑
import Question from '@/components/index/question/question'
import QuestionList from '@/components/index/question/question-list'
import QuestionDetail from '@/components/index/question/question-detail'
// 评论
import Reviews from '@/components/index/reviews'
// 搜索结果相关
import GoodsResult from '@/components/index/search/goods-result'
import FormulaResult from '@/components/index/search/formula-result'
import ShopResult from '@/components/index/search/shop-result'
// 帮助中心
import Help from '@/components/index/help/help'
import HelpList from '@/components/index/help/help-list'
import HelpDetail from '@/components/index/help/help-detail'
// user先关组件
import Login from '@/components/user/login'
import UserInfo from '@/components/user/user-info'
// 公用组件
import NotFound from '@/components/not-found'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/star-formula',
      // name: 'starFormula',
      component: StarFormula,
      children: [
        {
          path: '',
          component: StarFormulaList
        },
        {
          path: 'detail',
          component: StarFormulaDetail
        }
      ]
    },
    {
      path: '/techservice',
      component: TechService,
      children: [
        {
          path: '',
          component: TechServiceList
        },
        {
          path: 'detail',
          component: TechServiceDetail
        }
      ]
    },
    {
      path: '/producer',
      component: Producer,
      children: [
        {
          path: '',
          component: ProducerList
        },
        {
          path: 'detail',
          component: ProducerDetail
        }
      ]
    },
    {
      path: '/stock',
      component: Stock,
      children: [
        {
          path: '',
          component: StockList
        },
        {
          path: 'detail',
          component: StockDetail
        }
      ]
    },
    {
      path: '/lesson',
      component: Lesson,
      children: [
        {
          path: '',
          component: LessonList
        },
        {
          path: 'detail',
          component: LessonDetail
        }
      ]
    },
    {
      path: '/information',
      component: Information,
      children: [
        {
          path: '',
          component: InformationList
        },
        {
          path: 'detail',
          component: InformationDetail
        }
      ]
    },
    {
      path: '/question',
      component: Question,
      children: [
        {
          path: '',
          component: QuestionList
        },
        {
          path: 'detail',
          component: QuestionDetail
        }
      ]
    },
    {
      path: '/reviews',
      component: Reviews
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/goods-result',
      component: GoodsResult
    },
    {
      path: '/formula-result',
      component: FormulaResult
    },
    {
      path: '/shop-result',
      component: ShopResult
    },
    {
      path: '/help',
      component: Help,
      children: [
        {
          path: '',
          component: HelpList
        },
        {
          path: 'detail',
          component: HelpDetail
        }
      ]
    },
    {
      path: '/user-info',
      name: 'user-info',
      meta: {requiresAuth: true},
      component: UserInfo
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})