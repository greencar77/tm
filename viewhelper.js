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

function preparePersonData(arr) {
    fillDefaultDates(arr);
    expandDates(arr);
    populateTags(arr);
}

function fillDefaultDates(arr) {
    arr.forEach(e => {
        if (e.d.endsWith('-')) {
            e.d = e.d + (parseInt(e.d.substring(0, 4)) + 999).toString() + '.12.31/0';
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
        if (e.wikiUrl) {
            e.tags.push('wiki');
        } else {
            e.tags.push('wiki-');
        }
        });
}

function asYears(days) {
    return days < 365? days : Math.round(days / 365 ) + 'y';
}

function createDisplayDate(date) {
    switch(date.prec) {
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
            + ' (' + asYears(getDaysDelta(entry.start.date, window.viewStatus.date)) + '/' + asYears(getDaysDelta(entry.start.date, entry.end.date)) + ')';
    }
    return dateTd;
}

function registerPerson(p) {
    fyfwmby6543_persons.push(p);
}