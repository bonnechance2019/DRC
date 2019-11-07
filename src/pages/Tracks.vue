<template>
  <h1>track</h1>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('track', ['fbReadTrack'])
  },
  mounted() {
    this.fbReadTrack()
  },
}
</script>

<style>

</style>