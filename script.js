const eventListByDay = {
    "23" : [
        {
            "type": "minicurso",
            "hour": "08h às 11h",
            "title": "Introdução ao UI/UX design",
        },
        {
            "type": "palestra",
            "hour": "11h às 12h",
            "title": "Empreendedorismo digital",
        },
        {
            "type": "palestra",
            "hour": "15h às 16h",
            "title": "Da palestra à criação de uma start-up",
        },
        {
            "type": "mesa redonda",
            "hour": "16h às 18h",
            "title": "Ser desenvolvedor e vida no exterior",
        },
        {
            "type": "minicurso",
            "hour": "17h às 20h",
            "title": "Introdução ao UI/UX design",
        }
    ],
    "24" : [
        {
            "type": "palestra",
            "hour": "10h às 12h",
            "title": "Introdução a Internet das Coisas (IoT)",
        },
        {
            "type": "minicurso",
            "hour": "14h às 16h",
            "title": "Desenvolvimento de Jogos com GODOT",
        },
        {
            "type": "minicurso",
            "hour": "14h às 16h",
            "title": "Introdução à Metodologia Científica",
        },
        {
            "type": "minicurso",
            "hour": "14h às 18h",
            "title": "Introdução à Visão Computacional",
        },
        {
            "type": "minicurso",
            "hour": "17h às 20h",
            "title": "Desenvolvimento Mobile com Flutter",
        }
    ],
    "25" : [
        {
            "type": "minicurso",
            "hour": "08h às 12h",
            "title": "Desenvolvimento de Jogos com Godot",
        },
        {
            "type": "oficina",
            "hour": "09h às 12h",
            "title": "Automação Via Pipelines",
        },
        {
            "type": "oficina",
            "hour": "14h às 15h",
            "title": "Boas Práticas em Segurança Digital",
        },
        {
            "type": "oficina",
            "hour": "15h às 17h",
            "title": "Além do mobile: Desenvolvendo Apps para IOS, Android, Web e Desktop",
        },
        {
            "type": "mesa redonda",
            "hour": "17h às 18h",
            "title": "Mulheres na Tecnologia",
        },
        {
            "type": "minicurso",
            "hour": "17h às 20h",
            "title": "Introdução à Frontend",
        }
    ],
    "26" : [
        {
            "type": "minicurso",
            "hour": "17h às 20h",
            "title": "Introdução à LGPD",
        },
        {
            "type": "palestra",
            "hour": "17h às 20h",
            "title": "Estratégias para performar na carreira TECH",
        }
    ],
}

const generateEvent = () => {
    const timeline = document.getElementsByClassName("timeline")[0];
    const eventDaysTemplate = document.getElementById("event-days").content;
    const eventsDetailsTemplate = document.getElementById("events-details").content;

    const now = new Date("Fri Aug 24 2023 15:54:18 GMT-0300");

    const isDayDone = (eventDayClone, eventDay) => {
        const eventDate = new Date(y=2023, m=7, d=eventDay+1);

        if (eventDate < now) {
            eventDayClone.children[0].className += ' deactivate'
        }
    }

    const isEventDone = (eventDetails, eventDay) => {
        const eventEndsHour = eventDetails.querySelector(".hour").innerHTML
                                .split(' ')[2]
                                .replace('h','');
        const eventEndsAt = new Date(y=2023, m=7, d=eventDay, hour=eventEndsHour);
        if (eventEndsAt <= now) {
            eventDetails.children[0].className += " deactivate";
        }
    }

    const isEventActive = (eventDetails, eventDay) => {
        const [eventEndsHour, _, eventBeginsHour] = eventDetails.querySelector(".hour").innerHTML
                                .replaceAll('h','')
                                .split(' ');
        const eventBeginsAt = new Date(y=2023, m=7, d=eventDay, hour=eventBeginsHour);
        const eventEndsAt = new Date(y=2023, m=7, d=eventDay, hour=eventEndsHour);
        console.log(eventEndsAt, now, eventBeginsHour);
        if (eventEndsAt < now && now < eventBeginsAt) {
            eventDetails.children[0].className += " active";
        }
    }

    const generateEventDetails = (event, eventDayClone, eventDay) => {
        const eventDetailsClone = eventsDetailsTemplate.cloneNode(true);

        eventDetailsClone.querySelector(".type").innerHTML = event.type;
        eventDetailsClone.querySelector(".hour").innerHTML = event.hour;
        eventDetailsClone.querySelector(".title").innerHTML = event.title;

        isEventDone(eventDetailsClone, eventDay);
        isEventActive(eventDetailsClone, eventDay);

        eventDayClone.querySelector(".event-list").append(eventDetailsClone);
    }

    const generateEventDay= (eventDay) => {
        const eventDayClone = eventDaysTemplate.cloneNode(true);
        const eventDayDate = eventDayClone.querySelector(".date");
        const eventList = eventListByDay[eventDay];

        eventDayDate.innerHTML = eventDay;

        isDayDone(eventDayClone, eventDay)

        eventList.forEach(event => generateEventDetails(event, eventDayClone, eventDay));

        timeline.append(eventDayClone);
    }

    Object.keys(eventListByDay).forEach(eventDay => {
        generateEventDay(eventDay);
    });
}

window.onload = () => generateEvent();