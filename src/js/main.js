'use strict';

import '../index.jade'
import '../sass/reset.scss'
import '../sass/style.scss';
import './commands/main';
import Command from './commands/command';

const parseArgs = require('minimist')

const ib = document.querySelector('input.input-box');
const content = document.querySelector('div.content');

ib.focus();

ib.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
    const input = ib.value;
    printOut(input);
    ib.value = '';

    const inputs = input.toLowerCase().split(' ');
    const output = Command.call( inputs.shift(), parseArgs(inputs) ) ;

    if(output !== undefined && output.constructor === Array) {
      for (var i = 0; i < output.length; i++) {
        if(i===0) {
          printOut(output[i], 'return');
          continue;
        }
        printOut(output[i], 'info');
      }
    } else {
      printOut(output, 'return');
    }


		content.scrollTop = 1e100;
	}
});

const printOut = (out, className = '') => {
  if(out === undefined) {
    return;
  }

  const el = document.createElement('p');

  el.className = className;
  el.innerHTML = out;
  content.appendChild(el);
}
