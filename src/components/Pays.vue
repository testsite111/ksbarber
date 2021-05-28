<template>
  <div class="pays">
    <div v-for="pay in pays" :key="pay.id" class="pay">
      <button @click="show = !show">
        <img :src="pay.img" :alt="pay.img" title="Оплата за обучение" />
      </button>
    </div>
    <transition name="fade">
      <FormPays v-if="show" @close="show = false" />
    </transition>
  </div>
</template>

<script>
import FormPays from "@/components/FormPays";
import { db } from "@/main";
export default {
  components: {
    FormPays
  },
  data: () => ({
    show: false,
    pays: []
  }),
  mounted() {
    db.collection("pays").onSnapshot(snapshot => {
      this.pays = [];
      snapshot.forEach(doc => {
        this.pays.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.pay {
  width: 4rem;
  height: 4rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.pay img:hover,
.pay img:focus {
  box-shadow: 0 0 10px 5px #ffdc30;
  border-radius: 50%;
  -webkit-transition: 0.15s ease-out 0.15s;
  -o-transition: 0.15s ease-out 0.15s;
  transition: 0.15s ease-out 0.15s;
}
</style>