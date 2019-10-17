<template>
  <div class="row q-ma-md">
    <q-input
      filled
      v-model="recipe.text"
      v-select-all
      type="textarea" 
      label="食譜"
      style="width: 300px" 
    />

    <div class="q-pl-md">
      <modal-photo 
        class="q-pl-md"
        ref="modalPhoto"
        :url="recipe.photo" 
        :label="label" />
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
        name: 'recipe',
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