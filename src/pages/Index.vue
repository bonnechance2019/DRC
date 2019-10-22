<template>
  <q-page class="q-pa-md absolute full-width column">

    <!-- 測試讀取firebase -->
    <q-btn @click="fbReadData()" />

    <div class="q-pa-md">
      <q-btn  
        @click="showFood = false, setSearch(''), setSearchType('')"
        to="/dish"
        round
        outline
        class="all-pointer-events"
        color="blue-4"
        size="15px" 
        icon="add" 
      />
    </div>

    <div class="q-pl-md row">
      <search style="max-width: 300px"/>

      <q-btn
        :disable="searchType=='dish'" 
        color="blue-6"   
        @click="setSearchType('dish')" 
        label="料理" 
        icon="restaurant"
      />

      <q-btn 
        :disable="searchType=='food' || showFood" 
        color="blue-6" 
        @click="setSearchType('food')" 
        label="食材" 
        icon="local_pizza"
      />

      <div 
        v-show="searchType=='dish' && showFood" 
        class="q-pa-md row; text-amber-10"
      >
        單獨查詢食材，須先取消勾選
      </div>
    </div>

    <q-card class="my-card text-white full-width" style="background: radial-gradient(circle, #ffffff 0%, #eeffe6 80%)">   
      <dish-table 
        v-show="search && searchType=='dish'"
        :showFood.sync="showFood"
        :showRecipe.sync="showRecipe"
        @true="showFood=true"
        @false="showFood=false"
        @showRecipe="showRecipe=!showRecipe"
      />
      <!-- 根據料理編輯 -->

      <hr v-if="showFood">
      <food-table v-if="(search && searchType=='food') || showFood"/>

      <hr v-if="showRecipe && showFood">
      <recipe-table v-if="showRecipe && showFood" class="col"/>
      
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data() {
    return {
      showFood: false,
      showRecipe: false
    }
  },
  computed: {
    ...mapState('index', ['searchType', 'search'])
  },
  methods: {
    ...mapActions('index', ['setSearchType', 'setSearch', 'fbReadData'])
  },
  components: {
    'search': require('src/components/Tools/Search.vue').default,
    'dish-table': require('src/components/Tools/DishTable.vue').default,
    'food-table': require('src/components/Tools/FoodTable.vue').default,
    'recipe-table': require('src/components/Tools/RecipeTable.vue').default
  }
}
</script>
