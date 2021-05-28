<template>
  <div class="contacts">
    <div v-for="contact in contacts" :key="contact.id">
      <h2>{{ contact.title }}</h2>
      <div class="contacts__body container">
        <div class="contacts__info">
          <ul>
            <li>Адрес: {{ contact.address }}</li>
            <li>
              Телефон:
              <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
            </li>
            <li>Режим работы: {{ contact.mode }}</li>
          </ul>
          <div class="contacts__socials">
            <Socials />
          </div>
          <h3>{{ contact.feedback }}</h3>
          <Form />
        </div>
        <div class="contacts__maps">
          <Maps />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Form from "@/components/Form";
import Maps from "@/components/Maps";
import Socials from "@/components/Socials";
import { db } from "@/main";
export default {
  components: {
    Form,
    Maps,
    Socials
  },
  data: () => ({
    contacts: []
  }),
  mounted() {
    db.collection("contacts").onSnapshot(snapshot => {
      this.contacts = [];
      snapshot.forEach(doc => {
        this.contacts.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.socials {
  display: flex;
  justify-content: center;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 4rem;
  flex: 0 0 4rem;
}
.social {
  margin: 0 0.5rem;
}
.v-application a {
  color: #010101;
}
.contacts {
  background: #eac251;
  padding: 2rem 0;
  h2 {
    margin: 0 0 2rem 0;
  }
}
.contacts__body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: flex-start;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
}
.contacts__body div {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}
.contacts__info h3 {
  text-align: center;
  margin-top: 2rem;
}
.contacts__info ul li {
  line-height: 3;
  font-size: 1.25rem;
}
.contacts__maps {
  overflow: hidden;
  width: 50%;
}
.contacts__maps div {
  position: relative;
  overflow: hidden;
}
.contacts__maps div a {
  color: #eee;
  font-size: 12px;
  position: absolute;
}
.contacts__maps div a:first-of-type {
  top: 0;
}
.contacts__maps div a:last-of-type {
  top: 14px;
}
.contacts__socials {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 1rem -0.5rem;
}
@media (max-width: 1200px) {
  .contacts__body {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .contacts__maps {
    width: 100%;
  }
}
</style>
