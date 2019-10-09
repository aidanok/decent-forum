import { linkSync } from 'fs';
import { spawn } from 'child_process';

/**
 * Takes a DOM element containing text and wraps each individual characther in
 * a <span> element and adding css style properties to that span. 
 * 
 * We set the span to be an inline block, and replace '\n' with a <br> 
 * 
 * We get the X,Y position of the characther and we set a few vars: 
 * 
 * --pos-x        raw x position
 * --pos-y        raw y position 
 * --pct-pct-x    0 - 1 value indicating X position
 * --pos-pct-y    0 - 1 value indicating Y position
 * 
 * 
 */

import * as stringz from 'stringz';
import { type } from 'os';

export type SetCharactherStyle = (x: number, y: number, char: string)=>[string, string][]

export function crazyAsciiDirective(cb?: SetCharactherStyle) {
  return {
    bind(el: HTMLElement) {
      
      let text = el.innerText;
      
      // Normalize the text: 
      // Trim leading lines of whitespace,
      // Trim trailing lines of whitespace, 
      // Trim leading whitespace of each line up the the minPosition of a char on any line 
      // Trim trailing whitespace of each line at the maxPosition of a char on any line. 
      
      // This gives us a nice, rectangle of chars in lines[] 

      // Note: Js string manipulation functions do NOT handle unicode well

      let lines: string[] = text.split('\n');
      let foundContent = false; 
      let maxChar = 0;
      let minChar = Number.POSITIVE_INFINITY;

      let firstContentLine = 0;
      let lastContentLine = lines.length - 1;
      
      
      const blankLineRegex = /^\s*$/; 

      for (var i = 0; i < lines.length; i++) {
        
        if (!blankLineRegex.test(lines[i])) {
          // content line.
          if (!foundContent) {
            foundContent = true;
            firstContentLine = i;
          }
          lastContentLine = i;

          // This *seems* to work fine even with wierd unicode 
          // chars, but switch to stringz or runes lib if nessecary later.
          const trimmed = lines[i].trim();
          const lc = trimmed[trimmed.length-1];
          const fc = trimmed[0];
          
          maxChar = Math.max(maxChar, lines[i].lastIndexOf(lc));
          minChar = Math.min(minChar, lines[i].indexOf(fc));
        }
      }
      
      // Js f**ks up unicode so we use the great stringz
      // library to convert into array of unicode characthers.
      const trueLines = lines.
        slice(firstContentLine, lastContentLine+1)
        .map(l =>  stringz.toArray(l));

     
      // Done normalizing, now create the <span> and <br> elements, 
      // and replace the content in el with the resulting document fragment.
      
      const frag = document.createDocumentFragment();
      const ySize = lines.length - 1;
      const xSize = maxChar;  // maChar is NOT the line length, its the max index. (length - 1)

      for (let y = 0; y < trueLines.length; y++) {
        
        for (let x = minChar; x <= maxChar; x++) {
          
          const span = document.createElement("SPAN");
          
          let char = trueLines[y][x];
          if (char === undefined) {
            char = ' ';
          }
          
          span.innerText = char;
          
          span.style.setProperty('--pos-x', x.toString());
          span.style.setProperty('--pos-y', y.toString());
          span.style.setProperty('--pos-pct-x', (x / xSize).toString())
          span.style.setProperty('--pos-pct-y', (y / ySize).toString())
          span.classList.add('charspan');
          
          span.style.setProperty('display', 'inline-block');
          if (cb) {
            const us = cb(x,y, char);
            for (let n = 0; n < us.length; n++) {
              span.style.setProperty(us[n][0], us[n][1]);
            }
          }

          frag.appendChild(span);
        }
        frag.appendChild(document.createElement('BR'))
      }
      // add a BR to the last line to finsish up and get a perfect rectangle.
      //frag.appendChild(document.createElement('BR'))

      el.innerText = '';
      el.appendChild(frag);
      el.style.setProperty('--x-size', xSize.toString());
      el.style.setProperty('--y-size', ySize.toString());
    }
  }
}

