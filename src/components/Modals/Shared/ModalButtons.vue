<template>
  <q-card-actions align="left">
    <q-btn
      :icon="icon" 
      :label="label"
      type="submit"
      :color="color? color:'blue-5'"  
      style="width: 70px"
    />
  </q-card-actions>
</template>

<script>
export default {
  props: ['icon', 'color', 'label']
}
</script>

<style>

</style>