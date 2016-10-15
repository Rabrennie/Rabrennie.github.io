import Command from './command';

const clear = (args) => {
  document.querySelector('.content').innerHTML = "";
}

Command.register('clear', clear);
