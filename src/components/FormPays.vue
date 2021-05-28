<template>
  <div>
    <div class="pay" v-for="pay in pays" :key="pay.id">
      <div class="popap">
        <div class="popap-bg" @click="$emit('close')"></div>
        <div class="popap-inner">
          <div class="add-order">
            <span class="close" title="Закрыть" @click="$emit('close')"></span>
            <h2>Оплата за обучение</h2>
            <form name="TinkoffPayForm" onsubmit="pay(this); return false;">
              <input class="tinkoffPayRow" type="hidden" name="terminalkey" :value="pay.id_shops" />
              <input class="tinkoffPayRow" type="hidden" name="frame" value="true" />
              <input class="tinkoffPayRow" type="hidden" name="language" value="ru" />
              <input
                class="tinkoffPayRow"
                type="text"
                placeholder="Сумма заказа"
                name="amount"
                required
              />
              <input class="tinkoffPayRow" type="text" placeholder="Номер заказа" name="order" />
              <input
                class="tinkoffPayRow"
                type="text"
                placeholder="Описание заказа"
                name="description"
              />
              <input class="tinkoffPayRow" type="text" placeholder="ФИО плательщика" name="name" />
              <input class="tinkoffPayRow" type="text" placeholder="E-mail" name="email" />
              <input
                class="tinkoffPayRow"
                type="text"
                placeholder="Контактный телефон"
                name="phone"
              />
              <input
                class="tinkoffPayRow"
                type="hidden"
                name="receipt"
                value="{'Email': '','Phone': '',
  'EmailCompany': '','Taxation': 'osn','Items': [ {'Name': 'Наименование товара 1','Price': 10000,'Quantity': 1.00,
  'Amount': 10000,'PaymentMethod': 'full_prepayment','PaymentObject': 'commodity','Tax': 'vat10','Ean13': '0123456789' },
  {'Name': 'Наименование товара 2','Price': 20000,'Quantity': 2.00,'Amount': 40000,'PaymentMethod': 'prepayment',
  'PaymentObject': 'service','Tax': 'vat20'},{'Name': 'Наименование товара 3','Price': 30000,'Quantity': 3.00,'Amount': 90000,
  'Tax': 'vat10'}]}"
              />
              <input class="tinkoffPayRow" type="submit" value="Оплатить" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/main";
export default {
  data: () => ({
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
.tinkoffPayRow {
  border: 1px solid #eee;
  padding: 0.5rem 2rem;
  width: 100%;
  margin: 0.5rem 0;
}
h2,
input[type="submit"] {
  background: #ffdc30;
}
input[type="submit"]:hover,
input[type="submit"]:focus {
  background: #101010;
  color: #fff;
  transition: all ease 0.5s;
}
h2 {
  color: #101010;
  text-align: center;
}
</style>