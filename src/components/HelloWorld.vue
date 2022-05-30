<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="() => $store.commit('add')">添加</button>
    <button @click="() => $store.dispatch('add')">异步添加</button>
    <div>{{ $store.state.count }}</div>
    <div>{{ $store.getters.doubleCount }}</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
