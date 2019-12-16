<template lang="html">
  <div class="">
    <button type="button" name="button" @click="logout">Logout</button>
  </div>
</template>

<script>
import router from "../router"
import axios from "axios"
export default {

  methods: {
    logout (){
      axios.get("http://127.0.0.1:3000/logout")
          .then((response) => {
              console.log(response)
              router.push('/About')
          })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
