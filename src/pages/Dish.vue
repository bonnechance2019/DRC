<template>
  <q-page class="q-pa-md absolute full-width column">
    <div class="q-pl-md">
      <q-btn
        outline
        color="blue-5"
        icon="arrow_back"
        to="/"
      />
    </div>

    <div class="row">
      <div class="q-pa-md">
        <modal-dish-name 
          :name.sync="dishToSubmit.name"
          ref="modalDishName" />

        <q-btn
          label="食材"
          :color="containError ? 'negative' : 'primary'"
          type="submit"
          @click="showDishFood=true, setSearchType('')"
        />
      </div>

      <q-dialog v-model="showDishFood">
        <modal-dish-food 
          :containToSubmit="containToSubmit"
          ref="modalDishFood"
          @close="showDishFood=false"/>
      </q-dialog>
      
      <div class="q-pt-md">
        <modal-photo 
          class="q-pa-md" 
          ref="modalPhoto"
          :url="dishToSubmit.dish_photo"
          :label="label" />	
      </div>
    </div>

    <modal-dish-recipe 
      class="q-pt-md"
      ref="modalDishRecipe"
      :recipe.sync="recipeToSubmit"/>	

    <div class="q-pl-md">
      <modal-dish-restaurant 
        style="max-width: 300px;"
        :restaurant_id.sync="dishToSubmit.restaurant_id"
        ref="modalDishRestaurant" />
    </div>

    <div class="col q-pa-md" >
      <food-table
        v-if="!showDishFood && containToSubmit.length"
        :containToSubmit="containToSubmit"
        :dishToSubmit="dishToSubmit" />

     
      <form @submit="submitForm"> 
        <modal-buttons :label="label.save" />
      </form>
    </div>

    
    <!-- <pre>{{ recipeToSubmit }}</pre> -->
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
      label: {
        name: 'dish',
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
        dairy: '',
        meat_and_beans: '',
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
        last_editor: '',
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
    ...mapState('index', ['dish'])
  },
	methods: {
		...mapActions('index', ['addDish', 'addContain', 'addRecipe', 'setSearchType', 'setSearch']),
		submitDish() {
      this.addDish(this.dishToSubmit)

      for (let i = 0; i < this.containToSubmit.length; i++) {
        this.containToSubmit[i].dish = this.dish[this.dish.length-1].id
      }
      this.addContain(this.containToSubmit)

      this.recipeToSubmit.dish = this.dish[this.dish.length-1].id
      this.addRecipe(this.recipeToSubmit)

      this.$refs.modalDishRecipe.$refs.modalPhoto.$refs.upload.upload
      this.$refs.modalPhoto.$refs.upload.upload

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