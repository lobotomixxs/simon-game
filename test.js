var soundSrc = ["sounds/green.mp3", "sounds/red.mp3", "sounds/yellow.mp3", "sounds/blue.mp3", "sounds/wrong.mp3"]
var buttonColor = ["green", "red", "yellow", "blue"];
var x = 0;
var count = 0;
var gamePattern = [];
var userClick = [];
var playSrc = [];
playSrc[4] = new Audio(soundSrc[4]);
var bool = null;

$(document).keydown(function (e) {
    var test = e.key;
    if (test == "Enter") {
        modal.style.display = "none";
        bool = test;
        $("h1").text("Level 0");
        nextSequence();
    }
});

function nextSequence() {
    var r = Math.floor(Math.random() * 4);
    gamePattern.push(r);
    setTimeout(function () {
        $(".btn").eq(r).fadeOut(50);
        $(".btn").eq(r).fadeIn(50);
    }, 500);
    console.log(gamePattern);
    $("h1").text("Level " + gamePattern.length);
    $("body").removeClass("game-over");
    count = userClick.length - 1;
};

$(".btn").each(function (index) {
    playSrc[index] = new Audio(soundSrc[index]);
    $(this).on("click", function () {
        var color = $(this).attr("id");
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
        if (bool == "Enter") {
            count++;
            userClick.push(t);
            playSound(t);
            pressedBtn(t);
            checkAnswer(userClick);
        }
    });
});

function playSound(m) {
    s = playSrc[m];
    s.play();
    s.currentTime = 0;
};

function pressedBtn(m) {
    $(".btn").eq(m).addClass("pressed");
    setTimeout(function () {
        $(".btn").eq(m).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (currentLevel[count] != gamePattern[count]) {
        console.log(currentLevel[count] + " vs " + gamePattern[count]);
        console.log("mali");
        newGame();
    } else if (currentLevel.length == gamePattern.length) {
        if (currentLevel[count] == gamePattern[count]) {
            console.log(userClick);
            console.log("Correct");
            userClick = [];
            setTimeout(function () {
                nextSequence()
            }, 500);
        } else {
            alert("wrong1");
            console.log("tae");
            newGame();
        }
    }
    console.log(currentLevel[count] + " vs " + gamePattern[count]);
};

function newGame() {
    modal.style.display = "block";
    playSound(4);
    $("h1").text("Press Enter to Start");
    $("p").text("Score: " + gamePattern.length);

    userClick = [];
    gamePattern = [];
    bool = null;
};

var modal = $("#myModal")[0];
var span = $(".close")[0];

function closeModal(){
    modal.style.display = "none";
}

span.onclick = function () {
    closeModal()
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}