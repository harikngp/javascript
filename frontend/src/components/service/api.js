import Vue from "vue"
import axios from"axios"
import VueAxios from "vue-axios"

const key={headers:{appKey:'Ho-m0mIE7h8mhOe4nwgG3ROrlA8sLTmc'}}
    

Vue.use(VueAxios,axios);

async function get(url){
    return await Vue.axios.get(url,key)
}
async function post(url,value){
    return await Vue.axios.post(url,value,key)
}
async function del(url){
    return await Vue.axios.delete(url,key)
}
async function update(url,value){
   return await Vue.axios.patch(url,value,key)   
}

const api={get,post,del,update};
export default api;