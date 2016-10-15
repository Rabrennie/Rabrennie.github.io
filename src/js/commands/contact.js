import Command from './command';

const contact = (args) => {
  return [
    `<a href="https://twitter.com/spookyco">Twitter - @SpookyCo</a>`,
    `<a href="mailto:rennierab@gmail.com">Email - rennierab@gmail.com</a>`

  ];
}

Command.register('contact', contact);
