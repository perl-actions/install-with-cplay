const core = require('@actions/core');
const github = require('@actions/github');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');

async function action() {
  const cplay = await tc.downloadTool('https://git.io/cplay');
  core.setOutput("cplay", cplay);
  await exec.exec( 'sudo', [ 'perl', cplay, 'self-install' ] );
  return;
}

// Call action
(async() => {
  try {
  	await action();	
  } catch (error) {
  	core.setFailed(error.message);	
  }
})();
