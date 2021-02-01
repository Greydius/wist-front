<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-select
        :value="value"
        @change="handleChange"
      >
        <a-select-option v-for="(variant, key) in variants" :key="key">
          {{ variant }}
        </a-select-option>
      </a-select>
      <a-icon
        type="check"
        class="editable-cell-icon-check"
        @click="check"
      />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      {{ variants[value] || ' ' }}
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>

<script>
import { Select } from 'ant-design-vue'
export default {
  props: {
    text: String,
    variants: Object
  },
  components: {
    'a-select': Select,
    'a-select-option': Select.Option,
  },
  data() {
    return {
      value: this.text,
      editable: false,
    };
  },
  methods: {
    handleChange(value) {
      this.value = value;
    },
    check() {
      this.editable = false;
      this.$emit('change', this.value);
    },
    edit() {
      this.editable = true;
    },
  },
}
</script>

<style lang="scss">
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
  