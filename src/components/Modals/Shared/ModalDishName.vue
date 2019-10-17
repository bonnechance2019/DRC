<template>
  <div class="row q-mt-md">
    <q-input
      outlined 
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']" 
      autofocus
      v-select-all
      ref="name"
      label="料理"
      style="width: 300px" 
      >
      <template v-slot:append>
          <q-icon 
              v-if="name"
              @click="$emit('update:name', '')" 
              name="close" 
              class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { selectAll } from 'src/directives/select-all.js'

export default {
  props: ['name'],
  directives: {
    selectAll
  }
}
</script>

<style>

</style>