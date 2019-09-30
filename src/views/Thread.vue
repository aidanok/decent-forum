<template>
  <div>
    <div v-if="rootNode">
      <h3 class="thread-forum-title"> 
        {{ forumTitle.join(' > ')}}
      </h3>
    <thread-post :postNode=rootNode :shared=shared>
    </thread-post>
    <thread-post v-for="(n, k) in flatReplies" :key=k :postNode=n :shared=shared>
    </thread-post>
    </div>
    <div v-else>
      ...
    </div>
  </div>
  
</template>

<script lang="ts">

import Vue from 'vue'
import { PostTreeNode, CachedForumPost, queryPosts, decodeForumPath } from 'decent-forum-api';
import { queryThread } from 'decent-forum-api/query/query';
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

  data: () => ({
    rootNode: null as PostTreeNode | null
  }),

  async created() {
    console.log(`Querying thread ${this.txId}`);
    const t = Date.now();
    this.rootNode = await queryThread(this.txId, 5, this.shared.cache);
    console.log(`Got posts in ${(Date.now() - t) / 1000} seconds`);
  },

  computed: {
    forumTitle: function(): string[] {
      return this.rootNode ? 
        decodeForumPath(this.rootNode.post.tags.path0)
        :
        [] as string[]
    },
    flatReplies: function(): PostTreeNode[] {
      const replies = [] as PostTreeNode[];
      if (!this.rootNode) {
        return replies;
      }
      const recurse = (n: PostTreeNode) => {
        Object.values(n.replies).forEach(n => {
          if (n.isContentFiled()) {
            replies.push(n);
          }
          recurse(n);
        })
      }
      recurse(this.rootNode);
      console.log(replies);
      return replies;
    }
    /*replies: function(): CachedForumPost[] {
      return Object.values(this.postNode.replies).map(node => node.post)
    }*/
  }

})
</script>