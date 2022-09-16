<template>
  <v-app>
    <SearchBar :link="link+'/searchDept'" @search="searching"/>
   
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
        @click="postDept"
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
          <!-- <button @click="ascCheck('/ascDept','deptId')"><v-icon small>mdi-arrow-up</v-icon></button>
          <button @click="descCheck('/descDept','deptId')"><v-icon small>mdi-arrow-down</v-icon></button> -->
          <button @click="asc('/ascIdDept')"><v-icon small>mdi-arrow-up</v-icon></button>
          <button @click="desc('/descIdDept')"><v-icon small>mdi-arrow-down</v-icon></button>
        </th>
        <th>Name
          <button @click="asc('/ascNameDept')"><v-icon small>mdi-arrow-up</v-icon></button>
          <button @click="desc('/descNameDept')"><v-icon small>mdi-arrow-down</v-icon></button>
        </th>
        <th>Location
          <button @click="asc('/ascLocationDept')"><v-icon small>mdi-arrow-up</v-icon></button>
          <button @click="desc('/descLocationDept')"><v-icon small>mdi-arrow-down</v-icon></button>
        </th>
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
  </v-app>
</template>

<script>
  import api from './service/api'

  export default{

    name: "departmentTable",

    data() {
      return {
        nameRules: [
          name => !!name || "required",
          v => v.length >= 3 && /^[a-zA-Z\s]+$/.test(v) || "Invalid name",
        ],
        item:'',
        dialog:false,
        flag: true,
        info: [],
        department:{
        deptId: "",
        deptName: "",
        location: "",
        },
        link:process.env.VUE_APP_OFFICE,
      }
    },

    async mounted() {
      await this.readDept()
    },

    methods: {

      async readDept(){
        await api.get(this.link+'/readDept')
        .then((res)=>{this.info=res.data})
      },

      async postDept() {
        await this.$refs.form.reset()
        this.flag=true 
        this.dialog=true
        await api.post(this.link+'/createDept',this.department).then((res)=>{this.info=res.data})
        this.dialog = false;
        this.$refs.form.reset()
        this.flag=true
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

      async updateItem() {
        await api.update(this.link+'/updateDept',this.department)
        .then((res)=>{this.info=res.data})
        this.dialog = false;
        await this.readDept(),
        this.$refs.form.reset()
        this.flag = true;
      },

      async del(id) {
        await api.del(this.link+'/deleteDept/'+id)
        await this.readDept()
      },

      async searching(resp){
        this.info=await resp.data
      },

      async asc(val){
        await api.get(this.link+val)
        .then((res)=>{this.info=res.data})
      },

      async desc(val){
        await api.get(this.link+val)
        .then((res)=>{this.info=res.data})
      },
    },    
  }
</script> 