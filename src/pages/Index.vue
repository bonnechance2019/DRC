<template>
  <q-page 
    class="q-pa-md absolute full-width column"
    :style="searchType=='dish'? 
    `background: #e6f9ff`:'background: #e6ffe6'"
  >

  <q-btn @click="fbReadData()"/>
    
  <div class="q-pa-md row">
    <q-btn  
      @click="clear(), showAddDish=true"
      outline
      label="新增料理"
      class="all-pointer-events bg-blue-4"
      icon="add"
    />

    <div style="padding-left:40px">
      <q-tooltip anchor="top middle" self="bottom middle">搜尋類型</q-tooltip>

      <q-btn-toggle 
        v-show="!showFood"
        v-model="type"
        spread
        no-caps 
        toggle-color="blue-6"
        text-color="black"
        color="grey-2"
        :options="[
          {label: '料理', value: 'dish', icon: 'restaurant', slot: 'dish'},
          {label: '食材', value: 'food', icon: 'local_pizza', slot: 'food'}
        ]" 
      >
      </q-btn-toggle>
    </div>
  </div>

    <div class="q-pl-md row">
      <search 
        v-show="!showFood"
        style="max-width: 380px"
      />

      <div 
        v-show="searchType=='dish' && showFood" 
        class="q-pa-md text-amber-10"
        style="padding:17px"
      >
        如果要查詢其他項目，須先取消勾選
      </div>
    </div>

    <q-card class="my-card text-white full-width bg-blue-grey-4">   
      <dish-table 
        v-show="search && searchType=='dish'"
        :showFood="showFood"
        :showRecipe="showRecipe"
        @true="showFood=true"
        @false="showFood=false"
        @showRecipe="showRecipe=!showRecipe"
      />

      <hr v-if="showFood" color="black">
      <food-table v-if="searchType=='food' || showFood"/>

      <hr v-if="showRecipe && showFood" color="black">
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
      showAddDish: false
    }
  },
  computed: {
    ...mapState('index', ['searchType', 'search']),
    type: {
      get() {
        return this.searchType
      },
      set(value) {
        this.setSearchType(value)
      }
    }
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
