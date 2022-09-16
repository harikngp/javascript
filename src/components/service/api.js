import Vue from "vue"
import axios from"axios"
import VueAxios from "vue-axios"


Vue.use(VueAxios,axios);

async function get(url){
    return Vue.axios.get(url)
}
async function post(url,value){
    return await Vue.axios.post(url,value)
}
async function del(url){
    await Vue.axios.delete(url)
}
async function update(url,value){
    await Vue.axios.patch(url,value)   
}


const api={get,post,del,update};
export default api;