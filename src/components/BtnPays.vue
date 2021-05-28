<template>
  <div>
    <div class="btn btn-pays" v-for="pay in pays" :key="pay.id">
      <button class="transition" @click="show = !show">{{ pay.btn }}</button>
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
.btn-pays {
  width: 50%;
  margin: 2rem auto 0;
  button {
    background: linear-gradient(#ffbb00, #ffdc30);
    border-bottom: 5px solid #ffbb00;
  }
}
@media (max-width: 767px) {
  .btn-pays {
    width: 100%;
    padding: 0 1rem;
  }
}
</style>