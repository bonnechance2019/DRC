<template>
  <q-card 
    class="my-card text-white full-width"
    style="background: #F8F8FF"  
  >
    <q-card-section class="text-right">
      <span 
        class="text-primary" 
        style="padding-right:70px"
      >新增料理（照片選取好後，記得先點擊上傳）。</span>

      <q-btn 
        flat
        dense 
        color="negative"
        icon="highlight_off"
        size="19px"
        @click="$emit('close'), setSearchType('dish')"
      />
    </q-card-section>

    <q-card-section class="row" style="padding-left:60px">
      <modal-dish-name 
        :name.sync="dishToSubmit.name"
        ref="modalDishName" />

      <div class="row" style="margin-top:10px">
        <modal-photo 
          ref="modalPhoto"
          :label="label"
        />

        <div class="col" style="margin-left:22px">
          <q-btn
            label="組成食材"
            icon="library_add"
            outline
            :color="containError ? 'negative' : 'primary'"
            style="height:50px"
            type="submit"
            @click="showDishFood=true, setSearchType('')"
          />

          <modal-dish-person 
            ref="modalDishPerson"
            :person.sync="dishToSubmit.person"
          />
        </div>
      </div>
      
      <q-dialog v-model="showDishFood" :cancel="true" :persistent="true">
        <modal-dish-food 
          :containToSubmit="containToSubmit"
          ref="modalDishFood"
          @showDishFood="showDishFood=false"
          @close="containToSubmit? setSearchType('dishAdd'):'' "
        />
      </q-dialog>
    </q-card-section>

    <q-card-section style="margin-left:44px;margin-top:30px">
      <modal-dish-restaurant 
        :restaurant_id.sync="dishToSubmit.restaurant_id"
        @newRestaurant="newRestaurant=true"
        ref="modalDishRestaurant" />
    </q-card-section>

    <q-card-section>
      <modal-dish-recipe 
        ref="modalDishRecipe"
        :recipe.sync="recipeToSubmit.text"/>	
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

    <!-- <pre class="text-black">{{dishToSubmit.person}}</pre> -->
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
        person: '',
        number: '',
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
      foodList: [],
      track: {
        whom: '',
        what: ''
      }
    }
  },
  computed: {
    ...mapState('index', ['dish', 'dish_id', 'dish_photo', 'recipe_photo']),
    ...mapGetters('index', ['food'])
  },
	methods: {
    ...mapActions('index', ['clear', 'addDish', 'addContain', 'addRecipe', 'setSearchType', 'setSearch', 'addRestaurant']),
    ...mapActions('track', ['addTrack']),
		submitDish() {
      //  將營養素總和放入dish的營養素
      this.foodList = getFood(this.containToSubmit, this.food)
      Object.keys(this.dishToSubmit).forEach(key => {
        if (key != 'name' && key != 'restaurant_id' && key != 'dish_photo' && key != 'id' && key != 'number' && key != 'person') {
          this.dishToSubmit[key] = this.foodList[this.foodList.length-1][key]
        }
      })

      //  儲存照片網址（沒有則存‘無’）
      this.dishToSubmit.dish_photo = this.dish_photo
      this.recipeToSubmit.photo = this.recipe_photo

      //  新增dish
      this.addDish(this.dishToSubmit)

      //  如果餐廳是新的則新增餐廳
      if (this.newRestaurant) {
        this.addRestaurant(this.dishToSubmit.restaurant_id)
      }

      //  新增包含dish的contain
      for (let i = 0; i < this.containToSubmit.length; i++) {
        this.containToSubmit[i].dish = this.dish_id
      }
      this.addContain(this.containToSubmit)

      //  如果有食譜則新增食譜
      if (this.recipeToSubmit.text) {
        this.recipeToSubmit.dish = this.dish_id
        this.addRecipe(this.recipeToSubmit)
      }

      this.track.whom = this.dishToSubmit.name
      this.track.what = 'add_dish'
      this.addTrack(this.track)

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