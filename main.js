import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};

/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage.

   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
*/
   

// loadind data (and wait for it !)
await M.init();



// creating events in the calendar


C.init = function(){
  V.init();

  // affichage des années
  let year = document.querySelector('#checkboxs-year');
  year.addEventListener('click', C.handler_clickOnYear);

  // affichage des groupes
  let group = document.querySelector('#select-groups');
  group.addEventListener('change', C.handler_changeOnGroup);

  // barre de recherche
  let input = document.querySelector("#searchBar");
  input.addEventListener("keyup", C.handler_filterOnSearch);


  let all = M.getConcatEvents()
  
  V.courseColor(all)
  
  V.uicalendar.createEvents(all);
  
  // définition de la vue en fonction du format de l'appareil
  V.deviceFormat();
  

  // sauvegarde de la vue en localStorage
  if(localStorage.getItem("view") != undefined){
    let view = localStorage.getItem("view");
    V.uicalendar.changeView(view)
  }

  // sauvegarde des années en localStorage
  if(localStorage.getItem("year") != undefined){
    let year = JSON.parse(localStorage.getItem("year"));
    V.uicalendar.clear();
    V.courseColor(year);
    V.uicalendar.createEvents(year);
  }
  
  // sauvegarde des groupes en localStorage
  if(localStorage.getItem("group") != undefined){
    let group = JSON.parse(localStorage.getItem("group"));
    V.uicalendar.clear();
    V.courseColor(group);
    V.uicalendar.createEvents(group);
  } 
}



// affichage des années
C.handler_clickOnYear = function(ev){

  if(ev.target.tagName =="INPUT"){
    let allEvents = M.getConcatEvents();
  
    let eventsByYear = [];

    let years = document.querySelectorAll('#year')
 
    for(let year of years){
      if(year.checked == true){
        for (let event of allEvents){
          // compare l'id avec la value de chaque checkbox
          if(event.calendarId == year.value){
            eventsByYear.push(event);
          }
        }
      }
    }

    localStorage.removeItem("year");
    localStorage.removeItem("group");
    
    localStorage.setItem("year", JSON.stringify(eventsByYear));
      
    V.uicalendar.clear()

    V.courseColor(eventsByYear)

    V.uicalendar.createEvents(eventsByYear);

  }
}


// affichage des groupes
C.handler_changeOnGroup = function(ev){
  let allEvents = M.getConcatEvents();

  let eventsByGroup = [];

  for(let event of allEvents){
    if(event.groups.includes(ev.target.value)){
      eventsByGroup.push(event);
    }
  }

  localStorage.removeItem("group");
  localStorage.removeItem("year");
  
  localStorage.setItem("group", JSON.stringify(eventsByGroup));


  V.uicalendar.clear()
  
  V.courseColor(eventsByGroup)

  V.uicalendar.createEvents(eventsByGroup)
}





// barre de recherche
C.handler_filterOnSearch = function(ev){
  let input = ev.target.value;
  let events = M.getEventBySearch(input);

  
  V.uicalendar.clear()
  
  V.courseColor(events)

  V.uicalendar.createEvents(events)
}


C.init();




