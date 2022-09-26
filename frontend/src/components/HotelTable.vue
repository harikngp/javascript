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

  <v-text-field 
    v-model="hotel.customerId"
    label="Customer Id"
    required>
  </v-text-field>

  <v-text-field 
    v-model="hotel.manager"
    label="Manager Name"
    required>
  </v-text-field>

  <v-text-field 
    v-model="hotel.buildingNo"
    label="Building number"
    required>
  </v-text-field>

  <v-text-field 
    v-model="hotel.street"
    label="Street"
    required>
  </v-text-field>

  <v-text-field 
    v-model="hotel.area"
    label="Area"
    required>
  </v-text-field>

  <v-text-field 
    v-model="hotel.district"
    label="District"
    required>
  </v-text-field>

  <v-text-field 
    v-model="hotel.pincode"
    label="Pincode"
    required>
  </v-text-field>

  <v-text-field 
    v-model="hotel.email"
    label="Email"
    required>
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
                        <button @click="sort('/hotel/asc',{item:'id'})"><v-icon small>mdi-arrow-up</v-icon></button>
                        <button @click="sort('/hotel/desc',{item:'id'})"><v-icon small>mdi-arrow-down</v-icon></button>
                    </th>
                    <th>Manager
                        <button @click="sort('/hotel/asc',{item:'manager'})"><v-icon small>mdi-arrow-up</v-icon></button>
                        <button @click="sort('/hotel/desc',{item:'manager'})"><v-icon small>mdi-arrow-down</v-icon></button>
                    </th>
                    <th>Owner</th>
                    <th>Address</th>
                    <th>Email
                      <button @click="sort('/hotel/asc',{item:'email'})"><v-icon small>mdi-arrow-up</v-icon></button>
                      <button @click="sort('/hotel/desc',{item:'email'})"><v-icon small>mdi-arrow-down</v-icon></button>
                    </th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,i) in info" :key="i">
                    <td>{{item.id}}</td>
                    <td>{{item.manager}}</td>
                    <td>{{item.name}}</td>
                    <td>{{`${item.address.building_no}, ${item.address.street}, ${item.address.area}, ${item.address.district}-${item.address.pincode}`}}</td>
                    <td>{{item.email}}</td>
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
                manager:'',
                customerId:'',
                address:{
                  buildingNo:'',
                  street:'',
                  area:'',
                  district:'',
                  pincode:'',
                },
                email:''
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
                this.info=res.data,console.log(res.data)
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
              id:item.id,
              manager:item.manager,
              customerId:item.customer_id,
              buildingNo:item.building_no,
              street:item.street,
              area:item.area,
              district:item.district,
              pincode:item.pincode,
              email:item.email      
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

      async sort(val,item){
        await api.post(this.link+val,item)
        .then((res)=>{this.info=res.data})
      },

    },

  }
</script>