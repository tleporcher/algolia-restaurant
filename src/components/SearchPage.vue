<template>
  <div class="SearchPage">
    <div class="SearchBar">
      <input
        class="SearchBar__input"
        type="text"
        placeholder="Search for Restaurants by Name, Cuisine, Location"
        v-model="query">
    </div>
    <div class="SearchPage__content">
      <sidebar></sidebar>
      <transition name="slide-fade">
        <results-list :results="results"></results-list>
      </transition>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import ResultsList from './ResultsList';
import index from '@/algolia';
import bus from '@/EventBus';

const PARIS_LAT_LNG = `48.8566, 2.3522`;

export default {
  components: {
    Sidebar,
    ResultsList,
  },
  data() {
    return {
      results: [],
      query: '',
      position: PARIS_LAT_LNG
    }
  },
  watch: {
    query: (newQuery) => {
      index.setQuery(newQuery).search({
        query: this.query,
        attributesToRetrieve: ['name', 'food_type', 'city'],
        hitsPerPage: 50,
        aroundLatLng: this.position,
      });
    }
  },
  methods: {
    getGeolocation: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          this.position = `${latitude}, ${longitude}`;
        });
      }
    }
  },
  mounted() {
    index.search();
    this.getGeolocation();
    bus.$on(('newQuery'), (cuisine) => {
      this.query = cuisine;
    });
    index.on('result', result => {
      this.results = result.hits;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.SearchPage {
  box-shadow: 0 0 1em $grey;
  background: $white;
  height: 80vh;
  overflow: scroll;

  .SearchPage__content {
    display: flex;
  }

  .SearchBar {
  background: $ocean-blue;
  height: 15vh;
  display: flex;

  .SearchBar__input {
    color: $black;
    height: 40%;
    width: 90%;
    margin: auto;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    padding-left: 1em;

    &::placeholder {
      color: $grey;
    }
  }
}
}
</style>
