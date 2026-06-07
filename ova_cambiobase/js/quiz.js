document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            q: "¿Qué representa la matriz de cambio de base P = [b₁ | b₂ | … | bₙ]?",
            opts: ["Las filas son los vectores de la base B","Las columnas son los vectores de la base B en coordenadas estándar","La inversa de la base estándar","La transpuesta de la base B"],
            ans: 1
        },
        {
            q: "Si [w]_B = (3,2) y la matriz de cambio de base es P, ¿cómo obtienes w en coordenadas estándar?",
            opts: ["w = P⁻¹ · [w]_B","w = Pᵀ · [w]_B","w = P · [w]_B","w = [w]_B · P"],
            ans: 2
        },
        {
            q: "Dos vectores u y v son ortogonales si:",
            opts: ["||u|| = ||v||","u · v = 1","u · v = 0","u + v = 0"],
            ans: 2
        },
        {
            q: "¿Cuál es la norma del vector v = (3, 4)?",
            opts: ["7","5","√7","12"],
            ans: 1
        },
        {
            q: "Una base ortonormal {q₁,…,qₙ} cumple que Qᵀ · Q es igual a:",
            opts: ["La matriz cero","Una matriz diagonal","La matriz identidad I","La matriz P de cambio de base"],
            ans: 2
        },
        {
            q: "En una base ortonormal, las coordenadas de un vector w se calculan como:",
            opts: ["Resolviendo el sistema Pc = w","cᵢ = w · qᵢ (producto escalar)","cᵢ = ||w|| / ||qᵢ||","Invirtiendo la matriz Q"],
            ans: 1
        },
        {
            q: "¿Para qué sirve el proceso de Gram-Schmidt?",
            opts: ["Calcular el determinante de una matriz","Convertir cualquier base en una base ortonormal","Resolver sistemas de ecuaciones lineales","Encontrar los valores propios de una matriz"],
            ans: 1
        },
        {
            q: "En el proceso de Gram-Schmidt, la fórmula proy(v,u) = (v·u / u·u)·u sirve para:",
            opts: ["Calcular la norma de v","Calcular la sombra de v en la dirección de u","Verificar que u y v son ortogonales","Normalizar el vector u"],
            ans: 1
        },
        {
            q: "La proyección ortogonal de v = (4,3) sobre el eje x (u = (1,0)) es:",
            opts: ["(3,0)","(4,3)","(4,0)","(0,3)"],
            ans: 2
        },
        {
            q: "En mínimos cuadrados, la mejor aproximación de b en el espacio columna de A es equivalente a:",
            opts: ["Resolver exactamente Ax = b","Calcular la proyección ortogonal de b sobre Col(A)","Invertir la matriz A","Calcular el determinante de A"],
            ans: 1
        }
    ];

    function buildQuiz() {
        const container = document.getElementById('quiz-container');
        container.innerHTML = '';
        questions.forEach((q, i) => {
            const div = document.createElement('div');
            div.className = 'mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200';
            div.innerHTML = `<p class="font-semibold text-slate-800 mb-3">${i + 1}. ${q.q}</p>
            <div class="space-y-2">${q.opts.map((o, j) =>
                `<label class="quiz-option flex items-center p-3 rounded-lg border-2 border-gray-200 cursor-pointer">
                    <input type="radio" name="q${i}" value="${j}" class="mr-3 accent-green-600">
                    <span class="text-slate-700">${o}</span></label>`).join('')}</div>
            <div class="feedback-${i} mt-2 text-sm font-medium hidden"></div>`;
            container.appendChild(div);
        });
    }

    buildQuiz();

    document.getElementById('submit-quiz-btn').addEventListener('click', function () {
        let score = 0;
        questions.forEach((q, i) => {
            const sel = document.querySelector(`input[name="q${i}"]:checked`);
            const fb = document.querySelector(`.feedback-${i}`);
            if (sel) {
                const val = parseInt(sel.value);
                if (val === q.ans) {
                    score++;
                    fb.textContent = '✅ ¡Correcto!';
                    fb.className = `feedback-${i} mt-2 text-sm font-medium text-green-700`;
                } else {
                    fb.textContent = `❌ Incorrecto. Respuesta: "${q.opts[q.ans]}"`;
                    fb.className = `feedback-${i} mt-2 text-sm font-medium text-red-700`;
                }
                fb.classList.remove('hidden');
            }
        });
        const pct = Math.round((score / questions.length) * 100);
        document.getElementById('quiz-result').innerHTML =
            `<div class="p-4 rounded-lg ${pct >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
            Obtuviste <strong>${score} de ${questions.length}</strong> correctas (${pct}%).
            ${pct >= 70 ? '🎉 ¡Excelente dominio del tema!' : '📚 Revisa el contenido e inténtalo de nuevo.'}
            </div>`;
        document.getElementById('submit-quiz-btn').classList.add('hidden');
        document.getElementById('reset-quiz-btn').classList.remove('hidden');
    });

    document.getElementById('reset-quiz-btn').addEventListener('click', function () {
        document.getElementById('quiz-result').innerHTML = '';
        document.getElementById('submit-quiz-btn').classList.remove('hidden');
        document.getElementById('reset-quiz-btn').classList.add('hidden');
        buildQuiz();
    });
});
