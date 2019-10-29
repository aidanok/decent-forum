<template>
  <div id="app" class="app-tl-container">
  
    
    <!--<slide noOverlay  v-bind:isOpen=isMenuOpen>
      <router-link to="/">Home</router-link>
      <router-link to="/users">Users</router-link>
    </slide> -->
    
    <div id="pageWrap" class="app-layout">

      <div class="app-header header-coloring">
      
        <logo class="app-logo"></logo>
        <router-link to="/">
          Home
          <discuss-svg></discuss-svg>
          </router-link>
        <router-link to="/create-forum">
          Create Forum
          <chat-new-svg></chat-new-svg>
        </router-link>  
        <user-login-panel @logged-in=onUserLogin @profile-clicked=onProfileClick></user-login-panel>
      
      </div>

      <router-view :shared="shared" class="content-container"/>
    </div>

    
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Slide } from 'vue-burger-menu';
import { ForumCache, PostTreeNode } from 'decent-forum-api';
import { PendingTxTracker } from 'decent-forum-api';
import { BlockWatcher } from 'decent-forum-api/block-watcher/block-watcher';
import { LoggedInUser, SharedState, getSharedState } from '@/ui-lib'

export default Vue.extend({

  components: { Slide },

  data: () => ({
      time: 0,
      isMenuOpen: false,
      shared: null as any as SharedState,
  }),

  created() {
    setInterval(() => this.time++, 1000);
    this.shared = getSharedState();
  },

  methods: {
    onUserLogin(user: any): void {
      this.shared.user = Object.assign({}, user, { loggedIn: true });
      
      /*if (Notification.permission !== 'granted') { 
        Notification.requestPermission()
        .then(function(result) {
          // TODO: count denies and stop annoying by asking everytime. 
        });
      }

      if (Notification.permission === 'granted') {
        this.loopRepliesCheck();
      }*/

    },

    onProfileClick(): void {
      
    },

    testNotifications() {
      new Notification('A', { body: '<span style="color: red;">Title</span>' });
    },

    loopRepliesCheck(): void {
      const myThreads: Record<string, number> = {};
      // TODO: cleanup, move to other service or something.
      // This just , fires a timer every 10 seconds, gets all the current users
      // posts and records how many replies they have. If the replies increase, send 
      // a notification. 
      setInterval(() => {
        if (this.shared.user.loggedIn) {
          
          const posts = this.shared.cache.findPostsFrom(this.shared.user.walletAddress);
          
          for (let i = 0; i < posts.length; i++) {
            if (!myThreads[posts[i].id]) {
              // new 
              myThreads[posts[i].id] = posts[i].countReplies();
            } else {
              const replies = posts[i].countReplies();
              if (replies > myThreads[posts[i].id]) {
                // new replies! 
              
                myThreads[posts[i].id] = replies; 
                  // maybe... this is all so hacky!
                const newestDate = posts[i].getLatestReplyDate();
                if ( newestDate > (Date.now() - (1000 * 60 * 60))) {
                  const post = posts[i];
                  const title = post.getRootPost().post.tags.description;  
                  const notification = new Notification('New replies to your post!', { body: `In thread: ${title}`});
                  notification.onclick = (ev) => {
                    window.focus();
                    const rootPostId = post.getRootPost().id;
                    this.$router.push({ name: 'thread', params: { txId: rootPostId } })
                  }
                } else {
                  console.log(`Ignoring new reply older than an hour`);
                }
              }
            }
          }
          
        }

      }, 15000);
    },
  }

})
</script>
