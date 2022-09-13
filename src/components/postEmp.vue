<template>
    <div>
    <v-form 
      ref="form" 
      v-model="valid" 
      lazy-validation>
      
    <v-dialog v-model="dialog" width="750" color="white">
    <template v-slot:activator="{ on, attrs }">
      <v-flex text-right align-right>
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-flex>
      </template>
      <v-card class="white">
    <v-text-field 
      v-model="name" 
      :rules="nameRules"
      label="Name"
      required>
      Name
    </v-text-field>

    <v-text-field 
      v-model="age" 
      label="Age"
      :rules="ageRules"
      required>
    </v-text-field>

    <v-text-field 
      v-model="email"
      :rules="emailRules" 
      label="Email"
      required>
    </v-text-field>
   
    <v-btn 
      :disabled="!valid" 
      color="success" 
      @click="postEmp"
      v-if="flag"
      >
      Submit
    </v-btn>
    <v-btn
      v-model = 'button1'
      :disabled="!valid"
      color="success"
      @click="updateItem"
      v-if="!flag">
      Edit
    </v-btn>
  </v-card>
</v-dialog>
<v-simple-table>
        <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in info" :key="i">
                <td>{{item.id}}</td>
                <td>{{item.name | nametrim}}</td>
                <td>{{item.age}}</td>
                <td>{{item.email}}</td>
                <td><v-btn @click="edit(item)"><v-icon small>mdi-pencil</v-icon></v-btn></td>
                <td><v-btn @click="del(item.id)"><v-icon small>mdi-delete</v-icon></v-btn></td>
            </tr>
        </tbody>
    </v-simple-table>
</v-form>
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
              emailRules: [
         email => !!email || 'required',
         v => /.+@.+\..+/.test(v) || 'Invalid',
       ],
       ageRules:[
        age=>!!age || 'required',
        v=>/^[0-9]/.test(v)|| 'Invalid',
       ],
              nameRules: [
         name=>!!name||'required',
         v=>v.length>=3 && /^[a-zA-Z\s]+$/.test(v) || 'Invalid name',
       ],
              flag:true,
              info:[],
              id:'',
              name:'',
              age:'',
              email:'',
            }
        },
        mounted(){
            Vue.axios.get('http://127.0.0.1:3333/readEmp').then((resp)=>this.info=resp.data)
        },
        methods:{
        edit(item) {
        this.dialog = true
        this.flag=false
        this.tempObj = item
        this.id=item.id
        this.name = item.name
        this.age=item.age
        this.email = item.email
      }, 
      updateItem() {
        let test = this.info.findIndex(temp => temp.id == this.tempObj.id)
        this.info[test].id = this.id
        this.info[test].name = this.name
        this.info[test].age =this.age
        this.info[test].email = this.email
        Vue.axios.put('http://127.0.0.1:3333/updateEmp',{
                        id:this.id,
                        name:this.name,
                        age:this.age,
                        email:this.email
                    }),
        this.dialog=false
      }, 
            postEmp(e){
              this.flag=true
                Vue.axios.post('http://127.0.0.1:3333/createEmp',{
                  id:this.id,
                  name:this.name,
                  age:this.age,
                  email:this.email
                }),
                console.warn(this.employee),
                e.preventDefault(),
                this.dialog=false
            },
            async del(id){
            await Vue.axios.delete(`http://127.0.0.1:3333/deleteEmp/${id}`)
            },
        },
    }
</script> 
