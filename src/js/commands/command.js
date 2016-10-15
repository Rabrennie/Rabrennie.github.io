class Command {
  constructor() {
    this.commands = {};
  }

  register(command, func) {
    this.commands[command] = func;
  }

  call(command, args) {
    if(this.commands[command] === undefined) {
      return `${command} is not a recognized command`;
    }
    return this.commands[command](args);
  }
}

export default new Command();
