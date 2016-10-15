import Command from './command';

const about = (args) => {
  return [`Hi I'm Rab Rennie, I'm a web developer`];
}

Command.register('about', about);
