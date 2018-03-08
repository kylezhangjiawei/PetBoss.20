const state={
  peopleDatas:''
}
const getters={
  peopleData:state =>{
    return state.peopleDatas;
  }
}
const mutations={
  getAllPeopleDatas(state,datas){
    state.peopleDatas =datas;
  }
}
const actions={
  getPeopleAllData({commit},datas){
    commit('getAllPeopleDatas',datas)
  }
}
export default {state ,getters,mutations,actions}
