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

// sample events for testing
// let edt = [
//   {
//     id: '1',
//     calendarId: '1',
//     title: 'my event',
//     category: 'time',
//     start: '2023-12-11T08:30:00',
//     end: '2023-12-11T10:30:00',
//   },
//   {
//     id: '2',
//     calendarId: '1',
//     title: 'second event',
//     category: 'time',
//     start: '2023-12-13T14:00:00',
//     end: '2023-12-13T15:30:00',
//   },
// ]

// creating events in the calendar


C.init = function(){
  V.uicalendar.createEvents( M.getEvents('mmi1') );
  V.uicalendar.createEvents( M.getEvents('mmi2') );
  V.uicalendar.createEvents( M.getEvents('mmi3') );
  V.updateColor();
}

C.init();


// couleurs en fonction de la nature du cours : CM TD TP
C.natureColor = function(calId, cm, td, tp){
  let calendar = M.getEvents(calId);

  for(let ev of calendar){
    if(ev.title.includes('CM')){
      let changes = {
        backgroundColor : cm
      };
      V.uicalendar.updateEvent(ev.id, calId, changes);
    }

    if(ev.title.includes('TD')){
      let changes = {
        backgroundColor : td
      };
      V.uicalendar.updateEvent(ev.id, calId, changes);
    }

    if(ev.title.includes('TP')){
      let changes = {
        backgroundColor : tp
      };
      V.uicalendar.updateEvent(ev.id, calId, changes);
    }
  }
}

C.natureColor('mmi1', '#8C0808' , '#BF0F0F' , '#F23D3D') 
C.natureColor('mmi2', '#125728' , '#4A9C62' , '#89D49A') 
C.natureColor('mmi3', '#035AA6' , '#049DD9' , '#79D0F2')



// afficher les années désirés

let year = document.querySelector('#checkboxs');

C.handler_clickOnCheckbox = function(ev){
  if(ev.target.id == "mmi1" && ev.target.checked){
    V.uicalendar.setCalendarVisibility("mmi1", true);
  }
  else if(ev.target.id == "mmi1" && ev.target.checked == false){
    V.uicalendar.setCalendarVisibility("mmi1", false);
  }

  else if(ev.target.id == "mmi2" && ev.target.checked){
    V.uicalendar.setCalendarVisibility("mmi2", true);
  }
  else if(ev.target.id == "mmi2" && ev.target.checked == false){
    V.uicalendar.setCalendarVisibility("mmi2", false);
  }

  else if(ev.target.id == "mmi3" && ev.target.checked){
    V.uicalendar.setCalendarVisibility("mmi3", true);
  }
  else if(ev.target.id == "mmi3" && ev.target.checked == false){
    V.uicalendar.setCalendarVisibility("mmi3", false);
  }
  
}

year.addEventListener('click', C.handler_clickOnCheckbox);











