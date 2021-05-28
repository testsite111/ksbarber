<template>
  <div>
    <div class="popap">
      <div class="popap-bg" @click="$emit('close')"></div>
      <div class="popap-inner">
        <div class="add-order">
          <span class="close" title="Закрыть" @click="$emit('close')"></span>
          <h2>Заявка на обучение</h2>
          <Form />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Form from "@/components/Form";
export default {
  components: {
    Form
  }
};
</script>
<style lang="scss" scoped>
h2 {
  color: #101010;
  text-align: center;
}
</style>