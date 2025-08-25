document.addEventListener('DOMContentLoaded', () => {
    const die = document.getElementById('die');
    const result = document.getElementById('result');
    const rollBtn = document.getElementById('rollBtn');
    const soundToggle = document.getElementById('soundToggle');
    const rollSound = document.getElementById('rollSound');

    if (!die || !result || !rollBtn) return;

    let rolling = false;
    let last = 1;

    setFace(1);
    updateResult(1);

    rollBtn.addEventListener('click', roll);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            roll();
        }
    });

    function roll() {
        if (rolling) return;
        rolling = true;
        rollBtn.disabled = true;

        if (soundToggle && soundToggle.checked && rollSound && rollSound.src) {
            try { rollSound.currentTime = 0;
                rollSound.play(); } catch {}
        }

        die.classList.add('rolling');

        const shuffleTimer = setInterval(() => {
            const n = rnd1to6();
            setFace(n);
        }, 70);

        setTimeout(() => {
            clearInterval(shuffleTimer);
            const final = rndDifferentTo(last);
            setFace(final);
            updateResult(final);
            last = final;

            die.classList.remove('rolling');
            rollBtn.disabled = false;
            rolling = false;
        }, 700);
    }

    function setFace(n) {
        for (let i = 1; i <= 6; i++) die.classList.remove(`face-${i}`);
        die.classList.add(`face-${n}`);
        die.dataset.value = String(n);
    }

    function updateResult(n) { result.textContent = `Resultado: ${n}`; }

    function rnd1to6() { return Math.floor(Math.random() * 6) + 1; }

    function rndDifferentTo(prev) {
        let n = rnd1to6();
        if (n === prev) n = rnd1to6();
        return n;
    }
});