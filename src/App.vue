<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
body {
  background-image: url('./assets/background.png');
  background-repeat: repeat;
  padding: 5% 10%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 75vh;
}

li {
  list-style: none;
}

ul {
  padding: 0;
}

p, h1, h2, h3 {
  margin: 0;
  padding: 0;
}
</style>
