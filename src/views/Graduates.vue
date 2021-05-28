<template>
  <div class="graduates">
    <div v-for="ts in title_students" :key="ts.id">
      <h2>{{ts.title}}</h2>
      <div class="graduates__body container">
        <div class="graduates__graduate" v-for="student in students" :key="student.id">
          <div class="graduates__block">
            <img :src="student.photo" :alt="student.photo" />
          </div>
          <h4>{{student.name}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/main";
export default {
  data: () => ({
    title_students: [],
    students: []
  }),
  mounted() {
    db.collection("title_students").onSnapshot(snapshot => {
      this.title_students = [];
      snapshot.forEach(doc => {
        this.title_students.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
    db.collection("students").onSnapshot(snapshot => {
      this.students = [];
      snapshot.forEach(doc => {
        this.students.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
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

.graduates {
  background: #eac251;
  padding: 2rem 0;
  &__body {
    @include jcw(space-evenly, $c, $w);
  }
  &__graduate {
    text-align: center;
    padding: 1rem 0;
    h4 {
      margin-top: 1rem;
    }
  }
  &__block {
    text-align: center;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>