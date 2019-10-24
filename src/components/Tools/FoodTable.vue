<template>
  <div>
    <q-table
      v-if="searchType == 'dishAdd'"
      title="食材"
      :data="foodList"
      :columns="food_nutrient"
      row-key="id"
      class="sticky-header-column-table"
    /> 
    <q-table
      v-else
      title="食材"
      :data="food"
      :columns="food_nutrient"
      row-key="id"
      class="sticky-header-column-table"
    >
      <template v-slot:body-cell-name="props">
        <q-td key="name" :props="props">
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

      <template v-slot:body-cell-dairy="props">  
        <q-td key="dairy" :props="props">
          <q-badge color="info">
            {{ props.row.dairy }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-meat_and_beans="props">  
        <q-td key="meat_and_beans" :props="props">
          <q-badge color="accent">
            {{ props.row.meat_and_beans }}
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
    getFood(value) {
      let Food = [],
          totalNutrient = { 
              name: '總和', 
              quantity: 0,
              calories: 0,
              fat: 0,
              protein: 0,
              carbs: 0,
              grains: 0,
              fruits: 0,
              vegetables: 0,
              oils: 0,
              dairy: 0,
              meat_and_beans: 0,
              dietary_fiber: 0,
              total_sugar: 0,
              sodium: 0,
              potassium: 0,
              calcium: 0,
              magnesium: 0,
              iron: 0,
              zinc: 0,
              phosphorus: 0,
              vitaminA: 0,
              vision_alcohol: 0,
              vitaminE: 0,
              vitaminB1: 0,
              vitaminB2: 0,
              vitaminB6: 0,
              vitaminB12: 0,
              vitaminC: 0,
              nicotin: 0,
              folic_acid: 0,
              fatty_acidS: 0,
              fatty_acidM: 0,
              fatty_acidP: 0,
              cholesterol: 0,
          }
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < this.food.length; j++) {
          if (this.food[j].id == value[i].food) {
            let temp = { id:'' } // 暫存組成料理的食材份量
            Object.keys(this.food[j]).forEach(key => {
                if (key == 'id' || key == 'name') {
                    temp[key] = this.food[j][key] 
                }
                else {
                    temp[key] = this.food[j][key]*value[i].quantity
                }
            })
            Food.push(temp)
            j = this.food.length  
          }
        }
      }
      for (let i = 0; i < Food.length; i++) {
        totalNutrient.quantity += Food[i].quantity
        totalNutrient.calories += Food[i].calories
        totalNutrient.fat += Food[i].fat
        totalNutrient.protein += Food[i].protein
        totalNutrient.carbs += Food[i].carbs
        totalNutrient.grains += Food[i].grains
        totalNutrient.fruits += Food[i].fruits
        totalNutrient.vegetables += Food[i].vegetables
        totalNutrient.oils += Food[i].oils
        totalNutrient.dairy += Food[i].dairy
        totalNutrient.meat_and_beans += Food[i].meat_and_beans
        totalNutrient.dietary_fiber += Food[i].dietary_fiber
        totalNutrient.total_sugar += Food[i].total_sugar
        totalNutrient.sodium += Food[i].sodium
        totalNutrient.potassium += Food[i].potassium
        totalNutrient.calcium += Food[i].calcium
        totalNutrient.magnesium += Food[i].magnesium
        totalNutrient.iron += Food[i].iron
        totalNutrient.zinc += Food[i].zinc
        totalNutrient.phosphorus += Food[i].phosphorus
        totalNutrient.vitaminA += Food[i].vitaminA
        totalNutrient.vision_alcohol += Food[i].vision_alcohol
        totalNutrient.vitaminE += Food[i].vitaminE
        totalNutrient.vitaminB1 += Food[i].vitaminB1
        totalNutrient.vitaminB2 += Food[i].vitaminB2
        totalNutrient.vitaminB6 += Food[i].vitaminB6
        totalNutrient.vitaminB12 += Food[i].vitaminB12
        totalNutrient.vitaminC += Food[i].vitaminC
        totalNutrient.nicotin += Food[i].nicotin
        totalNutrient.folic_acid += Food[i].folic_acid
        totalNutrient.fatty_acidS += Food[i].fatty_acidS
        totalNutrient.fatty_acidM += Food[i].fatty_acidM
        totalNutrient.fatty_acidP += Food[i].fatty_acidP
        totalNutrient.cholesterol += Food[i].cholesterol
      }
      Food.push(totalNutrient)
      return Food
    }
  },
  components: {
    'edit-six': require('./EditSix.vue').default
  },
  mounted() {
    dishAdd: {
      if (this.searchType == 'dishAdd') {
        this.foodList = this.getFood(this.containToSubmit)
        Object.keys(this.dishToSubmit).forEach(key => {
          if (key != 'name' && 'restaurant_id' && 'dish_photo') {
            this.dishToSubmit[key] = this.foodList[this.foodList.length-1][key]
          }
        })
      }
      else {
        this.foodList = this.food
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