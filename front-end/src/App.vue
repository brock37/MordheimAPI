<template>
  <div id="app">
    <div class="title">
      <h1>Mordheim Bands</h1>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/editprofil">Edit Profil</router-link> |
      <router-link to="/login">Login</router-link>
      <a href="/" v-if="username" @click.prevent="logout"> | Logout</a>
      <a href="#"></a>
    </div>
    <router-view v-bind:username.sync="username"/>
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
            .then((response) => {
                console.log("Log out")
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
