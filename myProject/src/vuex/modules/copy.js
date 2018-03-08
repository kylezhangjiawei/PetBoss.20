const state={
  copy:'2.0.2'
}
const getters={
  copy:state =>{
    return state.copy;
  }
}
/*const mutations={
  addNumber(state,price){
    console.log(state)
    state.copy =price;
  }
}
const actions={

  text({commit},price){
    commit('addNumber',price)
  }
}*/
export default {state ,getters}
