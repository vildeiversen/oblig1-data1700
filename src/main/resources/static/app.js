
let billettArray = [];

// Feilmeldinger
let feilmeldinger = {
    film: document.getElementById('film-feilmelding'),
    antallBilletter: document.getElementById('antallBilletter-feilmelding'),
    fornavn: document.getElementById('fornavn-feilmelding'),
    etternavn: document.getElementById('etternavn-feilmelding'),
    epost: document.getElementById('epost-feilmelding')
};

// Funksjon for å nullstille feilmeldinger
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

// Funksjon for å kjøpe billett
function kjopBillett() {
    // Hent verdier fra input-feltene
    let { film, antallBilletter, fornavn, etternavn, epost } = hentInputVerdier();

    nullstillFeilmeldinger();

    // Validering av input-feltene
    let valideringOK = true;

    if (!validerInput('film', 'film-feilmelding', 'Film må velges')) {
        valideringOK = false;
    }

    if (!validerInput('antallBilletter', 'antallBilletter-feilmelding', 'Antall billetter må være 1 eller flere')) {
        valideringOK = false;
    }

    if (!validerInput('fornavn', 'fornavn-feilmelding', 'Feltet må fylles ut')) {
        valideringOK = false;
    }

    if (!validerInput('etternavn', 'etternavn-feilmelding', 'Feltet må fylles ut')) {
        valideringOK = false;
    }

    if (!validerEpost(epost)) {
        feilmeldinger.epost.textContent = 'Feltet må fylles ut med en gyldig e-postadresse';
        feilmeldinger.epost.style.display = 'block';
        valideringOK = false;
    }

    // Fortsett bare hvis validering er OK
    if (valideringOK) {
        // Opprett billettobjekt
        let billett = {
            film: film,
            antallBilletter: antallBilletter,
            fornavn: fornavn,
            etternavn: etternavn,
            epost: epost
        };

        // Legg til billettobjektet i arrayet
        billettArray.push(billett);

        // Vis alle billetter
        visAlleBilletter();

        // Nullstill input-feltene
        document.getElementById('film').value = '';
        document.getElementById('antallBilletter').value = '';
        document.getElementById('fornavn').value = '';
        document.getElementById('etternavn').value = '';
        document.getElementById('epost').value = '';
    }
}

// Funksjon for å vise alle billetter
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

// Funksjon for å slette alle billetter
function slettAlleBilletter() {
    billettArray = [];
    visAlleBilletter(); // Oppdater visningen
}
