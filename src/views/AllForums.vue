<template>
  <div>
    <div v-if="summaries" class="forum-content-page">
      <div class="forum-content-page-top-bar">
         <forum-path-header :path=[]></forum-path-header>
      </div>
      <div class="forum-summary-header">
        <div> Forum </div>
        <div> Posts </div>
        <div> Last Post </div>
        <div> Votes </div>
      </div>
      <forum-summary 
        v-for="summary in summaries" 
        :key=summary.encodedPath
        :summary=summary
        >
      </forum-summary>
    </div>
    
    <loading v-if="loading"></loading>
    <p v-if="errored" class="loading-errored"> {{ errored }} </p>

  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import { queryForum, ForumTreeNode } from 'decent-forum-api';
import { SharedState } from '../ui-lib';
import { summarizeForum, ForumSummary } from '../ui-lib/transforms';
import { scoreByVotesAndTime } from 'decent-forum-api/sorting';

export default Vue.extend({
  
  props: {
    shared: {
      type: Object as () => SharedState,
      required: true,
    }
  },

  computed: {
    summaries: function(): ForumSummary[] | null {
      const s = !this.forums ? null : this.forums.map(x => summarizeForum(x, false))
      if (s) {
        s.sort((a, b) => {
          var scoreA = scoreByVotesAndTime(a.votes.upVotes, a.votes.downVotes, a.lastPostTime);
          var scoreB = scoreByVotesAndTime(b.votes.upVotes, b.votes.downVotes, b.lastPostTime);
          return scoreB - scoreA;
        })
      }
      return s;
    }
  },

  data() {
    return {
      forums: null as null | ForumTreeNode[],
      loading: true, 
      errored: false  as false | string
    }
  },

  async created() {
    this.loadForums();
  },

  methods: {
    async loadForums() {
      this.loading = true;
      this.errored = false; 
      this.forums = null;
      try {
        const data = await queryForum([], this.shared.cache, 5, 8);
        this.forums = Object.values(this.shared.cache.forums.children)
        this.loading = false; 
        this.errored = false;
      } catch (e) {
        this.errored = 'An unknown error occured. We will try again momentarialy'
        this.loading = false;
        console.error(e);
        setTimeout(() => this.loadForums(), 4000);
      }
    }
  }

});
</script>
