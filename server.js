/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

// Das Modul express wird mit der Funktion require einer Konstanten namens express zugwiesen.

const express = require('express');

// Der Body-Parser ermöglicht es uns, Daten aus dem Kundenformular auf dem Server entgegenzunehmen.
// Der Body-Parser wird im Terminal mit dem Befehl 'npm install -g body-parser' installiert.

const bodyParser = require('body-parser');

// Die Anweisungen werden von oben nach unten abgearbeitet. Der Wert 3000 wird von rechts nach links 
// zugewiesen an die Konstante namens PORT. Das einfache Gleichheitszeichen lässt sich also übersetzen
// mit "... wird zugewiesen an ..."

const PORT = 4000;

// Der Wert '0.0.0.0' wird zugewiesen an eine Konstante namens HOST 
const HOST = '0.0.0.0';

// App

const app = express();

// Es wird der App bekanntgegeben, wo die styles zu finden sind.
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Der Bodyparser wird in der app eingebunden.

app.use(bodyParser.urlencoded({extended: true}))


// Hier kommt das Kunden(-berater) objekt hin:
class Kundenberater {
	constructor() {
		this.Vorname
		this.Nachname
		this.Telefonnummer
		this.Email
	}
}

class Kunde {
	constructor() {
		this.Vorname
		this.Nachname
		this.Telefonnummer
		this.Email
		this.Benutzername
		this.Kennwort
	}
}

let kunde1 = new Kunde();
kunde1.Vorname="Max";
	kunde1.Nachname="Meyer";
	kunde1.Telefonnummer="192745672";
	kunde1.Email="max.meyer@t-online.de";
	kunde1.Benutzername="Max Meyer";
	kunde1.Kennwort="meyer_123";
	
	
let kundenberater1=new Kundenberater()
	kundenberater1.Vorname="Pit";
	kundenberater1.Nachname="Kiff";
	kundenberater1.Telefonnummer="012345/7890000";
	kundenberater1.Email="p.kiff@borken-bank.de";







app.get('/', (req, res) => {
	res.render('index.ejs',{});
});


app.get('/agb', (req, res) => {
	res.render('agb.ejs',{});
});

app.get('/hilfe', (req, res) => {
	res.render('hilfe.ejs',{});
});

app.get('/kontenuebersicht', (req, res) => {
	res.render('kontenuebersicht.ejs',{});
});


app.get('/postfach', (req, res) => {
	res.render('postfach.ejs',{});
});

app.get('/kreditBeantragen', (req, res) => {
	res.render('kreditBeantragen.ejs',{
		Kreditbetrag:300,
		Laufzeit:7,
		Zinssatz:0.1,
		Meldung:""
	});
});

app.post('/kreditBeantragen', (req, res) => {
	let kreditBetrag = req.body.Kreditbetrag;
	console.log("kreditBeantragen: Gewünschter Betrag: " + kreditBetrag + " Euro")

	let laufzeit = req.body.Laufzeit;
	console.log("kreditBeantragen: Gewünschte Laufzeit: " + laufzeit + " Jahre")

	let zinssatz = req.body.Zinssatz;

	let rueckzahlung = betrag * zinssatz;

	res.render('kreditBeantragen.ejs',{
		Kreditbetrag: kreditBetrag,
		Laufzeit: laufzeit,
		Meldung: "Ihr Rückzahlungsbetrag beträgt " + rueckzahlung
	});
});

app.get('/ueberweisungAusfuehren', (req, res) => {
	res.render('ueberweisungAusfuehren.ejs',{});
});

// Die Funktion app.get('/geldAnlegen...) wird abgearbeitet, wenn der Benutzer die Seite geldAnlegen
// im Browser ansurft.

app.get('/geldAnlegen', (req, res) => {

	// Die Serverantwort an den Browser wird gerendert an den Browser zurückgegeben.
	// Dazu wird die Funktion render() aufgerufen. 

	res.render('geldAnlegen.ejs',{

		// In der geldAnlegen.ejs gibt es die Variablen Betrag und Laufzeit.
		// Der Server übergibt die folgenden Werte an den Browser:

		Betrag:120,
		Laufzeit:2,
		Meldung: ""
	})
});


// Die Funktion app.post('/geldAnlegen...) wird abgearbeitet, wenn der Kunde auf dem Formular den Absenden-Button klickt.

app.post('/geldAnlegen', (req, res) => {

	// Die Werte, die der Kunde im Formular eingegeben hat, werden an den Server gesendet.
	// Der Wert der Variablen Betrag wird aus dem body der Kundenanfrage (req) ausgelesen und zugewiesen an die lokale Variable
	// namens betrag.

	let betrag = req.body.Betrag;
	console.log("geldAnlegen: Gewünschter Betrag: " + betrag + " Euro")

	let laufzeit = req.body.Laufzeit;
	console.log("geldAnlegen: Gewünschte Laufzeit: " + laufzeit + " Jahre")

	let zinssatz = 0.1

	let zinsen = betrag * zinssatz;

	res.render('geldAnlegen.ejs',{
		Betrag: betrag,
		Laufzeit: laufzeit,
		Meldung: "Ihre Zinsen betragen: " + zinsen
	});
});

app.get('/login', (req, res) => {
	res.render('login.ejs',{});
});

//Ich habe die app.get hier hinzugefügt, wodurch das Profil geöffnet werden kann.
app.get('/profil',(req, res) => {
	res.render('profil.ejs',{});
})

// Mit listen() wird der Server angewiesen, auf den angegebenen Host und
// Port zu lauschen.  
app.listen(PORT, HOST);

// Mit der Anweisung console.log() wird dem Server-Administrator auf der
// Konsole angezeigt, was der Server macht. Der Programmierer schreibt dazu 
// in die runden Klammern den Ausdruck, der auf der Konsole angezeigt
// werden soll. Die Werte der beiden Konstanten HOST und PORT werden in den
// Ausdruck übergeben. Ein Verb mit anschließenden runden Klammern steht
// immer für eine Anweisung etwas zu tun. 
console.log(`Running on http://${HOST}:${PORT}`);
