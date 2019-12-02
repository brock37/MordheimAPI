<template lang="html">
  <div>
    <fieldset>
      <legend>Unité</legend>
      <table>
        <tbody>
          <tr>
            <th>Faction </th>
            <td>
              <select @change="changeUnitSelector($event)" v-model="keyFaction"
              class="" name="id_faction" title="Sélectionnez une faction">
                <option v-for="faction in factions" :value="faction.id"
                v-bind:key="faction.id">{{faction.nom_race}}</option>
                </select>
            </td>
          </tr>
          <tr>
            <th>Rang </th>
            <td>
              <select @change="changeUnitSelector($event)" v-model="keyRang"
              class="" name="id_rang" title="Sélectionnez un rang pour l\'unité">
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
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return{
      keyFaction: "",
      keyRang: "",
      keyUnit: "",
      units:[] ,//Contient les unites disponible
      factions: []
    }
  },
  methods :{
    /*
    Récupere la liste des unité disponible depuis l'API
    en fonction de la faction et du rang choisis
    */
    changeUnitSelector() {
      if (this.keyFaction !== "" && this.keyRang !== "")
      {
        //console.log("changement d'unités");
        this.keyUnit = ""

        var url= "http://127.0.0.1:3000/api/profile/"
                + this.keyFaction + "/" + this.keyRang

        axios.get(url).then(response =>{
          this.units = response.data.reponse
        })

      }
    }
  },
  watch : {
    keyUnit: function (){
      //Envoie un signal ainsi que la nouvelle valeur de keyUnit au parent
      this.$emit('update:keyunit', this.keyUnit)
    }
  },
  created :function(){
    let url= "http://127.0.0.1:3000/api/faction"

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
</style>
