<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: String,
  initialValue: {
    type: Number,
    default: 0
  }
})

const counter = ref(props.initialValue)
const doubledValue = computed(() => counter.value * 2)

const increment = () => {
  counter.value++
}

const decrement = () => {
  counter.value--
}

const reset = () => {
  counter.value = props.initialValue
}
</script>

<template>
  <div class="new-component">
    <h2>{{ title }}</h2>
    <div class="counter-display">
      <p>Count: {{ counter }}</p>
      <p>Doubled: {{ doubledValue }}</p>
    </div>
    <div class="controls">
      <button @click="increment" class="btn-increment">+</button>
      <button @click="decrement" class="btn-decrement">-</button>
      <button @click="reset" class="btn-reset">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.new-component {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px 0;
}

.counter-display {
  margin: 15px 0;
}

.controls {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-increment {
  background-color: #4CAF50;
  color: white;
}

.btn-decrement {
  background-color: #f44336;
  color: white;
}

.btn-reset {
  background-color: #2196F3;
  color: white;
}
</style>
