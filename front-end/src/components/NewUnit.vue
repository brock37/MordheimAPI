<template lang="html">
  <div class="popup createUnit" >
    <input type="text" name="unit_name" placeholder="Nom de l'unité" v-model="newName">
    <div class="layout">
      <button type="button" name="valid" @click.prevent="validNewUnit()">Valider</button>
      <button type="button" name="cancel" @click.prevent="closePopUp()">Annuler</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props:[ 'profil' ],
  data : function() {
    return {
      newName: "",
      allUnit: [],
      accepted: false,
      lastIndex: null
    }
  },
  methods :{
    closePopUp() {
      this.$emit('closePopUp', this.lastIndex, this.accepted)
    },
    validNewUnit(){
      if(this.newName !== "" && !this.nameUsed(this.newName)){
        var url= "http://127.0.0.1:3000/profil/"
        var data = {
          id_rang: this.profil.rang,
          id_race: this.profil.faction,
          Nom: this.newName,
          Prix: 0,
          M : 0,
          CC : 0,
          CT : 0,
          F : 0,
          E : 0,
          PV : 0,
          I : 0,
          A : 0,
          Cd : 0,
          Arme_Armure: "",
          Regle: null
        }
        axios.post(url,data).then(res=> {
          this.lastIndex =res.data.reponse.insertId
          this.accepted= true
          this.closePopUp()
        })
      }
    },
    nameUsed(newName){
      for(const unit of this.allUnit){
        if(newName == unit.Nom){
          window.alert("Name already use " + unit.Nom)
          return true;
        }
      }
      return false;
    }
  },
  created: function(){
    var url= "http://127.0.0.1:3000/profil/"
    axios.get(url).then(response =>{
      this.allUnit = response.data.reponse
    })
  }
}
</script>

<style lang="css" scoped>
</style>
