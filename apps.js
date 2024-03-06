const easy = document.querySelector(".easy");
const hard = document.querySelector(".hard");
const start = document.querySelector(".start");
let section = document.querySelector("section");
let lvliseasy = false;
let corrcetColor;
let boxes = document.querySelectorAll(".box");
let h1 = document.querySelector("h1");
let body = document.querySelector("body");
let p = document.querySelector("p");

start.addEventListener("click", () => {
  let bottomSide = document.querySelector(".bottomSide");
  //აქ თუ არის სტარტზე ერთხელ მაინ ხელი დაჭერლი სტაილ ატრიბუტებს ვაშორებთ რომ თავიდან დაიწყოს თამაში
  if (start.classList.contains("startGame")) {
    boxes.forEach((items) => {
      items.removeAttribute("style");
    });
    p.innerText = "";
    h1.removeAttribute("style");
  }
  //აქ ვამოწმებთ თუ ეზი ლეველია დაყენებული და თუ დაზენებულია მაშინ ქვედა მხარეს ვშლით
  // ბულიანი საჭიროა იმისთვის რომ ბაგი გვქონდა სულ შედიოდა წასლაში როცა წაშლილი იყო და ერორზე გავზავდით
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

    //აქ ვამატებთ კლასს რომელიც გასტილული გვაქვს უკვე და შევქმენიტ 41 ხაზის კოდზე
    //შემდეგ ვაშორებთ მარტივი ლეველის კლას რადგან ისევ არ შემოვიდეს იფში და დაგვიმატოს 3 ლისტი კიდევ
    div.setAttributeNode(classBottom);
    start.classList.remove("easylvl");
  }
  //ფერებზე მუშაობა
  // პირველ რისგში ვქმნით მოგებულ ფერს ერთხელ

  boxes = document.querySelectorAll(".box");
  let red = Math.round(Math.random() * 255);
  let blue = Math.round(Math.random() * 255);
  let green = Math.round(Math.random() * 255);
  let rgb = `rgb(${red}, ${green}, ${blue})`;
  corrcetColor = rgb;
  //აქ მასივიდან ვიღებთ ერთ რენდომ ციფრს რომელიც იქნება ჩვენი მოგებული თუ იზია მაშინ 0-2მდე ამოვიღებთ
  // თუ რთულია მაშინ 0-6
  let randomBox = Math.round(Math.random() * boxes.length - 1);
  //რადგანაც ლენგსზე გაწერლი გვაქ მინუს ერთი ამიტო თუ მოგებული ციფრი იქნება 0 ისე გადაირმნება -0ში
  // და უბრალოდ მაგის კონვერტირებას ვახდენთ 76 ლაინით ნეგატიურიდან პოზიტიურ რიცხვზე
  randomBox = Math.abs(randomBox);
  //მოგებული მასივის რიცხვს ვაძლევთ მოგებულ ფერს
  boxes[randomBox].style.background = corrcetColor;

  for (let i = 0; i < boxes.length; i++) {
    //ამ იფით ვამოწმებთ რო თუ i უდრის მოგებულ ყუთის რიცხვს მაშინ მაგ კონრეტული i დან გამოვიდეს
    // და შემდეგ იტერეიშენზე დაგავიდეს ამით ჩვენ მოგებულ ყუთს ფერს არ შეუცვლით და მხოლოდ წაგებულებს შევუცვლით
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
  //აქ მოწმდება საჭიროა თუ არა ყუთების დამატება რადგანაც სულ არ დაამატოს
  if (boxes.length < 6) {
    start.classList.add("hardlvl");
    p.innerText = "hard";
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
    p.innerText = "easy";
  }
});
//ამ მონაკვეთში ვიყენებთ ტექნიკას რომელსაც ქვია event deligation-ი
//რადგანაც დინამიურ დამატებულ ელემენტსებ კლიკ ივენთები სხვანაირად ედება
// მაგალითად თავიდან 6 ყუთს არეგისტრილებდა ხოლო შემდეგ რო ვაშორებდით და ვამატებთი დინამიურად დამატებულებს აღარ უყურებდა
// ამისთვის დაგვჭირდა რო კლიკ ივენთი მშობელ ელემენტს დაეჰენდელებია
//კლიკ ივენთს ვამატებთ ისეთ ელემენტზე რომელიც სულ არსებობს დოკუმენტში
//შემდეგ event.target.classList.contains ვარკვევთ რომელ ივენთზე ვაჭერთ ხელს
//ამ შემთხვევაში თუ event.target კლასი აქვს ბოქსი ესეიგი ყუთებზე  გვაქ ხელი დაჭერლი
// და შემდეგ უკვე ვუწერთ მოგების და წაგების ლოგიკას
section.addEventListener("click", (event) => {
  if (event.target.classList.contains("box")) {
    if (event.target.style.background === corrcetColor) {
      p.innerText = "you won";
      h1.style.color = corrcetColor;
    } else if (
      event.target.style.background !== corrcetColor &&
      start.classList.contains("startGame")
    ) {
      event.target.style.visibility = "hidden";
      p.innerText = "try again";
    }
  }
});
