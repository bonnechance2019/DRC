<template> 
  <q-input 
    outlined 
    :value="person"
    type='number'
    @input="$emit('update:person', $event)"
    :rules="[val => !!val || 'required']" 
    label="人份"
    style="width:125px"
    class="q-pt-md"
  >
    <template v-slot:append>
      <q-icon 
        v-show="person"
        name="close" 
        @click="$emit('update:person', '')" 
        class="cursor-pointer" 
      /> 
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['person']

}
</script>

<style>

</style>