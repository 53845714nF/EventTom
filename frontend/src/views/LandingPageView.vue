<script setup>
import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import SecondaryButton from "@/components/Basic/SecondaryButton.vue";
import { PrimaryButtonTypes, SecondaryButtonTypes } from "@/constants/ButtonTypes";
</script>

<template>
  <div class="main-container">
    <div class="main-wrapper">
      <h1>Das ist der Slogan von EvenTom</h1>
      <p class="white margin-top-bottom">
        Entdecke mit EvenTom die besten Events in deiner Nähe und sichere dir in wenigen Klicks deine Tickets – einfach, schnell und zuverlässig! Deine Plattform für unvergessliche Erlebnisse: Von Konzerten bis Theater – bei EvenTom findest du Events, die begeistern.
      </p>
      <div class="button-container">
        <PrimaryButton to="/signup" text="Registrieren" :type="PrimaryButtonTypes.GREEN" />
        <SecondaryButton to="/login" text="Login" :type="SecondaryButtonTypes.WHITE" />
      </div>
    </div>
  </div>
  <div class="content-container">
    <h2>Was EvenTom besonders macht:</h2>
    <div class="info-card-container">
      <div class="info-card bg-customer">
        <h4>Neue Events in Echtzeit</h4>
        <p>
          Dank unserer Echtzeitanzeige bleibst du immer informiert und verpasst kein Event mehr! Entdecke spannende Veranstaltungen in deiner Nähe, sei auf dem neuesten Stand und sichere dir deine Tickets rechtzeitig.
        </p>
      </div>
      <div class="info-card bg-event-creator">
        <h4>Eventerstellung</h4>
        <p>
          Erstelle deine eigenen Events und starte den Ticketverkauf in wenigen Schritten! Mit EvenTom kannst du deine Veranstaltungen nicht nur verwalten, sondern auch gezielt bewerben, um dein Publikum zu erreichen und unvergessliche Erlebnisse zu schaffen.
        </p>
      </div>
      <div class="info-card bg-event-manager">
        <h4>Eventmanagement</h4>
        <p>
          Verwalte deine Events einfach und effizient mit EvenTom – behalte jederzeit den Überblick über alle Ticketverkäufe, Teilnehmerzahlen und wichtige Veranstaltungsdetails. Unsere Plattform bietet dir alle Werkzeuge, um deine Events professionell zu organisieren, von der Planung bis zur Durchführung.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: var(--cp-black);
  border-radius: 40px;
  padding: 70px 0 150px 70px;
}

.main-wrapper {
  max-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.margin-top-bottom {
  margin: 25px 0;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.content-container h2 {
  margin-top: 20px;
  margin-bottom: 30px;
}

.info-card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.info-card {
  width: 30%;
  padding: 20px;
  border-radius: 20px;
  margin: 0px 15px;
}

</style>
