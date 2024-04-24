let billettArray = [];

// Feilmeldinger
let feilmeldinger = {
    film: document.getElementById('film-feilmelding'),
    antallBilletter: document.getElementById('antallBilletter-feilmelding'),
    fornavn: document.getElementById('fornavn-feilmelding'),
    etternavn: document.getElementById('etternavn-feilmelding'),
    epost: document.getElementById('epost-feilmelding')
};

// Nullstill feilmeldinger
function nullstillFeilmeldinger() {
    for (let key in feilmeldinger) {
        feilmeldinger[key].textContent = '';
        feilmeldinger[key].style.display = 'none';
    }
}

// Funksjon for å hente verdier fra input-feltene
function hentInputVerdier() {
    return {
        film: document.getElementById('film').value,
        antallBilletter: document.getElementById('antallBilletter').value,
        fornavn: document.getElementById('fornavn').value,
        etternavn: document.getElementById('etternavn').value,
        epost: document.getElementById('epost').value
    };
}

// Funksjon for å validere inputene
function validerInput(inputId, feilmeldingId, feilmeldingTekst) {
    let inputVerdi = document.getElementById(inputId).value;
    let feilmelding = document.getElementById(feilmeldingId);

    if (inputVerdi.trim() === '') {
        feilmelding.textContent = feilmeldingTekst;
        feilmelding.style.display = 'block';
        return false;
    } else {
        feilmelding.textContent = '';
        feilmelding.style.display = 'none';
        return true;
    }
}

// Funksjon for å validere e-post
function validerEpost(epost) {
    let epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return epostRegex.test(epost);
}

async function sendBillettTilServer(billett) {
    try {
        const response = await fetch('http://localhost:8080/api/billetter/kjop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billett)
        });

        if (!response.ok) {
            console.error('Kunne ikke sende billett til serveren:', response.statusText);
            return null;
        }

        return await response.json();

    } catch (error) {
        console.error('Feil ved sending av billett:', error.message);
        return null;
    }
}

async function kjopBillett() {
    let { film, antallBilletter, fornavn, etternavn, epost } = hentInputVerdier();

    nullstillFeilmeldinger();

    let valideringOK = true;

    if (!validerInput('film', 'film-feilmelding', 'Film må velges')) {
        valideringOK = false;
    }

    if (!validerInput('antallBilletter', 'antallBilletter-feilmelding', 'Antall billetter må være 1 eller flere')) {
        valideringOK = false;
    }

    if (!validerInput('fornavn', 'fornavn-feilmelding', 'Feltet må fylles ut') || !erGyldigNavn(fornavn)) {
        valideringOK = false;
    }

    if (!validerInput('etternavn', 'etternavn-feilmelding', 'Feltet må fylles ut') || !erGyldigNavn(etternavn)) {
        valideringOK = false;
    }

    if (!validerEpost(epost)) {
        feilmeldinger.epost.textContent = 'Feltet må fylles ut med en gyldig e-postadresse';
        feilmeldinger.epost.style.display = 'block';
        valideringOK = false;
    }

    if (valideringOK) {
        let billett = {
            film: film,
            antallBilletter: antallBilletter,
            fornavn: fornavn,
            etternavn: etternavn,
            epost: epost
        };

        await sendBillettTilServer(billett);

        billettArray.push(billett);

        visAlleBilletter();

        if (document.getElementById('billettSkjema')) {
            document.getElementById('billettSkjema').reset();
        } else {
            console.error('Skjemaet ble ikke funnet.');
        }
    }
}

function visAlleBilletter() {
    let billetterListe = document.getElementById('alleBilletterContainer');
    billetterListe.innerHTML = '';

    for (let i = 0; i < billettArray.length; i++) {
        let billett = billettArray[i];
        let billettElement = document.createElement('div');
        billettElement.innerHTML = `<strong>Film:</strong> ${billett.film}, <strong>Antall billetter:</strong> ${billett.antallBilletter}, <strong>Fornavn:</strong> ${billett.fornavn}, <strong>Etternavn:</strong> ${billett.etternavn}, <strong>E-post:</strong> ${billett.epost}`;
        billetterListe.appendChild(billettElement);
    }
}

function slettAlleBilletter() {
    billettArray = [];
    visAlleBilletter();
}

function erGyldigNavn(navn) {
    let navnRegex = /^[a-zA-ZæøåÆØÅ\s]+$/;
    return navnRegex.test(navn);
}
