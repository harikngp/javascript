<template>
  <v-app>
    <SearchBar @search="searching"/>

    <v-form v-model="popup" ref="form" lazy-validation>

    <v-dialog v-model="dialog" width="750">
  
    <template v-slot:activator="{ on, attrs }">
      <v-flex text-right align-right>
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-flex>
    </template>
  
    <v-card class="white">
      <v-text-field 
        v-model="employee.id"
        label="id"
        required>
        Name
      </v-text-field>

      <v-text-field 
        v-model="employee.name" 
        :rules="nameRules"
        label="Name"
        required>
        Name
      </v-text-field>
  
      <v-text-field 
        v-model="employee.address"
        label="address"
        required>
        Address
      </v-text-field>
    
      <v-text-field 
        v-model="employee.deptId"
        label="deptId"
        required>
        Department ID
      </v-text-field>
   
      <v-btn 
        color="success" 
        @click="postEmp"
        v-if="flag">
        Submit
      </v-btn>

      <v-btn
        color="success"
        @click="updateItem"
        v-if="!flag">
        Edit
      </v-btn>
    </v-card>
    </v-dialog>
    </v-form>

    <v-simple-table>
      <thead>
        <tr>
          <th>Id
            <button @click="asc('/ascEmp',{item:'id'})"><v-icon small>mdi-arrow-up</v-icon></button>
            <button @click="desc('/descEmp',{item:'id'})"><v-icon small>mdi-arrow-down</v-icon></button> 
          </th>
          <th>Name
            <button @click="asc('/ascEmp',{item:'name'})"><v-icon small>mdi-arrow-up</v-icon></button>
            <button @click="desc('/descEmp',{item:'name'})"><v-icon small>mdi-arrow-down</v-icon></button>
          </th>
          <th>Address
            <button @click="asc('/ascEmp',{item:'address'})"><v-icon small>mdi-arrow-up</v-icon></button>
            <button @click="desc('/descEmp',{item:'address'})"><v-icon small>mdi-arrow-down</v-icon></button>
          </th>        
          <th>Department ID
            <button @click="asc('/ascEmp',{item:'deptId'})"><v-icon small>mdi-arrow-up</v-icon></button>
            <button @click="desc('/descEmp',{item:'deptId'})"><v-icon small>mdi-arrow-down</v-icon></button>
          </th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in info" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name | nametrim}}</td>
          <td>{{item.address}}</td>
          <td>{{item.dept_id}}</td>
          <td><v-btn @click="edit(item)"><v-icon small>mdi-pencil</v-icon></v-btn></td>
          <td><v-btn @click="del(item.id)"><v-icon small>mdi-delete</v-icon></v-btn></td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-app>
</template>
  
<script>

    import api from './service/api'

    export default{
      name: "employeeTable",

      data() {
          return {
            dialog:false,
              nameRules: [
                  name => !!name || "required",
                  v => v.length >= 3 && /^[a-zA-Z\s]+$/.test(v) || "Invalid name",
              ],
              flag: true,
              info: [],
              link:process.env.VUE_APP_OFFICE,
              employee:{
                id: "",
                name: "",
                address: "",
                deptId: ""
              },
          };
      },

      async mounted() {
        await this.readEmp()
      },

    methods: {

      async readEmp(){
        await api.get(this.link+'/readEmp')
        .then((res)=>{this.info=res.data})
      },

      async postEmp() {  
        this.flag=true 
        this.dialog=true
        await api.post(this.link+'/createEmp',this.employee)
        .then((res)=>{this.info=res.data})
        this.dialog = false;
        this.flag=true
        await this.readEmp()
        
      },

      edit(item) {
        this.flag = false;
        this.dialog = true;
        this.employee={
          id : item.id,
          name : item.name,
          address : item.address,
          deptId : item.dept_id,
        }
      },

      async updateItem() {
        await api.update(this.link+'/updateEmp',this.employee)
        .then((res)=>{this.info=res.data})
        this.dialog = false;
        await this.readEmp(),
        this.flag = true;
      },

      async del(id) {
        await api.del(this.link+'/deleteEmp/'+id)
        await this.readEmp()
      },

      async searching(resp){
        await api.post(this.link+'/searchEmp',resp)
        .then((res)=>{this.info=res.data})
      },

      async asc(val,item){
        await api.post(this.link+val,item)
        .then((res)=>{this.info=res.data})
      },

      async desc(val,item){
        await api.post(this.link+val,item)
        .then((res)=>{this.info=res.data})
      },
    },
  }
  </script> 