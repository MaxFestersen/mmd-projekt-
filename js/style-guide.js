 var myWindow;
     function smallWin(){
         myWindow = window.open("styleguide.html","","width=375, height=812");
     }
     function mediumWin(){
         myWindow = window.open("styleguide.html","","width=768, height=1024")
     } 
     // her gør jeg brug af js operatorer ved " = " og domfunktionen getelementbyid og variable da variablerne bliver defineret som text og deres værdier i ""
    function myFunction1(){
            var text1 = "Vi kan ";
            var text2 = "kontaktes på Houseofcode.io";
            var text3 = text1 + text2;
            document.getElementById("tlfnr").innerHTML = text3;
        }        
         document.getElementsByTagName("p")[0].style.fontSize="16px";

        // her er et eksempel på hvordan et array kan bruges
    var farver = ["farvebokse",];
         farver[1] = "Hex koder";
         document.getElementById("array1").innerHTML = farver;   
         function myFunction(){
         document.getElementById("knap2").innerHTML="Tak for din besked.";
         }