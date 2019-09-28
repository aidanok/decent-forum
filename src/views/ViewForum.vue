<template>
  <div>
    <div v-if="forumNode">
      <h4> {{ forumNode.segments.join(' > ') }} </h4>
      <div class="forum-thread" v-for="(p, index) in forumNode.posts" :key=index>
        {{ p.post.tags.description }} 
      </div>
    </div>
    <div v-else> ... </div>
  </div>
</template>


<script lang="ts">

import Vue from 'vue'
import { SharedState } from '@/ui-types';
import { queryPosts, ForumTreeNode } from 'decent-forum-api';

export default Vue.extend({
  props: {
    shared: {
      type: Object as () => SharedState,
      required: true
    },
    path: {
      type: Array as () => string[],
      required: true
    },
  },

  computed: {
    forumNode: function(): null | ForumTreeNode {
      const node = this.shared.cache.findForumNode(this.path)
     
      console.log(`forumNodeChanged`, node);
      return node;
    }
  },

  created() {
    if (!this.shared.cache.findForumNode(this.path)) {
      console.info(`Forum ${this.path.join('>')} not found in cache, refreshing cache`);
      queryPosts(this.shared.cache);
    }
  }

})
</script>