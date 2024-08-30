<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Vue.js To-Do App</h1>
        <AddTodo @add-todo="addTodo" />
        <v-list>
          <v-list-item
            v-for="(todo, index) in todos"
            :key="index"
            @click="$router.push({ name: 'TodoDetail', params: { id: todo,id } })"
          >
            <template v-slot:prepend>
              <v-checkbox
                v-model="todo.completed"
                @click.stop="toggleTodoStatus(todo)"
                hide-details
              />
            </template>
            
            <v-list-item-title>{{ todo.title }}</v-list-item-title>
            
            <template v-slot:append>
              <v-btn icon="mdi-delete" size="small" @click.stop="removeTodo(todo.id)">
              </v-btn>
            </template>
          </v-list-item>
        </v-list>

        <!-- 페이징 UI -->
         <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="fetchTodos"
          />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddTodo from './AddTodo.vue'
import todoService from '@/services/todoService';


export default {
  name: 'ToDoList',
  components: { AddTodo },
  data() {
    return {
      todos: [],
      currentPage: 1, //현재 페이지
      totalPages: 1, //총 페이지 수
      pageSize: 10. //페이지 당 개수

    }
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await todoService.getTodos(this.currentPage - 1, this.pageSize)
        console.log(response)
        this.todos = response.data.content
        this.totalPages = response.data.totalPages
      } catch (error) {
        console.error('Error fetchTodos todo : ', error)
      }
    },
    async toggleTodoStatus(todo) {
      try {
        const updateTodo = {...todo, completed: !todo.completed}
        const response = await todoService.updateTodo(todo.id, updateTodo)
        //this.todos = this.todos.map( t => t.id === todo.id ? updateTodo : t)
        this.fetchTodos()
      } catch(error) {
        console.error('Error fetchTodos todo : ', error)
      }
    },
    async addTodo(todoTitle) {
      try {
        const newTodo = {title: todoTitle, completed: false}
        const response = await todoService.createTodo(newTodo)
        //this.todo.push(response.data)
        this.fetchTodos()
      } catch(error) {
        console.error('Error fetchTodos todo : ', error)
      }
    },
    async removeTodo(id) {
      try {
       await todoService.deleteTodo(id)
       //this.todos = this.todos.filter( todo => todo.id !== id)
       this.fetchTodos()
      } catch(error) {
        console.error('Error fetchTodos todo : ', error)
      }
    }
  },
  created() {
    this.fetchTodos();
  }
}
</script>