<template>
  <div id="app">
    <nav>
      <router-link to="/employee"><v-btn>Employee</v-btn></router-link>
     <router-link to="/department"><v-btn>Department</v-btn></router-link>
    </nav>
    <router-view/>
  </div>
</template>