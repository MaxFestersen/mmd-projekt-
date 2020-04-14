/* Send e-mail med JavaScript
Formål: At åbne e-mail client, med bedre formatering og med specielle karakterer tilladt (især: æøå).
*/
// --- Funktioner til brug ---
// Tilføj error info
function addError(inputs, txt) {
	if(Array.isArray(inputs)){
		let i = 0;
		while(i < inputs.length ) {
		   inputs[i].classList.add("InputError");
		   i++;
		}
	} else {
		inputs.classList.add("InputError");
	}
	txt.classList.remove("hidden");
}

// Tilføj warning info
function addWarning(inputs, txt) {
	if(Array.isArray(inputs)){
		let i = 0;
		while(i < inputs.length ) {
		   inputs[i].classList.add("InputWarning");
		   i++;
		}
	} else {
		inputs.classList.add("InputWarning");
	}
	txt.classList.remove("hidden");
}

// Fjern error info
function rmError(inputs, txt) {
	if(Array.isArray(inputs)){
		let i = 0;
		while(i < inputs.length ) {
		   inputs[i].classList.remove("InputError");
		   inputs[i].classList.remove("InputWarning");
		   i++;
		}
	} else {
		inputs.classList.remove("InputError");
		inputs.classList.remove("InputWarning");
	}
	if(Array.isArray(txt)){
		let i = 0;
		while(i < txt.length ) {
		   txt[i].classList.add("hidden");
		   i++;
		}
	} else {
		txt.classList.add("hidden");
	}
}

// validering af kodestykker
function loopFunktioner(arrayfuncions){
	var errorSection = false; // Error section peger på det første sted der er fejl på siden. Den er som udgangspunkt ikke sand.
	var errors = 0; // Antal fejl
	// Loop alle funktioner, og gem første fejlsektion, hvis der er en.
	var run = null;
	for (i = 0; i < arrayfuncions.length; i++) {
		run = arrayfuncions[i]();
		if(run != 0 & !errorSection){
			errorSection = run;
			errors++;
		} else if(run != 0){
			errors++;
		}
		run = null;
	}
	console.log("Der var " + errors + " fejl.");

	return([errorSection, errors]);
}

// Værdier til at blive overskredet
var arr = null;

// --- Form funktionalitet ---
// Form
var pb = document.getElementById("pris-beregner");

// Skjuldte input
var formIntroduktion = document.getElementById("formIntroduktion");

// -- pris-beregner-knap-section --
var breadcrumbs = document.getElementById("breadcrumbs");
var demonstrationsknap = document.getElementById("demonstrationsknap");
demonstrationsknap.onclick = function(){
	breadcrumbs.classList.remove("hidden");
	showHideSection('start');
}

// -- 01 Start --
var startSection = document.getElementById("start");
var app = document.getElementsByName("App ");
app = app[0];
var hjemmeside = document.getElementsByName("Hjemmeside ");
hjemmeside = hjemmeside[0];
var appHjemmesideError = document.getElementById("appHjemmesideError");
var next01 = document.getElementById("next01");
// Valider App / Hjemmeside
function appHjemmesideValidate() {
	console.log('App og hjemmeside checkboxer blev valideret.');
	if(!app.checked & !hjemmeside.checked) {
		// App eller hjemmeside er ikke blevet tilvalgt;
		// Informer brugeren om deres fejl.
		addError([hjemmeside, app], appHjemmesideError);
		// Lad operationen fejle.
		return startSection;
	} else{
		rmError([hjemmeside, app], appHjemmesideError);
		return 0;
	}
}
// Fjern error når der klickes på en box
app.onclick = function(){
	rmError([hjemmeside, app], appHjemmesideError);
}
hjemmeside.onclick = function(){
	rmError([hjemmeside, app], appHjemmesideError);
}
// Valider når man trykker på næste
next01.onclick = function(){
	var err = loopFunktioner([appHjemmesideValidate]);
	if(err[1] == 0) {
		showHideSection('egenskaber');
	}
}

// -- 02 Egenskaber --
var egenskaberSection = document.getElementById("egenskaber");
var beskrivelse = document.getElementsByName("Min app skal kunne ");
beskrivelse = beskrivelse[0];
var beskrivelseError = document.getElementById("beskrivelseError");
var next02 = document.getElementById("next02");
// Valider beskrivelse
function beskrivelseValidate() {
	console.log('Beskrivelse blev valideret.');
	if(!beskrivelse.value){
		addError(beskrivelse, beskrivelseError);
		return egenskaberSection;
	} else{
		rmError(beskrivelse, beskrivelseError);
		return 0;
	}
}
// Fjern error på focus på beskrivelsen (når der trykkes i den)
beskrivelse.onfocus = function() {
	rmError(beskrivelse, beskrivelseError);
}
// Trim og kør validering når man trykker ud af beskrivelsen. Primær
beskrivelse.onblur = function() {
	beskrivelse.value= beskrivelse.value.trim();
	beskrivelseValidate();
}
// Trim og kør validering når man trykker ud af beskrivelsen. Sekundær.
beskrivelse.onfocusout = function() {
	beskrivelse.value= beskrivelse.value.trim();
	beskrivelseValidate();
}
// Valider når man trykker på næste
next02.onclick = function(){
	var err = loopFunktioner([beskrivelseValidate]);
	if(err[1] == 0) {
		showHideSection('beregner');
	}
}
next02alt.onclick = function(){
	var err = loopFunktioner([beskrivelseValidate]);
	if(err[1] == 0) {
		showHideSection('afslutning');
	}
}
/*Dette script gør brugeren opmærksom på, om Caps-lock er slået til eller ikke*/
var input = document.getElementById("minApp");
	var text = document.getElementById("Caps");
	input.addEventListener("keyup", function(event) {
	if (event.getModifierState("CapsLock")) {
	  Caps.style.display = "block";} 
	  else {
	  Caps.style.display = "none" }
	});

// --- 03 Overvejelser/Beregner ---
//Nothing required to validate
/* Påbegyndt noget kode der ville formatere api'er i valgte api.
var integrationer = document.getElementsByName("Valgte API ");
integrationer.onkeyup = function(){
	if(event.key == ";"){
		integrationer.value;
	}
}*/
//if-else script i andre ord "this.checked", altså, hvis knappen bliver valgt, skal "display" på "apivalg" section ændres. 
document.getElementById("hvisja").addEventListener("change", function(){
	document.getElementById("apivalg").style.display = this.checked ? "block" : "none";
}); 
document.getElementById("hvisnej").addEventListener("change", function(){
	document.getElementById("apivalg").style.display = this.checked ? "none" : "block";
});
document.getElementById("hvisvedikke").addEventListener("change", function(){
	document.getElementById("apivalg").style.display = this.checked ? "none" : "block";
});

// --- 04 Resultat ---
//Nothing to validate

// --- Afslutning/Formualr ---
var afslutningSection = document.getElementById("afslutning");
var navn = document.getElementsByName("Mit navn ");
navn = navn[0];
var tel = document.getElementsByName("Mit telefon nummer ");
tel = tel[0];
var email = document.getElementsByName("Min e-mail ");
email = email[0];
var besked = document.getElementsByName("Besked ");
besked = besked[0];
// -- Valider navn --
function navnValidate() {
	console.log('Navn blev valideret.');
	if(!navn.value){
		addError(navn, navnError);
		return afslutningSection;
	} else if(navn.value.split(' ').filter(function(v){return v!==''}).length <= 1){
		addWarning(navn, navnWarning);
		return 0;
	} else{
		rmError(navn, [navnError, navnWarning]);
		return 0;
	}
}
// Fjern error på focus på navn (når der trykkes i den)
navn.onfocus = function() {
	rmError(navn, [navnError, navnWarning]);
}
// Trim og kør validering når man trykker ud af navn. Primær
navn.onblur = function() {
	navn.value = navn.value.trim();
	navnValidate();
}
// Trim og kør validering når man trykker ud af navn. Sekundær.
navn.onfocusout = function() {
	navn.value = navn.value.trim();
	navnValidate();
}
// -- Valider telefon --
function telValidate() {
	console.log('Telefon blev valideret.');
	var telTest = tel.value.replace("+", "");
	telTest = telTest.replace(/ /g, "");
//		console.log(telTest);
	if(!/^(\s*[0-9]+\s*)+$/.test(telTest)
	|| telTest.length > 12
	|| telTest.length > 8 && telTest.slice(0, 2) != "00"
	|| telTest.length < 7){
		addWarning(tel, telWarning);
		return 0;
	} else{
		rmError(tel, telWarning);
		return 0;
	}
}
/*pattern="
[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}|[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}|[0-9]{8}|+[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}|+[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}|+[0-9]{10}|[0-0]{2}[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}|[0-0]{2}[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}|[0-0]{2}[0-9]{10}
"*/
// Trim og kør validering når man trykker ud af telefon. Primær.
tel.onblur = function() {
	telValidate();
}
// Trim og kør validering når man trykker ud af telefon. Sekundær.
tel.onfocusout = function() {
	telValidate();
}
// Stop taster der ikke er numre eller funktionstaster til at virke.
tel.onkeydown = function() {
	//console.log(event.key);
	if(event.key.length == 1 && event.key.match(/[a-z]/i) || event.key.length == 1 && event.key.match(/[^\w\s]/gi) && event.key != "+" || event.key == " " || event.key.length == 1 && event.key.match(/[^\w\s]/gi) && tel.value.length != 0){
		event.preventDefault();
	}
}
// Valider og trim ved hver gang der bliver trykket på en tast
tel.onkeyup = function() {
	tel.value = tel.value.trim();
	tel.value = tel.value.replace(/(\d{2})/g, '$1 ').replace(/(^\s+|\s+$)/,'').replace(/ +(?= )/g,'');
	telValidate();
}

// -- Valider e-mail --
function emailValidate() {
	console.log('E-mail blev valideret.');
	if(!email.value){
		addError(email, emailErrorMissing);
		return afslutningSection;
	} else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
		addError(email, emailErrorWrong);
		return afslutningSection;
	} else{
		rmError(email, [emailErrorMissing, emailErrorWrong]);
		return 0;
	}
}
// Fjern error på focus på email (når der trykkes i den)
email.onfocus = function() {
	rmError(email, [emailErrorMissing, emailErrorWrong]);
}
// Trim og kør validering når man trykker ud af email. Primær
email.onblur = function() {
	email.value = email.value.trim();
	emailValidate();
}
// Trim og kør validering når man trykker ud af email. Sekundær.
email.onfocusout = function() {
	email.value = navn.value.trim();
	emailValidate();
}
// Valider ved hver gang der bliver trykket på en tast
email.onkeyup = function() {
	emailValidate();
}
// -- Trim besked --
// Trim og kør validering når man trykker ud af beskrivelsen. Primær
besked.onblur = function() {
	besked.value= besked.value.trim();
}
// Trim og kør validering når man trykker ud af beskrivelsen. Sekundær.
besked.onfocusout = function() {
	besked.value= besked.value.trim();
}

// -- Submit e-mail --
var submitEmail = document.getElementById("submitEmail");
submitEmail.onclick = function(){
	// Disable standard submit
	event.preventDefault();

	//Definer array af funktioner der skal køres. Dvs. Funktioner til validering der skal køres inden formen kan blive afsendt.
	var requiredContent = [
		appHjemmesideValidate,
		beskrivelseValidate,
		navnValidate,
		emailValidate
	]

	var arrayreturn = loopFunktioner(requiredContent);
	var errorSection = arrayreturn[0];
	// Log om der var dejl
	if(errorSection){
		console.log('Der var fejl i påkrævet indhold.');
		//Scroll til den øverste fejl
		showHideSection(errorSection.id);
		errorSection.scrollIntoView({
		  behavior: 'smooth'
		});
	} else {
		console.log('Der var ingen fejl i påkrævet indhold.');
		var emailBody = formIntroduktion.name + formIntroduktion.value;
		/*if(app & hjemmeside){
		sol = "app og hjemmeside"
		} else if(app){*/
		sol = "app"
		/*} else if(hjemmeside){
		sol = "hjemmeside"
		} else{
			return false;
		}*/
		// Definer krav til app.
		emailBody += '%0D%0AJeg vil gerne have udviklet en ' + sol + '.%0D%0A%0D%0A';
		emailBody += 'Formålet og meningen med min ' + sol + ' er:%0D%0A' + beskrivelse.value + '%0D%0A%0D%0A';
		//%0D%0A er linjeskift
		/*if(point>0){
			emailBody += 'Jeg anvendte pris-beregneren, og fik følgende estimat: ';
			if(point >= 10){
				stor
			} else if(point < 10 & point >= 5){
				mellem
			} else {
				lille
			}
		}*/
		if(point && point <= 3){
			emailBody += "Min " + sol + " blev vurderet til at det kræver at i drikker mindst 1 kop kaffe dagligt pr. udvikler.%0D%0A%0D%0A"
		} else if(point && point > 3 && point < 7){
			emailBody += "Min " + sol + " blev vurderet til at det kræver at i drikker mindst 2 kop kaffe dagligt pr. udvikler.%0D%0A%0D%0A"
		} else if(point && point >= 7){
			emailBody += "Min " + sol + " blev vurderet til at det kræver at i drikker mindst 3 kop kaffe dagligt pr. udvikler.%0D%0A%0D%0A"
		} else {
			emailBody += "Jeg har ikke foretaget en vurdering af min " + sol + ".%0D%0A%0D%0A"
		}
		var platform = document.getElementsByName("Platform ");
		for(i=0; i < platform.length; i++){
			if(platform[i].checked){
			   checkedValue = platform[i];
			   break;
			} else {
				checkedValue = false;
			}
		}
		platform = checkedValue;
		if(platform){
			emailBody += platform.name.trim() + ":%0D%0A" + platform.value + "%0D%0A%0D%0A";
		}
		var integrationer = document.getElementsByName("API Skal integreres ");
		for(i=0; i < integrationer.length; i++){
			if(integrationer[i].checked){
			   checkedValue = integrationer[i];
			   break;
			} else {
				checkedValue = false;
			}
		}
		integrationer = checkedValue;
		if(integrationer.value == "Ja."){
			emailBody += "API'er skal integreres.%0D%0A%0D%0A";
		} else if(integrationer.value == "Nej."){
			emailBody += "API'er skal ikke integreres.%0D%0A%0D%0A";
		} else if(integrationer.value == "Ved Ikke."){
			emailBody += "Jeg ved ikke om der er behov for API'er.%0D%0A";
		}
		var APIvalg = document.getElementsByName("Valgte API ");
		APIvalg = APIvalg[0].value;
		if(integrationer.value == "Ja." && APIvalg){
			emailBody += "Jeg har valgt følgende API:";
			APIvalg = APIvalg.split(';');
			for(var i=0; i < APIvalg.length; i++){
				emailBody += "%0D%0A- " + APIvalg[i].trim() + ".";
			}
			emailBody += "%0D%0A%0D%0A"
		} else if(integrationer.value == "Ja."){
			emailBody += "%0D%0A";
		}
		var backend = document.getElementsByName("Backend skal bygges ");
		for(i=0; i < backend.length; i++){
			if(backend[i].checked){
			   checkedValue = backend[i];
			   break;
			} else {
				checkedValue = false;
			}
		}
		backend = checkedValue;
		if(backend){
			emailBody += backend.name.trim() + ":%0D%0A" + backend.value + "%0D%0A%0D%0A";
		}
		var serviceVedligeholdelse = document.getElementsByName("Der er behov for service eller vedligeholdelse ");
		for(i=0; i < serviceVedligeholdelse.length; i++){
			if(serviceVedligeholdelse[i].checked){
			   checkedValue = serviceVedligeholdelse[i];
			   break;
			} else {
				checkedValue = false;
			}
		}
		serviceVedligeholdelse = checkedValue;
		if(serviceVedligeholdelse){
			emailBody += serviceVedligeholdelse.name.trim() + ":%0D%0A" + serviceVedligeholdelse.value + "%0D%0A%0D%0A";
		}
		var design = document.getElementsByName("House of Code skal designe app ");
		for(i=0; i < design.length; i++){
			if(design[i].checked){
			   checkedValue = design[i];
			   break;
			} else {
				checkedValue = false;
			}
		}
		design = checkedValue;
		if(design){
			emailBody += design.name.trim() + ":%0D%0A" + design.value + "%0D%0A%0D%0A";
		}
		var sprog = document.getElementsByName("Sprog ");
		sprog = sprog[0].value;
		if(sprog){
			emailBody += "Jeg har valgt følgende sprog:";
			sprog = sprog.split(';');
			for(var i=0; i < sprog.length; i++){
				emailBody += "%0D%0A- " + sprog[i].trim() + ".";
			}
			emailBody += "%0D%0A"
		}
		var login = document.getElementsByName("Login skal implementeres ");
		for(i=0; i < login.length; i++){
			if(login[i].checked){
			   checkedValue = login[i];
			   break;
			} else {
				checkedValue = false;
			}
		}
		login = checkedValue;
		if(login){
			emailBody += login.name.trim() + ":%0D%0A" + login.value + "%0D%0A%0D%0A";
		}
		if(besked.value){
			emailBody += 'Jeg har vedlagt denne besked:%0D%0A' + besked.value + '%0D%0A%0D%0A';
		}
		emailBody += 'Mvh.%0D%0A' + navn.value + '%0D%0A';
		if(tel.value){
			emailBody += 'Telefon: ' + tel.value + '%0D%0A';
		}
		emailBody += 'E-mail: ' + email.value;
		console.log(emailBody);
		var emailAdd = "minmailmax@gmail.com";
		var subject = "Anmodning om estimat på app.";
		window.open("mailto:"+emailAdd+"?subject="+subject+"&body="+emailBody, '_blank');
	}
     alert("Tak for din e-mail!");
};
/*Denne kode giver besked til brugeren, når mailen bliver sendt // ved hjælp af function + event, ved indsend knappen bliver Onclick eventet aktiveret via elementid og erstattet med tekst i innerhtml.*/
function myFunction(){
	document.getElementById("indsend").innerHTML="Tak for din besked.";
}
