<script setup>

import Button from 'primevue/button';

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-slate-300">
    <h1>{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
    </h3>
    <Button label="Submit"></Button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
