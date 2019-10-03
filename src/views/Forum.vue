<template>
  <div>
    <div v-if="summarized" class="forum-content-page">
      
      <div class="forum-content-page-top-bar">
        <forum-path-header :path=summarized.path></forum-path-header>

        <router-link :to="`/post/${encodedPath}`">
          New Thread
          <i class="ri-discuss-fill"></i>
        </router-link>

      </div>
      
      <div class="forum-thread-summary-header">
        <div> Thread </div> 
        <div> Started By </div>
        <div> Last Post Time </div>
        <div> Votes </div>
      </div>

      <router-link
        :to="`/thread/${thread.id}`" 
        class="forum-thread-summary" 
        v-for="(thread, index) in summarized.threads" 
        :key=index
        @click=" $router.push({path: `/thread/${thread.id}`}) "
      >
        <div class="thread-title"> {{ thread.description }} </div>
        <wallet-address class="thread-started-by" :address=thread.from></wallet-address>
        <div class="last-post-time">{{ thread.lastPostTime | moment('from') }}</div>
        <votes-display :votes=thread> </votes-display>


      </router-link>
    </div>
    <div class="empty-forum" v-if="noPosts">
      <p>
        There are no posts here yet ! <i class="ri-fire-line"></i> 
      </p>
      <p>
        You can post the first thread and create the forum
      </p>
      <new-post :path=path :shared=shared @posted="firstPosted"></new-post>
    </div>
    <div v-if="!noPosts && !summarized" class="loading-centered lds-dual-ring"></div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import { SharedState } from '@/ui-lib';
import { queryPosts, ForumTreeNode, encodeForumPath } from 'decent-forum-api';
import { SimpleForumContents, summarizeForum, simpleForumContents } from '@/ui-lib/transforms';
import { scoreByVotesAndTime } from 'decent-forum-api/sorting';

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
      const s = this.forumNode && simpleForumContents(this.forumNode);
      if (s) {
        s.threads.sort((a, b) => {
          var scoreA = scoreByVotesAndTime(a.upVotes, a.downVotes, a.lastPostTime);
          var scoreB = scoreByVotesAndTime(b.upVotes, b.downVotes, b.lastPostTime);
          return scoreB - scoreA;
        })
      }
      return s;
    },

    encodedPath: function(): string {
      return encodeForumPath(this.path);
    }
  },

  watch: {
    'path': function(val) {
      this.loadForum();
    }
  },

  methods: {
    async loadForum() {
      this.forumNode = null;
      this.error = null;
      this.noPosts = false;

      console.info(`Loading forum: ${this.path.join(' > ')}`);
      //this.forumNode = this.shared.cache.findForumNode(this.path);
      await queryPosts(this.path, this.shared.cache, true);
      this.forumNode = this.shared.cache.findForumNode(this.path);
      if (!this.forumNode) {
        this.noPosts = true;
      }
    },
    firstPosted() {
      this.loadForum();
    }
  },

  created() {
    this.loadForum();
  }

})
</script>