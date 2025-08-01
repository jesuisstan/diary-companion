const { exec } = require('child_process');

const createSecretCommand =
  'eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value ./credentials/google-services.json --force';
const pushSecretCommand =
  'npx eas secret:push --scope project --env-file ./.env --force';

exec(createSecretCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);

  exec(pushSecretCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
});
