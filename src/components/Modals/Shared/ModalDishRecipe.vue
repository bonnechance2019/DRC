<template>
  <div class="col q-pt-md" style="margin-left:45px">
    <q-input
      filled
      :value="recipe"
      @input="$emit('update:recipe', $event)"
      v-select-all
      type="textarea" 
      label="食譜"
      style="width:445px" 
      class="bg-blue-grey-2"
    />
    <modal-photo 
      style="margin-top:5px"
      ref="modalPhoto"
      :label="label"
    />
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