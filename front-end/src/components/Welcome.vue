<template lang="html">
  <div class="welcome">
    <h2>Bienvenue sur Mordheim Warbands</h2>
    <h3>{{usernameLog}}</h3>
    <hr>
    <p>Mordheim Warbands Vous permet de creer differentes bandes pour votre jeux favoris
    et de faire suivre l'XP gagné lors d'un campagne.</p>
    <h3>Les dernieres bandes</h3>
    <ul>
      <li></li>
      <li></li>
    </ul>
  </div>

</template>

<script>
export default {
  props:['usernameLog']
}
</script>

<style lang="css" scoped>
.welcome{
  width: 50%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
