<template>
  <q-card class="full-width full-height">  
    <form @submit.prevent="handleContain()">
      <q-card-section class="q-pa-md">
        <div class="row">
          <search/>

          <q-btn 
            flat
            dense
            v-close-popup 
            icon="highlight_off"
            size="17px"
          />
        </div>

        <q-item
          v-show="search"
          v-for="dishFood in food"
          :key="dishFood.id"
        >
          {{ dishFood.name }}
          <q-input
            dense
            label="幾克（升）"
            v-model="foodQuantity[dishFood.id-1].quantity"
            type="text"
            @input="foodQuantity[dishFood.id-1].quantity = handleFoodQuantityType(foodQuantity[dishFood.id-1].quantity)"
            style="max-width: 100px"
          >
            <template v-slot:append>
              <q-icon 
                name="close" 
                @click="foodQuantity[dishFood.id-1].quantity = 0" 
                class="cursor-pointer" 
              /> 
            </template>
          </q-input>
        </q-item>
      </q-card-section>
   
      <q-card-section class="absolute-bottom">
        <modal-buttons :icon="'add'" />
      </q-card-section>
    </form>
  </q-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: ['containToSubmit'],
  data() {
    return {
      newFood: true,
      foodQuantity: []
    }
  },
  computed: {
    ...mapState('index', ['search', 'containTemp']),
    ...mapGetters('index', ['food']),
  },
  methods: {
    ...mapActions('index',['clearSearch', 'setSearchType']),
    handleFoodQuantityType(value) {
      value = value.replace(/[^\d.]/g, '') //清除 ”數字“ ”.“ 以外的字符
      value = value.replace(/\.{2,}/g, '.') //保留第一個 "." ，清除其他的
      value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
      value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3') //只能輸入四個小數
      if (value.indexOf('.') < 0 && value != '') { //如果沒有小數點，首位不能為0。ex:01, 02
          value = parseFloat(value)
      }
      return value
    },
    handleContain() {
      for (let i = 0; i < this.foodQuantity.length; i++) {
        for (let j = 0; j < this.containToSubmit.length; j++) {
          if (this.containToSubmit[j].food == this.foodQuantity[i].food) {
            this.newFood = false
            if (this.foodQuantity[i].quantity <= 0) {
              this.containToSubmit.splice(j, 1)
            }
            else {
              this.containToSubmit[j].quantity = this.foodQuantity[i].quantity
            }
          }
        }
        if (this.newFood && this.foodQuantity[i].quantity > 0) {
          this.containToSubmit.push(this.foodQuantity[i])
        }
        this.newFood = true
      }
      this.clearSearch()
      this.setSearchType('dishAdd')
      this.$emit('close')
    }
  },
  components: {
    'search': require('components/Tools/Search.vue').default,
    'modal-buttons': require('./ModalButtons.vue').default
  },
  created() {
    foodQuantityLength: {
      for (let i = 0; i < this.food.length; i++) {
        this.foodQuantity.push({
          food: this.food[i].id,
          quantity: 0
        })
      }
      if (this.containToSubmit.length) {
        for (let j = 0; j < this.containToSubmit.length; j++) {
          for (let i = 0; i < this.foodQuantity.length; i++) {
            if (this.containToSubmit[j].food == this.foodQuantity[i].food) {
              this.foodQuantity[i].quantity = this.containToSubmit[j].quantity
              i = this.foodQuantity.lenght
            }
          }
        }
      }
    } 
  },
}
</script>

<style>

</style>