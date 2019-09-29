<template>
  <div>
    A thread...
    <thread-post v-if="rootNode" :postNode=rootNode>
    </thread-post>

    <div v-else>
      Problem
    </div>
  </div>
</template>

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