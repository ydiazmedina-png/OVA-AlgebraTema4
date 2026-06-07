document.addEventListener('DOMContentLoaded', function () {

    // ===== ACTIVIDAD 1: EMPAREJAMIENTO =====
    const pairs = { 'cambiobase':'def-cambiobase','ortonormal':'def-ortonormal','gramschmidt':'def-gramschmidt','proyeccion':'def-proyeccion','norma':'def-norma' };
    let selectedConcept = null;
    const matched = {};

    document.querySelectorAll('.concept-item').forEach(item => {
        item.addEventListener('click', function () {
            if (matched[this.dataset.concept]) return;
            document.querySelectorAll('.concept-item').forEach(c => c.classList.remove('ring-2','ring-green-500'));
            selectedConcept = this.dataset.concept;
            this.classList.add('ring-2','ring-green-500');
        });
    });

    document.querySelectorAll('.definition-item').forEach(item => {
        item.addEventListener('click', function () {
            if (!selectedConcept) return;
            const defId = this.dataset.definition;
            if (matched[selectedConcept]) return;
            if (pairs[selectedConcept] === 'def-' + defId) {
                matched[selectedConcept] = defId;
                const el = document.querySelector(`.concept-item[data-concept="${selectedConcept}"]`);
                el.classList.add('opacity-60'); el.querySelector('.hint-text').textContent = '✅';
                this.classList.add('bg-green-100','border-green-400');
                const mc = this.querySelector('.matched-concept'); mc.textContent = '✅ Correcto'; mc.classList.remove('hidden');
            } else {
                this.classList.add('bg-red-100','border-red-400');
                setTimeout(() => this.classList.remove('bg-red-100','border-red-400'), 700);
            }
            document.querySelectorAll('.concept-item').forEach(c => c.classList.remove('ring-2','ring-green-500'));
            selectedConcept = null;
            if (Object.keys(matched).length === Object.keys(pairs).length)
                document.getElementById('matching-result').innerHTML = '<span class="text-green-700 font-bold">🎉 ¡Emparejaste todos los conceptos correctamente!</span>';
        });
    });

    document.getElementById('check-matching-btn')?.addEventListener('click', function () {
        const done = Object.keys(matched).length, total = Object.keys(pairs).length;
        document.getElementById('matching-result').innerHTML =
            `<span class="${done===total?'text-green-700':'text-yellow-700'} font-bold">${done===total?'🎉 ¡Perfecto!':'Has emparejado '+done+' de '+total+'. ¡Continúa!'}</span>`;
    });
    document.getElementById('reset-matching-btn')?.addEventListener('click', () => location.reload());

    // ===== ACTIVIDAD 2: VERDADERO O FALSO =====
    const vfAnswers = { vf1:'F', vf2:'V', vf3:'V', vf4:'F', vf5:'V', vf6:'V', vf7:'F' };
    document.getElementById('check-vf-btn')?.addEventListener('click', function () {
        let score = 0;
        Object.entries(vfAnswers).forEach(([id, correct]) => {
            const input = document.getElementById(id); if (!input) return;
            const val = input.value.trim().toUpperCase();
            input.classList.remove('border-green-500','border-red-500');
            if (val === correct) { input.classList.add('border-green-500'); score++; }
            else input.classList.add('border-red-500');
        });
        const total = Object.keys(vfAnswers).length;
        document.getElementById('vf-result').innerHTML =
            `<span class="${score===total?'text-green-700':'text-yellow-700'} font-bold">${score} de ${total} correctas. ${score===total?'🎉 ¡Excelente!':'📚 Revisa tus respuestas.'}</span>`;
    });
    document.getElementById('reset-vf-btn')?.addEventListener('click', function () {
        Object.keys(vfAnswers).forEach(id => { const i=document.getElementById(id); if(i){i.value='';i.classList.remove('border-green-500','border-red-500');} });
        document.getElementById('vf-result').innerHTML = '';
    });

    // ===== ACTIVIDAD 3: CALCULADORA PRODUCTO ESCALAR Y NORMA =====
    document.getElementById('calc-pe-btn')?.addEventListener('click', function () {
        const u1 = parseFloat(document.getElementById('u1').value)||0;
        const u2 = parseFloat(document.getElementById('u2').value)||0;
        const u3 = parseFloat(document.getElementById('u3').value)||0;
        const v1 = parseFloat(document.getElementById('v1').value)||0;
        const v2 = parseFloat(document.getElementById('v2').value)||0;
        const v3 = parseFloat(document.getElementById('v3').value)||0;
        const pe = u1*v1 + u2*v2 + u3*v3;
        const nu = Math.sqrt(u1**2+u2**2+u3**2);
        const nv = Math.sqrt(v1**2+v2**2+v3**2);
        const ortog = Math.abs(pe) < 1e-10;
        document.getElementById('pe-result').innerHTML =
            `<div class="bg-green-50 border border-green-300 rounded-lg p-4 space-y-2 text-sm">
            <p class="font-bold text-green-800">📊 Resultados:</p>
            <p class="font-mono">u · v = ${u1}×${v1} + ${u2}×${v2} + ${u3}×${v3} = <strong>${pe.toFixed(4)}</strong></p>
            <p class="font-mono">||u|| = √(${u1}²+${u2}²+${u3}²) = <strong>${nu.toFixed(4)}</strong></p>
            <p class="font-mono">||v|| = √(${v1}²+${v2}²+${v3}²) = <strong>${nv.toFixed(4)}</strong></p>
            <p class="font-mono ${ortog?'text-green-700':'text-red-700'} font-bold">${ortog?'✅ u y v son ORTOGONALES (u·v = 0)':'❌ u y v NO son ortogonales (u·v ≠ 0)'}</p>
            ${nu>0?`<p class="font-mono text-slate-600">Vector unitario de u: (${(u1/nu).toFixed(3)}, ${(u2/nu).toFixed(3)}, ${(u3/nu).toFixed(3)})</p>`:''}
            </div>`;
        document.getElementById('pe-result').classList.remove('hidden');
    });
});
