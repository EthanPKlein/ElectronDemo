const { app, BrowserWindow, ipcRenderer } = require('electron')
const $ = require('jquery');

const currentWindow = require('electron').BrowserWindow;

function Alarm() {
    this.time = 5;
}

Alarm.prototype.turnOn = function () {
    $("#timer").html("Welcome to the Super Simple Electron Timer App!");
};

Alarm.prototype.startTimer = function() {
    var self = this;
    setInterval(function () {
        self.time--;
        $("#timer").html(self.time);
        if (self.time === 0) {
            self.flashApp();
        }
    }, 1000);
};

Alarm.prototype.flashApp = function () {
    var response = ipcRenderer.sendSync('synchronous-message', 'ping');
    this.printResponse(response);
};

Alarm.prototype.printResponse = function(response) {
    $("#serverResponse").append(response + "<br>");
};

var alarm = new Alarm();
alarm.turnOn();
alarm.startTimer();

$("#startTimer").click(function() {
    alarm.time = 5;
});

// 
// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//     console.log(arg); // prints "pong"
// })