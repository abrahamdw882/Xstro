const { File } = require('megajs');
const fs = require('fs');
const path = require('path');

const prefix = "AXSTRO×"; // Your prefix same as in config.PREFIX
const output = path.join(__dirname, './session/'); // Path where creds.json will save

async function ensureSessionDirectory() {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }
}

async function saveCreds(id) {
  if (!id.startsWith(prefix)) {
    throw new Error(Prefix doesn't match, check if "${prefix}" is correct);
  }

  const url = https://mega.nz/file/${id.replace(prefix, "")};
  const file = File.fromURL(url);
  await file.loadAttributes();

  const credsPath = path.join(output, "creds.json");
  
  const data = await file.downloadBuffer();
  fs.writeFileSync(credsPath, data);
  console.log('Credentials saved to:', credsPath);
}

module.exports = {
  saveCreds,
  ensureSessionDirectory,
};
