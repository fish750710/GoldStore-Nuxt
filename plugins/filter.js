import Vue from "vue";
// 千分位補逗點
Vue.filter("currency", num => {
  const n = Number(num)
  return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
    return currency
  })}`
});

Vue.filter("date", time => {
  const date = new Date(time * 1000)
  return date.toLocaleDateString()
})
