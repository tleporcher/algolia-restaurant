<template>
  <div class="ResultsList" v-if="results.length > 0">
    <h3>
      <span>{{ this.results.length }} results found in {{ this.time }} seconds</span>
    </h3>
    <transition-group name="slide-fade" class="ResultsList__list">
      <result v-for="(result, i) in results" :result="result" :key="i" v-if="i < resultsCount"></result>
    </transition-group>
    <a class="ResultsList__show" @click="showMore" v-if="results.length > resultsCount">Show more</a>
  </div>
</template>

<script>
import Result from './Result';
import bus from '@/EventBus';

export default {
  data() {
    return {
      resultsCount: 3
    }
  },
  components: {
    Result
  },
  props: ['results', 'time'],
  methods: {
    showMore: function() {
      this.resultsCount = this.resultsCount + 6;
    },
    resetCount: function() {
      this.resultsCount = 3;
    }
  },
  mounted() {
    bus.$on('newCuisineQuery', () => {
      this.resetCount();
    });
    bus.$on('newRatingQuery', () => {
      this.resetCount();
    });
    bus.$on('newPaymentOptionQuery', () => {
      this.resetCount();
    });
  }
}
</script>

<style lang="scss" scoped>
.ResultsList {
  display: flex;
  flex-direction: column;
  padding: 1em 0 0 2em;
  border-left: 1px solid $light-grey;
  width: 100%;

  .ResultsList__list {
    margin-top: 1em;
  }

  .ResultsList__show {
    color: $grey;
    font-weight: 600;
    margin: 2em 10em;
    padding: .5em 0;
    cursor: pointer;
    border: 1px solid $grey;
    border-radius: 5px;
    text-align: center;
  }
}
</style>
