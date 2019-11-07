<template>
  <q-card class="my-card full-width" style="background: #F8F8FF">
    <q-card-section class="text-right">
      <q-icon 
        name="notification_important"
        class="text-negative "
        style="font-size:30px"
      />
      <span 
        class="text-negative" 
        style="padding-right:100px"
      >如果沒有要更改照片，則不須上傳</span>

      <q-btn 
        flat
        dense 
        color="negative"
        icon="highlight_off"
        size="19px"
        @click="$emit('close')"
      />
    </q-card-section>

    <q-card-section class="row" style="padding-left:60px">
        <modal-dish-name 
          :name.sync="dishToSubmit.name"
          ref="modalDishName" 
        />

        <div class="row" style="margin-top:10px">
          <!-- 舊圖會存在 -->
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
              type="submit"
              @click="showDishFood=true, setSearchType(''), clearSearch()"
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
        :recipe.sync="recipeToSubmit.text"
      />
    </q-card-section>

    <div class="col q-pa-md" >
      <food-table
        v-if="!showDishFood"
        :containToSubmit="containToSubmit"
        :dishToSubmit="dishToSubmit" />
    </div>
    
    <form @submit.prevent="submitForm"> 
      <modal-buttons :label="label.save" />
    </form>

    <!-- <q-btn @click="test()" /> -->
    <!-- <pre>{{ dishToSubmit }}</pre> -->
    <!-- Check the value when it change -->
  </q-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import mixinAddEditDish from 'src/mixins/mixin-add-edit-dish'
import { getFood } from 'src/functions/get-food'

export default {
  mixins: [mixinAddEditDish],
  props: ['dish'],
  data() {
    return {
      newRestaurant: false,
      label: {
        type: 'dishs',
        title: "料理的照片",
        save: 'save'
      },
      showDishFood: false,
      containError: false,
      dishToSubmit: {},
      containToSubmit: [],
      recipeToSubmit: '',
      foodList: [],
      track: {
        whom: '',
        what: ''
      }
    }
  },
  computed: {
    ...mapState('index', ['select', 'dish_photo', 'recipe_photo']),
    ...mapGetters('index', ['recipe', 'food', 'contain'])
  },
  methods: {
    ...mapActions('index', ['clear', 'setSearch', 'setSearchType', 'setSelect', 'clearSearch', 'updateDish', 'deleteContain', 'deletePhoto', 'addRecipe', 'updateRecipe', 'addRestaurant', 'addContain']),
    ...mapActions('track', ['addTrack']),
    submitDish() {
      //  將營養素總和放入dish的營養素
      this.foodList = getFood(this.containToSubmit, this.food)
      Object.keys(this.dishToSubmit).forEach(key => {
        if (key != 'name' && key != 'restaurant_id' && key != 'dish_photo' && key != 'id' && key != 'number' && key != 'person') {
          this.dishToSubmit[key] = this.foodList[this.foodList.length-1][key]
        }
      })

      //  如有新增照片則更改網址
      if (this.dish_photo != '無') {
        if (this.dishToSubmit.dish_photo != '無') {
          this.deletePhoto(this.dishToSubmit.dish_photo)
        }
        this.dishToSubmit.dish_photo = this.dish_photo
      }
      if (this.recipe_photo != '無') {
        if (this.recipeToSubmit.photo != '無') {
          this.deletePhoto(this.recipeToSubmit.photo)
        }
        this.recipeToSubmit.photo = this.recipe_photo
      }

      //  更新dish
      this.updateDish(this.dishToSubmit)

      // 如餐廳是新的則新增餐廳
      if (this.newRestaurant) {
        this.addRestaurant(this.dishToSubmit.restaurant_id)
      }

      //  先將舊的包含dish的contain刪除，再放入新的
      this.deleteContain(this.dishToSubmit.id)
      for (let i = 0; i < this.containToSubmit.length; i++) {
        this.containToSubmit[i].dish = this.dishToSubmit.id
      }
      this.addContain(this.containToSubmit)

      //  如有食譜則更新舊食譜，或新增食譜
      if (this.recipeToSubmit.text) {
        if (this.recipeToSubmit.id) {
          this.updateRecipe(this.recipeToSubmit)
        }
        else {
          this.recipeToSubmit.dish = this.dishToSubmit.id
          this.addRecipe(this.recipeToSubmit)
        }
      }

      this.track.whom = this.dishToSubmit.name
      this.track.what = 'edit_dish'
      this.addTrack(this.track)

      this.clear()
      this.setSearchType('dish')
      this.setSearch(this.dishToSubmit.name)
      this.$emit('close')
    }
  },
  mounted() {
    this.recipeToSubmit = Object.assign({}, this.recipe)
    for (let i = 0; i < this.contain.length; i++) {
      this.containToSubmit.push(Object.assign({}, this.contain[i])) 
    }
    for (let i = 0; i < this.dish.length; i++) {
      if (this.dish[i].id == this.select) {
        this.dishToSubmit = Object.assign({}, this.dish[i])
        delete this.dishToSubmit.__index // this.dish會多出__index的屬性
      }
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