<template>
  <router-link class="forum-summary" :to="`/forum/${summary.encodedPath}`">
    <div class="forum-summary-forum-name"> {{ summary.path | displayForumPath }} </div>
    <div class="forum-summary-forum-posts"> {{ summary.posts }} Posts </div>
    <div class="forum-summary-forum-last-time"> {{ summary.lastPostTime | moment('from') }} </div>
    <votes-display :votes=summary.votes></votes-display>
  </router-link>
</template>

<script lang="ts">

import Vue from 'vue'
import { ForumSummary } from '../ui-lib/transforms';

export default Vue.extend({
  props: {
    summary: {
      type: Object as () => ForumSummary,
      required: true
    }
  },
})
</script>