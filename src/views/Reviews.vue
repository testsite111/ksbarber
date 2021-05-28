<template>
  <div class="reviews">
    <h2>Отзывы</h2>
    <div class="reviews__body container">
      <div v-for="review in arrReviews(reviews, count)" :key="review.id">
        <Review :review="review" />
      </div>
      <v-card-actions class="justify-center">
        <v-btn
          color="secondary"
          elevation="24"
          @click="count += 5"
          v-if="typeof reviews !== 'undefined' && count < reviews.length"
        >Показать ещё отзывы</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import Review from "@/components/Review";
import { rs } from "@/store/reviews";
export default {
  data: () => ({
    count: 5,
    reviews: rs
  }),
  components: {
    Review
  },
  methods: {
    arrReviews(arr, length) {
      if (arr && arr.length) {
        if (length == -1) return arr;
        if (length > arr.length) return arr;
        return arr.slice(0, length);
      }
      return null;
    }
  }
};
</script>
<style lang="scss" scoped>
$j: center;
$c: center;
$w: wrap;

@mixin jcw($j, $c, $w) {
  display: flex;
  justify-content: $j;
  align-items: $c;
  flex-wrap: $w;
}
.reviews {
  background: #010101;
  color: #fff;
  padding: 2rem 0;
  h2 {
    margin: 0 0 2rem 0;
  }
  &__body {
    @include jcw($j, $c, $w);
    display: block;
    margin: 0 auto;
  }
}
</style>
