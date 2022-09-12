<template>
  <v-app>
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

    <h3>Gender</h3>
    <v-radio-group 
      v-model="gender"
      row>
      <v-radio label="male" value="Male"></v-radio>
      <v-radio label="female" value="Female"></v-radio>
    </v-radio-group>

    <h3>Hobbies</h3>
    <v-checkbox 
      v-model="hobbies"
      v-for="(hobby,i) in interest" 
      :key="i" 
      :label="hobby.name"
      :value="hobby.name"
      required
      :rules="[v=>!!v || 'required']">
    </v-checkbox>

    <v-autocomplete
      v-model="city" 
      :items="location"
      :rules="[v => !!v || 'required']"
      label="City" 
      required>
    </v-autocomplete> 

    <v-text-field 
      v-model="email" 
      :rules="emailRules" 
      label="Email"
      required>
    </v-text-field>

    <v-text-field 
      v-model="phone" 
      :rules="phoneRules" 
      label="Phone Number" 
      required>
    </v-text-field>
   
    <v-btn 
      :disabled="!valid" 
      color="success" 
      @click="validate"
      v-if="!flag"
      >
      Submit
    </v-btn>
    <v-btn
      v-model = 'button1'
      :disabled="!valid"
      color="success"
      @click="updateItem"
      v-if="flag">
      Edit
    </v-btn>
  </v-card>
</v-dialog>
</v-form>

<v-simple-table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name </th>
          <th>Gender</th>
          <th>Hobbies</th>
          <th>City</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
         <tr
          v-for="(item,name) in info" :key = "name">
          <td>{{item.id}}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.hobbies }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td><v-btn @click="edit(item)"><v-icon small>mdi-pencil</v-icon></v-btn></td>
          <td><v-btn @click="del(item)"><v-icon small>mdi-delete</v-icon></v-btn></td>
        </tr>
      </tbody>
    </v-simple-table>
</v-app>
</template>
<script lang="ts">
export default {
     data: () => ({
       valid: true,
       id:0,
       name: '',
       nameRules: [
         name=>!!name||'required',
         v=>v.length>=3 && /^[a-zA-Z\s]+$/.test(v) || 'Invalid name',
       ],
       email: '',
       emailRules: [
         email => !!email || 'required',
         v => /.+@.+\..+/.test(v) || 'Invalid',
       ],
       city:'',
       location: [
         'Chennai',
         'Mumbai',
         'Bangalore',
         'Hyderabad',
         'Delhi',
         'Nagpur',
       ],
       phone:'',
       phoneRules:[
        phone=>!!phone || 'required',
        v=>v.length>=7 && v.length<=13|| 'Invalid number',
        v=> /^[0-9]+$/.test(v) || 'Not a number',
      ],
      interest: [{id:1,name:'Cricket'},{id:2,name:'Music'},{id:3,name:'Reading'},{id:4,name:'Others'}],
      hobbies:[],
      info:[],
      tempObj: {}, 
      flag: false,
      dialog:false,
     }),     
      methods: {
        
        validate () {
          if(this.$refs.form.validate()){
          this.id++,
          this.info.push({
            id:this.id,
            name : this.name,
            gender :this.gender,
            hobbies:this.hobbies,
            city: this.city,
            email : this.email,
            phone: this.phone,
          }),
          this.dialog=false,
          this.flag=false,
          this.$refs.form.reset()
          }
          
        },
        edit(item) {
        this.dialog = true
        this.flag=true
        this.tempObj = item
        this.name = item.name
        this.gender = item.gender
        this.hobbies = item.hobbies
        this.city = item.city
        this.email = item.email
        this.phone = item.phone
      }, 
      updateItem() {
        this.$refs.form.validate()
        let test = this.info.findIndex(temp => temp.id == this.tempObj.id)
        this.info[test].name = this.name
        this.info[test].gender =this.gender
        this.info[test].hobbies= this.hobbies
        this.info[test].city = this.city
        this.info[test].email = this.email
        this.info[test].phone = this.phone
        this.flag=false
        this.$refs.form.reset()
        this.dialog=false
      }, 
        del(item){
          this.edit = this.info.indexOf(item)
          this.info.splice(this.edit, 1)
        },
     },
   }
</script>