<template>
  <div>
    <div v-if="rootNode" class="forum-content-page">
    <div class="forum-content-page-top-bar">
      <forum-path-header :path=path :extraSegment=postTitle></forum-path-header>
    </div>
     
    <thread-post :postNode=rootNode :shared=shared>
    </thread-post>
     <transition-group name="list" tag="div">
      <thread-post v-for="(n) in flatReplies" :key=n.id :postNode=n :shared=shared>
      </thread-post>
     </transition-group>
    </div>
    <div v-else>
      ...
    </div>
  </div>
  
</template>

<style>

</style>

<script lang="ts">

import Vue from 'vue'
import { PostTreeNode, CachedForumPost, queryPosts, decodeForumPath } from 'decent-forum-api';
import { queryThread } from 'decent-forum-api/query/query';
import { SharedState } from '@/ui-lib';
import { scoreByVotesAndTime, sortPostNodes } from '../../../decent-forum-api/src/sorting';

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
    console.info(`Querying thread ${this.txId}`);
    const t = Date.now();
    this.rootNode = this.shared.cache.findPostNode(this.txId);

    await queryThread(this.txId, 5, this.shared.cache);
    this.rootNode = this.shared.cache.findPostNode(this.txId);

    console.info(`Got posts in ${(Date.now() - t) / 1000} seconds`);
  },

  computed: {

    path: function(): string[] {
      return this.rootNode ? this.rootNode.forum.segments : [];
    },

    postTitle: function(): string {
      return this.rootNode ? (this.rootNode.post.tags.description || '') : ''
    },

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
      replies.sort(sortPostNodes);
      return replies;
    }
  }

})
</script>