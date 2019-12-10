<template lang="html">
  <div>
    <fieldset>
      <legend>Unité</legend>
      <table>
        <tbody>
          <tr>
            <th>Faction </th>
            <td>
              <select v-model="keyFaction" class="" name="id_faction" title="Sélectionnez une faction">
                <option v-for="faction in factions" :value="faction.id"
                v-bind:key="faction.id">{{faction.nom_race}}</option>
                </select>
            </td>
          </tr>
          <tr>
            <th>Rang </th>
            <td>
              <select v-model="keyRang" class="" name="id_rang" title="Sélectionnez un rang pour l\'unité">
                <option value="0">Héros</option>
                <option value="1">Homme de main</option>
                </select>
            </td>
          </tr>
          <tr>
            <th>Unité </th>
            <td>
              <select v-model="keyUnit" name="id_unite" title="Sélectionnez un rang pour l\'unité">
                <option v-for="unit in units" :value="unit.id" v-bind:key="unit.id">{{unit.Nom}}</option>
              </select>
              <button type="button" name="AddUnit" :disabled="disabledAddUnit" @click="OpenPopUpNewProfil()">+</button>
              <button type="button" name="RemoveUnit" @click.prevent="alertRemoveUnit" v-if="keyUnit !== ''">-</button>
              <NewUnit v-if="showCreatePopup" v-bind:profil="newProfil" @closePopUp="closePopUpNewProfil"/>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </div>
</template>

<script>
import axios from 'axios'
import NewUnit from './NewUnit.vue'
export default {
  components: {
    NewUnit
  },
  data: function() {
    return{
      keyFaction: "",
      keyRang: "",
      keyUnit: "",
      units:[] ,//Contient les unites disponible
      factions: [],
      disabledAddUnit: true,
      showCreatePopup: false,
      newProfil:{
        faction: Number,
        rang: Number
      },
      nameSelectUnit: ""
    }
  },
  methods :{
    /*
    Récupere la liste des unité disponible depuis l'API
    en fonction de la faction et du rang choisis
    */
    updateUnitSelector() {
      if (this.keyFaction !== "" && this.keyRang !== "")
      {//Si une faction et un rang ont ete choisis vas chercher les profil disponible
        //ainsi que les regles associes au profil
        this.keyUnit = ""
        this.disabledAddUnit= false

        var url= "http://127.0.0.1:3000/profil/"
                + this.keyFaction + "/" + this.keyRang

        axios.get(url).then(response =>{
          this.units = response.data.reponse
        })

      }
    },
    OpenPopUpNewProfil() {
      //Pour creer le nouveau profil on recupere la clef a lui attribue
      this.showCreatePopup= true

      this.newProfil.faction= this.keyFaction
      this.newProfil.rang= this.keyRang

    },
    closePopUpNewProfil(id , accepted) {
      this.showCreatePopup= false
      if(accepted){
        this.updateUnitSelector()
        this.keyUnit= id
      }
    },
    alertRemoveUnit(){
      for (var i = 0; i < this.units.length; i++) {
        if(this.units[i].id == this.keyUnit){
          this.nameSelectUnit = this.units[i].Nom
        }
      }
      if(window.confirm("Voulez vous supprimmer l'unité '"+ this.nameSelectUnit +"' ?")){
          var url= "http://127.0.0.1:3000/profil/" + this.keyUnit

          axios.delete(url).then( ()=>{
            window.alert("Unité supprimer")
            this.updateUnitSelector()
          })
      }
    }
  },
  watch : {
    keyUnit: function (){
      this.nameSelectUnit=
      //Envoie un signal ainsi que la nouvelle valeur de keyUnit au parent
      this.$emit('update:keyunit', this.keyUnit)
    },
    keyRang: function() {
      this.updateUnitSelector()
    },
    keyFaction: function() {
      this.updateUnitSelector()
    }
  },
  created :function(){
    //A la creation du composant on vas chercher les factions disponible dans la bbd
    let url= "http://127.0.0.1:3000/faction"

    axios.get(url).then(response =>{
      this.factions = response.data.reponse
    })
  }
}
</script>

<style lang="css" scoped>
fieldset{
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  min-width: 50%;
  margin-bottom: 25px;
}
.popup{
  position: absolute;
  border: 1px solid black;
}
</style>
