var soundSrc = ["sounds/green.mp3", "sounds/red.mp3", "sounds/yellow.mp3", "sounds/blue.mp3", "sounds/wrong.mp3"]
var buttonColor = ["green", "red", "yellow", "blue"];
var x = 0;
var count = 0;
var gamePattern = [];
var userClick = [];
var playSrc = [];
playSrc[4] = new Audio(soundSrc[4]);

$(document).keypress(function () {
    $("h1").text("Level 0");
    nextSequence();
});

function nextSequence() {
    var r = Math.floor(Math.random() * 4);
    gamePattern.push(r);
    setTimeout(function () {
        flash(r);
    }, 500);

    console.log(gamePattern);
    $("h1").text("Level " + gamePattern.length);
    $("body").css("background-color", "#011F3F");
    count = userClick.length - 1;
};

$(".btn").each(function (index) {
    playSrc[index] = new Audio(soundSrc[index]);
    $(this).on("click", function () {
        clicked($(this).attr("id"));
    });
});

function clicked(color) {
    var t = 0;
    if (color == "green") {
        t = 0;
    } else if (color == "red") {
        t = 1;
    } else if (color == "yellow") {
        t = 2;
    } else if (color == "blue") {
        t = 3;
    }
    count++;
    userClick.push(t);
    console.log(userClick);
    playSound(t);
    pressedBtn(t);
    checkAnswer(userClick);
};

function playSound(x) {
    s = playSrc[x];
    s.play();
    s.currentTime = 0;
};

function pressedBtn(m) {
    $(".btn").eq(m).addClass("pressed");
    setTimeout(function () {
        $(".btn").eq(m).removeClass("pressed")
    }, 10);
}

function flash(m) {
    $(".btn").eq(m).fadeOut(50);
    $(".btn").eq(m).fadeIn(50);
}

function checkAnswer(currentLevel) {
    if (currentLevel[count] != gamePattern[count]) {
        console.log(currentLevel[count] + "vs" + gamePattern[count]);
        newGame();
    } else if (currentLevel.length == gamePattern.length) {
        if (currentLevel[count] == gamePattern[count]) {
            console.log("Correct");
            userClick = [];
            setTimeout(function(){nextSequence()}, 500);
        } else {
            alert("wrong1");
            newGame();
        }
    }
    console.log(currentLevel[count] + " vs " + gamePattern[count]);
};

function newGame() {
    $("body").css("background-color", "black");
    playSound(4);
    $("h1").text("Press Any Key to Start");
    alert("GAME OVER!");
    userClick = [];
    gamePattern = [];
};