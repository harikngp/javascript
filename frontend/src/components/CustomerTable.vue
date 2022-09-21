<template>
  <v-app>
      <SearchBar @search="searching"/>
      <v-form required>

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
  v-model="customer.id"
  :rules="ruleId"
  label="id"
  required>
  Id
</v-text-field>

<v-text-field 
  v-model="customer.name"
  :rules="ruleName"
  label="name"
  required>
  Name
</v-text-field>

<v-btn 
  color="success" 
  @click="create"
  v-if="flag">
  Submit
</v-btn>

<v-btn
  color="success"
  @click="update"
  v-if="!flag">
  Edit
</v-btn>
</v-card>
</v-dialog>
</v-form>        
      <v-simple-table>
          <thead>
              <tr>
                  <th>ID
                      <button @click="asc('/customer/asc',{item:'id'})"><v-icon small>mdi-arrow-up</v-icon></button>
                      <button @click="desc('/customer/desc',{item:'id'})"><v-icon small>mdi-arrow-down</v-icon></button>
                  </th>
                  <th>Name
                      <button @click="asc('/customer/asc',{item:'name'})"><v-icon small>mdi-arrow-up</v-icon></button>
                      <button @click="desc('/customer/desc',{item:'name'})"><v-icon small>mdi-arrow-down</v-icon></button>
                  </th>
                  <th>No. of branch</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item,i) in info" :key="i">
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.branch}}</td>
                  <td><v-btn @click="edit(item)"><v-icon small>mdi-pencil</v-icon></v-btn></td>
                  <td><v-btn @click="del(item.id)"><v-icon small>mdi-delete</v-icon></v-btn></td>
              </tr>
          </tbody>
      </v-simple-table>
  </v-app>
</template>
<script>
import api from './service/api'

export default {
  data(){
      return{
          link:process.env.VUE_APP_ASSESSMENT,
          info:[],
          dialog:false,
          flag:true,
          item:'',
          customer:{
              id:'',
              name:'',
              branch:'',
          },
          ruleId: [
            id=>!!id|| 'required',
            v=> /^[0-9]+$/.test(v) || 'Not a number'
          ],
          ruleName: [
            name=>!!name||'required',
            v=>v.length>0 || 'Invalid name'
          ],
      }
  },

  mounted(){
      this.read()
  },

  methods:{

      async read(){
          await api.get(this.link+'/customer/read')
          .then((res)=>{
              this.info=res.data,console.log(res.data)
          })
      },

      async create() {
          this.flag=true 
          this.dialog=true
          await api.post(this.link+'/customer/create',this.customer)
          .then((res)=>{this.info=res.data,console.log(res.data)})
          this.dialog = false;
          await this.read()
      },

      edit(item) {
          this.flag = false;
          this.dialog = true;
          this.customer={
              id : item.id,
              name :item.name
          }
      },

      async update() {
          await api.update(this.link+'/customer/update',this.customer)
          .then((res)=>{this.info=res.data})
          this.dialog = false;
          await this.read(),
          this.flag = true;
      },

      async del(id) {
          await api.del(this.link+'/customer/delete/'+id)
          await this.read()
      },

    async searching(resp){
      await api.post(this.link+'/customer/search',resp)
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