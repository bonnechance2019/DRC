<template>
  <q-card>
    <q-card-section>
      <q-bar class="bg-red-5">
        <q-icon name="local_pizza" />
        <div style="margin-left: 40%">{{ food.name }}</div>

        <q-space/>

        <q-btn dense flat icon="close" @click="$emit('close')"/>
      </q-bar>
    </q-card-section>

    <q-card-section class="row">
      <q-item
        v-for="(nut, index) in nutrient"
        :key="index" 
      >
        <div style="width:230px" >
          <q-input
            dense
            outlined
            v-model="food[nut]"
            type="text"
            @input="food[nut]=handleNutrient(food[nut])"
          >
            <template v-slot:before>
              <div style="font-size:20px" class="text-primary">
                {{ nutrientChinese[nut] }}
              </div>
            </template>

            <template v-slot:append>
              <q-icon 
                v-show="food[nut]"
                name="close" 
                @click="food[nut]=0" 
                class="cursor-pointer" 
              /> 
            </template>
          </q-input>
        </div>
      </q-item>
    </q-card-section>

    <form @submit.prevent="submitForm"> 
      <modal-buttons class="q-pl-md" :label="'save'"/>
    </form>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { twoPoint } from 'src/functions/two-point'

export default {
  props: ['food'],
  data() {
    return {
      nutrientToSubmit: []
    }
  },
  computed: {
    ...mapState('index', ['nutrient', 'nutrientChinese'])
  },
  methods: {
    ...mapActions('index', ['updateNutrient']),
    handleNutrient(value) {
      return twoPoint(value)
    },
    submitForm() {
      // console.log(this.food)
      this.nutrientToSubmit = Object.assign({}, this.nutrient)

      Object.keys(this.nutrient).forEach(key => { // 根據nutrient對food做檢查
        if (this.food[key] == '') {
          this.food[key] = 0
        }
        this.nutrientToSubmit[key] = Number(this.food[key]) // 把需要27項營養素轉為數字
      })
      this.nutrientToSubmit.id = this.food.id

      this.updateNutrient(this.nutrientToSubmit)
      this.$emit('close')
    }
  },
  components: {
    'modal-buttons': require('src/components/Modals/Shared/ModalButtons.vue').default,
  },
}
</script>

<style>

</style>