<template>

  <div class="votes-display">
    <div> {{ votesTotal }} </div>
    <!--
    <div>+{{votes.upVotes}} </div> 
    <div>-{{votes.downVotes}}  </div>
    -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    votes: { 
      type: Object as () => { upVotes: number, downVotes: number },
      required: true,
    }
  },
  computed: {
    votesTotal: function(): string {
      const n = this.votes.upVotes - this.votes.downVotes;
      if (n >=0 ) {
        return `+${n}`
      }
      return n.toString();
    }
  }
})
</script>