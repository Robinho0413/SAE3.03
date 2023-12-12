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
  // V.uicalendar.createEvents( M.getEvents('mmi1') );
  // V.uicalendar.createEvents( M.getEvents('mmi2') );
  // V.uicalendar.createEvents( M.getEvents('mmi3') );
}

C.init();



// affichage des années

let year = document.querySelector('#checkboxs');

C.handler_clickOnCheckbox = function(ev){

  if(ev.target.tagName =="INPUT"){
    let allEvents = M.getConcatEvents();
  
    let eventsByYear = [];

    let years = document.querySelectorAll('#checkboxs li input')
 
    for(let year of years){
      if(year.checked == true){
        for (let event of allEvents){
          if(event.calendarId == year.id){
            eventsByYear.push(event);
          }
        }
      }
    }
      
    V.uicalendar.clear()

    V.courseColor(eventsByYear)

    V.uicalendar.createEvents(eventsByYear);
        
  }

}

year.addEventListener('click', C.handler_clickOnCheckbox);




// affichage des groupes
let group = document.querySelector('#select-groups');


C.handler_changeOnGroup = function(ev){
  let allEvents = M.getConcatEvents();

  let eventsByGroup = [];

  for(let event of allEvents){
    if(event.groups.includes(ev.target.value)){
      eventsByGroup.push(event);
    }
  }


  V.uicalendar.clear()
  
  V.courseColor(eventsByGroup)

  V.uicalendar.createEvents(eventsByGroup)
  
}

group.addEventListener('change', C.handler_changeOnGroup);


let all = M.getConcatEvents()

V.courseColor(all)

V.uicalendar.createEvents(all);






