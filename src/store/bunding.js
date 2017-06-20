import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

sessionStorage.OPNEID = (sessionStorage.OPNEID == '' || sessionStorage.OPNEID == 'undefined' ) ? '' : sessionStorage.OPNEID
let tempStore
const store = function(){
    if(tempStore){
      console.log(1)
      return tempStore
    } 
    else{
      console.log(2)
      tempStore =  new Vuex.Store({
        state: {
          openId: sessionStorage.OPNEID,
          ecifId:'',
          notice:''
        },mutations:{
           setOpenId:function(state, openId){            
              state.openId = openId;
              sessionStorage.OPNEID = openId
           },
           setEcifId:function(state,_ecifId){
             state.ecifId =  _ecifId
           }
        }
      })
      return tempStore
    }

}()
export default store;