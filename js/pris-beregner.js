/* --- Point beregner ---
Formål: At udregne pris, validere at der blev foretaget mindst 1 valg, og gå fra beregner til resultat.
*/
// -- Knapper, warnings og sektioner --
var next03 = document.getElementById("next03");
var beregnerWarning = document.getElementById("beregnerWarning");
var dinAppEr = document.getElementsByClassName('dinapper');

// -- Variabler til point beregning --
var point = 0;
var checkedValue = null;

next03.onclick = function(){
	point = 0;
	/*-- Beregner input --*/
	var platform = document.getElementsByName("Platform ");
	for(i=0; i < platform.length; i++){
		if(platform[i].checked){
		   checkedValue = platform[i].value;
		   break;
		} else {
			checkedValue = false;
		}
	}
	platform = checkedValue;
	console.log(platform);
	var integrationer = document.getElementsByName("API Skal integreres ");
	for(i=0; i < integrationer.length; i++){
		if(integrationer[i].checked){
		   checkedValue = integrationer[i].value;
		   break;
		} else {
			checkedValue = false;
		}
	}
	
	integrationer = checkedValue;
	var APIvalg = document.getElementsByName("Valgte API ");
	APIvalg = APIvalg[0].value;
	var backend = document.getElementsByName("Backend skal bygges ");
	for(i=0; i < backend.length; i++){
		if(backend[i].checked){
		   checkedValue = backend[i].value;
		   break;
		} else {
			checkedValue = false;
		}
	}
	backend = checkedValue;
	var serviceVedligeholdelse = document.getElementsByName("Der er behov for service eller vedligeholdelse ");
	for(i=0; i < serviceVedligeholdelse.length; i++){
		if(serviceVedligeholdelse[i].checked){
		   checkedValue = serviceVedligeholdelse[i].value;
		   break;
		} else {
			checkedValue = false;
		}
	}
	serviceVedligeholdelse = checkedValue;
	var design = document.getElementsByName("House of Code skal designe app ");
	for(i=0; i < design.length; i++){
		if(design[i].checked){
		   checkedValue = design[i].value;
		   break;
		} else {
			checkedValue = false;
		}
	}
	design = checkedValue;
	var sprog = document.getElementsByName("Sprog ");
	sprog = sprog[0].value;
	var login = document.getElementsByName("Login skal implementeres ");
	for(i=0; i < login.length; i++){
		if(login[i].checked){
		   checkedValue = login[i].value;
		   break;
		} else {
			checkedValue = false;
		}
	}
	login = checkedValue;
	var allInput = [platform, integrationer, APIvalg, backend, serviceVedligeholdelse, design, sprog, login];
		//-- Beregning af point --
	if(platform == "IOS." || platform == "Android."){
		point++;
	} else if(platform == "IOS & Android."){
		point++;
		point++;
	}
	if(integrationer == "Ja."){
		point++;
		if(APIvalg){
			point--
			var splitAPIvalg = APIvalg.split(";");
			for(i=0; i < splitAPIvalg.length; i++){
				point++;
			}
		}
	}
	if(backend == "Ja."){
		point++;
	}
	if(serviceVedligeholdelse == "Ja."){
		point++;
	}
	if(design == "Ja."){
		point++;
	}
	if(sprog){
		var splitSprog = sprog.split(";");
		for(i=0; i < splitSprog.length; i++){
			point++;
		}
	}
	if(login == "Ja."){
		point++;
	}
	// -- Valider om brugeren har udfyldt noget --
	console.log("Point: " + point);
	if(point == 0){
		var wasUsed = 0;
		for(i=0; i < allInput.length; i++){
			if(allInput[i]) {
				wasUsed++;
			}
		}
		if(!wasUsed){
			console.log("Pris estimering kunne ikke udføres, fordi intet var udfyldt.");
			beregnerWarning.classList.remove("hidden");
			return false;
		}
	}
	beregnerWarning.classList.add("hidden");
	// -- Vis relevant sektion afhænigt af point --
	if(point <= 3){
		dinAppEr[0].classList.remove("hidden");
		dinAppEr[1].classList.add("hidden");
		dinAppEr[2].classList.add("hidden");
		dinAppEr[3].classList.add("hidden");
	} else if(point > 3 && point < 7){
		dinAppEr[0].classList.add("hidden");
		dinAppEr[1].classList.remove("hidden");
		dinAppEr[2].classList.add("hidden");
		dinAppEr[3].classList.add("hidden");
	} else if(point >= 7){
		dinAppEr[0].classList.add("hidden");
		dinAppEr[1].classList.add("hidden");
		dinAppEr[2].classList.remove("hidden");
		dinAppEr[3].classList.add("hidden");
	} else{
		// Umuligt tilfælde
		console.log("Dette bør aldrig kunne ske.")
		dinAppEr[0].classList.add("hidden");
		dinAppEr[1].classList.add("hidden");
		dinAppEr[2].classList.add("hidden");
		dinAppEr[3].classList.remove("hidden");
	}
	
	// -- Navigering --
	showHideSection('resultat');
	
	// -- Log --
	console.log("Pris estimering blev udført.");
}
