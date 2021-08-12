Nuxt Vuex
================================================================

Vuex는 상태 관리 패턴이자 라이브러리입니다. 프로젝트 내의 여러 컴포넌트를 쉽고 효율적으로 관리할 수 있도록 도와줍니다.

```js
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
```
Vuex는 2가지 모드를 지원하지만, 버전3부터 클래식모드를 지원하지 않으므로 모듈 모드를 사용하시는 것을 권장드립니다.  
store/index.js 파일에 state와 mutations, actions등을 export하면
Vuex에서 자동으로 파일 명과 동일한 하나의 모듈로 인식합니다.

```js
// store/index.js
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
```
Nuxt Store 사용법
===

### **1. 모듈 생성**
Vuex는 단일 상태 트리를 사용합니다. 즉, 이 단일 객체는 모든 애플리케이션 수준의 상태를 포함하며, '원본 소스'의 역할을 합니다. 이는 각 애플리케이션마다 하나의 저장소만 갖게 된다는 것을 의미합니다.

`state`(상태): 컴포넌트 간 공유할 데이터입니다. 초기값과 함께 사용할 데이터를 정의하여주세요.  
`mutations`: 상태값을 변경할 때 사용합니다.

```js
// store/todos.js
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
```
### **2. state 변경**
```js
// mutations에 등록합니다.
export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
```

```vue
<template>
  <!-- checkbox가 클릭될때 toggle 메소드를 실행 -->
  <li v-for="todo in todos" :key="todo.text">
    <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
    <span :class="{ done: todo.done }">{{ todo.text }}</span>
  </li>
  <!-- 엔터 시 addTodo 메소드 실행 -->
  <li><input @keyup.enter="addTodo" placeholder="What needs to be done?"></li>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    // commit 또는 mapMutations를 이용하여 state를 변경할 수 있습니다.
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>
```

### 3. **state 조회**
`this.$store`에 store 정보가 담겨있으며, 아래와 같이 `computed` method를 이용하여
store에 저장되어 있는 state값을 가지고 올 수 있습니다.
```js
export default {
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
}
```
Reference
===

[NuxtJS - Store 공식 문서](https://nuxtjs.org/docs/2.x/directory-structure/store)  
[Nuxt Vuex 안내서](https://develop365.gitlab.io/nuxtjs-0.10.7-doc/ko/guide/vuex-store/)  

[Vuex 공식 문서](https://vuex.vuejs.org/kr/guide/state.html)  
[Vuex 이해를 돕기 위한 글](https://kshman94.tistory.com/128)  
[Vuex 이해를 돕기 위한 글2](https://nykim.work/77?category=785004)  
