var selectUnit= {
  data: function() {
    return{
      keyFaction: "",
      keyRang: "",
      keyUnit: "",
      units:[],
    }
  },
  methods :{
    changeUnitSelector(event) {
      if (this.keyFaction !== "" && this.keyRang !== "")
      {
        console.log("changement d'unités");
        this.keyUnit = ""
        var vm= this
        var url= "http://127.0.0.1:3000/api/profile/"
                + this.keyFaction + "/" + this.keyRang

        axios.get(url).then(response =>{
          this.units = response.data.reponse
        })

      }
    }
  },
  mounted () {

  },
  watch : {
    keyUnit: function (){
      //Envoie un signal ainsi que la nouvelle valeur de keyUnit au parent
      this.$emit('update:keyunit', this.keyUnit)
    }
  },
  template: '\
  <div>\
    <fieldset>\
      <legend>Unité</legend>\
      <table>\
        <tbody>\
          <tr>\
            <th>Faction </th>\
            <td>\
              <select @change="changeUnitSelector($event)" v-model="keyFaction" class="" name="id_faction" title="Sélectionnez une faction">\
                <option value="1">Nains</option>\
                <option value="2">Orques</option>\
                <option value="3">Hommes-bêtes</option>\
                <option value="4">Skavens</option>\
                </select>\
            </td>\
          </tr>\
          <tr>\
            <th>Rang </th>\
            <td>\
              <select @change="changeUnitSelector($event)" v-model="keyRang" class="" name="id_rang" title="Sélectionnez un rang pour l\'unité">\
                <option value="0">Héros</option>\
                <option value="1">Homme de main</option>\
                </select>\
            </td>\
          </tr>\
          <tr>\
            <th>Unité </th>\
            <td>\
              <select v-model="keyUnit" name="id_unite" title="Sélectionnez un rang pour l\'unité">\
                <option v-for="unit in units" :value="unit.id">{{unit.Nom}}</option>\
              </select>\
            </td>\
          </tr>\
        </tbody>\
      </table>\
    </fieldset>\
  </div>'

}

var profilUnit= {
  props: ['keyUnit'],
  data : function() {
    return {
      profil: null
    }
  },
  methods : {
    changeUnitProfil(id) {
      this.keyUnit = id
      var url= "http://127.0.0.1:3000/api/profile/" + this.keyUnit

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
  },
  mounted () {
  },
  template : '\
  <div>\
    <fieldset class="profile">\
      <legend>Profile</legend>\
      <table v-if="profil !== null">\
        <thead>\
          <tr>\
            <th>M</th>\
            <th>CC</th>\
            <th>CT</th>\
            <th>F</th>\
            <th>E</th>\
            <th>PV</th>\
            <th>I</th>\
            <th>A</th>\
            <th>Cd</th>\
          </tr>\
        </thead>\
        <tbody>\
          <tr>\
            <td>{{profil.M}}</td>\
            <td>+ {{profil.CC}}</td>\
            <td>+ {{profil.CT}}</td>\
            <td>{{profil.F}}</td>\
            <td>{{profil.E}}</td>\
            <td>{{profil.PV}}</td>\
            <td>{{profil.I}}</td>\
            <td>{{profil.A}}</td>\
            <td>{{profil.Cd}}</td>\
          </tr>\
        </tbody>\
      </table>\
    </fieldset>\
  </div>'
}

var app = new Vue({
    el: '#app',
    components: {
      'select-unit' : selectUnit,
      'profil-unit' : profilUnit
    },
    data: {
});
