"use strict";

function entrySorterByStart(a, b) {
    if (a.start.date < b.start.date) {
        return -1;
    }
    if (a.start.date > b.start.date) {
        return 1;
    }
    return 0;
}

function entrySorterByDelta(a, b) {
    return b.end.delta - a.end.delta;
}

function prepareTimelineData(arr) {
    if (!arr || !arr[0]) {
        alert('Invalid timeline!');
        return;
    }
    fillDefaultDates(arr);
    expandDates(arr);
    populateTags(arr);
}

function fillDefaultDates(arr) {
    let now = (new Date()).toISOString().replace(/-/g, '.').split('T')[0];
    arr.forEach(e => {
        if (!e) {
            alert('Invalid timeline entry!');
            return;
        }
        if (e.d.endsWith('-')) {
            e.d = e.d + now + '/.';
        }
        });
}

function expandDates(arr) {
    arr.forEach(e => {
        if (e.d.indexOf('-') != e.d.lastIndexOf('-')) {
            alert('Invalid dates: ' + e.d + ' ' + e.id);
        }
        if (e.d.indexOf('-') > -1) {
            let parts = e.d.split('-');
            e.start = createDateFromRichString(parts[0]);
            e.end = createDateFromRichString(parts[1]);
        } else {
            e.start = createDateFromRichString(e.d);
            e.end = createDateFromRichString(e.d);
        }
        e.end.delta = getDaysDelta(e.start.date, e.end.date);
    });
}

function populateTags(arr) {
    arr.forEach(e => {
        ['url_wiki', 'url_timenote', 'url_historia']
            .forEach(tag => {
                if (e[tag]) {
                    e.tags.push(tag);
                } else {
                    e.tags.push(tag + '-');
                }
            });
        });
}

function asYears(days) {
    return days < 365? days : Math.round(days / 365 ) + 'y';
}

function createDisplayDate(date) {
    switch(date.prec) {
        case -1: return '...';
        case 0: return '...';
        case 1: return date.date.substring(0, 4);
        case 2: return date.date.substring(0, 7);
        default: return date.date;
    }
}

function createDateCell(entry) {
    let dateTd = document.createElement('td');
    if (entry.end.delta == 0) {
        dateTd.textContent = createDisplayDate(entry.start);
    } else {
        dateTd.textContent = createDisplayDate(entry.start) + ' - ' + createDisplayDate(entry.end)
            + ' (' + asYears(getDaysDelta(entry.start.date, window.viewStatus.date))
               + (entry.end.prec == -1? '': '/' + asYears(getDaysDelta(entry.start.date, entry.end.date)))
            + ')';
    }
    return dateTd;
}

function registerPerson(p) {
    fyfwmby6543_persons.push(p);
}

function registerTimeline(p) {
    fyfwmby6543_timelines.push(p);
}
