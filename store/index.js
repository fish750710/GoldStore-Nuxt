export const state = () => ({
    optionShow: '',
    isLoading: false,
})
export const mutations = {
    SETOPTIONSHOW(state, val){
        state.optionShow = val
    },
    LOADING(state, status) {
        state.isLoading = status
    },
    ARRAYLTOH(state, item) {
        if (item === 'lowPrice') {
            return state.products.products.sort(function (a, b) {
                return a.price - b.price
                // return a[vm.price] < b[vm.price] ? 1 : -1;
            })
        } else if (item === 'upPrice') {
            return state.products.products.sort(function (a, b) {
                return b.price - a.price
                //  return a[vm.price] > b[vm.price] ? 1 : -1;
            })
        }
    }
}
export const actions = {
    // 讀取效果
    updateLoading(context, status) {
        context.commit('LOADING', status)
    },
    // 排序
    arrayLtoH(context, item) {
        context.commit('ARRAYLTOH', item)
    },
}
export const getters = {
    isLoading: state => state.isLoading
}