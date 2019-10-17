<template>
  <div class="row q-pt-md">
    <q-card
      dense
      title="食譜"
      v-for="(recipe, id) in recipe"
      :key="id"
      style="max-width: 300px"
    >
      <img :src="recipe.photo">

      <q-card-section>
        <!-- 更改者 -->
        <!-- <div class="text-subtitle2">{{ edtior }}</div> -->
      </q-card-section>

      <q-card-section>
        {{ recipe.text }}
      </q-card-section>
    </q-card> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('index', ['recipe']),
  },

}
</script>

<style>

</style>