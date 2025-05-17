const questions = [
  {
    q: "¿Qué software fue clave en el diseño del Museo Guggenheim de Bilbao?",
    options: ["AutoCAD", "CATIA", "SolidWorks"],
    correct: 1,
    justification: "CATIA fue utilizado por Gehry para modelar estructuras complejas 3D."
  },
  {
    q: "¿Qué fenómeno físico estudió Euler en su fórmula sobre columnas?",
    options: ["Resonancia", "Pandeo", "Cizalladura"],
    correct: 1,
    justification: "Euler desarrolló la fórmula de carga crítica para el pandeo de columnas."
  },
  {
    q: "¿Qué científico formuló la ley de la elasticidad lineal?",
    options: ["Newton", "Hooke", "Bernoulli"],
    correct: 1,
    justification: "Hooke estableció la relación proporcional entre fuerza y deformación."
  },
  {
    q: "¿Cuál es el objetivo principal de usar materiales compuestos en rascacielos?",
    options: ["Decoración", "Aislamiento térmico", "Mejorar propiedades estructurales"],
    correct: 2,
    justification: "Permiten mayor resistencia y ligereza con menos masa."
  },
  {
    q: "¿Qué teoría matemática se relaciona con vibraciones y pandeo?",
    options: ["Topología algebraica", "Teoría de control", "Cálculo de variaciones"],
    correct: 2,
    justification: "Se usa para optimizar estructuras bajo ciertas condiciones físicas."
  },
  {
    q: "¿Qué representa la curva f(x) en la Torre Eiffel?",
    options: ["Grosor del acero", "Presión del viento", "Perfil lateral"],
    correct: 2,
    justification: "Equilibra el peso estructural con las fuerzas del viento."
  },
  {
    q: "¿Qué evento inspiró el diseño reforzado de puentes?",
    options: ["Guerra Mundial", "Marcha sincronizada", "Incendio en Chicago"],
    correct: 1,
    justification: "El paso sincronizado generaba resonancia estructural."
  },
  {
    q: "¿Cuál es la causa principal de inestabilidad en estructuras altas?",
    options: ["Dilatación térmica", "Vibraciones acústicas", "Viento y sismos"],
    correct: 2,
    justification: "Son cargas dinámicas que afectan la estructura."
  },
  {
    q: "¿Qué tipo de fractura afecta a columnas huecas bajo flexión?",
    options: ["Kelvin", "Brazier", "Hertz"],
    correct: 1,
    justification: "La fractura de Brazier ocurre por aplastamiento."
  },
  {
    q: "¿Qué aplicación usa homogeneización matemática?",
    options: ["Diseño gráfico", "Impresión 3D", "Pintura industrial"],
    correct: 1,
    justification: "Permite diseñar microestructuras funcionales."
  }
];

let attempts = Array(questions.length).fill(0);
let correctCount = 0;
let incorrectCount = 0;

const quizContainer = document.getElementById("quiz-container");

questions.forEach((q, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index !== 0) card.classList.add("locked");

  const content = document.createElement("div");
  content.classList.add("card-content");

  const title = document.createElement("h3");
  title.innerText = q.q;
  content.appendChild(title);

  q.options.forEach((opt, optIndex) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      if (card.classList.contains("correct")) return;

      attempts[index]++;
      const feedback = document.createElement("div");
      feedback.classList.add("card-feedback");

      if (optIndex === q.correct) {
        correctCount++;
        card.classList.add("correct");
        card.innerHTML = `
          <div class="card-feedback correct">
            <i>✔</i>
            <p>${q.justification}</p>
          </div>
        `;
        if (questions[index + 1]) {
          const nextCard = document.querySelectorAll(".card")[index + 1];
          nextCard.classList.remove("locked");
        }
        if (index === questions.length - 1) setTimeout(showResults, 1000);
      } else {
        incorrectCount++;
        card.classList.add("incorrect");
        card.innerHTML = `
          <div class="card-feedback incorrect">
            <i>✖</i>
          </div>
        `;
        setTimeout(() => {
          card.classList.remove("incorrect");
          card.innerHTML = '';
          card.appendChild(content);
        }, 1000);
      }
    };
    content.appendChild(btn);
  });

  card.appendChild(content);
  quizContainer.appendChild(card);
});

function showResults() {
  const resultBox = document.getElementById("results");
  const summary = document.getElementById("summary");
  resultBox.classList.remove("hidden");

  let report = `<strong>Total correctas:</strong> ${correctCount}<br>`;
  report += `<strong>Total incorrectas:</strong> ${incorrectCount}<br><br>`;
  report += `<strong>Intentos por tarjeta:</strong><br>`;
  attempts.forEach((a, i) => {
    report += `Pregunta ${i + 1}: ${a} intento(s)<br>`;
  });

  summary.innerHTML = report;
}
