import selectUnit from './components/SelectUnit.vue'
import profilUnit from './components/ProfilUnit.vue'

var app = new Vue({
    el: '#app',
    components: {
      'select-unit' : selectUnit,
      'profil-unit' : profilUnit
    },
    data: {
      /*
      Fais le liens entre les composants enfants
      en récuprerant la valeur depuis select-unit
      et en la renvoyant dans profil-unit
      */
        keyunit: null
    }
});
