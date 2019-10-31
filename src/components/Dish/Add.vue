<template>
  <q-card 
    class="my-card text-white full-width"
    style="background: #F8F8FF"  
  >
    <q-card-section class="text-right">
      <q-btn 
        flat
        dense 
        color="negative"
        icon="highlight_off"
        size="19px"
        @click="$emit('close'), setSearchType('dish')"
      />
    </q-card-section>

    <q-card-section class="row" style="padding-left: 130px">
      <div class="q-pt-md">
        <modal-dish-name 
          :name.sync="dishToSubmit.name"
          ref="modalDishName" />

        <q-btn
          label="組成食材"
          icon="library_add"
          outline
          :color="containError ? 'negative' : 'primary'"
          type="submit"
          size="16px"
          @click="showDishFood=true, setSearchType('')"
        />
      </div>

      <q-dialog v-model="showDishFood" :cancel="true" :persistent="true">
        <modal-dish-food 
          :containToSubmit="containToSubmit"
          ref="modalDishFood"
          @showDishFood="showDishFood=false"
          @close="containToSubmit? setSearchType('dishAdd'):'' "
        />
      </q-dialog>
      
      <modal-photo 
        class="q-pt-md"
        style="width:310px"
        ref="modalPhoto"
        :label="label"
      />	
    </q-card-section>

    <q-card-section>
      <modal-dish-recipe 
        style="padding-left: 100px"
        ref="modalDishRecipe"
        :recipe.sync="recipeToSubmit.text"/>	
    </q-card-section>

      <q-card-section class="q-pl-md" style="padding-left: 133px">
        <modal-dish-restaurant 
          style="max-width: 300px;"
          :restaurant_id.sync="dishToSubmit.restaurant_id"
          @newRestaurant="newRestaurant=true"
          ref="modalDishRestaurant" />
      </q-card-section>

    <div class="col q-pa-md" >
      <food-table
        v-if="!showDishFood && containToSubmit.length"
        :containToSubmit="containToSubmit"
        :dishToSubmit="dishToSubmit" />
    </div>

    <form @submit.prevent="submitForm"> 
      <modal-buttons :label="label.save" />
    </form>
  </q-card>
    
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import mixinAddEditDish from 'src/mixins/mixin-add-edit-dish'
import { getFood } from 'src/functions/get-food'

export default {
  mixins: [mixinAddEditDish],
  data() {
    return {
      newRestaurant: false,
      label: {
        type: 'dishs',
        title: "料理的照片",
        save: "Save",
        cancel: "back"
      },
      showDishFood: false,
      containError: false,
      dishToSubmit: {
        name:'',
        restaurant_id: '',
        dish_photo: '',
        calories: '',
        fat: '',
        protein: '',
        carbs: '',
        grains: '',
        fruits: '',
        vegetables: '',
        oils: '',
        dairy_all: 0,
        dairy_low: 0,
        dairy_de: 0,
        meat_low: 0,
        meat_med: 0,
        meat_high: 0,
        meat_max: 0,
        dietary_fiber: '',
        total_sugar: '',
        sodium: '',
        potassium: '',
        calcium: '',
        magnesium: '',
        iron: '',
        zinc: '',
        phosphorus: '',
        vitaminA: '',
        vision_alcohol: '',
        vitaminE: '',
        vitaminB1: '',
        vitaminB2: '',
        vitaminB6: '',
        vitaminB12: '',
        vitaminC: '',
        nicotin: '',
        folic_acid: '',
        fatty_acidS: '',
        fatty_acidM: '',
        fatty_acidP: '',
        cholesterol: '',
      },
      containToSubmit: [],
      recipeToSubmit: {
        // id: '',
        dish: '',
        photo: '',
        text: '',
      },
      foodList: []
    }
  },
  computed: {
    ...mapState('index', ['dish', 'dish_id', 'dish_photo', 'recipe_photo']),
    ...mapGetters('index', ['food'])
  },
	methods: {
    ...mapActions('index', ['clear', 'addDish', 'addContain', 'addRecipe', 'setSearchType', 'setSearch', 'addRestaurant']),
		submitDish() {
      this.foodList = getFood(this.containToSubmit, this.food)
      Object.keys(this.dishToSubmit).forEach(key => {
        if (key != 'name' && key != 'restaurant_id' && key != 'dish_photo' && key != 'id') {
          this.dishToSubmit[key] = this.foodList[this.foodList.length-1][key]
        }
      })

      this.dishToSubmit.dish_photo = this.dish_photo
      this.recipeToSubmit.photo = this.recipe_photo

      this.addDish(this.dishToSubmit)

      if (this.newRestaurant) {
        this.addRestaurant(this.dishToSubmit.restaurant_id)
      }

      for (let i = 0; i < this.containToSubmit.length; i++) {
        this.containToSubmit[i].dish = this.dish_id
      }
      this.addContain(this.containToSubmit)

      if (this.recipeToSubmit.text) {
        this.recipeToSubmit.dish = this.dish_id
        this.addRecipe(this.recipeToSubmit)
      }

      this.clear()
      this.setSearchType('dish')
      this.setSearch(this.dishToSubmit.name)

      this.$emit('close')
    }
  },
  watch: {
    containToSubmit(newValue, oldValue) {
      if (newValue) {
        this.containError = false
      }
    }
  }
}
</script>

<style>

</style>