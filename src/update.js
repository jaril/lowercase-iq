import dedent from 'dedent';
import fs from 'fs';
import getTsmc from './companies/tsmc.js';
import getAsml from './companies/asml.js';
import getNvidia from './companies/nvidia.js';
import getAsana from './companies/asana.js';

const NEWLINE = `
`;

(async () => {
  updateReadme({
    "ASML": await getAsml(),
    "TSMC": await getTsmc(),
    "NVIDIA": await getNvidia(),
    "Asana": await getAsana(),
  });
})();

function validateDate(date) {
  if (!date) {
    return "No date found";
  }

  return new Date(date).toLocaleDateString();
}

function updateReadme(companies) {
  const content = Object.entries(companies).map(([key, value]) => {
    console.log(">>", value);
    return `[${key}](${value.url}) | ${validateDate(value.date)}`
  });
  const header = `# Upcoming Events`

  const readme = dedent`
    # Lowercase IQ

    Because Capital IQ is too expensive.

    \`\`\`
    npm install
    npm run update
    \`\`\`
  `;

  fs.writeFile(
    'README.md', 
    dedent`
      ${readme}

      ${header}

      Company | Next earnings
      --- | ---
      ${content.join(NEWLINE)}
    `, 
    function (err) {
      if (err) throw err;
      console.log('Updated README successfully');
    }
  );
}