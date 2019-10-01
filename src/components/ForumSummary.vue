<template>
  <router-link class="forum-summary" :to="`/forum/${summary.encodedPath}`">
    <div> {{ summary.path | displayForumPath }} </div>
    <div> {{ summary.posts }} Posts </div>
    <div> {{ summary.lastPostTime | moment('from') }} </div>
    <div> + {{ summary.votes.upVotes}} </div>
    <div> - {{ summary.votes.downVotes }} </div>
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