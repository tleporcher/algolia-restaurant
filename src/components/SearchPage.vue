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
        <results-list :results="results" :time="queryTime"></results-list>
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
      position: PARIS_LAT_LNG,
      startTime: 0,
      queryTime: 0,
    }
  },
  watch: {
    query: function(newQuery) {
      this.queryAlgolia(newQuery);
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
    },
    queryAlgolia: function(query) {
      this.startTime = Date.now();
      index.search(query, (err, content) => {
        this.results = content.hits;
        this.calculateQueryTime();
      });
    },
    listenToQueries: function() {
      bus.$on('newCuisineQuery', (cuisine) => {
        this.queryAlgolia(cuisine);
      });
      bus.$on('newRatingQuery', (rating) => {
        const newQuery = {
          filters: `stars_count>=${rating} AND stars_count<${rating + 1}`,
          aroundLatLng: this.position
        };
        this.queryAlgolia(newQuery);
      });
      bus.$on('newPaymentOptionQuery', (paymentOption) => {
        this.queryAlgolia(paymentOption);
      });
    },
    calculateQueryTime: function() {
      this.queryTime = (Date.now() - this.startTime) / 1000;
    }
  },
  mounted() {
    this.getGeolocation();
    this.startTime = Date.now();
    this.queryAlgolia({ aroundLatLng: this.position });
    this.listenToQueries();
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
