<template>
  <v-ons-page>
    <div class="container">
      <h1>{{ $t('lang.pages.alerts.main.text')}}</h1>
      <!-- Alerts list -->
      <v-ons-list class="alertsList">
        <v-ons-list-item
          :modifier="md ? 'nodivider' : ''"
          class="alertsList__item"
          v-for="(alert) in alerts" :key="alert.id">
          <alert-message
            :userIcon="alert.userIcon"
            :altIcon="alert.userName + ' icon'"
            :userName="alert.userName"
            :referenceDate="referenceDate"
            :startDate="alert.startDate"
            :endDate="alert.endDate"
            :alertTitle="alert.alertTitle"
            :alertText="alert.alertText"
            :phoneButton="$t('lang.components.alerts.phoneButton')"
            :linkButton="$t('lang.components.alerts.linkButton')"
            @phoneButtonEvent="toPhone(alert.alertPhone)"
            @linkButtonEvent="toLink(alert.alertLink)"
            >
          </alert-message>
        </v-ons-list-item>
      </v-ons-list>
    </div>

    <v-ons-alert-dialog 
      modifier="rowfooter"
      :visible.sync="isAlertVisible"
      >
      <alert-script
        :userIcon="userIcon"
        :altIcon="userName + ' icon'"
        :userName="userName"
        ref="scriptAlert"
      >
      </alert-script>
      <template slot="footer">
        <v-ons-alert-dialog-button @click.prevent="isAlertVisible = false">Cancel</v-ons-alert-dialog-button>
         <v-ons-alert-dialog-button @click.prevent="createAlert">Ok</v-ons-alert-dialog-button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-fab
      class="alertScript"
      position="bottom right"
      ripple="true"
      @click.prevent="isAlertVisible = true"
      >
        <v-ons-icon
          class="alertScript__icon"
          icon="ion-edit, material:zmdi-email-open"
        >
        </v-ons-icon>
    </v-ons-fab>

  </v-ons-page>
</template>

<script>
  import alertMessage from '../../components/Alerts/alertMessage'
  import alertScript from '../../components/Alerts/alertScript'
  export default {
    name: 'alerts',
    components: {
      alertMessage,
      alertScript
    },
    timers: {
      loadDate: {
        time: 1000,
        autostart: true,
        repeat: true
      }
    },
    data () {
      return {
        alerts_old: {
          RealMadrid: {
            userIcon: 'src/assets/Real-Madrid-logo-256.png',
            userName: 'Real Madrid',
            endDate: 2563698,
            alertTitle: 'Asientos partido Real Madrid-Barcelona',
            alertText: 'Todavía quedan algunos asientos libres para el Clásico de esta tarde',
            alertPhone: '',
            alertLink: 'https://www.realmadrid.com/entradas'
          },
          AtleticoMadrid: {
            userIcon: 'src/assets/Atletico-Madrid-logo-256.png',
            userName: 'Atlético de Madrid',
            endDate: 4589752,
            alertTitle: 'Palco VIP partido Atlético-Celta',
            alertText: 'Tenemos un palco Vip en el primer anfiteatro para el partido de esta noche. 1.000€',
            alertPhone: '',
            alertLink: 'https://www.atleticodemadrid.com/entradas'
          }
        },
        isAlertVisible: false,
        userIcon: 'src/assets/Real-Madrid-logo-256.png',
        userName: 'Real Madrid',
        referenceDate: ''
      }
    },
    mounted () {
      console.log('montado Alerts.vue')
    },
    computed: {
      alerts () {
        return this.$store.getters['alerts/loadedAlerts']
      }
    },
    methods: {
      toPhone (phone) {
        console.log('phone to: ' + phone)
      },
      toLink (link) {
        console.log('link to: ' + link)
        window.location.href = link
      },
      createAlert () {
        this.isAlertVisible = false
        this.$refs.scriptAlert.onCreateAlert()
      },
      // Establece la fecha de referencia según la configuración del timer
      loadDate () {
        this.referenceDate = Date.now()
        console.log('La fecha de referencia es:' + this.referenceDate)
      }
    }
  }
</script>

<style scoped>
  .alertScript {
    background-color: dodgerblue;
  }
  .alertScript__icon {
    color: white;
  }
</style>
