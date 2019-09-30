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