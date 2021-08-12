<template>
  <v-row justify="center" align="center">
    <v-col cols="7">
      <v-card class="py-4 px-4">
        <h1 class="title">Todos를 이용한 Vuex 예제</h1>
        <p class="ma-0 caption">store/readme.md를 확인하여 주세요</p>
        <v-container>
          <v-text-field v-model="todoText" @keyup.enter="createTodo">
            <v-icon
              slot="append"
              color="green"
              @click.prevent="clickCreateTodo"
            >
              mdi-plus
            </v-icon>
          </v-text-field>

          <ul class="todo-list pa-0">
            <template v-for="(todo, index) in getTodos">
              <li :key="index">
                <input
                  :checked="todo.done"
                  type="checkbox"
                  @change="updateTodo(index)"
                />
                <span :class="{ done: todo.done }" v-text="todo.text"></span>
                <v-icon
                  slot="append"
                  color="red"
                  @click.prevent="deleteTodo(index)"
                >
                  mdi-close
                </v-icon>
              </li>
            </template>
          </ul>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      todoText: '',
    };
  },
  computed: {
    ...mapGetters({
      getTodos: 'todos/getTodos',
    }),
  },
  methods: {
    ...mapActions({
      addTodo: 'todos/addTodo',
      updateTodo: 'todos/updateTodo',
      removeTodo: 'todos/removeTodo',
    }),
    createTodo(e) {
      this.addTodo(e.target.value);
      e.target.value = '';
      this.todoText = '';
    },
    clickCreateTodo() {
      this.addTodo(this.todoText);
      this.todoText = '';
    },
    deleteTodo(index) {
      this.removeTodo(index);
    },
  },
};
</script>

<style>
.done {
  text-decoration: line-through;
}

.todo-list {
  list-style-type: none;
}
</style>
