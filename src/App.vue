<script setup>
import { ref } from 'vue'

const count = ref(0)
console.log("12")
function increment() {
  count.value++
}
</script>

<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="increment">Click me!</button>
  </div>
</template>

<style scoped>
div {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

button {
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #369870;
}
</style>
