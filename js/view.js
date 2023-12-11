import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

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

// iteration 2

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

// iteration 3
V.updateColor = function() {
  V.uicalendar.setCalendarColor('mmi1', {
    color: '#FFFFFF',
    backgroundColor: '#FF0000',
    borderColor: '#CACACA',
    dragBackgroundColor: '#585858',
  });
  V.uicalendar.setCalendarColor('mmi2', {
    color: '#FFFFFF',
    backgroundColor: '#00FF00',
    borderColor: '#CACACA',
    dragBackgroundColor: '#dc9656',
  });
  V.uicalendar.setCalendarColor('mmi3', {
    color: '#FFFFFF',
    backgroundColor: '#00C1FF',
    borderColor: '#878787',
    dragBackgroundColor: '#ab4642',
  });
}


export { V };
