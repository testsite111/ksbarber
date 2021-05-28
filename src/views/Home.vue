<template>
  <div>
    <Main />
    <Training />
    <Graduates />
    <Reviews />
    <Teachers />
    <Contacts />
    <div class="block-right">
      <Socials />
      <Pays />
    </div>
  </div>
</template>

<script>
import Main from "../views/Main";
import Training from "../views/Training";
import Graduates from "../views/Graduates";
import Reviews from "../views/Reviews";
import Teachers from "../views/Teachers";
import Contacts from "../views/Сontacts";
import Socials from "@/components/Socials";
import Pays from "@/components/Pays";

export default {
  name: "Home",
  components: {
    Main,
    Training,
    Graduates,
    Reviews,
    Teachers,
    Contacts,
    Socials,
    Pays
  }
};
</script>
<style lang="scss" scoped>
.block-right {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1;
}
.socials {
  display: flex;
  flex-flow: column-reverse;
}
</style>