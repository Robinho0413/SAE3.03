
import ical from 'ical';
import { EventManager } from './class/event-manager';

let Events = {
    mmi1: null,
    mmi2: null,
    mmi3: null
}

let M = {};

M.getEvents = function(annee) {
    if ( annee in Events ) {
        return Events[annee].toObject();
    }
    return null;
}

M.init = async function() {
    let data = await fetch('./data/mmi1.ics');
    data = await data.text();
    data = ical.parseICS(data);
    Events.mmi1 = new EventManager('mmi1', 'MMI 1', 'Agenda des MMI 1');
    Events.mmi1.addEvents(data);

    let data2 = await fetch('./data/mmi2.ics');
    data2 = await data2.text();
    data2 = ical.parseICS(data2);
    Events.mmi2 = new EventManager('mmi2', 'MMI 2', 'Agenda des MMI 2');
    Events.mmi2.addEvents(data2);

    let data3 = await fetch('./data/mmi3.ics');
    data3 = await data3.text();
    data3 = ical.parseICS(data3);
    Events.mmi3 = new EventManager('mmi3', 'MMI 3', 'Agenda des MMI 3');
    Events.mmi3.addEvents(data3);
}

export { M };


/*
    On notera que si tout ce qui est dans ce fichier concerne le modèle, seul ce qui est dans M est exporté (et donc accessible depuis l'extérieur).
    C'est une façon de faire qui permet de garder privé les données "réelles" qui sont dans Events mais dont la visibilité est limitée à ce module/fichier.
    Donc il faut voir M comme la partie publique de la vue et le reste comme la partie privée.
    C'est sensiblement différent de ce qu'on faisait jusqu'à présent où tout était dans l'objet M.
    L'utilisation des modules javascript nous permet ici de choisir ce que l'on veut rendre public ou privé.
    C'est une autre façon d'implémenter le concept d'encapsulation sans avoir à utiliser les classes.
    A noter qu'on aurait pu faire une classe "Model" mais dans la mesure où l'on n'aurait qu'une seule instance de Model, ce n'est pas vraiment utile.
    
*/