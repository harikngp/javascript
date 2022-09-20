<template>
  <div id="app">
    <nav>
    <router-link to="/customer"><v-btn>Customer</v-btn></router-link>
     <router-link to="/hotel"><v-btn>Hotel</v-btn></router-link>
    </nav>
    <router-view/>
  </div>
</template>