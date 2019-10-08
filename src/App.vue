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
import { LoggedInUser, SharedState, getSharedState } from './ui-lib'
import { ForumCache } from 'decent-forum-api';
import { PendingTxTracker } from 'decent-forum-api';
import { BlockWatcher } from 'decent-forum-api/block-watcher/block-watcher';


export default Vue.extend({

  components: { Slide,  },

  data: () => {
    
    return {
      time: 0,
      isMenuOpen: false,
      shared: null as any as SharedState,
    }
  },

  created() {
    setInterval(() => this.time++, 1000);
    this.shared = getSharedState();
  },

  methods: {
    onUserLogin(user: any) {
      this.shared.user = Object.assign({}, user, { loggedIn: true });
    },
    onProfileClick() {
    }
  }
})
</script>
