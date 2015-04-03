window.addEventListener('DOMContentLoaded', function() {
	storageManager = new LocalStorageManager;
  	if(this.storageManager.getGameInstrKey()){
		startGame();
	}else{
		startGame();
		showInstruction();
		this.storageManager.setGameInstrKey()
	}
});

function showInstruction(){
	$(".instruction").css('display', 'block');
	$( ".hide-instruction" ).click(function(){
		$(".instruction").css('display', 'none');
	});
}

function startGame(){
	setScore(0);
	setPlayArea();
}

function setPlayArea(){
	$(".notification").css('display', 'none');
	setQuestion();
	$( ".solution-wrapper li" ).click(checkAnswer);
	$( ".show-instructions" ).click(showInstruction);
	
}

function setQuestion(){
	var questionArea = $('.solution').siblings();
	for(var i = 0; i<questionArea.length; i++) {
		var color1 = Math.floor(Math.random() * 256);
		var color2 = Math.floor(Math.random() * 256);
		var color3 = Math.floor(Math.random() * 256);
		var hue = 'rgb(' + (color1) + ',' + (color2) + ',' + (color3) + ')';
		$(questionArea[i]).css('backgroundColor', hue).data('val', hue);
	}
	var i = Math.floor(Math.random() * 3);
	$('.question').text($(questionArea[i]).data('val'));
}

function checkAnswer(){
	var answer = $('.question').text();
	var choice = $(this).data('val');

	if( answer.toString() == choice.toString()){
		$(".correct").css('display', 'block');
		updateScore();
		setQuestion();
		$( ".continue-play" ).click(setPlayArea);
	}
	else
		endGame();
}

function setScore(num){
	$('.score-val').text(num);
	$('.high-score-val').text(this.storageManager.getHighScore());
}

function updateScore(){
	var num = parseInt( $('.score-val').text());
	num++;
	if(num > this.storageManager.getHighScore())
		this.storageManager.setHighScore(num);
	setScore(num);
}

function endGame(){
	$(".endGame").css('display', 'block');
	var num = parseInt( $('.score-val').text());
	$('.final-score').text(num);

	$( ".play-again" ).click(startGame);
}