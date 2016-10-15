import Command from './command';

const help = (args) => {
  return [
    'Commands:',
    'clear - clear the screen',
    'help - show this help',
    'about - prints about information',
    'contact - prints contact information',
  ];
}

Command.register('help', help);
