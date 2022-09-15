<template>
    <div>
      <div>
        <SearchBar :link="url" @search="searching"/>
      </div>
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
      v-model="deptId"
      label="id"
      required>
      Department Id
    </v-text-field>
    <v-text-field 
      v-model="deptName" 
      :rules="nameRules"
      label="Name"
      required>
      Department Name
    </v-text-field>
  
    <v-text-field 
      v-model="locaton"
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
                <td>{{item.deptId}}</td>
                <td>{{item.deptName | nametrim}}</td>
                <td>{{item.location}}</td>
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
      name: "departmentTable",
      data() {
          return {
              nameRules: [
                  name => !!name || "required",
                  v => v.length >= 3 && /^[a-zA-Z\s]+$/.test(v) || "Invalid name",
              ],
              flag: true,
              info: [],
              deptName: "",
              location: "",
              deptId: "",
              url:"http://127.0.0.1:3333/searchDept"
          };
      },
      mounted() {
          Vue.axios.get("http://127.0.0.1:3333/readDept").then((resp) => {this.info = resp.data,console.warn(resp.data)});
      },
      methods: {
          postEmp() {
              Vue.axios.post("http://127.0.0.1:3333/createDept", {
                 
                  deptId: this.deptId,
                  deptName: this.deptName,
                  location: this.location,
                  
              }).then(() => {
                  Vue.axios.get("http://127.0.0.1:3333/readDept").then((resp) => this.info = resp.data);
              }),
                  this.dialog = false;
              this.flag = true;
          },
          edit(item) {
              this.flag = false;
              this.dialog = true;
              this.tempObj = item;
              this.deptId = item.deptId;
              this.deptName = item.deptName;
              this.location = item.location;
             
          },
          updateItem() {
              Vue.axios.patch("http://127.0.0.1:3333/updateDept", {
                  deptId: this.deptId,
                  deptName: this.deptName,
                  location: this.location,
                  
              }).then(() => {
                  Vue.axios.get("http://127.0.0.1:3333/readDept").then((resp) => this.info = resp.data);
              }),
                  this.flag = true;
              this.dialog = false;
          },
          del(id) {
              Vue.axios.delete(`http://127.0.0.1:3333/deleteDept/${id}`).then(() => {
                  Vue.axios.get("http://127.0.0.1:3333/readDept").then((resp) => this.info = resp.data);
              });
          },
          searching(resp){
            this.info=resp.data
          }
      },
      
  }
  </script> 