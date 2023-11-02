//Imported fs and inquirer
const fs = require('fs');
const inquirer = require('inquirer');

// Created 4 Inquirer Questions to be asked to generate logo
inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'What text would you like on your logo (up to a maximum of 3)?',
      validate: (value) => {
        if (value.length < 4) {
          return true;
        } else {
          return 'Please enter no more than 3 characters.';
        }
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'What color should the text be?',
      default: 'black',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'What shape would you like for your logo?',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'What color should the shape be?',
      default: 'none',
    },
  ])
  // Using the answers from the prompts they have been added to assigned template for creating each shape for the logo
 .then((answers) => {
    const svg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
<rect width="300" height="200" fill="none"/>
<text x="150" y="100"  font-size="32" text-anchor="start" fill="${answers.textColor.toLowerCase()}">${answers.text}</text>
${
 answers.shape === 'circle'
    ? `<circle cx="150" cy="100" r="50"  fill="${answers.shapeColor.toLowerCase()}" stroke="black"/>`
    : ''
}
${
 answers.shape === 'triangle'
    ? `<path d="M75 200 L225 200 L150 100 Z"  fill="${answers.shapeColor.toLowerCase()}" stroke="black"/>`
    : ''
}
${
 answers.shape === 'square'
    ? `<rect x="75" y="100" width="150" height="100" fill="${answers.shapeColor.toLowerCase()}" stroke="black"/>`
    : ''
}
</svg>`;
// Function to write the file as logo.svg and store in in the folder.
    fs.writeFile('logo.svg', svg, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
 });