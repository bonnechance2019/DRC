<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          營養分析
        </q-toolbar-title>

        <q-btn 
          v-if="!loggedIn"
          to="/auth"
          icon-right="account_circle"
          label="登入"
          class="absolute-right"
          flat />

        <q-btn 
          v-else 
          icon-right="account_circle" 
          label="登出" 
          class="absolute-right"
          flat
          @click="logoutUser" />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-grey-2">
      <q-tabs>
        <q-route-tab
          class="text-grey-7"
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :breakpoint="768"
      :width="250"
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header class="text-primary">功能</q-item-label>
        <q-item 
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-7"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: '首頁',
          icon: 'view_list',
          to: '/'
        },
        {
          label: '設定',
          icon: 'settings',
          to: '/settings'
        }
      ]
    }
  },
   computed: {
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    openURL
  } 
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }
  .q-router-link--exact-active {
    color: rgb(13, 105, 224) !important;
  }
</style>