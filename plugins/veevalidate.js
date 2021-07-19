import Vue from 'vue'
// import zhCN from 'vee-validate/dist/locale/zh_CN' // 引入本地化語言
// import VeeValidate, { Validator } from 'vee-validate' // 引入 vee-validate

// // 覆蓋默認錯誤信息提示
// zhCN.messages.email = () => '請輸入正確的郵箱地址'

// Vue.use(VeeValidate)

// // 本地化
// Validator.localize('zh_CN', zhCN)

import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule])
})

localize('zh_TW', TW)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid'
    }
})
