<template>
  <div class="home">
    <Welcome v-bind:usernameLog.sync="logName"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'home',
  props:['usernameLog'],
  components: {
    Welcome
  },
  computed:{
    logName(){
      return this.usernameLog
    }
  },
}
</script>
