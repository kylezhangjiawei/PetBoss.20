const state={
  states:false,
  msg:''
};
const getters={
  states:state =>{
    return state.states
  },
  messages:state =>{
    return state.msg
  }
}
const mutations={
  dialogState(state,item){
    state.states = item;
  },
  dialogMsg(state,message){
    state.msg = message;
  }
};
const actions={
  getDatas({commit},Payload){
    commit('dialogState',Payload.states);
    commit('dialogMsg',Payload.msg);
    setTimeout( () => {
      commit('dialogState',false);
      commit('dialogMsg','');
    },2000)
  }
}
export default {state , actions,mutations,getters}
