<template>
    <v-app>
        <SearchBar @search="searching"/>
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
  <!-- <v-text-field 
    v-model="hotel.id"
    label="id"
    required>
    Id
  </v-text-field> -->

  <v-text-field 
    v-model="hotel.owner"
    label="owner"
    required>
    Owner
  </v-text-field>
<!-- 
  <v-text-field 
    v-model="hotel.address"
    label="address"
    required>
    Address
  </v-text-field> -->

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
                        <button @click="asc('/hotel/asc',{item:'id'})"><v-icon small>mdi-arrow-up</v-icon></button>
                        <button @click="desc('/hotel/desc',{item:'id'})"><v-icon small>mdi-arrow-down</v-icon></button>
                    </th>
                    <th>Owner
                        <button @click="asc('/hotel/asc',{item:'owner'})"><v-icon small>mdi-arrow-up</v-icon></button>
                        <button @click="desc('/hotel/desc',{item:'owner'})"><v-icon small>mdi-arrow-down</v-icon></button>
                    </th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,i) in info" :key="i">
                    <td>{{item.id}}</td>
                    <td>{{item.owner}}</td>
                    <td>{{item.address}}</td>
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
            hotel:{
                id:'',
                owner:'',
                
                //address:''
            }
        }
    },

    mounted(){
        this.read()
    },

    methods:{

        async read(){
            await api.get(this.link+'/hotel/read')
            .then((res)=>{
                this.info=res.data,console.log(res)
            })
        },

        async create() {
            this.flag=true 
            this.dialog=true
            await api.post(this.link+'/hotel/create',this.hotel)
            .then((res)=>{this.info=res.data,console.log(res.data)})
            this.dialog = false;
            await this.read()
        },

        edit(item) {
            this.flag = false;
            this.dialog = true;
            this.hotel={
                id : item.id,
                owner :item.owner,
                address : item.address,
            }
        },

        async update() {
            await api.update(this.link+'/hotel/update',this.hotel)
            .then((res)=>{this.info=res.data})
            this.dialog = false;
            await this.read(),
            this.flag = true;
        },

        async del(id) {
            await api.del(this.link+'/hotel/delete/'+id)
            await this.read()
        },

      async searching(resp){
        await api.post(this.link+'/hotel/search',resp)
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