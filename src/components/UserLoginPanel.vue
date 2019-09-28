<template>
  <div>
    <div v-if="!wallet" class="user-login-panel" @click="openFileDialog">
      <input type="file" id="loginFileUpload" @change="onFilesSelected" />
      <label for="loginFileUpload">Sign in !</label>
      <i class="ri-login-box-line ri-2x"></i>
    </div>
    <div v-else class="user-login-panel" @click="onProfileClick">
      <wallet-address :address=walletAddress></wallet-address>
      <i class="ri-user-3-line ri-2x"></i>
    </div>
  </div>
</template>

<style>

/** MOVE TO GLOBAL */

.user-login-panel {
  display: flex;
  font-size: 1em;
  align-items: center;
  padding: 0.4em;
}

.user-login-panel:hover {
  border-radius: 0.5em 0.0em 0.0em 0.5em;
  background: rgba(0,0,0,0.046);
  cursor: pointer;
  transition: background 0.19s;
}

.user-login-panel > * {
  margin-left: 0.2em;
}

/** ACCESSIBLE? FILE INPUT */
[type="file"] {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
}
 

</style>

<script lang="ts">

import Vue from 'vue'
import { arweave } from 'decent-forum-api'

export default Vue.extend({
  
  data: () => ({
    wallet: null as any, 
    username: null as null | string,
    walletAddress: null as null | string,
    isLoading: false, 
  }),


  methods: {
    async onFilesSelected(event: any) {
      try {
        const files = event.target.files
        const reader = new FileReader()
        
        // Use FileReaders event interface
        await new Promise((res, rej) => {
          reader.onload = res
          reader.onerror = rej
          reader.readAsText(files[0])
        })

        const jwk = JSON.parse(reader.result as string) 
        this.walletAddress = await arweave.wallets.jwkToAddress(jwk);
        this.wallet = jwk;
        // Clear fileinput dom node.
        event.target.value = ""
        this.$emit('logged-in', { wallet: this.wallet, walletAddress: this.walletAddress })
      } catch (e) {
        alert('There was an error reading and parsing the key file')
        // Log to console.
        throw(e)
      }
    },

    // Loads the username from arweave id.
    async getUserName() {
      
    },

    openFileDialog(event: any) {
      // Clicking on label will open it anyway.
      if (event.target.tagName == 'I' || event.target.tagName === "DIV") {
        document.getElementById('loginFileUpload')!.click()
      }
    }, 

    onProfileClick(event: any) {
      this.$emit('profile-clicked', event);
    }

  },

  

})
</script>