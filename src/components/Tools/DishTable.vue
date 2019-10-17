<template>
  <q-table
    dense
    title="料理"
    :data="dish"
    :columns="dish_nutrient"
    row-key="id"
    selection="single"
    :selected.sync="selected"
    @selection="selectDish"
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

    <template v-slot:body-cell-dish_photo="props">
      <q-td> 
        <q-img
          v-if="showImg"
          style="height: 200px; width: 200px"
          :src="props.row.dish_photo"
        />
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

<style>

</style>