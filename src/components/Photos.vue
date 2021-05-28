<template>
  <div>
    <Photo v-for="slide in slide_data" :key="slide.id" :photo_data="slide" />
  </div>
</template>

<script>
import Photo from "@/components/Photo";
export default {
  components: {
    Photo
  },
  props: {
    slide_data: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
</style>