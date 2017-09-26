<template>
  <div class="Sidebar">
    <div class="FoodTypes">
      <h3>Cuisine/Food Type</h3>
      <ul class="FoodTypes__list">
        <li class="FoodTypes__item" v-for="(cuisine, i) in cuisines" :key="i" @click="emitNewQuery(cuisine.name)">
          <span>{{ cuisine.name }}</span>
          <span class="FoodTypes__item__count">{{ cuisine.count }}</span>
        </li>
      </ul>
    </div>
    <div class="Ratings">
      <h3>Rating</h3>
      <ul class="Ratings__ranges">
        <li v-for="(rating, i) in ratings" :key="i">
          <ul class="Ratings__stars">
            <li v-for="(star, j) in rating" :key="j">
              <img :src="star" width="16" height="16"/>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="PaymentOptions">
      <h3>Payment Options</h3>
      <ul class="PaymentOptions__choices">
        <li v-for="(option, j) in paymentOptions" :key="k">{{ option }}</li>
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
      cuisines,
      paymentOptions,
    };
  },
  methods: {
    emitNewQuery: (cuisine) => {
      bus.$emit('newQuery', cuisine);
    },
    generateRatings: () => {
      return Array.from({ length: 6 }, (value, k, arr) => {
        value = new Array(5);
        value.fill(starEmpty, 0, 6);
        value.fill(starPlain, 0, k);
        return value;
      });
    }
  },
  mounted() {
    this.ratings = this.generateRatings();
  }
};
</script>

<style lang="scss" scoped>
.Sidebar {
  padding: 1em 2em;
  width: 18%;

  h3 {
    font-weight: 500;
  }
}

.FoodTypes {
  .FoodTypes__list {
    .FoodTypes__item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 1em;
      border-radius: 5px;
      cursor: pointer;

      .FoodTypes__item__count {
        color: $grey;
      }

      &:hover,
      &:active {
        background: $sky-blue;
        color: $white;

        .FoodTypes__item__count {
          color: $white;
        }
      }
    }
  }
}

.Ratings {
  .Ratings__ranges {
    margin-left: 1em;
  }

  .Ratings__stars {
    display: flex;
  }
}

.PaymentOptions {
  .PaymentOptions__choices {
    margin-left: 1em;
  }
}
</style>
