"use strict";

//Selecting Element
const bodyEl = document.querySelector("body");
//Initial Stage
const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

const setLevelTitle = function (message) {
  document.getElementById("level-title").textContent = message;
};
//Check Answer function
const checkAnswer = function (index) {
  //check last color that user chose is === with gamepatern
  if (userClickedPattern[index] === gamePattern[index]) {
    //Further check if user complete gamepattern
    if (userClickedPattern.length === gamePattern.length) {
      //only that we call nextSequence after 1s
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    // else block is when user choose wrong color
  } else {
    bodyEl.classList.add("game-over");

    setTimeout(function () {
      bodyEl.classList.remove("game-over");
    }, 200);
    setLevelTitle(`Game Over, Press Any Key To Restart`);
    makeSound(`wrong`);
    startOver();
  }
};

document.addEventListener("keydown", function () {
  // Only call nextSequence on the FIRST keydown
  if (!started) {
    nextSequence();
    setLevelTitle(`Level ${level}`);
    started = true;
  }
});

const nextSequence = function () {
  userClickedPattern = [];
  level++;
  setLevelTitle(`Level ${level}`);
  //Generating randomNumber according to 4 button colors
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animation(randomChosenColour);
  makeSound(randomChosenColour);
};

// AddEventListener to all button
for (let i = 0; i < buttonColours.length; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animation(userChosenColor);
    makeSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
}

function animation(color) {
  document.getElementById(color).classList.add("pressed");
  setTimeout(function () {
    document.getElementById(color).classList.remove("pressed");
  }, 100);
}

function makeSound(color) {
  let sound = new Audio(`sounds/${color}.mp3`);
  sound.play();
}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
