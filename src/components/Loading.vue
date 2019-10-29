<template>
<div> 
 <!--
<div class="dot-container" v-crazy  >            

┈╭━━━━━━━┳━━╮┈┈┈
┈┃┈┈┈┈╭╯┈┃┈▋┃╭━┓
╭┫┈┈┈┈┃┈┈┃┈┈┃┃╭┛
┃┃┈┈┈┈╰━━╯┈┃╰╯┃┈
╯┃┈┈┈┈┈┈┈┈┈╰┳━╯┈
┈┃┈┏━┳━━┓┈┏┈┃┈┈┈
 ┗━┻━┛  ┗━┻━┛
</div>
-->

<!--<div class="dot-container" v-crazy > 
┈╱▔▔▔▔▔▔▔╲┏━╮╭━┓
▕┈╭╮┈┈┈┈┈▕╰━╮╭━╯
▕━━━╯┈┈┈┈┈╲━╯┃┈┈
┈╲▂▂▂▂▂▂▂▂▂▂▂╯┈┈
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
</div>-->
<!--
<div class="art-credit">
  @tw1tt3rart
</div>
-->
<!--
<div class="dot-container" v-crazy>

╭╭━━━╮╮┈┈┈┈┈┈┈┈┈┈
┈┃╭━━╯┈┈┈┈▕╲▂▂╱▏┈
┈┃┃╱▔▔▔▔▔▔▔▏╱▋▋╮┈
┈┃╰▏┃╱╭╮┃╱╱▏╱╱▆┃┈
┈╰━▏┗━╰╯┗━╱╱╱╰┻┫┈
┈┈┈▏┏┳━━━━▏┏┳━━╯┈
┈┈┈▏┃┃┈┈┈┈▏┃┃┈┈┈┈

</div>
-->

<div class="ascii-art-container getting-you-there" v-crazy>
 _______         __   __   __                                          __   __                              
|     __|.-----.|  |_|  |_|__|.-----.-----.    .--.--.-----.--.--.    |  |_|  |--.-----.----.-----.         
|    |  ||  -__||   _|   _|  ||     |  _  |    |  |  |  _  |  |  |    |   _|     |  -__|   _|  -__|__ __ __ 
|_______||_____||____|____|__||__|__|___  |    |___  |_____|_____|    |____|__|__|_____|__| |_____|__|__|__|
                                    |_____|    |_____|                                                      
</div>

</div>
</template>

<style>
  
  .ascii-art-container {
    font-family: monospace;
    white-space: pre;
  }

  .art-credit {
    font-size: 0.5em;
    color: rgb(204, 204, 204);
    padding-left: 8em;

  }

  .dot-container {
    display: inline-block;
    font-family: "monospace";
    white-space: pre;
    margin-top: 5em;
    margin-left: auto;
    margin-right: auto;
    font-size: 1em;
    font-weight: bold;
    --anim-duration: 0.62s;
  }
  
  .dot-container .charspan {    
    color: rgb(211, 207, 207);
    animation:
      loading-wave
      var(--anim-duration) 
      cubic-bezier(0.075, 0.82, 0.165, 1)
      infinite
      calc(var(--anim-duration) * (1 - var(--pos-pct-x)) * 1)
      ; 
  }

  

  .getting-you-there {
    margin-top: 4em;
    font-size: 0.53em;
    color:rgb(117, 117, 117);
    font-weight: bold;
    --anim-duration: 1.62s;
  }
  .getting-you-there .charspan {

    animation:
      loading-colors
      var(--anim-duration) 
      cubic-bezier(0.075, 0.82, 0.165, 1)
      infinite
      calc(var(--anim-duration) * var(--pos-pct-x) )
      reverse;
      ; 
  }

  .getting-you-there .is-top {
    /*color: red;?*/
  }

  @keyframes speedlines {
    0% { transform: translate(0px, 0px) }
    100% { transform: translate(calc(-100px * var(--is-speed-line)), 0px) }
  }

  @keyframes loading-colors {
    0%      { color: rgb(136, 149, 132); transform: scale(1)}
    50%     { color: rgb(155, 199, 157)} 
    100%    { color: rgb(136, 149, 132)}
  }

  @keyframes loading-jitter {
    0% {transform:rotate(0deg) }
    25% {transform:rotate(-44deg) }
    50% {transform:rotate(6deg) }
    70% {transform:rotate(23deg) }
    100% {transform:rotate(0deg) }
  }

  @keyframes loading-wave {
    0% {transform:translate(0px, 0px) scale(1) }
    25% {transform:translate(0px, calc(var(--is-speed-line) * 7px)) scale(1.4) }
    50% {transform:translate(0px, 0px) scale(1) }
    75% {transform:translate(0px, calc(var(--is-speed-line) * -7px)) scale(1.4 )}
    100% {transform:translate(0px, 0px) scale(1)}
  }

  @keyframes loading-rotate {
    0% {transform: rotate3d(0,1,0,0deg)}
    100% {transform: rotate3d(1,1,0,360deg) }
  }

  @keyframes loading-scale {
    0% {transform:scale(1) }
    50% {transform:scale(calc(1 + calc(var(--is-speed-line) * .6))) }
    100% {transform:scale(1) }
  }

  @keyframes loading-color {
    from {color:rgb(37, 36, 36)}
    to {color:rgb(102, 107, 122)}
  }

</style>

<script lang="ts">
import Vue from 'vue'

import { crazyAsciiDirective } from '@/ui-lib/crazy-ascii-directive';

export default Vue.extend({

  beforeDestroy() {
    
    const f = (window as any).__hacky_loading_notify;
    if (typeof f === 'function') { 
      console.info(`LOADING FIN`);
      f();
    }
  },

  directives: {
    crazy: crazyAsciiDirective(((x, y, char) => {
      return [
        ['--is-speed-line', char === '┈' ? '0' : '1'],
        //['color', char === '┈' ? 'red' : 'unset' ],
      ]
      
    })),
  }

})
</script>