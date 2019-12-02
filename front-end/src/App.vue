<template>
  <div id="app">
    <div class="title">
      <h1>Mordheim Bands</h1>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/editprofil">Edit Profil</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>

</style>
