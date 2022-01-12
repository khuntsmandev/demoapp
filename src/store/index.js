import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  state: {
    weather: '',
    city: '',
    state: '',
    zipCode: '',
    currentTemp: '',
    minTemp: '',
    maxTemp:'',
    sunrise: '',
    sunset: '',
    pressure: '',
    humidity: '',
    wind: '',
    overcast: '', 
    icon: ''
  },
  mutations: {
    SET_WEATHER (state, weather) {
      state.weather = weather
      state.currentTemp = weather.main.temp
      state.minTemp = weather.main.minTemp
      state.maxTemp = weather.main.maxTemp
      state.sunrise = weather.main.sunrise
      state.sunset = weather.main.sunset
      state.pressure = weather.main.pressure
      state.humidity = weather.main.humidity
      state.wind = weather.main.wind
      state.overcast = weather.main.overcast
      state.icon = weather.main.icon
    },
    SET_SEARCHSTRING (state, response) {
      state.state = response.data.state
      state.city = response.data.city
    },
    SET_ZIPCODE (state, zipCode) {
      state.zipCode = zipCode
    }
  },
  actions: {
    setWeather ({ commit }, weather) {
      commit('SET_WEATHER', weather)
    },
    setLocation ({ commit, dispatch }, locationSearchString) {
      commit('SET_SEARCHSTRING', locationSearchString)
      dispatch('getWeather', this.state)
    },
    lookupLocationByZip ({ commit, dispatch }, zip) {
      const apiKey = 'bqfkH2mN49AwnuBkPBkaOMblKlGk7vFAnfdg2S1pk16ZzQuMTTEhQgdKZ1ye2uWj'
      const apiUrl = `http://www.zipcodeapi.com/rest/${apiKey}/info.json/${zip}/degrees`
      axios.get(apiUrl)
      .then(response => {
        console.log(response.data.city)
        // if the response is successful, update the location search string
        // then trigger the getWeather action
        if (response.status === 200) {
          commit('SET_ZIPCODE', zip)
          dispatch('setLocation', response)
        }
        
      })
    },
    getWeather ({ commit, state }) {
      console.log('getWeather')
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather'
      const appId = '75105c22424878900ef3a764236b2549'
      axios.get(`${apiUrl}?q=${state.zipCode},us&appid=${appId}&units=imperial`)
      .then(response => {
        console.log(response.data)
        if (response.status === 200) {
         // if the response is successful, update the weather
        commit('SET_WEATHER', response.data) 
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
})

export default store
