<template>
  <div class="main" v-if="!error">
    <article class="article">
      <h1 class="title">{{title}}</h1>
      <p class="subtitle">{{date}}<span class="author">{{author}}</span></p>
      <section v-html="content"></section>
    </article>
  </div>
  <div v-else-if="error">
    <p class="error">页面不存在</p>
  </div>
</template>

<script>
  require('es6-promise').polyfill();
  import moment from 'moment'
  import axios from 'axios'
  import api from './api'

  export default {
    name: 'app',
    data() {
      return {
        title: '',
        date: '',
        author: '',
        content: '',
        error: false
      }
    },
    created() {
      let id = this.getQuery('id')
      axios.get(`${api.api_url}/api/article/detail/${id}`).then(resp => {
        let res = resp.data || {}
        if (res.code === 0 && res.data) {
          this.title = res.data.title || ''
          this.author = res.data.author || ''
          this.date = moment(res.data.createdDate || new Date()).format('YYYY-MM-DD')
          this.content = res.data.richText || ''
        } else {
          console.log(res)
          this.error = true
        }
      }).catch(err => {
        console.log(err)
        this.error = true
      })
    },
    methods: {
      getQuery(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return (r[2])
        return null
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
  }

  .main {
    width: 100%;
    max-width: 670px;
    margin: 0 auto;
  }

  .article {
    padding: 20px 15px 15px;
  }

  .title {
    font-size: 24px;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 10px;
  }

  .subtitle {
    margin-bottom: 18px;
    line-height: 20px;
    font-size: 16px;
    color: #8c8c8c;
  }

  .author {
    padding-left: 15px;
  }

  .error {
    padding: 15px;
    text-align: center;
  }
</style>
