<template>
  <div>
    <div class="popap">
      <div class="popap-bg" @click="$emit('close')"></div>
      <div class="popap-inner">
        <div class="add-order">
          <span class="close" title="Закрыть" @click="$emit('close')"></span>
          <h2>Обратный звонок</h2>
          <BackCall />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BackCall from "@/components/BackCall";
export default {
  name: "App",
  components: {
    BackCall
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
h2 {
  text-align: center;
  background: linear-gradient(#8c732e, #eac251);
}
</style>