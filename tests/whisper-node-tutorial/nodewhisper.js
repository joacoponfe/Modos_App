const { spawn } = require("child_process");

const outdata = spawn("whisper", ["audio_test.mp3", "--model=tiny","--output_format=txt", "--language=es", "--verbose=False"]);

outdata .stdout.on("data", data => {
    console.log(`stdout: ${data}`);
});

outdata .stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

outdata .on('error', (error) => {
    console.log(`error: ${error.message}`);
});

outdata .on("close", code => {
    console.log(`child process exited with code ${code}`);
});
