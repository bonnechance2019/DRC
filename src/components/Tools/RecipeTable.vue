<template>
  <div class="row q-pt-md">
    <q-card
      dense
      title="食譜"
      style="max-width:300px;background: radial-gradient(circle, #35a2ff 0%, #3366ff 100%)"
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