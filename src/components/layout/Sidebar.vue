<template>
  <div class="component component-sidebar">
    <div class="logo">
      <img :src="logo" alt="">
    </div>
    <a-menu
      :default-selected-keys="[$route.name]"
      @click="routeChange"
      mode="inline"
    >
      <a-menu-item
        v-for="{route, title, icon} in menus"
        :key="route"
      >
        <a-icon :type="icon" />
        <span>{{ title }}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from 'ant-design-vue'
export default {
  props: {
    collapsed: Boolean
  },

  components: {
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
  },

  data() {
    return {
      menus: [
        {
          route: 'classrooms',
          title: 'Классы',
          icon: 'home'
        },
        {
          route: 'students',
          title: 'Ученики',
          icon: 'solution'
        },
      ]
    }
  },

  computed: {
    logo() {
      const logo = this.collapsed ? 'logo-minimal.svg' : 'logo.svg'

      return `/assets/images/${logo}`
    }
  },

  methods: {
    routeChange({key}) {
      this.$router.push({ name: key })
    }
  }
}
</script>

<style lang="scss" scoped>
.component {
  &-sidebar {
    .logo {
      padding: 16px 24px;
      img {
        width: 100%;
      }
    }
  }
}
</style>