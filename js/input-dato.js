/* --- Input dato ---
Formål: Find datoen i dag, som en værdi i input.
*/
// Definer navne i ugen.
var hverdage = new Array(7);
hverdage[0] = "S&oslash;ndag";
hverdage[1] = "Mandag";
hverdage[2] = "Tirsdag";
hverdage[3] = "Onsdag";
hverdage[4] = "Torsdag";
hverdage[5] = "Fredag";
hverdage[6] = "Lørdag";
// Definer navne i ugen.
var maanedsdage = new Array(7);
maanedsdage[0] = "Januar";
maanedsdage[1] = "Februar";
maanedsdage[2] = "Marts";
maanedsdage[3] = "April";
maanedsdage[4] = "Maj";
maanedsdage[5] = "Juni";
maanedsdage[6] = "Juli";
maanedsdage[7] = "August";
maanedsdage[8] = "September";
maanedsdage[9] = "Oktober";
maanedsdage[10] = "November";
maanedsdage[11] = "December";
// Definer ny tidsberegning
var dagensDato = new Date();
// Definer hvilken ugedag er i dag.
var dagensHverdag = hverdage[dagensDato.getDay()];
// Definer dagens dato med 2 cifre.
var dd = String(dagensDato.getDate()).padStart(2, '0');
// Definer dagens måned
//var mm = String(dagensDato.getMonth() + 1).padStart(2, '0'); // Formateret som 01-12
var mm = maanedsdage[dagensDato.getMonth()]; // Formateret Januar-December
// Definer dagens år
var yyyy = dagensDato.getFullYear();
// Sammensæt oplysningerne til en streng
dagensDato = " " + dagensHverdag + ", " + dd + '. ' + mm + ' ' + yyyy + "."; //&nbsp; er mellemrum

// Retuner resultatet ved indlæsning.
document.getElementById("formIntroduktion").value = dagensDato;