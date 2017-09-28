<template>
  <div class="Result">
    <img class="Result__img" :src="result.image_url">
    <div class="Result__info">
      <h3 class="Result__name">{{ result.name }}</h3>
      <p class="Result__quality">
        <span class="Result__stars__count">{{ result.stars_count.toFixed(1) }}</span>
        <ul class="Result__stars">
          <li v-for="(star, i) in stars" :key="i">
            <img :src="star" width="16" height="16">
          </li>
        </ul>
        <span>({{ result.reviews_count }} reviews)</span>
      </p>
      <p class="Result__details">
        <span>{{ result.food_type }} | </span>
        <span>{{ result.neighborhood }} | </span>
        <span>{{ result.price_range }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import starEmpty from '@/assets/star-empty.png';
import starPlain from '@/assets/star-plain.png';

export default {
  props: ['result'],
  data() {
    return {
      stars: []
    };
  },
  methods: {
    fillStars: function() {
      this.stars = Array(5);
      this.stars.fill(starEmpty);
      this.stars.fill(starPlain, 0, this.result.stars_count);
    }
  },
  watch: {
    result: function(newResult) {
      this.fillStars();
    }
  },
  mounted() {
    this.fillStars();
  }
}
</script>

<style lang="scss" scoped>
.Result {
  display: flex;
  margin: 1em 0;


  .Result__img {
    width: 100px;
    height: 100px;
    margin-right: 1em;
    border-radius: 5px;
  }

  .Result__info {
    display: flex;
    flex-direction: column;
    font-weight: 500;

    .Result__quality {
      display: flex;
      align-items: baseline;
      justify-content: flex-start;

      .Result__stars {
        display: flex;
        margin: .5em 1em;
      }

      .Result__stars__count {
        color: $orange;
      }
    }

    .Result__details,
    .Result__quality {
      color: $grey;
    }
  }
}
</style>
