<template>
  <div class="component component-header">
    <a-icon
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="() => $emit('toggleMenuCollapse')"
    />

    <a-popover placement="bottomRight">
      <template slot="content">
        <a-button
          type="danger"
          icon="logout"
          block
          @click="logout"
        >
          Выход
        </a-button>
      </template>
      <template slot="title">
        <span>{{ user.name }}</span>
      </template>
      <a-avatar :src="user.avatar" />
    </a-popover>
  </div>
</template>

<script>
import { Avatar, Popover } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions: mapAuthActions } = createNamespacedHelpers('auth')

export default {
  props: {
    collapsed: Boolean
  },

  components: {
    'a-avatar': Avatar,
    'a-popover': Popover
  },

  computed: {
    ...mapState(['user'])
  },

  methods: {
    ...mapAuthActions({
      logout: 'fakeLogout'
    })
  }
}
</script>

<style lang="scss" scoped>
.component {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 16px;
  }
}
</style>
