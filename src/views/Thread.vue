<template>
  <div>
    <div v-if="rootNode" class="forum-content-page">
    <div class="forum-content-page-top-bar">
      <forum-path-header :path=path :extraSegment=postTitle></forum-path-header>
    </div>
     
    <!-- <thread-post :postNode=rootNode :shared=shared>
    </thread-post> -->
     
     <!-- <transition-group name="fade" tag="div"> -->
      
      <thread-post 
        v-for="(info) in flattened" 
        :key="info.node.id + info.node.editCount()"
        :postNode=info.node
        :level=info.lvl
        :bad=info.bad
        :shared=shared>
      </thread-post>
      

     <!-- </transition-group> -->
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
import { PostTreeNode, decodeForumPath } from 'decent-forum-api';
import { queryThread } from 'decent-forum-api/query/query-thread';
import { SharedState } from '@/ui-lib';
import { scoreByVotesAndTime, sortPostNodes } from 'decent-forum-api/sorting';

function sortPostNodeArray(a: PostTreeNode, b: PostTreeNode) {
  const votesA = a.getAggregatedVotes();
  const votesB = b.getAggregatedVotes();
  const scoreA = scoreByVotesAndTime(votesA.upVotes, votesA.downVotes, a.post.date);
  const scoreB = scoreByVotesAndTime(votesB.upVotes, votesB.downVotes, b.post.date);
  return scoreB - scoreA;
}

type ThreadRow = { 
  lvl: number, 
  node: PostTreeNode, 
  votes: { upVotes: number, downVotes: number },
  bad: boolean
  showBad: boolean
};

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
    await queryThread(this.txId, this.shared.cache);
    this.rootNode = this.shared.cache.findPostNode(this.txId);
    console.info(`Got posts in ${(Date.now() - t) / 1000} seconds`);
  },

  computed: {

    path: function(): string[] {
      return this.rootNode ? this.rootNode.forum.segments : [];
    },

    postTitle: function(): string {
      return this.rootNode ? (this.rootNode.getLastestEdit().post.tags.description || '') : ''
    },

    forumTitle: function(): string[] {
      return this.rootNode ? 
        decodeForumPath(this.rootNode.post.tags.path0)
        :
        [] as string[]
    },

    flattened: function(): null | (ThreadRow[]) {
      const replies = [] as PostTreeNode[];
      
      const flattened: 
        ThreadRow[] = [];
      
      if (!this.rootNode) {
        return null;
      }

      let currentLevel = 0;

      flattened.push({ bad: false, showBad: false, lvl: currentLevel , node: this.rootNode, votes: this.rootNode.getAggregatedVotes()});
      let idx = 0
      while(idx < flattened.length) {
        const next = flattened[idx];
        currentLevel++;
        const sortedReplies = Object.values(next.node.replies).sort(sortPostNodeArray)
          .map(node => ({ bad: false, showBad: false, lvl: next.lvl + 1, node, votes: node.getAggregatedVotes() }));

        flattened.splice(++idx, 0, ...sortedReplies);
      }
      flattened.forEach(x => {
        if (x.votes.upVotes - x.votes.downVotes < 0) {
          x.bad = true;
        }
      })
      console.log(`Sorted Thread`, flattened.map(x => ({ lvl: x.lvl, votes: x.votes.upVotes-x.votes.downVotes })));
      return flattened;
    }
  }

})
</script>