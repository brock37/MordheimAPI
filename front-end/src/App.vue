<template>
  <div id="app">
    <div class="title">
      <h1>Mordheim Bands</h1>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/editprofil">Edit Profil</router-link> |
      <span v-if="username" >
        <router-link to="/dashboard">Dashboard</router-link>
        |
        <a href="/" @click.prevent="logout">Logout</a>
      </span>
      <router-link to="/login" v-else>Login</router-link>
    </div>
    <router-view v-bind:usernameLog.sync="username"/>
  </div>
</template>

<script>
import axios from "axios"
import router from "./router"
  export default{
    data(){
      return{
        username: undefined
      }
    },
    methods:{
      logout(){
        axios.get("http://127.0.0.1:3000/user/logout")
            .then(() => {
                this.username= undefined
                router.push("/login")
            })
      }
    }
  }
</script>

<style>
#nav a{
  text-decoration: none;
  color: black;
}
</style>
