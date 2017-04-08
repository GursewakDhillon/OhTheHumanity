var widget1,widget2,widget3,widget4;
var score;

function onSubmit(token) {
 document.getElementById("recaptchaForm").submit();
}

var onloadClassic = function() {
	score = 0;
  widget1 = grecaptcha.render('recaptcha1', {
	'sitekey' : '6LeuJxkUAAAAACp5mLL7oD8CRIq0ObIVWP9UwM2t',
	'callback' : addScore
  });
};

function addScore(){
	score = score + 5;
	document.getElementById('score').innerHTML = score;
}

function reset(){
  grecaptcha.reset(widget1, {
	'sitekey' : '6LeuJxkUAAAAACp5mLL7oD8CRIq0ObIVWP9UwM2t',
	'callback' : addScore
  });
}

var onloadTime = function() {
	initTimer();
  widget1 = grecaptcha.render('recaptcha1', {
	'sitekey' : '6LeuJxkUAAAAACp5mLL7oD8CRIq0ObIVWP9UwM2t',
	'callback' : addScore
  });
  widget2 = grecaptcha.render('recaptcha2', {
	'sitekey' : '6LeuJxkUAAAAACp5mLL7oD8CRIq0ObIVWP9UwM2t',
	'callback' : addScore
  });
  widget3 = grecaptcha.render('recaptcha3', {
	'sitekey' : '6LeuJxkUAAAAACp5mLL7oD8CRIq0ObIVWP9UwM2t',
	'callback' : addScore
  });
  widget4 = grecaptcha.render('recaptcha4', {
	'sitekey' : '6LeuJxkUAAAAACp5mLL7oD8CRIq0ObIVWP9UwM2t',
	'callback' : addScore
  });
};

// function CountDownTimer(duration, granularity) {
  // this.duration = duration;
  // this.granularity = granularity || 1000;
  // this.tickFtns = [];
  // this.running = false;
// }

// CountDownTimer.prototype.start = function() {
  // if (this.running) {
    // return;
  // }
  // this.running = true;
  // var start = Date.now(),
      // that = this,
      // diff, obj;

  // (function timer() {
    // diff = that.duration - (((Date.now() - start) / 1000) | 0);

    // if (diff > 0) {
      // setTimeout(timer, that.granularity);
    // } else {
      // diff = 0;
      // that.running = false;
    // }

    // obj = CountDownTimer.parse(diff);
    // that.tickFtns.forEach(function(ftn) {
      // ftn.call(this, obj.minutes, obj.seconds, obj.milliseconds);
    // }, that);
  // }());
// };

// CountDownTimer.prototype.onTick = function(ftn) {
  // if (typeof ftn === 'function') {
    // this.tickFtns.push(ftn);
  // }
  // return this;
// };

// CountDownTimer.prototype.expired = function() {
  // return !this.running;
// };

// CountDownTimer.parse = function(seconds) {
  // return {
    // 'minutes': (seconds / 60) | 0,
    // 'seconds': (seconds % 60) | 0,
	// 'milliseconds': (seconds % 1000) | 0,
  // };
// };

// function initTimer() {
	// console.log("onload!!");
    // var display = document.querySelector('#time'),
        // timer = new CountDownTimer(5),
        // timeObj = CountDownTimer.parse(5);

    // format(timeObj.minutes, timeObj.seconds, timeObj.milliseconds);
    
    // timer.onTick(format);
    
    // document.querySelector('#countdownButton').addEventListener('click', function () {
		// console.log("button clicked");
        // timer.start();
    // });
    
    // function format(minutes, seconds, milliseconds) {
        // minutes = minutes < 10 ? "0" + minutes : minutes;
        // seconds = seconds < 10 ? "0" + seconds : seconds;
		// milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;
        // display.textContent = minutes + ':' + seconds + ':' + milliseconds;
    // }
// };

function initTimer(){
    var initial = 300000;
    var count = initial;
    var counter; //10 will  run it every 100th of a second
    var initialMillis;

    function timer() {
        if (count <= 0) {
            clearInterval(counter);
            return;
        }
        var current = Date.now();
        
        count = count - (current - initialMillis);
        initialMillis = current;
        displayCount(count);
    }

    function displayCount(count) {
        var res = count / 1000;
        document.getElementById("timer").innerHTML = res.toPrecision(count.toString().length) + " secs";
    }

    document.getElementById('start').addEventListener('click', function () {
        clearInterval(counter);
        initialMillis = Date.now();
        counter = setInterval(timer, 1);
    });

    document.getElementById('stop').addEventListener('click', function () {
        clearInterval(counter);
    });

    document.getElementById('reset').addEventListener('click', function () {
        clearInterval(counter);
        count = initial;
        displayCount(count);
    });

    displayCount(initial);
}