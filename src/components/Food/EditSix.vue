<template>
  <q-card class="full-width">
    <q-card-section>
      <q-bar class="bg-blue-5">
        <q-icon name="local_pizza" />
        <div style="padding-left: 40%">{{ foodToEdit.name }}</div>

        <q-space/>

        <q-btn dense flat icon="close" @click="$emit('close')"/>
      </q-bar>

      <div class="row q-pa-lg">
        <q-btn-toggle
          spread
          no-caps
          class="custom-toggle"
          toggle-color="blue-grey"
          v-model="six"
          :options="[
            { value: 'grains', slot: 'grains'},
            { value: 'meat', slot: 'meat'},
            { value: 'vegetables', slot: 'vegetables' },
            { value: 'fruits', slot: 'fruits' },
            { value: 'dairy', slot: 'dairy'},
            { value: 'oils', slot: 'oils' },
          ]"
        >
          <template v-slot:grains>
            <div class="text-amber">
              全穀雜糧類
            </div>
          </template>

          <template v-slot:meat>
            <q-btn flat @click="sub='meat'"  >
              <div class="text-accent">
                蛋、豆、魚、肉類
              </div>
            </q-btn>
          </template>

          <template v-slot:vegetables>
            <div class="text-positive">
              蔬菜類
            </div>
          </template>

          <template v-slot:fruits>
            <div class="text-orange">
              水果類
            </div>
          </template>

          <template v-slot:dairy>
            <q-btn flat @click="sub='dairy'" style="height:100px;padding:25px">
              <div class="text-info">
                乳品類
              </div>
            </q-btn>
          </template>

          <template v-slot:oils>
            <div class="text-negative">
              油脂與堅果類
            </div>
          </template>
        </q-btn-toggle>
      </div>

      <div class="q-pr-lg q-pl-lg">
        <q-btn-toggle
          v-if="six!='grains' && six!='vegetables' && six!='fruits' && six!='oils' && six!= ''" 
          spread
          no-caps
          class="custom-toggle"
          toggle-color="blue-grey"
          v-model="six"
          :options="sub=='meat'? [
            { value: 'meat_max', slot: 'meat_max' },
            { value: 'meat_high', slot: 'meat_high' },
            { value: 'meat_med', slot: 'meat_med' },
            { value: 'meat_low', slot: 'meat_low' }
          ] : [
            { value: 'dairy_all', slot: 'dairy_all' },
            { value: 'dairy_low', slot: 'dairy_low' },
            { value: 'dairy_de', slot: 'dairy_de' }
          ]"
        >
          <template v-slot:meat_max>
            <div class="text-accent">              
              超高脂
            </div>
          </template>

          <template v-slot:meat_high>
            <div class="text-accent">              
              高脂
            </div>
          </template>

          <template v-slot:meat_med>
            <div class="text-accent">              
              中脂
            </div>
          </template>

          <template v-slot:meat_low>
            <div class="text-accent">              
              低脂
            </div>
          </template>

          <template v-slot:dairy_all>
            <div class="text-info">              
              全脂
            </div>
          </template>

          <template v-slot:dairy_low>
            <div class="text-info">              
              低脂
            </div>
          </template>

          <template v-slot:dairy_de>
            <div class="text-info">              
              脱脂
            </div>
          </template>
        </q-btn-toggle>
      </div>
    </q-card-section>

    <div class="q-pa-sm">
      <q-input 
        v-if="six"
        outlined
        v-select-all
        v-model="value" 
        @input="value = handleValue(value)"
        type="text" 
        label="份數"
        style="max-width:120px;padding-left:30px"
      >
        <template v-slot:append>
          <q-icon
            v-show="value"
            name="close" 
            @click="value = 0" 
            class="cursor-pointer" 
          />
        </template>
      </q-input>
    </div>

    <div class="row">
      <form @submit.prevent="submitForm"> 
        <modal-buttons class="q-pl-md" :label="'save'"/>
      </form>

      <q-btn 
        class="q-pa-sm"
        style="margin-left:330px;margin-top:5px;height:40px" 
        label="更改其他營養素" 
        color="negative" 
        @click="showEditNutrient=true"
      />
    </div>

    <q-dialog v-model="error" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="error" color="negative" style="font-size:40px"/>
          <span class="q-ml-sm text-red">請輸入值 或 只選六大類</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Ok~" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
			
    <q-dialog v-model="showEditNutrient" persistent>
      <edit-nutrient :food="foodToEdit" @close="showEditNutrient=false, $emit('close')" />
    </q-dialog>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { selectAll } from 'src/directives/select-all.js'
import { twoPoint } from 'src/functions/two-point'

export default {
  props: ['foodToEdit'],
  directives: {
    selectAll
  },
  data() {
    return {
      six: '',
      value: 0,
      sub: '',
      error: false,
      showEditNutrient: false
    }
  },
  methods: {
    ...mapActions('index', ['updateSix']),
    handleValue(value) {
      return twoPoint(value)
    },
    sixFunctions() {
      if (this.six == 'grains') {  // 全穀雜糧公式
        this.value = this.foodToEdit['carbs']/15
      }
      else if (this.six == 'vegetables') {  // 蔬菜公式
        if (this.foodToEdit['carbs'] > 4) {
          this.value = this.foodToEdit['carbs']/5
        }
        else {
          this.value = 1
        }
      }
      else if (this.six == 'oils') {  // 油脂
        this.value = this.foodToEdit['fat']/5
      }
      else if (this.six == 'fruits') {  // 水果
          this.value = this.foodToEdit['carbs']/15
      }
      else if (this.six == 'meat') {
        this.value = this.foodToEdit['protein']/7
        if (this.foodToEdit['fat'] > 11) {
          this.six = 'meat_max'
        }
        else if (this.foodToEdit['fat'] >= 9) {
          this.six = 'meat_high'
        }
        else if (this.foodToEdit['fat'] >= 4) {
          this.six = 'meat_med'
        }
        else {
          this.six = 'meat_low'
        }
      }
      else if (this.six == 'dairy') {
        this.value = this.foodToEdit['protein']/8
        if (this.foodToEdit['fat'] >= 8) {
          this.six = 'dairy_all'
        }
        else if (this.foodToEdit['fat'] <= 1) {
          this.six = 'dairy_de'
        }
        else {
          this.six = 'dairy_low'
        }
      }
      else {
        this.error = true
        this.value = 0
      }
    },
    submitForm() {  
      if (this.value == 0) {  // 未輸入則套用公式
        this.sixFunctions()
      }
      
      if (!this.error) {
        this.value = this.value.toFixed(2)  //印出小數點後兩位（包含0）並轉成string      
        Object.keys(this.foodToEdit).forEach(key => {
          if (key == 'grains' || key == 'meat_low' || key == 'vegetables' || key == 'meat_med' || key == 'meat_high' || key == 'meat_max' ||
            key == 'fruits' || key == 'dairy_all' || key == 'oils' || key == 'dairy_low' || key == 'dairy_de') {
            this.foodToEdit[key] = 0
          }
        })
        this.foodToEdit[this.six] = Number(this.value)
  
        this.updateSix(this.foodToEdit)
        this.$emit('close')
      }
    }
  },
  components: {
    'modal-buttons': require('src/components/Modals/Shared/ModalButtons.vue').default,
    'edit-nutrient': require('./EditNutrient.vue').default
  }
}
</script>

<style lang="sass" >
.custom-toggle
  border: 2px solid #027be3
</style>

