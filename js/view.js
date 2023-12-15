import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
// import { defineConfig } from 'vite';

let V = {};

V.init = function(){
  // navigation entre les semaines et les jours
  let navigation = document.querySelector('#navigation');
  navigation.addEventListener('click', V.handler_clickOnNavigation);

  // changement de la vue (mois, semaine, jour)
  let view = document.querySelector('#view');
  view.addEventListener('click', V.handler_clickOnView);

  // la vue s'adapte durant le redimensionnement de la page
  window.addEventListener('resize', V.deviceFormat);
}

// pour chaque année, une couleur est associé à un type de cours
// l'objet colorMap dispose des paramêtres TP TD CM et others ayant comme valeurs une chaine de caractères (ici une couleur)
let colorMap = {
  mmi1: {
    TP: '#F23D3D' , TD :'#BF0F0F' , CM:'#8C0808', others:'#FF0000'
  },

  mmi2: {
    TP: '#89D49A' , TD :'#4A9C62' , CM:'#125728', others:'#00FF00'
  },

  mmi3: {
    TP: '#79D0F2' , TD :'#049DD9' , CM:'#035AA6', others:'#00C1FF'
  }
}

V.uicalendar = new Calendar('#calendar', {
  defaultView: 'week',
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  theme: {
    common: {
      backgroundColor: '#ece6dc',
    },
    week: {
      today: {
        color: 'black',
        backgroundColor: '#ece6dc',
      },
      nowIndicatorPast: { border: '2px dashed black' },
      nowIndicatorLabel: {color: 'black'},
      nowIndicatorToday: { border: '2px solid black' },
      nowIndicatorBullet: { backgroundColor: 'black' },
      timeGridHourLine: { borderBottom: '1px solid #d4d1ca' }
    },
    month: {
      weekend: {
        backgroundColor: '#d4d1ca85',
      },
    },
  },
  template: {
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },
 
 
});


// fonction previous, current et next pour naviguer entre les semaines
V.handler_clickOnNavigation = function(ev){
  if(ev.target.id == 'previous'){
    // navigate to previous
    V.uicalendar.prev();
  }
  else if(ev.target.id == 'current'){
    // navigate to today
    V.uicalendar.today();
  }
  else if(ev.target.id == 'next'){
    // navigate to next
    V.uicalendar.next();
  }
}


V.removeActiveView = function(){
  let btns = document.querySelectorAll(".btn")
  for(let btn of btns){
      if (btn.classList.contains("active")){
          btn.classList.remove("active");
      }
  }
}

V.addActiveView = function(elt){
  elt.classList.add("active");
}


// selection de la vue
V.handler_clickOnView = function(ev){
  if(ev.target.id == 'day'){
    // change to daily view
    V.uicalendar.changeView('day');
  }
  else if(ev.target.id == 'week'){
    // change to weekly view
    V.uicalendar.changeView('week');
  }
  else if(ev.target.id == 'month'){
    // change to monthly view
    V.uicalendar.changeView('month');
  }
  console.log(ev.target.id)

  //définition du bouton sélectionné en active
  if(ev.target.id != undefined){
    V.removeActiveView();
    V.addActiveView(ev.target);
  }

  localStorage.removeItem("view");

  localStorage.setItem("view", ev.target.id);
}


// fonction pour affecter une couleur à un cours en fonction de son type : CM TD TP
V.courseColor = function(objectevents) {
 
  for (let event of objectevents) { 
    event.backgroundColor = colorMap[event.calendarId][event.type]
  };
};

// définition de la vue en fonction du format de l'appareil
V.deviceFormat = function(){
  if(window.innerWidth <= 768){
    V.uicalendar.changeView('day');
  }
  else {
    V.uicalendar.changeView('week');
  }
}


export { V };
