import _ from 'lodash';
import { SET_TODO } from './mutation-types';

export const state = () => ({
  list: [
    { text: 'wrting', done: true },
    { text: 'reading', done: true },
    { text: 'listening', done: true },
  ],
});

export const getters = {
  getTodos: (state) => state.list,
};

export const actions = {
  addTodo({ state, commit }, text) {
    const cloneTodos = _.cloneDeep(state.list) || [];
    const newTodos = [
      ...cloneTodos,
      {
        text,
        done: false,
      },
    ];
    commit(SET_TODO, newTodos);
  },
  updateTodo({ state, commit }, index) {
    const cloneTodos = _.cloneDeep(state.list) || [];
    cloneTodos[index] = {
      text: state.list[index].text,
      done: !state.list[index].done,
    };
    commit(SET_TODO, cloneTodos);
  },
  removeTodo({ state, commit }, index) {
    const cloneTodos = _.cloneDeep(state.list) || [];
    commit(
      SET_TODO,
      _.filter(cloneTodos, (item, idx) => idx !== index),
    );
  },
};

export const mutations = {
  [SET_TODO](state, payload) {
    state.list = payload;
  },
};
