import Command from './command';

const resume = (args) => {
  window.open('http://rabrennie.com/resume.pdf');
  return `<a href="http://rabrennie.com/resume.pdf">http://rabrennie.com/resume.pdf</a>`;
}

Command.register('resume', resume);
