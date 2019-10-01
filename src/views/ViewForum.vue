<template>
  <div>
    <div v-if="summarized">
      <forum-path-header :path=summarized.path></forum-path-header>
      <div
        role="button" 
        class="forum-thread-summary" 
        v-for="(thread, index) in summarized.threads" 
        :key=index
        @click=" $router.push({path: `/thread/${thread.id}`}) "
      >
        <div class="thread-title"> {{ thread.description }} </div>
        <wallet-address :address=thread.from></wallet-address> 
        <div class="thread-score"> {{ thread.upVotes }} </div>
      </div>
    </div>
    <div v-else class="loading-centered lds-dual-ring"></div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import { SharedState } from '@/ui-lib';
import { queryPosts, ForumTreeNode } from 'decent-forum-api';
import { SimpleForumContents, summarizeForum, simpleForumContents } from '@/ui-lib/transforms';

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

  data: () => ({
    forumNode: null as null | ForumTreeNode,
    error: null as string | null,
    noPosts: false, 
  }),

  computed: {
    summarized: function(): SimpleForumContents | null {
      return this.forumNode && simpleForumContents(this.forumNode);
    }
  },

  watch: {
    'path': function(val) {
      this.loadForum();
    }
  },

  methods: {
    async loadForum() {
      console.info(`Loading forum: ${this.path.join(' > ')}`);
      //this.forumNode = this.shared.cache.findForumNode(this.path);
      await queryPosts(this.path, this.shared.cache, true);
      this.forumNode = this.shared.cache.findForumNode(this.path);
      if (!this.forumNode) {
        this.noPosts = true;
      }
    }
  },

  created() {
    this.loadForum();
  }

})
</script>