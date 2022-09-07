import dedent from 'dedent';
import fs from 'fs';
import getTsmc from './companies/tsmc.js';
import getAsml from './companies/asml.js';
import getNvidia from './companies/nvidia.js';
import getAsana from './companies/asana.js';

const NEWLINE = `
`;

(() => {
  updateReadme();
})();

function validateDate(date) {
  if (!date) {
    return "No date found";
  }

  return new Date(date).toLocaleDateString();
}

async function getCompanies() {
  return {
    "ASML": await getAsml(),
    "TSMC": await getTsmc(),
    "NVIDIA": await getNvidia(),
    "Asana": await getAsana(),
  };
}

async function updateReadme() {
  const companies = await getCompanies();
  const _content = Object.entries(companies);
  const sortedContent = _content.sort((a, b) => {
    return new Date(a[1].date).getTime() - new Date(b[1].date).getTime();
  });
  const content = sortedContent.map(([key, value]) => {
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