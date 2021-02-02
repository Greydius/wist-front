<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-select
        format="YYYY-MM-DD"
        :value="value"
        @change="handleChange"
      >
        <div slot="dropdownRender" slot-scope="menu">
          <v-nodes :vnodes="menu" />
          <a-divider style="margin: 4px 0;" />
          <a-date-picker format="YYYY-MM-DD" @change="selectDate">
            <div
              style="padding: 4px 8px; cursor: pointer;"
              @mousedown="e => e.preventDefault()"
            >
              <a-icon type="plus" /> Дата
            </div>  
          </a-date-picker>
        </div>
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
      {{ assessmentFiled(value) || ' ' }}
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>

<script>
import { Select, DatePicker, Divider } from 'ant-design-vue'
export default {
  props: {
    text: String,
    variants: Object
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-date-picker': DatePicker,
    'a-divider': Divider,
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

    assessmentFiled(data) {
      return (data in this.variants) ? this.variants[data] : data
    },

    selectDate(value) {    
      this.value = value.format('YYYY-MM-DD')
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
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon,
.editable-cell-icon-check {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
  