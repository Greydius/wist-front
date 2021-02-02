<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-input v-if="type === 'input'" :value="value" @change="handleChange" @pressEnter="check" />
      
      <a-date-picker
        v-else-if="type === 'date'"
        format="DD.MM.YYYY"
        valueFormat="YYYY-MM-DD"
        v-model="value"
        @change="handleChange"
      />
      <a-icon
        type="check"
        class="editable-cell-icon-check"
        @click="check"
      />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      <router-link v-if="id" :to="{ name: 'student', params: { id: id } }">
        {{ value || ' ' }}
      </router-link>
      <template v-else>
        {{ value || ' ' }}
      </template>
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'ant-design-vue'
export default {
  props: {
    text: String,
    type: String,
    id: {
      type: [Number,null],
      default: null
    }
  },
  components: {
    'a-date-picker': DatePicker
  },
  data() {
    return {
      value: this.text,
      editable: false,
    };
  },
  methods: {
    handleChange(e) {
      const value = e.target && e.target.value || e;
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
  min-width: 101px;
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
  