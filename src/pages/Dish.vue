<template>
  <q-page 
    class="q-pa-md absolute full-width column"
    style="background: radial-gradient(circle, #FFFFFF 0%, #708090 80%)"  
  >
    <div class="q-pa-md">
      <q-btn
        color="blue-5"
        icon="arrow_back"
        to="/"
      />
    </div>
    <q-card 
      class="my-card text-white full-width"
      style="background: #F8F8FF"  
    >
      <q-card-section class="row" style="padding-left: 150px">
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
        
        <div class="q-pt-md">
          <modal-photo 
            class="q-pa-md"
            style="padding-left: 100px" 
            ref="modalPhoto"
            :label="label"
          />	
        </div>
      </q-card-section>

      <q-card-section>
        <modal-dish-recipe 
          style="padding-left: 115px"
          ref="modalDishRecipe"
          :recipe.sync="recipeToSubmit"/>	
      </q-card-section>

        <q-card-section class="q-pl-md" style="padding-left: 145px">
          <modal-dish-restaurant 
            style="max-width: 300px;"
            :restaurant_id.sync="dishToSubmit.restaurant_id"
            @oldRestaurant="newRestaurant=false"
            ref="modalDishRestaurant" />
        </q-card-section>

      <div class="col q-pa-md" >
        <food-table
          v-if="!showDishFood && containToSubmit.length"
          :containToSubmit="containToSubmit"
          :dishToSubmit="dishToSubmit" />
      </div>
    </q-card>
    
    <form @submit.prevent="submitForm"> 
      <modal-buttons :label="label.save" />
    </form>

    <!-- <q-btn @click="test()" /> -->
    <!-- <pre>{{ dishToSubmit }}</pre> -->
    <!-- Check the value when it change -->
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mixinAddEditDish from 'src/mixins/mixin-add-edit-dish'

export default {
  mixins: [mixinAddEditDish],
  data() {
    return {
      newRestaurant: true,
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
      }
    }
  },
  computed: {
    ...mapState('index', ['dish', 'dish_id', 'dish_photo', 'recipe_photo'])
  },
	methods: {
    ...mapActions('index', ['addDish', 'addContain', 'addRecipe', 'setSearchType', 'setSearch', 'addRestaurant']),
		submitDish() {
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

      this.setSearchType('dish')
      this.setSearch(this.dishToSubmit.name)

      this.$router.push('/')
    }
  },
  watch: {
    containToSubmit(newValue, oldValue) {
      if (newValue) {
        this.containError = false
      }
    }
  },
  components: {
    'food-table': require('src/components/Tools/FoodTable.vue').default
  }
}
</script>

<style>

</style>