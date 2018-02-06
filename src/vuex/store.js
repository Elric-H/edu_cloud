import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import schoolAffairXField from './schoolAffairX/field'  //校园总务vuex

Vue.use(Vuex);

// 应用初始状态
const state = {
    count: 10,
    isCollapse: false
};

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    TOGGLEMENU(state) {
        state.isCollapse = !state.isCollapse
    }
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules: {
        schoolAffairXField:schoolAffairXField
    },
})
