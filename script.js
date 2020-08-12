const image= document.querySelector('.arrow');
const punch1 = document.querySelector('#sound1');
const punch2 = document.querySelector('#sound2');
const endbell = document.querySelector('#bell');
const countSound = document.querySelector('#countdown')
const go = document.querySelector('#go');
const stopButton = document.querySelector('.stopButton');
const timer = document.querySelector('.countdown');
const check30 = document.querySelector('#thirty');
const check60 = document.querySelector('#sixty');
const check90 = document.querySelector('#ninety');
const settings = document.querySelector('.settings');
const count = document.querySelector('.timer');
const directions = [0,45,90,135,180,225,270,315];
let intervals = [];



let randomDirection = function(){
	let index = Math.round(Math.random()*7);
	let direction = directions[index];
	image.setAttribute('style', `transform:rotate(${direction}deg)`)
}

check30.addEventListener('click', function(){
	if(this.checked === false){
		this.checked = true;
	}
	check60.checked = false;
	check90.checked = false;
})
check60.addEventListener('click', function(){
	if(this.checked === false){
		this.checked = true;
	}
	check30.checked = false;
	check90.checked = false;
})
check90.addEventListener('click', function(){
	if(this.checked === false){
		this.checked = true;
	}
	check30.checked = false;
	check60.checked = false;
})

stopButton.addEventListener('click', stop);

let timeLeft = 0;
function setTimer() {
	if(check30.checked){
		timeLeft = 30;
	} else if(check60.checked){
		timeLeft = 60;
	} else {
		timeLeft = 90;
	}
}



function start(time) {
	count.classList.remove('d-none');
	settings.classList.add('d-none');
	let i = 3
	let countdown = setInterval(function(){
		countSound.currentTime = 0;
		countSound.play();
		timer.innerHTML = `${i.toString()}...`;
		i--;
		if(i === 0){
			setTimeout(function () {
				timer.innerHTML = 'GO!';
				go.play();
				game(time);
				clearInterval(countdown);
			},1000);
		}
	}, 1000);
	intervals.push(countdown);
}

// setup array to store intervals in

function stop() {
	console.log(intervals);
	for(let i = 0; i < intervals.length; i++) {
		clearInterval(intervals[i]);
	}
	settings.classList.remove('d-none');
	count.classList.add('d-none');
	timer.innerHTML = 'GET READY';
	// intervals=[];
}

function game(timeout) {
	setTimer();
	randomDirection();
	let arrowPosition = setInterval(function() {
		punch1.play();
		setTimeout(function(){ punch2.play(); }, 300);
		setTimeout(function(){ randomDirection(); }, 600);
	}, timeout);
	intervals.push(arrowPosition);

	let stopwatch = setInterval(function() {
		timeLeft -= 1;
		timer.innerHTML = `${timeLeft}`;
		if(timeLeft === 0){
			stop();
			endbell.play();
		};
	},1000);
	intervals.push(stopwatch);
};


