<template>
  <div class="home">
    <Welcome v-bind:username.sync="logName"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'home',
  props:['username'],
  components: {
    Welcome
  },
  computed:{
    logName(){
      return this.username
    }
  },
}
</script>
