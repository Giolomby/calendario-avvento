// IMPOSTAZIONI
// Metti "true" mentre costruisci il sito per aprire tutte le caselle.
// Quando lo regalerai a lei, cambialo in "false"!
const MODALITA_TEST = true;

const grid = document.getElementById('calendar-grid');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal');
const modalDayLabel = document.getElementById('modal-day-label');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

// Database dei contenuti (per ora vuoti/segnaposto, li riempiremo insieme)
const contenutiGiorni = {};
for (let i = 1; i <= 24; i++) {
    contenutiGiorni[i] = {
        titolo: i === 21 ? "21 Dicembre • I Nostri 6 Mesi ❤️" : `Sorpresa del ${i} Dicembre`,
        html: `
            <div class="placeholder-box">
                <p><strong>Casella ${i} ancora in preparazione!</strong></p>
                <p style="margin-top: 8px; font-size: 0.9rem;">Qui inseriremo la sorpresa dedicata a questo giorno.</p>
            </div>
        `
    };
}

// Genera le 24 caselle
function creaCalendario() {
    const oggi = new Date();
    const meseCorrente = oggi.getMonth(); // 11 = Dicembre
    const giornoCorrente = oggi.getDate();

    for (let giorno = 1; giorno <= 24; giorno++) {
        const door = document.createElement('div');
        door.classList.add('door');

        // Evidenzia il 21 dicembre (6 mesi)
        if (giorno === 21) {
            door.classList.add('special-day');
        }

        // Controlla se la casella era già stata aperta in precedenza
        if (localStorage.getItem(`avvento_aperto_${giorno}`) === 'true') {
            door.classList.add('opened');
        }

        const labelText = giorno === 21 ? '6 Mesi ♥' : 'Dicembre';

        door.innerHTML = `
            <span class="door-number">${giorno}</span>
            <span class="door-label">${labelText}</span>
        `;

        door.addEventListener('click', () => {
            gestisciClickCasella(giorno, door, meseCorrente, giornoCorrente);
        });

        grid.appendChild(door);
    }
}

function gestisciClickCasella(giorno, doorElement, meseCorrente, giornoCorrente) {
    // Controllo data reale (attivo solo se MODALITA_TEST è false)
    const sbloccato = MODALITA_TEST || (meseCorrente === 11 && giornoCorrente >= giorno);

    if (!sbloccato) {
        apriModale(
            `Giorno ${giorno}`,
            "Non sbirciare! 🎄",
            `<p>Questa sorpresa è ancora sigillata. Torna il <strong>${giorno} dicembre</strong> per scoprire cosa nasconde!</p>`
        );
        return;
    }

    // Segna come aperta
    doorElement.classList.add('opened');
    localStorage.setItem(`avvento_aperto_${giorno}`, 'true');

    const contenuto = contenutiGiorni[giorno];
    const badge = giorno === 21 ? "21 Dicembre • Speciale" : `Giorno ${giorno}`;
    apriModale(badge, contenuto.titolo, contenuto.html);
}

function apriModale(badge, titolo, htmlContenuto) {
    modalDayLabel.textContent = badge;
    modalTitle.textContent = titolo;
    modalBody.innerHTML = htmlContenuto;
    modalOverlay.classList.remove('hidden');
}

function chiudiModale() {
    modalOverlay.classList.add('hidden');
}

closeModalBtn.addEventListener('click', chiudiModale);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) chiudiModale();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') chiudiModale();
});

// Generatore di neve
function creaNeve() {
    const snowContainer = document.getElementById('snow-container');
    const numeroFiocchi = 45;

    for (let i = 0; i < numeroFiocchi; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');

        const size = Math.random() * 4 + 2 + 'px';
        flake.style.width = size;
        flake.style.height = size;
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = Math.random() * 6 + 6 + 's';
        flake.style.animationDelay = Math.random() * 5 + 's';

        snowContainer.appendChild(flake);
    }
}

creaCalendario();
creaNeve();
