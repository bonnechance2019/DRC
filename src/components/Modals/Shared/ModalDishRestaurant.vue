<template>
  <q-card  class="col q-pt-md" style="width: 300px">
    <div class="q-pt-md">
      <q-btn-toggle
        v-model="type"
        toggle-color="primary"
        text-color="blue"
        :options="[
          {value: 'add', icon: 'add'},
          {value: 'search', icon: 'search'},
        ]"
      />
    </div>
    
    <q-input
      v-if="type == 'add'"
      outlined 
      :value="restaurant_id"
      @input="$emit('update:restaurant_id', $event)"
      :rules="[val => !!val || 'Field is required']" 
      ref="restaurant_id"
      label="餐廳" 
      style="width: 300px"
      >
      <template v-slot:append>
        <q-icon 
          v-if="restaurant_id"
          @click="$emit('update:restaurant_id', '')" 
          name="close" 
          class="cursor-pointer" 
        />
      </template>
    </q-input>

    <q-select
      v-if="type == 'search'"
      filled
      :value="restaurant_id"
      @input="$emit('update:restaurant_id', $event), $emit('oldRestaurant')"
      :rules="[val => !!val || 'Field is required']" 
      ref="restaurant_id"
      label="餐廳" 
      use-input
      input-debounce="0"
      :options="options"
      @filter="filterRestaurant"
      style="width: 300px"
    >
      <template v-slot:append>
        <q-icon 
          v-if="restaurant_id"
          @click="$emit('update:restaurant_id', '')" 
          name="close" 
          class="cursor-pointer" 
        />
      </template>
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['restaurant_id'],
  data() {
    return {
      type: 'search',
      options: this.restaurant
    }
  },
  computed: {
    ...mapState('index', ['restaurant'])
  },
  methods: {
    filterRestaurant (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.restaurant
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.restaurant.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  },
}
</script>

<style>

</style>