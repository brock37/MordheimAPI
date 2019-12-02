<template lang="html">
  <div class="main">
    <h1>Mordheim Bands</h1>
    
    <SelectUnit v-bind:keyunit.sync="keyunit"/>
    <ProfilUnit v-bind:key-unit="keyunit"/>
  </div>

</template>

<script>
import SelectUnit from '@/components/SelectUnit.vue'
import ProfilUnit from '@/components/ProfilUnit.vue'
export default {
  name: 'test',
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

fieldset{
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  min-width: 50%;
  margin-bottom: 25px;
}

.profile table, .profile td{
  border: 1px solid #333;
}

.profile td,th{
  width: 50px;
  text-align: center;
}

.profile thead{
  background-color: #333;
  color: #fff;
}
</style>
