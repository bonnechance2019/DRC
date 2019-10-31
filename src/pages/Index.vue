<template>
  <q-page 
    class="q-pa-md absolute full-width column"
    :style="searchDish? 
    `background: #e6f9ff`:'background: #e6ffe6'"
  >

    <!-- 測試讀取firebase -->
    <q-btn @click="fbReadData()" />

    <div class="q-pa-md row">
      <q-btn  
        @click="clear(), showAddDish=true"
        outline
        class="all-pointer-events bg-blue-4" 
        icon="add"
      />

      <div style="padding-left:40px;padding-top:5px">
        <q-btn
          :disable="searchType=='dish'" 
          color="blue-6"   
          @click="setSearchType('dish'), searchDish=true" 
          label="料理" 
          icon="restaurant"
        />

        <q-btn 
          :disable="searchType=='food' || showFood" 
          color="blue-6" 
          @click="setSearchType('food'), searchDish=false" 
          label="食材" 
          icon="local_pizza"
        />
      </div>
    </div>

    <div class="q-pl-md row">
      <search 
        v-show="!showFood"
        style="max-width: 300px"
      />

      <div 
        v-show="searchType=='dish' && showFood" 
        class="q-pa-md row; text-amber-10"
      >
        如果要查詢其他項目，須先取消勾選
      </div>
    </div>

    <q-card class="my-card text-white full-width">   
      <dish-table 
        v-show="search && searchType=='dish'"
        :showFood="showFood"
        :showRecipe="showRecipe"
        @true="showFood=true"
        @false="showFood=false"
        @showRecipe="showRecipe=!showRecipe"
      />
      <!-- 根據料理編輯 -->

      <hr v-if="showFood">
      <food-table v-if="searchType=='food' || showFood"/>

      <hr v-if="showRecipe && showFood">
      <recipe-table v-if="showRecipe && showFood" class="col"/>
      
    </q-card>

    <q-dialog v-model="showAddDish">
      <add-dish @close="showAddDish=false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data() {
    return {
      showFood: false,
      showRecipe: false,
      searchDish: true,
      showAddDish: false
    }
  },
  computed: {
    ...mapState('index', ['searchType', 'search'])
  },
  methods: {
    ...mapActions('index', ['setSearchType', 'clearSearch', 'fbReadData', 'clear'])
  },
  components: {
    'search': require('src/components/Tools/Search.vue').default,
    'dish-table': require('src/components/Tools/DishTable.vue').default,
    'food-table': require('src/components/Tools/FoodTable.vue').default,
    'recipe-table': require('src/components/Tools/RecipeTable.vue').default,
    'add-dish': require('src/components/Dish/Add.vue').default
  }
}
</script>
