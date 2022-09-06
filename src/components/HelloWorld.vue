<template>
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>

    <v-text-field v-model="name" :rules="nameRules" :counter=30 label="Name" 
      required>Name</v-text-field>

    <h3>Gender</h3>
    <v-radio-group v-model="gender" column>
      <v-radio label="male" value="Male"></v-radio>
      <v-radio label="female" value="Female"></v-radio>
    </v-radio-group>

    <h3>Hobbies</h3>
    <v-checkbox v-model="hobbies" label="Cricket" value="Cricket">
      </v-checkbox>
    <v-checkbox v-model="hobbies" label="Music" value="Music">
      </v-checkbox>
    <v-checkbox v-model="hobbies" label="Reading" value="Reading">
      </v-checkbox>
    <v-checkbox v-model="hobbies" label="Others" value="Others">
      </v-checkbox>

    <v-select v-model="city" :items="city"
      :rules="[v => !!v || 'required']"
      label="City" required>
    </v-select>

    <v-text-field v-model="email" :rules="emailRules" label="Email"
      required></v-text-field>

    <v-text-field v-model="phone" :rules="phoneRules" :counter=10 label="Phone Number" 
      required></v-text-field>
   
    <v-btn :disabled="!valid" color="success" @click="validate">
      Submit</v-btn>
   </v-form>    
</v-app>
</template>
<script lang="ts">
export default {
     data: () => ({
       valid: true,
       name: '',
       nameRules: [
         name=>!!name||'required',
         v=>v.length>3 || 'Invalid name'
       ],
       email: '',
       emailRules: [
         email => !!email || 'required',
         v => /.+@.+\..+/.test(v) || 'Invalid',
       ],
       city: [
         'Chennai',
         'Mumbai',
         'Bangalore',
         'Hyderabad',
         'Delhi',
         'Nagpur',
       ],
       checkbox: false,
       radioGroup: 1,
       phone:'',
       phoneRules:[
        phone=>!!phone || 'required',
        v=>v.length>8 || 'Invalid number',
      ],
      hobbies: [],
     }),     
      methods: {
        validate () {
          this.$refs.form.validate()
          const valid = {
            Name : this.name,
            Gender :this.gender,
            Hobbies:this.hobbies,
            City: this.city,
            Email : this.email,
            Phone: this.phone,
          }
          console.log(JSON.stringify(valid))
        }
     },
   }
</script>



