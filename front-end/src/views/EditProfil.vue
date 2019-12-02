<template lang="html">
  <div class="main">
    <h1>Mordheim Bands</h1>

    <SelectUnit v-bind:keyunit.sync="keyunit"/>
    <ProfilUnit v-bind:key-unit="keyunit"/>
  </div>

</template>

<script>
// @ is an alias to /src
import SelectUnit from '@/components/SelectUnit.vue'
import ProfilUnit from '@/components/ProfilUnit.vue'
export default {
  name: 'Edit Profil',
  components: {
    SelectUnit,
    ProfilUnit
  },
  data: function(){
    return{
      keyunit: null
    }
  }
}
</script>

<style lang="css" scoped>

body{
  margin: 0;
  padding: 0;
}

h1{
  text-align: center;
}

</style>
