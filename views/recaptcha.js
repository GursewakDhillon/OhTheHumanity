
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
};

function startTimeMode(){
	score = 0;
	  widget1 = grecaptcha.render('recaptcha1', {
	'sitekey' : '6LeuJxkUAAAAACp5mLL7oD8CRIq0ObIVWP9UwM2t',
	'callback' : addScore
  });
}

function initTimer(){
    var initial = 20000;
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
		if (count <= 0){
			count = 0;
			document.getElementById("timer").innerHTML = "Time's up!";
			$('#reset').prop('disabled', true);
			$('#submit').prop('disabled', false);
			document.getElementById("finalScore").value = score;
		}
    }

    document.getElementById('start').addEventListener('click', function () {
        clearInterval(counter);
        initialMillis = Date.now();
        counter = setInterval(timer, 1);
    });

    // document.getElementById('stop').addEventListener('click', function () {
        // clearInterval(counter);
    // });

    // document.getElementById('restart').addEventListener('click', function () {
        // clearInterval(counter);
        // count = initial;
        // displayCount(count);
    // });

    displayCount(initial);
}