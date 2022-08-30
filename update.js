import dedent from 'dedent';
import fs from 'fs';
import getTsmc from './companies/tsmc.js';

(async () => {
  const tsmc = await getTsmc();

  updateReadme({
    "TSMC": tsmc
  });
})();

function getContent(dateTime) {
  return dateTime || "No date found";
}

function updateReadme(companies) {
  const content = Object.entries(companies).map(([key, value]) => {
    return `${key} | ${getContent(value)}`
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

      Company | Next earnings call
      --- | ---
      ${content.join()}
    `, 
    function (err) {
      if (err) throw err;
      console.log('Updated README successfully');
    }
  );
}