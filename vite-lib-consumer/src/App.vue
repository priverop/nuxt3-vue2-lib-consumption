<script setup>
import {LibraryComponent} from '@dcrall/vite-test-lib'
</script>

<template>
  <div>
    <h1>Vite app</h1>

    <LibraryComponent>
      Consuming library
    </LibraryComponent>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
