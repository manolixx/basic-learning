<template>
  <div class="hello">
    {{ msg }}
    {{ addMsg }}
    {{ calcNumber(number) }}
    <!-- vueTemplateCompiler -->
    <div>
      浮点数操作
      <h3>{{ number.toFixed(2) }}</h3>
    </div>
    <div>
      整形操作？
      <h3>{{ parseInt(number, 10) }}</h3>
    </div>
    <div>
      函数加工？
      <h3>{{ calcNumber(number) }}</h3>
    </div>
    <!-- 条件类型 -->
    <div>
      三元运算？
      <h3>100 > 99:{{ 100 > 99 ? '对' : '错' }}</h3>
    </div>
    <div>
      逻辑运算？
      <h3>100 > 99 && 100 > 98:{{ 100 > 99 && 100 > 98 }}</h3>
    </div>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'welcome to zhaowa',
      number: 0
    }
  },
  computed: {
    addMsg() {
      return this.msg + this.number
    }
  },
  methods: {
    calcNumber(num) {
      return num + 2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
