document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];

  function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    for (let i = 0; i < 30; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,182,193,${p.opacity})`;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", initParticles);
  initParticles();
  animateParticles();

  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const backBtn = document.getElementById("back-btn");

  const homeScreen = document.getElementById("home-screen");
  const quizScreen = document.getElementById("quiz-screen");

  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");

  let currentQuestionIndex = 0;

  const allQuestions = [
    // Cole as 30 perguntas aqui (fáceis, médias e difíceis)
    {question:"Qual é o principal órgão do sistema reprodutor feminino?", answers:[{text:"Ovário", correct:false},{text:"Útero", correct:true},{text:"Vagina", correct:false},{text:"Trompa de Falópio", correct:false}]},
    {question:"Onde ocorre a fecundação no sistema reprodutor feminino?", answers:[{text:"No ovário", correct:false},{text:"No útero", correct:false},{text:"Nas trompas de Falópio", correct:true},{text:"Na vagina", correct:false}]},
    {question:"Qual é o nome da célula reprodutiva feminina?", answers:[{text:"Espermatozoide", correct:false},{text:"Óvulo", correct:true},{text:"Gameta masculino", correct:false},{text:"Zigoto", correct:false}]},
    {question:"Qual é a função dos ovários?", answers:[{text:"Produzir leite materno", correct:false},{text:"Produzir óvulos e hormônios femininos", correct:true},{text:"Proteger o bebê", correct:false},{text:"Ligar o útero à vagina", correct:false}]},
    {question:"Como se chama o canal que liga o útero ao meio externo?", answers:[{text:"Ovário", correct:false},{text:"Trompa", correct:false},{text:"Vagina", correct:true},{text:"Endométrio", correct:false}]},
    {question:"Qual é o hormônio responsável pelas características femininas?", answers:[{text:"Testosterona", correct:false},{text:"Adrenalina", correct:false},{text:"Estrogênio", correct:true},{text:"Insulina", correct:false}]},
    {question:"O que acontece durante a menstruação?", answers:[{text:"O óvulo é fecundado", correct:false},{text:"O útero elimina o endométrio", correct:true},{text:"O bebê começa a se formar", correct:false},{text:"Os ovários produzem leite", correct:false}]},
    {question:"O que são as trompas de Falópio?", answers:[{text:"Canais que ligam os ovários ao útero", correct:true},{text:"Partes externas da vulva", correct:false},{text:"Glândulas que produzem hormônios", correct:false},{text:"Revestimento do útero", correct:false}]},
    {question:"Qual é a função do útero durante a gravidez?", answers:[{text:"Produzir hormônios", correct:false},{text:"Eliminar o endométrio", correct:false},{text:"Acolher e nutrir o bebê", correct:true},{text:"Produzir óvulos", correct:false}]},
    {question:"Como se chama o processo em que o ovário libera um óvulo?", answers:[{text:"Fecundação", correct:false},{text:"Menstruação", correct:false},{text:"Ovulação", correct:true},{text:"Gestação", correct:false}]}
    // Continue adicionando todas as 30 perguntas aqui
  ];

  allQuestions.sort(() => Math.random() - 0.5);

  startBtn.addEventListener("click", () => {
    homeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    currentQuestionIndex = 0;
    showQuestion();
  });

  backBtn.addEventListener("click", () => {
    quizScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
  });

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    nextBtn.classList.add("hidden");
    if (currentQuestionIndex < allQuestions.length) {
      showQuestion();
    } else {
      quizScreen.classList.add("hidden");
      homeScreen.classList.remove("hidden");
    }
  });

  function showQuestion() {
    const current = allQuestions[currentQuestionIndex];
    questionText.textContent = current.question;
    answerButtons.innerHTML = "";

    const shuffledAnswers = current.answers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer.text;
      btn.classList.add("btn");
      btn.disabled = false;
      btn.classList.remove("correct","wrong");

      btn.addEventListener("click", () => {
        Array.from(answerButtons.children).forEach(b => b.disabled = true);
        btn.classList.add(answer.correct ? "correct" : "wrong");
        nextBtn.classList.remove("hidden");
      });

      answerButtons.appendChild(btn);
    });
  }
});
