/* IndholdsvisningFormål: Skjul sektioner med JavaScript, således at formen er anvendelig uden brug af JavaScript.*/
console.log('Løsning udviklet 2020, af MMD studerende på UCL. Signe, Max & Khalid fra OEAMM19EDA. Konrad og Mie fra OEAMM19EDC.');
document.getElementById("pris-beregner-knap-section").classList.remove("hidden");
document.getElementById("start").classList.add("hidden");
document.getElementById("egenskaber").classList.add("hidden");
document.getElementById("beregner").classList.add("hidden");
document.getElementById("afslutning").classList.add("hidden");
/*Denne kode lader brugeren at bevæge sig mellem beregneres trin vedd at klippe på "fortsæt"/"tilbage" knapper og/eller breadcrumbs*/
function showHideSection(sectionToBeShown){
	var ids = ["pris-beregner-knap-section", "start", "egenskaber", "beregner", "resultat", "afslutning"];
	for(i = 0; i < ids.length; i++){
		if(sectionToBeShown == ids[i]){
			document.getElementById(ids[i]).classList.remove("hidden");
		}
		else {
			document.getElementById(ids[i]).classList.add("hidden");
		}
	}
	document.getElementById('breadcrumbs').scrollIntoView({
	behavior: 'smooth'
	});
}