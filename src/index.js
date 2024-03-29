import sendEmail from './utils/emailSender';

const exec = require('child_process').exec;

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        console.log(query.toLowerCase());
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

isRunning('chrome', (status) => {
    if(status === false){
        sendEmail();
    }else{
        console.log(status); // true|false
    }
})
