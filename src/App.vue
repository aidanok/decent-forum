<template>
  <div id="app" class="app-tl-container">
  
    
    <!--<slide noOverlay  v-bind:isOpen=isMenuOpen>
      <router-link to="/">Home</router-link>
      <router-link to="/users">Users</router-link>
    </slide> -->
    
    <div id="pageWrap" class="app-layout">

      <div class="app-header header-coloring">
      
        <logo class="app-logo"></logo>
        <router-link to="/">Home</router-link>
        <router-link to="/post">
          Post
          <i class="ri-chat-new-line ri-2x"></i>
        </router-link>  
        <user-login-panel @logged-in=onUserLogin @profile-clicked=onProfileClick></user-login-panel>
      
      </div>

      <router-view :shared="shared" class="content-container"/>
    </div>

    
  </div>
</template>

<style>

/** HTML/BODY margin/padding */
html body {
  margin: 0 !important;
  padding: 0 !important;
  height: 100%;
}

body {
  min-height: 95%;
}

/**.app-layout */
.app-tl-container {
  height: 100%;
  min-height: 100%;
}

.app-layout {
  
  height: 95%;
  overflow-x: hidden;
  display: grid; 
  grid-template-columns: 1fr minmax(100px, 800px) 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: "header-left header-center header-right"
                       "content-left content-center content-right"

}

.content-container {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}

/** APP HEADER */
.app-header {
  grid-row: 1;
  grid-column: 1 / 4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.app-header .app-logo {
  margin-right: auto;
}

/** These should match LoginPanel styles */
.app-header a {
  text-decoration: none; 
  display: flex;
  align-items: center;
  padding: 0.4em 0.9em;
  color: #2c3e50;
}

.app-header a > * {
  margin-left: 0.2em;
}

.app-header a:hover {
  border-radius: 0.5em;
  background: rgba(0,0,0,0.046);
  cursor: pointer;
  transition: background 0.19s;
}

.header-coloring {
  background: rgb(224, 231, 239);
  background: linear-gradient(to right, rgba(245, 251, 255, 0.25) 0%, rgba(238, 238, 238, 0.25)100%);
  box-shadow: 
    inset 0 1px 3px -1px rgba(0,0,0,0.24);
  border-bottom: 1px solid rgba(0,0,0,0.15);
}


/** VUE DEFAULTS */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}


.bm-menu a.router-link-exact-active {
  color: #42b983;
}




/** BURGER MENU */
#page-wrap {
  padding: 0rem 0rem;
  overflow: visible;
}
  
.bm-burger-button {
  position: absolute;
  width: 27px;
  height: 22px;
  left: 1rem;
  top: 1rem;
}

.right .bm-burger-button {
  left: initial;
  right: 36px;
}
.bm-burger-bars {
  background: #373a47;
}
.bm-morph-shape {
  fill: #373a47;
}
.bm-menu {
  background: #373a47;
  transition: 0.15s;
}
.bm-menu-item-list a  { 
  color: #ebda29;
}

.bm-menu span:hover  { 
  color: #ece37e;
}

/* FROM BULMA  -- broken */
.is-loading {
  position: relative;
}
.is-loading::after {
  -webkit-animation: spinAround 500ms infinite linear;
          animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  height: 1em;
  width: 80%;
  position: absolute;
  border: 1px solid green;
  
}



</style>


<script lang="ts">

import Vue from 'vue'
import { Slide } from 'vue-burger-menu';
import { LoggedInUser, SharedState } from './ui-types'
import { ForumCache } from 'decent-forum-api';
import { PendingTxTracker } from 'decent-forum-api';

export default Vue.extend({

  components: { Slide },

  data: () => {
    
    // Declare here so we get type errors early.
    const shared: SharedState = {
      user: { loggedIn: false },
      cache: new ForumCache()
    }

    return {
      time: 0,
      isMenuOpen: false,
      shared: shared,
    }
  },

  created() {
    setInterval(() => this.time++, 1000);
  },

  methods: {
    onUserLogin(user: any) {
      console.log('user logged in');
      this.shared.user = Object.assign({}, user, { loggedIn: true, pending: new PendingTxTracker() });
    },
    onProfileClick() {
      console.log('profile click');
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
})
</script>
