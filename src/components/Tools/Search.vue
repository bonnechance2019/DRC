<template>
  <q-input
    v-model="searchField"
    @keyup.esc="searchField = ''"
    outlined
    v-select-all
    class="col"
    label="Search"
  >
    <template v-slot:append>
      <q-icon 
        v-if="searchField !== ''" 
        name="close" 
        @click="searchField = ''" 
        class="cursor-pointer" 
      /> 
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { selectAll } from 'src/directives/select-all.js';

export default {
  directives: {
    selectAll
  },
  computed: {
    ...mapState('index', ['search']),
    searchField: {
      get() {
        return this.search
      },
      set(value) {
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('index', ['setSearch'])
  },
}
</script>

<style>

</style>