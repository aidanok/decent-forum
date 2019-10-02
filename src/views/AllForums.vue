<template>
  <div class="all-forums">
    <div v-if="summaries">
      <forum-summary 
        v-for="summary in summaries" 
        :key=summary.encodedPath
        :summary=summary
        >
      </forum-summary>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import { queryPosts, ForumTreeNode } from 'decent-forum-api';
import { SharedState } from '../ui-lib';
import { summarizeForum, ForumSummary } from '../ui-lib/transforms';

export default Vue.extend({
  
  props: {
    shared: {
      type: Object as () => SharedState,
      required: true,
    }
  },

  computed: {
    summaries: function(): ForumSummary[] | null {
      return !this.forums ? null : 
        this.forums.map(x => summarizeForum(x, false))
    }
  },

  data() {
    return {
      forums: null as null | ForumTreeNode[]
    }
  },

  async created() {
    const data = await queryPosts([], this.shared.cache);
    this.forums = Object.values(this.shared.cache.forums.children)
  }
});
</script>
