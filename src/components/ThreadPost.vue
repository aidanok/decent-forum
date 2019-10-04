<template>
  <!-- These css vars DONT get inherited.. boo ! -->
  <div 
    :style="{ '--post-level': level}" 
    v-bind:class="{'thread-post-is-root': level === 0 }" 
    class="thread-post-container">
  <div v-if="!bad || showBadPost">
  <div class="thread-post-edit"> 

  </div>
  <div class="thread-post" v-bind:class="{ 'is-users-post': isUsersPost }">
    
    
    <i role="button" @click="editing = true" class="edit-icon ri-edit-box-line"></i>

    <div v-if="postNode.isRootPost()" class="thread-post-title">
      <input v-if="editing" type="text" class="title-edit" v-model="editTitle">
      <h3 v-else> {{ postNode.post.tags.description }} </h3>
    </div>

    <div class="thread-post-time">
      {{ postNode.post.date | moment('from') }}
    </div>

    <wallet-address class="thread-post-from" :address=postNode.post.from></wallet-address>
    
    <div class="thread-post-info">
    </div>

    <div class="thread-post-content">
      {{ postNode.post.content }}
    </div>

    <div class="thread-post-footer">
    </div>

    <!-- TODO Make these top level grid items to allow for full customization -->
    <!-- TODO removee opacity hack and put in a close button or something -->
    <div class="thread-post-vote">
      <a role="button" 
        v-bind:style="{ 'opacity': replying ? 0.0 : 1.0 }" 
        @click="replying = !replying" 
        class="thread-post-reply-button"
      >
        Reply <i class="ri-reply-line"></i>
      </a>
      <i 
        @click=upVote 
        role="button" 
        v-bind:class="{ 'button-icon-disabled': voting || voted  || isUsersPost }"
        v-tooltip="{ 
          trigger: 'hover', 
          autoHide: true, 
          hideOnTargetClick: true, 
          delay: { show: loggedIn ? 400 : 800, hide: 100 }, 
          content: upVoteTooltip, 
          placement: 'bottom',
        }"
        class="ri-thumb-up-line button-icon">
      </i>
      <i
        @click=downVote
        v-tooltip="{ 
          trigger: 'hover', 
          autoHide: true, 
          hideOnTargetClick: true, 
          delay: { show: loggedIn ? 400 : 800, hide: 100 }, 
          content: downVoteToolTip, 
          placement: 'bottom',
        }"
        v-bind:class="{ 'button-icon-disabled': voting || voted || isUsersPost }"
        role="button"  
        class="ri-thumb-down-line button-icon">
      </i>
    </div>

    
  </div>
    <!-- TODO: keep state on close/re-open -->
    <post-reply 
      v-if="replying" 
      :replyToNode="postNode" 
      :shared="shared" 
      :showing="replying"
      @blur="replying = false"
      @posted-reply=postedReply
    >
    </post-reply>
  </div>
  <div v-if="bad && !showBadPost">
    <a class="bad-content-link" role="button" @click=showBad>
      Post by <wallet-address :address=postNode.post.from></wallet-address> hidden due to bad score
      Click to show. 
    </a>
  </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'

import { PostTreeNode, voteOnPost } from 'decent-forum-api';
import moment from 'moment';
import { CurrentUser, SharedState } from '../ui-lib';
import { scoreByVotesAndTime } from 'decent-forum-api/sorting'
import { wrapGrid } from 'animate-css-grid';

export default Vue.extend({
  props: {
    postNode: {
      type: Object as () => PostTreeNode,
      required: true,
    },
    shared: {
      type: Object as () => SharedState,
      required: true, 
    },
    level: {
      type: Number,
      default: 0,
    },
    bad: {
      type: Boolean,
      default: false,
    }, 
  },

  methods: {
    postedReply(id: string) {
      this.replying = false;
      this.$emit('posted-reply', id);
    },
    scoreByVotesAndTime(up: number, down: number, t: Date) {
      return scoreByVotesAndTime(up, down, t);
    },
    async vote(up: boolean) {
      if (this.voting || this.voted || !this.shared.user.loggedIn) {
        return; 
      }
      this.voting = true;
      try {
        const result = await voteOnPost(this.shared.user.wallet, this.postNode, up, this.shared.tracker);
        console.log(`Voted succesfully, txId: ${result}`);
        this.voted = true;
      } catch (e) {
        console.error(e);
        this.voting = false; 
      }
    },
    showBad() {
      this.showBadPost = true;
    },

    async upVote() {
      return this.vote(true);
    },
    async downVote() {
      return this.vote(false);
    }
  },

  computed: {
    cssVars: function (): Record<string, any> {
      return {
        "--post-time": moment(this.postNode.post.date).fromNow(),
      }
    },
    upVoteTooltip: function(): string {
      return this.shared.user.loggedIn ? 
        '<small>Up vote the post and give 0.1AR</small>'
        :
        'You are not logged in, you cannot vote'
    },

    downVoteToolTip: function(): string {
      return this.shared.user.loggedIn ? 
        '<small>Down vote the post for 0.1AR</small>'
        :
        'You are not logged in, you cannot vote'
    },
    loggedIn: function(): boolean {
      return this.shared.user.loggedIn;
    },
    isUsersPost: function(): boolean {
      return this.shared.user.loggedIn && (this.shared.user.walletAddress === this.postNode.post.from)
    }
  },

  data: () => ({
    replying: false,
    voted: false,
    voting: false, // while we wait for assync request
    showBadPost: false,
    editing: false,
  })
})
</script>