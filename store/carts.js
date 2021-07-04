// import axios from 'axios'
export const state = () => ({
    cart: { carts: [] },
    loadingItem: '',
    addqtynum: 0,
    minusnum: 0,
    qty: 0
})
export const mutations = {
    // add(state, cart){
    //     state.carts.push(cart)
    // },
    // remove(state, {cart}){
    //     state.cart.splice(state.cart.indexOf(cart),1)
    // }
    CART(state, payload) {
        state.cart = payload
    },
    LOADINGITEM(state, payload) {
        state.loadingItem = payload
    },
    ADDQTY(state, payload) {
        state.addqtynum = payload.qty += 1
    },
    MINUSQTY(state, payload) {
        state.minusnum = payload.qty -= 1
    }
}
export const actions = {
    async getCart(context) {
        // context.commit('LOADING', true)
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
        // vm.$store.dispatch('updateLoading', true);
        return await this.$axios.get(url).then(response => {
            context.commit('CART', response.data.data)
            // context.commit('LOADING', false)
            // console.log('取得購物車', response.data.data);
        })
    },
    async removeCart(context, id) {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
        context.commit('LOADINGITEM', id)
        return await this.$axios.delete(url).then((response) => {
            context.dispatch('getCart')
            context.commit('LOADINGITEM', '')
            // console.log('刪除購物車項目', response);
        })
    },
    async addtoCart(context, { id, qty }) {
        // console.log('addtocart', id, qty)
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
        context.commit('LOADINGITEM', id)
        const cart = {
            product_id: id,
            qty
        }
        // console.log(cart)
        return await this.$axios.post(url, { data: cart }).then(response => {
            context.dispatch('getCart')
            context.commit('LOADINGITEM', '')
            // console.log('加入購物車:', response)
        })
    },
    addQty(context, item) {
        context.commit('ADDQTY', item)
        let id = item.product.id
        let qty = item.qty
        context.dispatch('addtoCart', { id, qty })
        context.dispatch('removeCart', item.id)
    },
    minusQty(context, item) {
        let id = item.product.id
        let qty = item.qty - 1
        context.commit('MINUSQTY', item)
        if (item.qty <= 0) {
            context.dispatch('removeCart', item.id)
        } else {
            context.dispatch('addtoCart', { id, qty })
            context.dispatch('removeCart', item.id)
        }
    },
    inputQty(context, { item, qty }) {
        let id = item.product.id
        if (qty <= 0) {
            context.dispatch('removeCart', item.id)
        } else {
            context.dispatch('addtoCart', { id, qty })
            context.dispatch('removeCart', item.id)
        }
    },
    async addtoCartMerge(context, { id, qty }) {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
        context.commit('LOADINGITEM', id)
        // 一樣商品合併(先抓購物車內容判斷 ID是否一樣)
        await this.$axios.get(url).then(response => {
            // console.log('res', response.data.data.carts)
            let cartItem = response.data.data.carts
            // console.log('item', cartItem);
            if (cartItem.length !== 0) {
                let added = 0
                for (let i = 0; i < cartItem.length; i++) {
                    if (id === cartItem[i].product_id) {
                        // console.log('重複商品要合併', cartItem[i]);
                        added = 1 // 新增
                        // 刪除購物車內容
                        const removeurl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${cartItem[i].id}`
                        this.$axios.delete(removeurl).then(() => {
                        })
                        // 新增
                        let itemQty = cartItem[i].qty // 原購物車商品數量
                        const cart = {
                            product_id: id,
                            qty: qty + itemQty
                        }
                        this.$axios.post(url, { data: cart }).then(response => {
                            context.commit('LOADINGITEM', '')
                            context.dispatch('getCart')
                        })
                    } else {
                        // forLoop全部跑完，無重複商品且要新增才新增，
                        if (i === cartItem.length - 1 && added === 0) {
                            const cart = {
                                product_id: id,
                                qty
                            }
                            this.$axios.post(url, { data: cart }).then(response => {
                                context.commit('LOADINGITEM', '')
                                context.dispatch('getCart')
                            })
                        }
                    }
                } // forLoop end
            } else {
                // 購物車無內容直接新增
                const cart = {
                    product_id: id,
                    qty
                }
                this.$axios.post(url, { data: cart }).then(response => {
                    context.commit('LOADINGITEM', '')
                    context.dispatch('getCart')
                })
            }
        })
    }
}
export const getters = {
    loadingItem: state => state.loadingItem,
    cart: state => state.cart
}