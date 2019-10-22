<template>
  <div class="row q-pt-md">
    <q-card
      dense
      title="食譜"
      v-for="(recipe, id) in recipe"
      :key="id"
      style="max-width:300px;color:black;"
    >
      <img :src="photo()" />

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
    ...mapGetters('index', ['recipe'])
  },
  methods: {
    photo() {
      if (this.recipe.photo == '無' || !this.recipe.photo) {
        return ''
      }
      else return this.recipe.photo
    }
  },
}
</script>

<style>

</style>