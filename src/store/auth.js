import apiRequest from '@/utils/apiRequest';
import apiStorage from '@/utils/apiStorage';

const fakeData = {
  token: 'fake-token',
  user: {
    name: 'Администратор',
    email: 'administrator@wist.uz',
    avatar: ''
  },
  password: 'InterActive123!'
}

export default {
  namespaced: true,
  state: {
    user: undefined,
    token: undefined
  },
  getters: {
    isAuthorized: (state) => !(state.user === undefined || state.user === null),
  },
  mutations: {
    SET_AUTH(state) {
      const token = localStorage.getItem('token');

      apiRequest.defaults.headers.Authorization = `Bearer ${token}`;
      state.token = token;
    },
    SET_TOKEN(state, token) {
      localStorage.setItem('token', token);
      apiRequest.defaults.headers.Authorization = `Bearer ${token}`;
      state.token = token;
    },
    SET_USER(state, userData) {
      const user = {...userData}
      if(user.avatar) {
        user.avatar = apiStorage(user.avatar)
      } else {
        user.avatar = '/assets/images/avatar.png'
      }
      state.user = user;
    },

    REMOVE_USER(state) {
      localStorage.removeItem('token');
      state.token = false;
      state.user = undefined;
    }
  },
  actions: {
    login({ commit }, formData) {
      return new Promise((resolve, reject) => {
        apiRequest
          .post('/auth/login', formData)
          .then((result) => {
            const { access_token, user } = result.data;

            commit('SET_TOKEN', access_token);
            commit('SET_USER', user);

            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fakeLogin({ commit }, formData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(formData.email === fakeData.user.email && formData.password === fakeData.password) {
            commit('SET_TOKEN', fakeData.token);
            commit('SET_USER', fakeData.user);

            resolve();
          } else {
            if(formData.email !== fakeData.user.email) {
              reject({
                error: 'field',
                field: 'email',
                message: 'Пользователь не найден!'
              })
            } else if(formData.password !== fakeData.password) {
              reject({
                error: 'field',
                field: 'password',
                message: 'Не верный пароль!'
              })
            } else {
              reject({
                error: 'unknown',
                message: 'Неизвестная ошибка'
              })
            }
          }
        }, 1000);
      });
    },
    refresh({ state, commit }) {
      return new Promise((resolve, reject) => {
        if(state.token) {
          apiRequest
            .post('/auth/refresh')
            .then((result) => {

              const { access_token, user } = result.data;

              commit('SET_TOKEN', access_token);
              commit('SET_USER', user);


              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject();
        }
      })
    },
    fakeRefresh({ state, commit }) {
      return new Promise((resolve, reject) => {
        if(state.token) {
          setTimeout(() => {
            if(state.token === fakeData.token) {
              commit('SET_TOKEN', fakeData.token);
              commit('SET_USER', fakeData.user);
  
              resolve();
            } else {
              reject();
            }
          }, 300);
        } else {
          reject();
        }
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        apiRequest
          .post('/auth/logout')
          .then(() => {
            commit('REMOVE_USER');

            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      })
    },
    fakeLogout({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('REMOVE_USER');
          resolve();
        }, 1000);
      })
    },
  },
};