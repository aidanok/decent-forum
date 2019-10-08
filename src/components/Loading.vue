<template>
<div> 
<div class="dot-container" v-crazy>            

┈╭━━━━━━━┳━━╮┈┈┈
┈┃┈┈┈┈╭╯┈┃┈▋┃╭━┓
╭┫┈┈┈┈┃┈┈┃┈┈┃┃╭┛
┃┃┈┈┈┈╰━━╯┈┃╰╯┃┈
╯┃┈┈┈┈┈┈┈┈┈╰┳━╯┈
┈┃┈┏━┳━━┓┈┏┈┃┈┈┈
▔┗━┻━┛▔▔┗━┻━┛▔▔▔

  </div>

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

  .dot-container {
    display: inline-block;
    padding: 1em;
    font-family: "monospace";
    white-space: pre;
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
    font-size: 1em;
    font-weight: bold;
    --anim-duration: 0.7s;
    /*animation: loading-spin;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;*/
    
  }
  
  .dot-container .charspan {
    
    color: rgb(223, 223, 223);
    animation: 
      /*speedlines 
      var(--anim-duration) 
      cubic-bezier(0.075, 0.82, 0.165, 1)
      calc(var(--pos-pct-x) * var(--anim-duration) * 1.3)
      infinite
      forwards*/

      loading-wave 
      var(--anim-duration) 
      cubic-bezier(0.075, 0.82, 0.165, 1)
      infinite
      calc(var(--anim-duration) * (1 - var(--pos-pct-x)) * 1)
      ;

      /*loading-scale
      var(--anim-duration) 
      calc(var(--anim-duration) * (1 - var(--pos-pct-x)) * 1)
      infinite
      forwards*/
       
  }


  .getting-you-there {
    font-size: 0.25em;
    color:rgb(117, 117, 117);
  }


  @keyframes speedlines {
    0% { transform: translate(0px, 0px) }
    100% { transform: translate(calc(-100px * var(--is-speed-line)), 0px) }
  }

  @keyframes loading-colors {
    0%      { color: rgba(112, 240, 80, 0.2) }
    50%     { color: rgba(79, 182, 165, 0.71) } 
    100%    { color: rgb(162, 161, 216, 0.4) }
  }

  @keyframes loading-jitter {
    0% {transform:rotate(0deg) }
    25% {transform:rotate(-44deg) }
    50% {transform:rotate(6deg) }
    70% {transform:rotate(23deg) }
    100% {transform:rotate(0deg) }
  }

  @keyframes loading-wave {
    0% {transform:translate(0px, 0px) }
    25% {transform:translate(0px, 7px) }
    50% {transform:translate(0px, 0px) }
    75% {transform:translate(0px, -7px) }
    100% {transform:translate(0px, 0px) }
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

  directives: {
    crazy: crazyAsciiDirective(((x, y, char) => {
      return [
        ['--is-speed-line', char === '┈' ? '1' : '0'],
        //['color', char === '┈' ? 'red' : 'unset' ],
      ]
      
    })),
    crazy2: crazyAsciiDirective((x, y, char) => {
      return [
        ['--is-dot', char === '.' ? '1' : '0']
      ];
    })
  }

})
</script>