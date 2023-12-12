import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

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
  template: {
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },
 
 
});


// fonction previous, current et next pour naviguer entre les semaines
function prev(){
  V.uicalendar.prev();
}

function curr(){
  V.uicalendar.today();
}

function next(){
  V.uicalendar.next();
}

let previousWeek = document.querySelector('#previousWeek');
previousWeek.addEventListener('click', prev);

let currentWeek = document.querySelector('#currentWeek');
currentWeek.addEventListener('click', curr);

let nextWeek = document.querySelector('#nextWeek');
nextWeek.addEventListener('click', next);


// fonction pour affecter une couleur à un cours en fonction de son type : CM TD TP
V.courseColor = function(objectevents) {
 
  for (let event of objectevents) { 
    event.backgroundColor = colorMap[event.calendarId][event.type]
  
  };

 
};



export { V };
