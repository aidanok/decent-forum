<template>
  <div>
    <div v-if="!wallet" class="user-login-panel not-logged-in" @click="openFileDialog">
      <input type="file" id="loginFileUpload" @change="onFilesSelected" />
      <label for="loginFileUpload">Sign in</label>
      <login-box-svg></login-box-svg>
    </div>
    <div v-else class="user-login-panel" @click="onProfileClick">
      <wallet-address :address=walletAddress></wallet-address>
      <user-profile-svg></user-profile-svg>
    </div>
  </div>
</template>

<style scoped>
  

</style> 

<script lang="ts">

import Vue from 'vue'
import { arweave, PostTreeNode } from 'decent-forum-api'

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

    openFileDialog(event: any) {
      // Clicking on label will open it anyway.
      if (event.target.tagName == 'I' || event.target.tagName === "DIV") {
        document.getElementById('loginFileUpload')!.click()
      }
    }, 

    onProfileClick(event: any) {
      this.$emit('profile-clicked', event);
    },
  },

  

})
</script>