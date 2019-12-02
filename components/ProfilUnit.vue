<template lang="html">
  <div>\
    <fieldset class="profile">
      <legend>Profile</legend>
      <table v-if="profil !== null">
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
    </fieldset>
  </div>
</template>

<script>
export default {
  props: ['keyUnit'],
  data : function() {
    return {
      profil: null  //Contient les infos récuperer de la BDD
    }
  },
  methods : {
    /*
    Fais une requete a l'API pour avoir le profil de l'unité selectionner
    */
    changeUnitProfil(id) {
      this.keyUnit = id
      var url= "http://127.0.0.1:3000/api/profile/" + this.keyUnit
      console.log(url);

      axios.get(url).then(response =>{
        this.profil = response.data.reponse[0]
      })
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
        this.changeUnitProfil(this.keyUnit)
      }
      else {
        this.profil = null
      }

    }
  }
}
</script>

<style lang="css" scoped>
</style>
