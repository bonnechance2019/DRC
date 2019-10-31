<template>
  <div>
    <q-table
      title="食材"
      :data="searchType=='dishAdd'? foodList:food"
      :columns="food_nutrient"
      row-key="id"
      class="sticky-header-column-table"
    >
      <template v-slot:body-cell-name="props">
        <q-td key="name" :props="props">
          <q-tooltip v-if="searchType != 'dish'">
            {{props.row.description}}
          </q-tooltip>
          
          <q-btn flat @click="editFood(props.row)" :disable="searchType == 'dish'">
            {{ props.row.name }}
          </q-btn>
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
          <q-badge color="positive">
            {{ props.row.vegetables }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-oils="props">  
        <q-td key="oils" :props="props">
          <q-badge color="negative">
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

    <q-dialog v-model="showEditFood">
      <edit-six :foodToEdit="foodToEdit" @close="showEditFood=false"/>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { getFood } from 'src/functions/get-food'

export default {
  props: ['containToSubmit', 'dishToSubmit'],
  data() {
    return {
      foodList: [],
      showEditFood: false,
      foodToEdit: ''
    }
  },
  computed: {
    ...mapState('index', ['food_nutrient', 'searchType']),
    ...mapGetters('index', ['food'])
  },
  methods: {
    editFood(food) {
      this.showEditFood = true
      this.foodToEdit = Object.assign({}, food)
    },
  },
  components: {
    'edit-six': require('../Food/EditSix.vue').default
  },
  mounted() {
    dishAdd: {
      if (this.searchType == 'dishAdd') {
        this.foodList = getFood(this.containToSubmit, this.food)
      }
    }
    
  },
}
</script>

<style lang="sass">
  .sticky-header-column-table 
    .q-table__middle
      max-height: 600px // 600px

    td:first-child /* bg color is important for td; just specify one */
      background-color: $amber-3 !important

    tr:first-child th
      position: sticky
      top: 0
      opacity: 1 /* opacity is important */
      z-index: 2 /* higher than z-index for td below */
      color: $indigo-8
      // font-size: 14px
      // background: white /* bg color is important; just specify one */

    tr:first-child th:first-child
      z-index: 3 /* highest z-index */
      background: white

    td:first-child
      z-index: 1

    td:first-child, th:first-child
      position: sticky
      left: 0
</style>