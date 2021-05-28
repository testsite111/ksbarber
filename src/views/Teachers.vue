<template>
  <div class="teachers">
    <h2>Наши преподаватели</h2>
    <div class="teachers__body container">
      <div class="teachers__teacher" v-for="teacher in teachers" :key="teacher.id">
        <div class="teachers__img">
          <img :src="teacher.photo" :alt="teacher.photo" />
        </div>
        <div class="teachers__name">
          <h4>{{teacher.name}}</h4>
          <p>{{teacher.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/main";
export default {
  data: () => ({
    teachers: []
  }),
  mounted() {
    db.collection("teachers").onSnapshot(snapshot => {
      this.teachers = [];
      snapshot.forEach(doc => {
        this.teachers.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.teachers {
  padding-bottom: 2rem;
}
.teachers__body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.teachers__teacher {
  flex: 0 0 20%;
  padding: 0 1rem;
  text-align: center;
}
.teachers__img {
  width: 200px;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 50%;
  margin: 0 auto;
}
.teachers__teacher img {
  background: #eee;
  width: 100%;
  height: auto;
}
.teachers__teacher h4 {
  margin-top: 1rem;
}
@media (max-width: 767px) {
  .reviews__review {
    display: block;
  }
  .reviews__text {
    margin-top: 1rem;
  }
  .reviews__name {
    display: block;
  }
  .teachers__name {
    margin-bottom: 2rem;
  }
  .contacts__maps {
    height: 250px;
  }
}
</style>