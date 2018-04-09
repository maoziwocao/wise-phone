import _ from 'lodash'
import {MessageBox} from 'mint-ui'
const ENV = process.env

export class Tools {
  static getImgPath (item, propName = 'imgs') {
    item[propName] = JSON.parse(item[propName])
    if (_.isObject(item[propName][0])) {
      item.imgPath = item[propName][0].path
    } else {
      item.imgPath = item[propName][0]
    }

    return item
  }

  static setUser (user) {
    localStorage.setItem(ENV.USER_KEY, JSON.stringify(user))
  }

  static getUser () {
    localStorage.getItem(ENV.USER_KEY)
  }
}

export class Msg {
  static loading () {
    document.querySelector('.loading-page').style.display = 'block'
  }

  static hideLoading () {
    document.querySelector('.loading-page').style.display = 'none'
  }

  static showMask (callback) {
    let mask = document.querySelector('.overlay')
    mask.style.display = 'block'
    callback && callback(mask)
  }

  static hideMask (callback) {
    let mask = document.querySelector('.overlay')
    mask.style.display = 'none'
    callback && callback(mask)
  }

  static alert (title, msg, fn) {
    MessageBox(title, msg).then(action => {
      fn && fn()
    })
  }
}