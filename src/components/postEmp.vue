<template>
    <div>
    <div>
    <form @submit="postEmp" method="post">
        <input type="text" name="id" v-model="employee.id">
        <input type="text" name="name" v-model="employee.name">
        <input type="text" name="teamId" v-model="employee.teamId">
        <button type="submit">submit</button>
        </form>
        
    </div>
    <div>
    <form @submit="delEmp" method="post">
        <input type="text" name="id" v-model="employee.id">
        <button type="submit">Delete</button>
        </form>
        
    </div>
</div>
</template>
<script>
    import Vue from "vue"
    import axios from"axios"
    import VueAxios from "vue-axios"
    Vue.use(VueAxios,axios)
    export default{
        name:"postEmp",
        data(){
            return {
                employee:{
                    id:null,
                    name:null,
                    teamId:null
                },
            }
        },
        methods:{
            postEmp(e){
                Vue.axios.post('http://127.0.0.1:3333/createEmp',this.employee),
                console.warn(this.employee),
                e.preventDefault()
            },
            delEmp(){
                Vue.axios.delete('http://127.0.0.1:3333/deleteEmp',this.employee.id)
            }
        },
    }
</script>