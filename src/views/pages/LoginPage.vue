<template>
  <div class="page page-login">
    <a-card title="WIST" style="width: 300px;">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              { rules: [{ required: true, message: 'Введите email!' }] },
            ]"
            placeholder="Логин"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: 'Введите пароль' }] },
            ]"
            type="password"
            placeholder="Пароль"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())" block>
            Вход
          </a-button>
        </a-form-item>
      </a-form>  
    </a-card>
    
  </div>
</template>

<script>
import { Form, Card } from 'ant-design-vue'

import { createNamespacedHelpers } from 'vuex'

const { mapActions: mapAuthActions } = createNamespacedHelpers('auth')

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-card': Card
  },

  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'login' }),
    }
  },

  methods: {
    ...mapAuthActions({
      login: 'fakeLogin'
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }

        this.login(values)
          .then(() => {
            console.log('submit')
          })
          .catch(({error, field, message}) => {
            switch(error) {
              case 'field':
                this.form.setFields({
                  [field]: {
                    value: field === 'password' ? '' : values[field],
                    errors: [{field, message}]
                  }
                })
                break;
              case 'unknown':
                this.$message.error(message)
                break;
              default:
                console.log('error')
            }
          })
      });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>