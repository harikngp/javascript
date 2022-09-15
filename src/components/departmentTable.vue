<template>
  <v-app>
        <SearchBar :link="url" @search="searching"/>
 
    <v-form>
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
      v-model="department.deptId"
      label="id"
      required>
      Department Id
    </v-text-field>
    <v-text-field 
      v-model="department.deptName" 
      :rules="nameRules"
      label="Name"
      required>
      Department Name
    </v-text-field>
  
    <v-text-field 
      v-model="department.location"
      label="location"
      required>
      Location
    </v-text-field>
   
    <v-btn 
      color="success" 
      @click="postEmp"
      v-if="flag"
      >
      Submit
    </v-btn>
    <v-btn
      v-model = 'button1'
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
            <th>Location</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in info" :key="i">
                <td>{{item.dept_id}}</td>
                <td>{{item.dept_name | nametrim}}</td>
                <td>{{item.location}}</td>
                <td><v-btn @click="edit(item)"><v-icon small>mdi-pencil</v-icon></v-btn></td>
                <td><v-btn @click="del(item.dept_id)"><v-icon small>mdi-delete</v-icon></v-btn></td>
            </tr>
        </tbody>
    </v-simple-table>
  </v-form>
  </v-app>
  </template>
  
  <script>
    //import {read,create} from './test'
    import editItem from './service/api'
    import Vue from "vue"
    import axios from"axios"
    import VueAxios from "vue-axios"
    Vue.use(VueAxios,axios)
  
    export default{
      name: "departmentTable",
      data() {
          return {
              nameRules: [
                  name => !!name || "required",
                  v => v.length >= 3 && /^[a-zA-Z\s]+$/.test(v) || "Invalid name",
              ],
              dialog:false,
              flag: true,
              info: [],
              department:{
              deptId: "",
              deptName: "",
              location: "",
              },
              url:"http://127.0.0.1:3333/searchDept"
          };
      },
      async mounted() {
        //this.info= await read()
        this.readDept()
      },
      methods: {

          async readDept(){
            await Vue.axios.get("http://127.0.0.1:3333/readDept").then((resp) => { this.info=resp.data})
          },
          async postEmp() {
            Vue.axios.post("http://127.0.0.1:3333/createDept",this.department)
              //this.info=create(this.department)
              this.dialog = false;
              await this.readDept()
          },
          edit(item) {
              this.flag = false;
              this.dialog = true;
              this.department={
                deptId : item.dept_id,
                deptName :item.dept_name,
                location : item.location,
              }
          },
          updateItem() {
              editItem(this.department)
              this.readDept()
              //Vue.axios.patch("http://127.0.0.1:3333/updateDept",this.department)
              this.dialog = false;
              this.flag = true;
          },
          // del(id) {
          //   deleteItem(id)
          //   this.readDept()
          // },
          del(id) {
            Vue.axios.delete(`http://127.0.0.1:3333/deleteDept/${id}`);
            this.readDept()
          },
          searching(resp){
            this.info=resp.data
          }
      },
      
  }
  </script> 