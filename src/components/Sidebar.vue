<template>
  <div class="Sidebar">
    <div class="FoodTypes">
      <h3>Cuisine/Food Type</h3>
      <ul class="FoodTypes__list">
        <li class="FoodTypes__item" v-for="(cuisine, i) in cuisines" :key="i" @click="emitNewCuisineQuery(cuisine)" :class="{ FoodTypes__selected: cuisine.selected }">
          <span>{{ cuisine.name }}</span>
        </li>
      </ul>
    </div>
    <div class="Ratings">
      <h3>Rating</h3>
      <ul class="Ratings__ranges">
        <li v-for="(rating, i) in ratings" :key="i" @click="emitNewRatingQuery(rating)" :class="{ Ratings__selected: rating.selected }">
          <ul class="Ratings__stars">
            <li v-for="(star, j) in rating.stars" :key="j">
              <img :src="star" width="16" height="16"/>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="PaymentOptions">
      <h3>Payment Options</h3>
      <ul class="PaymentOptions__list">
        <li class="PaymentOptions__item" v-for="(option, i) in paymentOptions" :key="i" @click="emitNewPaymentOptionQuery(option)" :class="{ PaymentOptions__selected: option.selected }">{{ option.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import starEmpty from '@/assets/star-empty.png';
import starPlain from '@/assets/star-plain.png';
import index from '@/algolia';
import bus from '@/EventBus';

import { cuisines, paymentOptions } from '@/filters';

export default {
  data() {
    return {
      ratings: [],
      cuisines: this.getSelectableMap(cuisines),
      paymentOptions: this.getSelectableMap(paymentOptions)
    };
  },
  methods: {
    emitNewCuisineQuery: function(cuisine) {
      this.filterOn(cuisine);
      bus.$emit('newCuisineQuery', cuisine.name);
    },
    emitNewRatingQuery: function(rating) {
      this.filterOn(rating);
      bus.$emit('newRatingQuery', rating.starCount);
    },
    emitNewPaymentOptionQuery: function(option) {
      this.filterOn(option);
      bus.$emit('newPaymentOptionQuery', option.name);
    },
    generateRatings: () => {
      const ranges = Array.from({ length: 6 }, (stars, starCount, arr) => {
        stars = new Array(5);
        stars.fill(starEmpty, 0, 6);
        stars.fill(starPlain, 0, starCount);
        return { stars, starCount, selected: false };
      });
      ranges.shift();
      return ranges;
    },
    filterOn: function(item) {
      this.ratings.forEach(item => item.selected = false);
      this.cuisines.forEach(item => item.selected = false);
      this.paymentOptions.forEach(item => item.selected = false);
      item.selected = true;
    },
    getSelectableMap: function(list) {
      return list.map(item => {
        item.selected = false;
        return item;
    });
    }
  },
  mounted() {
    this.ratings = this.generateRatings();
  }
};
</script>

<style lang="scss">
.Sidebar {
  padding: 1em 2em;
  width: 20%;
  min-width: 20%;

  h3 {
    font-weight: 500;
  }
}

.FoodTypes {
  .FoodTypes__list {
    .FoodTypes__item {
      padding: 0 1em;
      border-radius: 5px;
      line-height: 1.7em;
      cursor: pointer;

      &:hover,
      &:active,
      &.FoodTypes__selected {
        background: $sky-blue;
        color: $white;
      }
    }
  }
}

.Ratings {
  .Ratings__ranges {
    margin-left: 1em;

    .Ratings__selected {
      filter: contrast(200%);
    }
  }

  .Ratings__stars {
    display: flex;
    line-height: 1.7em;
    cursor: pointer;

    &:hover {
      filter: contrast(200%);
    }
  }
}

.PaymentOptions {
  .PaymentOptions__list {
    .PaymentOptions__item {
      padding: 0 1em;
      border-radius: 5px;
      line-height: 1.7em;
      cursor: pointer;

      &:hover,
      &:active,
      &.PaymentOptions__selected {
        background: $sky-blue;
        color: $white;
      }
    }
  }
}
</style>
