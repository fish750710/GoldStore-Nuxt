import Vue from 'vue'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 引入本地化語言
import VeeValidate, { Validator } from 'vee-validate' // 引入 vee-validate

// 覆蓋默認錯誤信息提示
zhCN.messages.email = () => '請輸入正確的郵箱地址'

Vue.use(VeeValidate)

// 本地化
Validator.localize('zh_CN', zhCN)