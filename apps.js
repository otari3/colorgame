const easy = document.querySelector(".easy");
const hard = document.querySelector(".hard");
const start = document.querySelector(".start");
let section = document.querySelector("section");
let lvliseasy = false;
let corrcetColor;
let boxes = document.querySelectorAll(".box");
let h1 = document.querySelector("h1");
let body = document.querySelector("body");

start.addEventListener("click", () => {
  //აქ ვამოწმებთ თუ ეზი ლეველია დაყენებული და თუ დაზენებულია მაშინ ქვედა მხარეს ვშლით
  let bottomSide = document.querySelector(".bottomSide");
  if (start.classList.contains("startGame")) {
    boxes.forEach((items) => {
      items.removeAttribute("style");
    });
  }
  if (
    start.classList.contains("easylvl") &&
    !start.classList.contains("hardlvl") &&
    lvliseasy
  ) {
    bottomSide.remove();
    lvliseasy = false;
  }
  //აქ ვამოწმებთ თუ უკან ეზი ლეველიდან რთულ ლეველზე დაბრუნა
  //რადგანაც თავიდანვე თამაში რთულ ლვლზეა დაყენებული
  //მხოლოდ გვჭირდება რო გავიგოთ მარტივზე იყო თუ არა დაყენებული რომ ელემენტები დავამატოთ
  if (
    start.classList.contains("easylvl") &&
    start.classList.contains("hardlvl")
  ) {
    //შემდეგ ვქმნით კლას რომელიც უკვე გასტილური გვაქვს და მარტივი ლეველის დროს მოვაშორეთ
    //შემდეგ ვქმნით დივ და ულს
    let classBottom = document.createAttribute("class");
    classBottom.value = "bottomSide";
    let div = document.createElement("div");
    let ul = document.createElement("ul");
    //აქ ვლუპავთ სამჯერ ლუპს რადგან მხოლოდ სამი li გვინდა რო დავამატოთ
    //შემდეგ უბრალოდ ვამატებთ ყველაფერს ჰტიემელში
    for (let i = 0; i <= 2; i++) {
      let boxClass = document.createAttribute("class");
      boxClass.value = "box";
      let li = document.createElement("li");
      section.appendChild(div);
      div.appendChild(ul);
      ul.appendChild(li);
      li.setAttributeNode(boxClass);
    }

    //აქ ვამატებთ კლასს რომელიც გასტილული გვაქვს უკვე და შევქმენიტ 46 ხაზის კოდზე
    //შემდეგ ვაშორებთ მარტივი ლეველის კლას რადგან ისევ არ შემოვიდეს ლუპში და დაგვიმატოს 3 ლისტი კიდევ
    div.setAttributeNode(classBottom);
    start.classList.remove("easylvl");
  }
  //ფერებზე მუშაობა
  boxes = document.querySelectorAll(".box");
  let red = Math.round(Math.random() * 255);
  let blue = Math.round(Math.random() * 255);
  let green = Math.round(Math.random() * 255);
  let rgb = `rgb(${red}, ${green}, ${blue})`;
  corrcetColor = rgb;
  let randomBox = Math.round(Math.random() * boxes.length - 1);
  randomBox = Math.abs(randomBox);
  boxes[randomBox].style.background = corrcetColor;

  for (let i = 0; i < boxes.length; i++) {
    if (i === randomBox) {
      continue;
    }
    let red = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    let rgb = `rgb(${red},${green},${blue})`;

    boxes[i].style.background = rgb;
  }
  start.classList.add("startGame");
  h1.innerText = corrcetColor;
});

hard.addEventListener("click", () => {
  if (boxes.length < 6) {
    start.classList.add("hardlvl");
  }
});
//აქ მოწმდება თუ არის მარტივი ლვლ
easy.addEventListener("click", () => {
  //ვამოწმებთ კლას შეიცავს თუ არა მარტივს თუ შეიცავს მაშინ დავამატოთ კლასი და მოვაშოროთ რთული კლასი
  //რადგან არ შევიდეს 40 ხაზის კოდზე და შევიდეს 30 ხაზზე
  if (!start.classList.contains("easylvl")) {
    start.classList.add("easylvl");
    start.classList.remove("hardlvl");
    lvliseasy = true;
  }
});
section.addEventListener("click", (event) => {
  if (event.target.classList.contains("box")) {
    if (event.target.style.background === corrcetColor) {
      alert("you win");
    } else if (
      event.target.style.background !== corrcetColor &&
      start.classList.contains("startGame")
    ) {
      event.target.style.visibility = "hidden";
    }
  }
});
