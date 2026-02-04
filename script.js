const levels = [];
let score = 0;

// Generate 50 pattern-based logic questions
for (let i = 1; i <= 50; i++) {
  let base = i * 2;
  levels.push({
    question: `Find the next number: ${base}, ${base*2}, ${base*4}, ?`,
    options: [
      base * 6,
      base * 8,
      base * 10,
      base * 4
    ],
    answer: base * 8
  });
}

let currentLevel = 0;

function loadLevel() {
  document.getElementById("level-num").textContent = currentLevel + 1;
  document.getElementById("score").textContent = score;

  const progress = ((currentLevel) / levels.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";

  document.getElementById("question").textContent =
    levels[currentLevel].question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  levels[currentLevel].options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("result").textContent = "";
}

function checkAnswer(selected) {
  const result = document.getElementById("result");

  if (selected === levels[currentLevel].answer) {
    score += 2;
    result.textContent = "✅ Correct!";
    result.style.color = "#22c55e";

    setTimeout(() => {
      currentLevel++;
      if (currentLevel < levels.length) {
        loadLevel();
      } else {
        document.getElementById("progress-bar").style.width = "100%";
        result.textContent =
          `🎉 Lab Completed! Final Score: ${score} / 100`;
      }
    }, 600);

  } else {
    result.textContent = "❌ Try again!";
    result.style.color = "#f97316";
  }

  document.getElementById("score").textContent = score;
}

loadLevel();
