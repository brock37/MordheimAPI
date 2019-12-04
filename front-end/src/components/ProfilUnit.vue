<template lang="html">
  <div>
    <fieldset class="profile">
      <legend>Profile</legend>
      <div class="completeProfil" v-if="profil !== null">
        <table class="stats">
          <thead>
            <tr>
              <th>M</th>
              <th>CC</th>
              <th>CT</th>
              <th>F</th>
              <th>E</th>
              <th>PV</th>
              <th>I</th>
              <th>A</th>
              <th>Cd</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{profil.M}}</td>
              <td>{{profil.CC}}</td>
              <td>{{profil.CT}}</td>
              <td>{{profil.F}}</td>
              <td>{{profil.E}}</td>
              <td>{{profil.PV}}</td>
              <td>{{profil.I}}</td>
              <td>{{profil.A}}</td>
              <td>{{profil.Cd}}</td>
            </tr>
          </tbody>
        </table>
        <br>
        <div class="price">
          Prix : <input type="text" name="price" :value="profil.Prix" class="smallint"> Courrones
        </div>
        <br>
        <table class="rulesTable">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Desctiption</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rule in rules" v-bind:key="rule.id">
              <td>{{rule.nom}}</td>
              <td>{{rule.resume}}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </fieldset>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['keyUnit'],
  data : function() {
    return {
      profil: null,  //Contient les infos récuperer de la BDD
      rules : null,
      editMode: false
    }
  },
  methods : {
    /*
    Fais une requete a l'API pour avoir le profil de l'unité selectionner
    */
    updateUnitProfil() {
      var url= "http://127.0.0.1:3000/api/profile/" + this.keyUnit

      axios.get(url).then(response =>{
        this.profil = response.data.reponse[0]

        var urlRules= "http://127.0.0.1:3000/api/regles/" + this.keyUnit + "/" + this.profil.id_race
        axios.get(urlRules).then(response =>{
          this.rules = response.data.reponse
        })

      })
    },
    validEdit(){
      var newProfil= {
        id_rang: this.profil.id_rang,
        id_race: this.profil.id_race,
        Nom: this.profil.Nom,
        Prix : this.profil.Prix,
        M : this.profil.M,
        CC : this.profil.CC,
        CT : this.profil.CT,
        F : this.profil.F,
        E : this.profil.E,
        PV : this.profil.PV,
        I : this.profil.I,
        A : this.profil.A,
        Cd : this.profil.Cd,
        Arme_Armure : this.profil.Arme_Armure,
        Regle : this.profil.Regle
      }

      var url= "http://127.0.0.1:3000/api/profile/" + this.keyUnit

      axios.put(url, newProfil).then( ()=> {
        this.editMode= false
      })
    },
    cancelEdit(){
      this.updateUnitProfil()
      this.editMode=false
    }
  },
  watch : {
    /*
    Des que la valeur de keyUnit change on regarde:
    Si un profil est selectionne on l'enregistre
    Sinon on remet a zero pour que la table disparaisse
    */
    keyUnit: function(){
      if(this.keyUnit !== "") {
        this.updateUnitProfil()
      }
      else {
        this.profil = null
      }

    }
  }
}
</script>

<style lang="css" scoped>
fieldset{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  width: 50%;
  text-align: center;

}

table{
  border-collapse: collapse;
  width: 95%;
  margin: auto;
}
th,td{
  padding: 5px;
}

.stats thead{
  border-bottom: 1px solid;
}

.stats td , .stats th{
  min-width: 20px;
  width: 10%;
}

.rulesTable thead{
  background-color: #333;
  color: #fff;
}

.rulesTable table, .rulesTable td {
  border: none;
}

.rulesTable tr:nth-child(odd) td{
  background: white;
}

.rulesTable tr:nth-child(even) td{
  background: grey;
  color: white;
}

.price{
  text-align: left;
}

.smallint{
  width: 30px;
  text-align: center;
}
</style>
