export const state = () => ({
    myfavorite: []
})
export const mutations = {
    ADDFAVORITES(state, obj) {
        state.myfavorite.push(obj)        
        if (process.browser) {
            state.myfavorite = localStorage.setItem('favorite', JSON.stringify(state.myfavorite))
        }
    },
    REMOVEFAVORITES(state, favorite) {
        state.myfavorite.forEach((item, index) => {
            if (item.id === favorite.id) {
                state.myfavorite.splice(index, 1)
            }
        })
    },
    MYFAVORITES(state, obj) {
        state.myfavorite = obj
    }
}
export const actions = {
    getfavorite(context) {
        // console.log(context)
        let myfavorite = []
        if (process.browser) {             
            if (localStorage.getItem('favorite')){
                myfavorite = JSON.parse(localStorage.getItem('favorite'))
            }
        }
        // console.log("myfavorite", myfavorite)
        context.dispatch('products/getProducts', null, { root: true })
        context.commit('MYFAVORITES', myfavorite)
    },
    addFavorite(context, item) {
        const obj = {
            id: item.id,
            category: item.category,
            title: item.title,
            price: item.price,
            unit: item.unit,
            imageUrl: item.imageUrl,
            content: item.content,
            spec: item.spec
        }
        // console.log('新增', item.id)
        context.commit('ADDFAVORITES', obj)
        context.dispatch('getfavorite')
    },
    removefavorite(context, item) {
        // console.log('刪除', item.id)
        context.commit('REMOVEFAVORITES', item)
        if (process.browser) { 
            localStorage.setItem('favorite', JSON.stringify(context.state.myfavorite))
        }
        context.dispatch('getfavorite')
    }
}
export const getters = {
    myfavorite: state => state.myfavorite
}