<template>
  <a-layout class="layout layout-default">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible style="background: #fff" width="250">
      <Sidebar :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <Header :collapsed="collapsed" @toggleMenuCollapse="toggleMenuCollapse" />
      </a-layout-header>
      <a-layout-content
        class="layout-default__content"
      >
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { Layout } from 'ant-design-vue'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

export default {
  components: {
    Sidebar, Header,
    'a-layout': Layout,
    'a-layout-sider': Layout.Sider,
    'a-layout-header': Layout.Header,
    'a-layout-content': Layout.Content,

  },

  data() {
    return {
      collapsed: false
    }
  },

  methods: {
    toggleMenuCollapse() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    &-default {
      width: 100%;

      &__content {
        overflow: auto;
        margin: 24px 16px;
        padding: 24px;
        background: #fff;
        height: 100%;
      }
    }
  }
</style>