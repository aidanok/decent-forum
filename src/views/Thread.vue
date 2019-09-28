<template>
  <div>
    A thread...
    <div v-if="rootNode" class="thread-post root-post">
      <h4> {{ rootNode.post.tags.description }} </h4>
      <p> {{ rootNode.post.content }} </p>
    </div>
    <div v-else>
      Problem
    </div>
  </div>
</template>

<style>
  .thread-post {
    border: 2px dashed rgba(24,255,24,0.4);
    margin-left: 3em;
    margin-right: 3em;
    text-align: left;
    padding: 0em 1em;
    border-radius: 0.3em;
  }
  .thread-post.root-post h4 {
    padding: 1em;
    margin-top: 0em;
    border-bottom: 2px dashed rgba(115, 150, 112, 0.7);
  }
  .thread-post p {
    padding: 0.2em 1em;
  }
</style>

<script lang="ts">

import Vue from 'vue'
import { PostTreeNode, CachedForumPost, queryPosts } from 'decent-forum-api';
import { queryThread } from '../../../decent-forum-api/src/query/query';
import { SharedState } from '@/ui-types';

export default Vue.extend({

  props: {
    txId: {
      type: String,
      required: true,
    },
    expanded: {
      type: Boolean, 
      default: true, 
    },
    shared: {
      type: Object as () => SharedState,
      required: true
    },
  },

  async created() {
    console.log(`Querying thread ${this.txId}`);
    const t = Date.now();
    const posts = await queryThread(this.txId, 2, this.shared.cache);
    console.log(`Got posts in ${(Date.now() - t) / 1000} seconds`);
  },

  computed: {
    rootNode: function(): PostTreeNode | undefined {
      console.log('computed changed...', this.txId);
      const n = this.shared.cache.findPostNode(this.txId) 
      return n;
    },
    /*replies: function(): CachedForumPost[] {
      return Object.values(this.postNode.replies).map(node => node.post)
    }*/
  }

})
</script>