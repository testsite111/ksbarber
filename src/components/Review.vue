<template>
  <div>
    <div name="fade" class="reviews__review">
      <div class="reviews__img">
        <img
          :src="
              review.user.photo_preview_urls.url
                ? review.user.photo_preview_urls.url
                : require('@/assets/img/unknown.png')
            "
          :alt="review.id"
        />
      </div>
      <div class="reviews__text">
        <div class="reviews__name">
          <h4>{{ review.user.name }}</h4>
          <span class="reviews__rating">
            <img :src="star" :alt="star" v-for="(s, index) in review.rating" :key="index + 1" />
          </span>
        </div>
        <div class="reviews__review">
          <p
            class="review"
            :style="visible ? { height: '3rem' } : { height: 'auto' }"
          >{{ review.text }}</p>
        </div>
        <div>
          <a
            type="button"
            @click="(visible = !visible), (isHidden = true)"
            class="more transition"
            v-if="review.text.length > 241 && !isHidden"
          >Читать целиком</a>
        </div>
        <div class="reviews__date">{{ review.date_created.split("-").reverse().join(".") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import star from "@/assets/img/icons/star.svg";

export default {
  data: () => ({
    visible: true,
    isHidden: false,
    star
  }),
  props: {
    review: {
      type: Object,
      required: true
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
.more {
  @include jcw($j, $c, $w);
  color: #777;
  text-decoration: underline;
  &:hover,
  &:focus {
    color: #fff;
  }
}
.comment {
  height: auto;
  overflow: hidden;
}
.review {
  overflow: hidden;
}
.reviews {
  &__img {
    flex: 0 1 auto;
    text-align: center;
    width: 75px;
    height: 75px;
    margin: 0 1rem 0 0;
    img {
      width: 100%;
      height: auto;
      border-radius: 50%;
    }
  }
  &__review {
    display: flex;
    padding: 0.5rem 0;
    img {
      background: #fff;
      border-radius: 50%;
    }
  }
  &__text {
    img {
      background: none;
    }
  }
  &__text {
    flex: 0 0 90%;
  }
  &__name {
    @include jcw(space-between, $c, $w);
  }
  &__rating {
    img {
      width: 1rem;
    }
  }
  &__date {
    display: flex;
    justify-content: flex-end;
    font-size: 0.7rem;
    margin-top: 0.5rem;
  }
}
.v-application p {
  margin-bottom: 0;
}
@media (max-width: 767px) {
  .reviews__review {
    flex-wrap: wrap;
  }
  .reviews__img {
    margin: 0 auto;
  }
  .reviews__name {
    display: block;
    text-align: center;
  }
  .reviews__date {
    justify-content: center;
  }
}
</style>
