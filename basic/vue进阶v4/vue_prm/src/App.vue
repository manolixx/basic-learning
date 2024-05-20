<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld>
      <!-- 默认插槽 - default -->
      <template>
        <p>{{ msg }}</p>
        <p>{{ msg1 }}</p>
        <p>{{ msg2 }}</p>
      </template>
      <!-- 具名插槽 - name -->
      <template v-slot:header>{{ header }}</template>
      <template v-slot:footer>{{ footer }}</template>
      <!-- 作用域插槽 -->
      <template slot="content" slot-scope="{ slotProps }">
        {{ slotProps }}
      </template>
    </HelloWorld>
    <!-- 组件化 -->
    <HelloWorld2></HelloWorld2>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import HelloWorld2 from './components/HelloWorld2.vue';
export default {
  name: 'App',
  components: {
    HelloWorld,
    HelloWorld2
  },
  data() {
    return {
      msg: 'zhaowa start',
      msg1: 'zhaowa start1',
      msg2: 'zhaowa start2',
      header: 'zhaowa header',
      footer: 'zhaowa footer',
    }
  },
  created() {
    console.log('father created')
  },
  mounted() {
    console.log('father mounted')
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
