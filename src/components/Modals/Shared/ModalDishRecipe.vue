<template>
  <div class="row q-ma-md">
    <q-input
      filled
      v-model="recipe.text"
      v-select-all
      type="textarea" 
      label="食譜"
      style="width: 300px" 
      @input="$emit('update:recipe.text', $event)"
    />

    <div class="q-pl-md">
      <modal-photo 
        style="padding-left: 85px"
        ref="modalPhoto"
        :label="label"
      />
    </div>
  </div>
</template>

<script>
import { selectAll } from 'src/directives/select-all.js'

export default {
  props: ['recipe'],
  directives: {
    selectAll
  },
  data() {
    return {
      label: {
        type: 'recipes',
        title: "食譜的照片"
      }
    }
  },
  components: {
    'modal-photo': require('./ModalPhoto.vue').default
  }
}
</script>

<style>

</style>