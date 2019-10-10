<template>
  <div 
    :style="{ '--post-level': level}" 
    v-bind:class="{'thread-post-is-root': level === 0 }" 
    class="thread-post-container">
  <div v-if="!bad || showBadPost">
  <div class="thread-post-edit"> 

  </div>
  <div class="thread-post" 
    v-bind:class="{ 
        'is-users-post': isUsersPost,
        'is-votes-disabled': isVotesDisabled,
        'is-pending-tx': isPendingTx,
        'is-editing': isEditing
    }">
    
    
    <edit-box-svg v-if="!isEditing && isUsersPost" 
      class="thread-post-edit-icon" 
      role="button" @click="isEditing = !isEditing" 
      v-tooltip="{ 
          trigger: 'hover', 
          autoHide: true,
          hideOnTargetClick: true, 
          delay: { show: 400, hide: 100 }, 
          content: '<small>Edit this post</small>', 
          placement: 'top',
        }"
      >
    </edit-box-svg>
    
    <exchange-svg v-if="!isEditing" class="thread-post-pending-icon"
      v-tooltip="{ 
          trigger: 'hover', 
          autoHide: true,
          hideOnTargetClick: true, 
          delay: { show: 600, hide: 100 }, 
          content: '<small>Waiting to be mined</br> Will not be seen by other users yet</small>', 
          placement: 'top',
        }">
    </exchange-svg>

    <!-- <div class="thread-post-edit-count"> 
      {{ editCount }} revisions <i class="ri-arrow-down-s-fill"></i>
    </div> -->
    
    <div class="thread-post-title" v-if="currentNode.isRootPost()" >
      <input 
        type="text" 
        class="thread-post-title-input" 
        v-model="description"
        :disabled="!isEditing"
      >
      <!-- <h3 v-else> {{ currentNode.post.tags.description }} </h3> -->
    </div>

    <div class="thread-post-time">

      <span v-if="editCount === 0">{{ currentNode.post.date | moment('from') }}</span>

      <v-popover v-if="editCount > 0" placement="bottom" popoverInnerClass="thread-post-edits-dropdown-popover">
        
        <div class="thread-post-time-with-edits">
          <span>{{ currentNode.post.date | moment('from') }}</span>
          <edit-line-svg></edit-line-svg>
        </div>

        <div slot="popover">
          <div class="thread-post-edits-dropdown" v-for="(edits, index) in editSummaries" :key="index"> 
            <a 
              class="thread-post-edit-summary" 
              @click="currentEdit = index"
              v-close-popover
              role="button"> 
              Edit {{ edits.date | moment("from") }}
            </a>
          </div>

        </div>
      </v-popover>
      
    </div>

    <wallet-address class="thread-post-from" :address=currentNode.post.from></wallet-address>
    
    <div class="thread-post-info">
    </div>

    <div class="thread-post-content">
      <span v-if="!isEditing" v-html="contentLinkified"></span>
      <textarea v-else class="thread-post-content-textarea" v-model="content"></textarea>
      
    </div>

    <div class="thread-post-footer">
    </div>

      <!-- TODO Make these top level grid items to allow for full customization -->
    <div v-if="!isEditing" v-bind:class="{ 'is-votes-disabled': isVotesDisabled }" class="thread-post-vote">
      
      <thumb-up-svg
        @click=upVote 
        role="button"
        class="vote-up-svg" 
        v-tooltip="{ 
          trigger: 'hover', 
          autoHide: true, 
          hideOnTargetClick: true, 
          delay: { show: isVotesDisabled ? 800 : 400, hide: 100 }, 
          content: upVoteTooltip, 
          placement: 'top',
        }"
        >
      </thumb-up-svg>

      <thumb-down-svg
        @click=downVote
        class="vote-down-svg"
        v-tooltip="{ 
          trigger: 'hover', 
          autoHide: true, 
          hideOnTargetClick: true, 
          delay: { show: isVotesDisabled ? 800 : 400, hide: 100 }, 
          content: downVoteToolTip, 
          placement: 'top',
        }" 
        role="button">
      </thumb-down-svg>
    </div>


    <a role="button" 
        v-if="!isEditing"
        @click="isReplying = !isReplying"
        class="thread-post-reply-button"
      >
        Reply <send-plane-svg></send-plane-svg>

    </a>

    <div v-if="isEditing"  class="edit-post-button-bar">
      <a role="button" @click="cancelEdit" class="thread-post-cancel-edit">
        Cancel<close-circle-svg></close-circle-svg>
      </a>

      <a vrole="button" @click="saveEdit" class="thread-post-save-edit">
        Save Edit<magic-svg></magic-svg>
      </a>
    </div>
    
  </div>
    <!-- TODO: keep state on close/re-open -->
    <post-reply 
      v-if="isReplying" 
      :replyToNode="currentNode" 
      :shared="shared" 
      :showing="isReplying"
      @blur="isReplying = false"
      @posted-reply=onPostedReply
    >
    </post-reply>
  </div>
  <div v-if="bad && !showBadPost">
    <a class="bad-content-link" role="button" @click=showBad>
      Post by <wallet-address :address=currentNode.post.from></wallet-address> hidden due to bad score
      Click to show. 
    </a>
  </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'

import { PostTreeNode, voteOnPost, buildPostTagsForEdit, postPost } from 'decent-forum-api';
import moment from 'moment';
import { CurrentUser, SharedState } from '../ui-lib';
import { scoreByVotesAndTime } from 'decent-forum-api/sorting'
import { wrapGrid } from 'animate-css-grid';
import { DOMPurify, LINK_ONLY_OPTIONS } from '@/ui-lib/dom-purify';

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
    onPostedReply(id: string) {
      this.isReplying = false;
      this.$emit('posted-reply', id);
    },
    scoreByVotesAndTime(up: number, down: number, t: Date) {
      return scoreByVotesAndTime(up, down, t);
    },

    cancelEdit() {
      this.content = this.currentNode.post.content || '';
      this.description = this.currentNode.post.tags.description || '';
      this.isEditing = false;
    },

    async saveEdit() {
      if (this.isSavingEdit) {
        return; 
      }
      console.log('SAVING EDIT');
       console.log('NODE EDIT COUNT:' + this.postNode.editCount())
      this.isSavingEdit = true;
      try {
        // make tags, copy description tag (title) 
        console.log('IHHJDFDFD?')
        const postTags = buildPostTagsForEdit(this.currentNode, { description: this.description });
        console.log(postTags);
        if (this.shared.user.loggedIn) {
          const id = await postPost(this.shared.user.wallet, this.content, postTags, this.shared.tracker);
          console.log(`Posted edit, id: ${id}`);
        } else {
          throw new Error('Not logged in.');
        }
      } catch (e) {
        // do somthing to alert the user?! 
        console.error(e);
        console.log(`CAUGHT ERROR SAVING EDIT`)
        this.isSavingEdit = false; 
        return; 
      }
      this.isSavingEdit = false; 
      this.isEditing = false; 
      
      
      await Vue.nextTick();
      this.currentEdit = this.postNode.editCount() - 1;
      // and again 
      await Vue.nextTick();
      await Vue.nextTick();
      this.copyNodeToModel();
      
    },

    async vote(up: boolean) {
      if (this.isVotesDisabled) {
        return;
      }
      this.voting = true;
      try {
        // This is just so user.wallet typechecks witj an any case. isVotesDisabled verifys the user is logged in.
        if (!this.shared.user.loggedIn) { throw Error('isVotesDisable is broken') }

        const result = await voteOnPost(this.shared.user.wallet, this.currentNode, up, this.shared.tracker);
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
    }, 

    copyNodeToModel() {
      this.content = this.currentNode.post.content || '<no-content>';
      this.description = this.currentNode.post.tags.description || '';
    }
  },

  watch: {
    'currentEdit': function(val) {
      this.copyNodeToModel();
    }
  },

  computed: {
    cssVars: function (): Record<string, any> {
      return {
        "--post-time": moment(this.currentNode.post.date).fromNow(),
      }
    },
    upVoteTooltip: function(): string {
      if (!this.shared.user.loggedIn) {
        return 'You are not logged in'
      }
      if (this.voting || this.voted) {
        return 'You already voted on this post'
      }
      if (this.isUsersPost) {
        return 'You cannot vote on your own post'
      }
      return '<small>Up vote the post and give 0.1AR</small>'
    },

    downVoteToolTip: function(): string {
      if (!this.shared.user.loggedIn) {
        return 'You are not logged in'
      }
      if (this.voting || this.voted) {
        return 'You already voted on this post'
      }
      if (this.isUsersPost) {
        return 'You cannot vote on your own post'
      }

      return '<small>Down vote the post for 0.1AR</small>'
    },
    loggedIn: function(): boolean {
      return this.shared.user.loggedIn;
    },
    isUsersPost: function(): boolean {
      return this.shared.user.loggedIn && (this.shared.user.walletAddress === this.currentNode.post.from)
    },
    isVotesDisabled: function(): boolean {
      return !!(this.isUsersPost || this.voted || this.voting || !this.shared.user.loggedIn);
    },
    isPendingTx: function(): boolean {
      return this.currentNode.isPendingTx
    },
    
    currentNode(): PostTreeNode {
      return this.postNode.getEdit(this.currentEdit);
    }, 
    editCount(): number {
      return this.postNode.getOriginalNode().editCount();
    }, 

    editSummaries(): { index: number, date: Date }[] {
      const tn = this.postNode.getOriginalNode(); 
      const sums = [tn, ...tn.edits].map((n, index) => ({ index, date: n.post.date }));
      return sums;
    },

    /* Match valid URIs and replace them with links, santize them afterwards */
    contentLinkified: function() {
      const linkified = this.content.replace(/\w+:(\/?\/?)[^\s]+/mg, (match) => {
        return `<a href=${match}>${match}</a>`;
      })
      return DOMPurify.sanitize(linkified, LINK_ONLY_OPTIONS);
    }

  },

  created() {
    this.currentEdit = this.postNode.editCount();
    this.copyNodeToModel();
    if (this.shared.user.loggedIn) {
      this.voted = this.currentNode.voters.indexOf(this.shared.user.walletAddress) !== -1;
    }
  },

  data: () => ({
    isReplying: false,
    voted: false,
    voting: false, // while we wait for assync request
    showBadPost: false,
    isEditing: false,
    description: '',
    content: '',
    currentEdit: 0,
    isSavingEdit: false,
  })
})
</script>