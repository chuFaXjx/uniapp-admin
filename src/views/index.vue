<template>
    <div>
      <div style="background-color:  white; height: 100px;width:100%; position: relative; left: -20px; top: -10px;">
        <NumberGrow :value="13529"></NumberGrow>
        <NumGroup :value="22213"  />
        <ShoppingNum :value="14590" />
        <DayNum :value="351200" />
      </div>
      <div>
        <NavItem />
      </div>
        <IndexC></IndexC>
    </div>
</template>

<script setup>
import NumberGrow from '../components/NumberGrow.vue'
import NumGroup from "../components/NumGroup.vue"
import IndexC from '../components/IndexC.vue'
import { useStore } from 'vuex';
import {reactive} from 'vue';
import ShoppingNum from '../components/ShoppingNum.vue';
import DayNum from '../components/DayNum.vue';
import NavItem from '@/components/NavItem.vue';
let store = useStore()
let specs = reactive({
  size:10,
  page:1,
})
let Goods = reactive({
  size:500,
  page:1,
})
store.dispatch("CateListSet");
store.dispatch("setSpecsList",specs)
store.dispatch("setGoodsList",Goods)
</script>

<style lang="scss" scoped>

</style>
