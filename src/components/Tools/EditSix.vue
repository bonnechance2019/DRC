<template>
  <q-card class="full-width">
    <form @submit.prevent="submitForm"> 
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
              { value: 'meat_and_beans', slot: 'meat_and_beans' },
              { value: 'vegetables', slot: 'vegetables' },
              { value: 'fruits', slot: 'fruits' },
              { value: 'dairy', slot: 'dairy' },
              { value: 'oils', slot: 'oils' },
            ]"
          >
            <template v-slot:grains>
              <div class="text-amber">
                全穀根莖類
              </div>
            </template>

            <template v-slot:meat_and_beans>
              <div class="text-accent">
                蛋豆魚肉類
              </div>
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
              <div class="text-info">
                乳品類
              </div>
            </template>

            <template v-slot:oils>
              <div class="text-negative">
                油脂與堅果種子類
              </div>
            </template>
          </q-btn-toggle>
        </div>
			</q-card-section>

      <modal-buttons :label="'save'"/>
		</form>

    <q-btn label="another" />
			<!-- <pre>{{ taskToSubmit }}</pre> -->
			<!-- Check the value when it change -->
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['foodToEdit'],
  data() {
    return {
      six: '',
      value: 0
        // grains: {label: '全穀根莖類', value: false, color: 'amber'},
        // meat_and_beans: {label: '蛋豆魚肉類', value: false, color: 'accent'},
        // vegetables: {label: '蔬菜類', value: false, color: 'positive'},
        // fruits: {label: '水果類', value: false, color: 'orange'},
        // dairy: {label: '乳品類', value: false, color: 'info'},
        // oils: {label: '油脂與堅果種子類', value: false, color: 'negative'},
    }
  },
  methods: {
    ...mapActions('index', ['updateSix']),
    submitForm() {
      if (this.six == 'grains') {
       this.value = this.foodToEdit['protein']/2
      }
      else if (this.six == 'meat_and_beans') {
        this.value = this.foodToEdit['protein']/7
      }
      else if (this.six == 'vegetables') {
        this.value = this.foodToEdit['protein']
      }
      else if (this.six == 'fruits') {
         this.value = this.foodToEdit['carbs']/15
      }
      else if (this.six == 'dairy') {
        this.value = this.foodToEdit['protein']/8
      }
      else if (this.six == 'oils') {
        this.value = this.foodToEdit['fat']/5
      }

      Object.keys(this.foodToEdit).forEach(key => {
        if (key == 'grains' || key == 'meat_and_beans' || key == 'vegetables' || 
          key == 'fruits' || key == 'dairy' || key == 'oils') {
          this.foodToEdit[key] = 0
        }
      })

      this.value = this.value.toFixed(2)  //印出小數點後兩位（包含0）並轉成string
      this.foodToEdit[this.six] = Number(this.value)

      this.updateSix(this.foodToEdit)
      this.$emit('close')
    }
  },
  components: {
    'modal-buttons': require('../Modals/Shared/ModalButtons.vue').default 
  }
}
</script>

<style lang="sass" >
.custom-toggle
  border: 2px solid #027be3
</style>