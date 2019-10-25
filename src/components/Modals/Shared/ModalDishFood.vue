<template>
  <q-card class="full-width full-height">  
    <form @submit.prevent="handleContain()">
      <q-card-section class="q-pa-md">
        <div class="row">
          <search />

          <q-btn 
            flat
            dense
            v-close-popup 
            icon="highlight_off"
            size="17px"
            @click="$emit('close'), clearSearch()"
          />
        </div>

        <q-item
          v-for="dishFood in foodQuantity"
          :key="dishFood.id"
          v-show="search && foodQuantityFilter(dishFood.name)"
        >
          <q-input
            dense
            :label="dishFood.name+'(幾百克)'"
            v-model="dishFood.quantity"
            type="text"
            @input="dishFood.quantity = handleFoodQuantityType(dishFood.quantity)"
            style="max-width: 150px"
          >
            <template v-slot:append>
              <q-icon 
                name="close" 
                @click="dishFood.quantity = 0" 
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
import { fourPoint } from 'src/functions/four-point'

export default {
  props: ['containToSubmit'],
  data() {
    return {
      newFood: true,
      foodQuantity: [
        // {
        //   food: '',
        //   quantity: ''
        // }
      ]
    }
  },
  computed: {
    ...mapState('index', ['search']),
    ...mapGetters('index', ['food'])
  },
  methods: {
    ...mapActions('index',['clearSearch', 'setSearchType']),
    handleFoodQuantityType(value) {
      return fourPoint(value)
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
          this.containToSubmit.push({
            food: this.foodQuantity[i].food,
            quantity: this.foodQuantity[i].quantity
          })
        }
        this.newFood = true
      }
      this.clearSearch()
      this.setSearchType('dishAdd')
      this.$emit('showDishFood')
    },
    foodQuantityFilter(name) {
      if (name.includes(this.search)) {
        return true   
      }
      else return false
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
          name: this.food[i].name,
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