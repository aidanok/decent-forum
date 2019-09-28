<template>
  <section class="forum-view">
    <h4> {{ forum.segments.join(' > ') }} </h4>
    <div class="forum-thread" v-for="(p, index) in forum.posts" :key=index>
      {{ p.post.tags.description }} 
    </div>
  </section>
</template>

<script lang="ts">

import Vue from 'vue'
import { ForumTreeNode } from 'decent-forum-api';

export default Vue.extend({
  props: {
    forum: {
      type: Object as () => ForumTreeNode,
      required: true
    }
  }
})
</script>