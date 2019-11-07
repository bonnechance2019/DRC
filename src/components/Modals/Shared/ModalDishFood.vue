<template>
  <q-card class="full-width full-height bg-lime-2">  
    <form @submit.prevent="handleContain()">
      <q-card-section class="row q-pa-md">     
        <search />

        <q-btn 
          flat
          dense
          v-close-popup 
          color="negative"
          icon="highlight_off"
          size="19px"
          @click="$emit('close'), clearSearch()"
        />
      </q-card-section>

      <q-card-section>
        <q-item
          v-for="dishFood in foodQuantity"
          :key="dishFood.id"
          v-show="search && foodQuantityFilter(dishFood.name)"
        >
          <q-input
            dense
            label="(幾百克)"
            v-model="dishFood.quantity"
            type="text"
            @input="dishFood.quantity = handleFoodQuantityType(dishFood.quantity)"
          >
            <template v-slot:before>
              <q-tooltip>{{ dishFood.description }}</q-tooltip>
              <div style="font-size:20px" class="text-primary">
                {{ dishFood.name }}
              </div>
            </template>

            <template v-slot:append>
              <q-icon 
                v-show="dishFood.quantity"
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
          description: this.food[i].description,
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

<style lang="sass">
.q-item
  .q-field
    .q-field__inner
      width: 100px 
</style>