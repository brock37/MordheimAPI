var selectUnit= {
  data: function() {
    return{
      keyFaction: "",
      keyRang: "",
      units:[],
      apiAnswer: null
    }
  },
  methods :{
    changeUnitSelector(event) {
      if (this.keyFaction !== "" && this.keyRang !== "")
      {
        console.log("changement d'unités");
        var vm= this
        var url= "http://127.0.0.1:3000/api/profile/" + this.keyFaction + "/" + this.keyRang

        axios.get(url).then(response =>{
          this.units = response.data.reponse
        })
      }
    }
  },
  mounted () {
    console.log("Mounted SelectUnit")

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
              <select name="id_unite" title="Sélectionnez un rang pour l\'unité">\
                <option v-for="unit in units" :value="unit.id">{{unit.Nom}}</option>\
              </select>\
            </td>\
          </tr>\
        </tbody>\
      </table>\
    </fieldset>\
  </div>'
}

var app = new Vue({
    el: '#app',
    components: {
      'select-unit' : selectUnit
    },
    data: {
        info: null,
        unit: []
    }/*,
    mounted () {
      axios.get("http://127.0.0.1:3000/api/profile/1/1").then(response => (this.info = response))

    }*/
});
