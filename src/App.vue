<template>
  <div id="app">
    <Loading v-if="isAuthLoading" />
    <template v-else>
      <DefaultLayout v-if="isAuthorized">
      <!-- <DefaultLayout v-if="true"> -->
        <router-view></router-view>
      </DefaultLayout>
      <LoginPage v-else />
    </template>
    
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Loading from './components/Loading'

const { mapGetters: mapAuthGetters, mapMutations: mapAuthMutations, mapActions: mapAuthActions } = createNamespacedHelpers('auth')

const DefaultLayout = () => import(/* webpackChunkName: "default-layout" */ './views/layouts/DefaultLayout')
const LoginPage = () => import(/* webpackChunkName: "login-page" */ './views/pages/LoginPage')

export default {
  name: 'App',
  components: {
    Loading,
    DefaultLayout, LoginPage
  },
  data() {
    return {
      isAuthLoading: true,
    }
  },
  methods: {
    ...mapAuthMutations({
      setAuth: 'SET_AUTH'
    }),
    ...mapAuthActions({
      'checkAuth': 'fakeRefresh'
    })
  },

  computed: {
    ...mapAuthGetters([
      'isAuthorized'
    ])
  },


  mounted() {
    this.setAuth()
    this.checkAuth()
      .catch(() => {
        
      })
      .finally(() => {
        this.isAuthLoading = false
      })
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>