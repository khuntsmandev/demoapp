<template>
  <div class="weather">
    <!-- display weather here -->
    <h1 v-if="city !== '' && state !== ''">Location: {{ city }}, {{ state }}</h1>
    <h1 v-if="currentTemp !== ''">Current Temp: {{ currentTemp }}°</h1>

    <input 
      v-model="zipCode" 
      type="text" 
      label="Location" 
      placeholder="Location Search"
      @input="updateZipCode">
    <!-- buttons can be useful for testing / debugging -->
    <!-- <button @click="getWeather">Refresh Weather</button> -->
    <button @click="updateZipCode">Lookup ZipCode</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Start',
  data () {
    return {
      zipCode: ''
    }
  },
  computed:
    mapState(['weather', 'currentTemp', 'state', 'city']),
  methods: {
    updateZipCode () {
      console.log('updateZipCode', this.zipCode)
      if (this.zipCode && this.zipCode.length === 5) {
        this.lookupLocationByZip(this.zipCode)
      }
    },
    ...mapActions(['getWeather', 'setZipCode', 'lookupLocationByZip'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
