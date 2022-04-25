<script setup lang="ts">
// @ts-ignore
import HelloWorld from './components/HelloWorld.vue'
import { useBankAccountStore } from "./stores/bankAccount"

const store = useBankAccountStore();

store.$onAction(({ name, store, after }) => {
  after(result => {
    if (result && name === "charge") {
      store.processTransaction(result)
    }
  })
})
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Bank of Pinia" />
      <h3>Balance: ${{ store.runningBalance }} | Pending: ${{ store.pendingAmount }}</h3>
    
      <button @click="store.charge(5)">Buy Coffe $5</button>

      <h4>Pending:</h4>
      <ul>
        <li v-for="item in store.pendingTransactions" :key="item.id">
          ${{ item.amount }}
        </li>
      </ul>

      <h4>Processed:</h4>
      <ul>
        <li v-for="item in store.processedTransactions" :key="item.id">
          ${{ item.amount }}
        </li>
      </ul>
    </div>
  </header>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  /* background-color: aqua; */
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

h3 {
  text-align: center;
}

button {
  margin: 0 auto;
  display: block;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

}
</style>
