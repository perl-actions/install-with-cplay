const core = require("@actions/core");
const github = require("@actions/github");
const tc = require("@actions/tool-cache");
const exec = require("@actions/exec");

async function install_cplay() {
  const cplay = await tc.downloadTool("https://git.io/cplay");
  core.setOutput("cplay", cplay);
  await exec.exec("sudo", ["perl", cplay, "self-install"]);
  return;
}

async function run() {
  await install_cplay();

  // input arguments
  const install = core.getInput("install");
  const cpanfile = core.getInput("cpanfile");
  const tests = core.getInput("tests");
  const args = core.getInput("args");
  const tarball = core.getInput("tarball");

  const w_test =
    tests == "true" || tests == "1" || tests == "ok" ? "--test" : "--no-test";
  var w_args = [];

  if (args !== null && args.length) {
    w_args = args.split(/\s+/);
  }

  if (install !== null && install.length) {
    console.log(`install: ${install}!`);
    const list = install.split("\n");
    var cmd = ["cplay", "install", "-d", w_test];
    if (w_args.length) {
      cmd = cmd.concat(w_args);
    }
    cmd = cmd.concat(list);
    await exec.exec("sudo", cmd);
  }

  if (cpanfile !== null && cpanfile.length) {
    console.log(`cpanfile: ${cpanfile}!`);
    var cmd = ["cplay", "cpanfile", "-d", w_test];
    if (w_args.length) {
      cmd = cmd.concat(w_args);
    }
    cmd.push(cpanfile);
    await exec.exec("sudo", cmd);
  }

  if (tarball !== null && tarball.length) {
    console.log(`tarball: ${tarball}!`);
    var cmd = ["cplay", "from-tarball", "-d", w_test];
    if (w_args.length) {
      cmd = cmd.concat(w_args);
    }
    cmd.push(tarball);
    await exec.exec("sudo", cmd);
  }

  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);

  return;
}

// Call run
(async () => {
  try {
    await run();
  } catch (error) {
    core.setFailed(error.message);
  }
})();
