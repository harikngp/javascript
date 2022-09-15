<template>
    <div>
      <div>
        <searchBar :link="url" @search="searching"/>
      </div>
      <div>
    <v-form 
      ref="form" 
      v-model="valid" 
      lazy-validation>
      
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
      v-model="id"
      label="id"
      required>
      Name
    </v-text-field>
    <v-text-field 
      v-model="name" 
      :rules="nameRules"
      label="Name"
      required>
      Name
    </v-text-field>
  
    <v-text-field 
      v-model="address"
      label="address"
      required>
      Address
    </v-text-field>
    
    <v-text-field 
      v-model="deptId"
      label="deptId"
      required>
      Department ID
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
            <th>Address</th>
            <th>Department ID</th>
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
  </v-form>
  </div>
</div>
  </template>
  
  <script>
  
    import Vue from "vue"
    import axios from"axios"
    import VueAxios from "vue-axios"
    Vue.use(VueAxios,axios)
  
    export default{
      name: "employeeTable",
      data() {
          return {
            valid:'',
            dialog:true,
              nameRules: [
                  name => !!name || "required",
                  v => v.length >= 3 && /^[a-zA-Z\s]+$/.test(v) || "Invalid name",
              ],
              flag: true,
              info: [],
              id: "",
              name: "",
              address: "",
              deptId: "",
              url:"http://127.0.0.1:3333/searchEmp"
          };
      },
       mounted() {
        Vue.axios.get("http://127.0.0.1:3333/readEmp").then((resp) => this.info = resp.data);
    },
      methods: {
          postEmp() {
              Vue.axios.post("http://127.0.0.1:3333/createEmp", {
                  id: this.id,
                  name: this.name,
                  address: this.address,
                  deptId: this.deptId
              }).then(() => {
                  Vue.axios.get("http://127.0.0.1:3333/readEmp").then((resp) => this.info = resp.data);
              }),
                  this.dialog = false;
              this.flag = true;
          },
          edit(item) {
              this.flag = false;
              this.dialog = true;
              this.tempObj = item;
              this.id = item.id;
              this.name = item.name;
              this.address = item.address;
              this.deptId = item.dept_id;
          },
          updateItem() {
              Vue.axios.patch("http://127.0.0.1:3333/updateEmp", {
                  id: this.id,
                  name: this.name,
                  address: this.address,
                  deptId: this.deptId
              }).then(() => {
                  Vue.axios.get("http://127.0.0.1:3333/readEmp").then((resp) => this.info = resp.data);
              }),
                  this.flag = true;
              this.dialog = false;
          },
          del(id) {
              Vue.axios.delete(`http://127.0.0.1:3333/deleteEmp/${id}`).then(() => {
                  Vue.axios.get("http://127.0.0.1:3333/readEmp").then((resp) => this.info = resp.data);
              });
          },
          searching(resp){
            console.log(resp)
            this.info=resp.data
            console.warn(resp.data)
          }
      },
  }
  </script> 