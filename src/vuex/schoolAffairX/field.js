
const state = {
    paginationInfo:{
        currentPage:1,
        totalSize:0,
        pageSize:10,
    }
};

// getters
const getters = {

};

// mutations  事件
const mutations = {
    changeCurrentPage:(state,paginationInfo)=>{//改变当前页数
        state.paginationInfo["currentPage"]=paginationInfo["currentPage"];
        state.paginationInfo["totalSize"]=paginationInfo["totalSize"];
        state.paginationInfo["pageSize"]=paginationInfo["pageSize"];
    }
};

// actions   处理异步
const actions = {
    changeCurrentPage:(context,paginationInfo)=>{//改变当前页数
        context.commit("changeCurrentPage",paginationInfo);//执行mutations方法
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}