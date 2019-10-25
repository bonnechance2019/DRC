<template>
  <q-table
    title="料理"
    :data="dish"
    :columns="dish_nutrient"
    row-key="id"
    selection="single"
    :selected.sync="selected"
    @selection="selectDish" 
    class="dish-table" 
  > 
    <template v-slot:top="props">
      <q-th class="row">
        <div style="font-size:20px">
          料理
        </div>
        <q-btn
          style="margin-left: 150px"
          @click="showImg=!showImg"
          :color="showImg ? 'grey-6' : 'light-blue-7'"
          :label="showImg ? '關閉照片' : '顯示照片'"
        /> 
        <q-btn
          style="margin-left: 10px"
          @click="$emit('showRecipe')"
          :color="showRecipe ? 'grey-6' : 'light-blue-7'"
          :label="showRecipe ? '關閉食譜' : '顯示食譜'"
        /> 
      </q-th>
    </template>

    <template v-slot:body-cell-name="props"> 
      <q-td key="name" :props="props" class="dish-name">
        <!-- <q-btn flat @click="editFood(props.row.id)"> -->
          {{ props.row.name }}
        <!-- </q-btn> -->
      </q-td>
    </template>

    <template v-slot:body-cell-dish_photo="props">
      <q-td> 
        <q-img
          v-if="showImg"
          style="height: 200px; width: 200px"
          :src="props.row.dish_photo"
        />
      </q-td>
    </template> 

    <template v-slot:body-cell-grains="props">  
      <q-td key="grains" :props="props">
        <q-badge color="amber">
          {{ props.row.grains }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-fruits="props">  
      <q-td key="fruits" :props="props">
        <q-badge color="orange">
          {{ props.row.fruits }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-vegetables="props">  
      <q-td key="vegetables" :props="props">
        <q-badge color="green">
          {{ props.row.vegetables }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-oils="props">  
      <q-td key="oils" :props="props">
        <q-badge color="red">
          {{ props.row.oils }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-dairy_all="props">  
      <q-td key="dairy_all" :props="props">
        <q-badge color="info">
          {{ props.row.dairy_all }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-dairy_low="props">  
      <q-td key="dairy_low" :props="props">
        <q-badge color="info">
          {{ props.row.dairy_low }}
        </q-badge>
      </q-td>
    </template>

      <template v-slot:body-cell-dairy_de="props">  
      <q-td key="dairy_de" :props="props">
        <q-badge color="info">
          {{ props.row.dairy_de }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-meat_low="props">  
      <q-td key="meat_low" :props="props">
        <q-badge color="accent">
          {{ props.row.meat_low }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-meat_med="props">  
      <q-td key="meat_med" :props="props">
        <q-badge color="accent">
          {{ props.row.meat_med }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-meat_high="props">  
      <q-td key="meat_high" :props="props">
        <q-badge color="accent">
          {{ props.row.meat_high }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-meat_max="props">  
      <q-td key="meat_max" :props="props">
        <q-badge color="accent">
          {{ props.row.meat_max }}
        </q-badge>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  props: ['showFood', 'showRecipe'],
  data() {
    return {
      selected: [],
      showImg: false
    }
  },
  computed: {
    ...mapState('index', ['dish_nutrient', 'search']),
    ...mapGetters('index', ['dish'])
  },
  methods: {
    ...mapActions('index', ['setSelect', 'setSearchType']),
    selectDish(details) {
      if (details.added) {
        this.setSelect(details.keys)
        this.$emit('true')
      }
      else {
        this.setSelect('')
        this.$emit('false')
        this.selected = []
      }
    }
  },
  watch: {
    search(newValue, oldValue) {
      if (newValue == '') {
        this.selectDish('')
      }
    }
  }
}
</script>

<style lang="sass">
.dish-table
  .q-table
    td:first-child
      position: sticky
      background-color: $amber-3 !important

    tr:first-child th
      position: sticky
      top: 0
      opacity: 1 /* opacity is important */
      z-index: 2 /* higher than z-index for td below */
      color: $indigo-8
  
    tr:first-child th:first-child
      z-index: 3 /* highest z-index */
      background: white

    td:first-child
      z-index: 1

    td:first-child, th:first-child
      position: sticky
      left: 0

  .dish-name
    background-color: $amber-3
    

</style>