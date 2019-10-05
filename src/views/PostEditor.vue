<template>
  <div class="post-editor">
    <h3> New Post </h3>
    
    <h4 class="header-coloring"> {{ path.join(' > ') }} </h4> 
    Logged In: {{ shared.user.loggedIn }}
    <input type="text" v-model=forum placeholder="forum">
    <input type="text" v-model=title placeholder="title">
    <input type="text" v-model=replyTo placeholder="inReplyTo">
    <input type="text" v-model=editOf placeholder="editOf">
    
    <textarea v-model="content"></textarea>
    <button @click="post">Post</button>
  </div>
</template>

<style>

</style>

<script lang="ts">

import Vue from 'vue'
import { LoggedInUser, SharedState } from '../ui-lib';
import { PostTags } from 'decent-forum-api/schema/post-tags';
import { buildPostTags, decodeForumPath, postPost } from 'decent-forum-api';

export default Vue.extend({
  props: {
    path: {
      type: Array as () => string[],
      required: true
    },
    shared: {
      type: Object as () => SharedState,
      required: true
    }
  },

  data: () => ({
    forum: '',
    title: '',
    replyTo: '',
    editOf: '',
    content: '',
  }),

  methods: {
    async post() {
      if (this.shared.user.loggedIn) {
        const opts: PostTags = {
          format: 'Plaintext',
          description: this.title,
        }
        const tags = buildPostTags(decodeForumPath(this.forum), opts)
        const txId = await postPost(this.shared.user.wallet, this.content, tags, this.shared.tracker);
        console.info(`Posted: ${txId}`);
      }
    }
  }
})
</script>