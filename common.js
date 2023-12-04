"use strict";

function getParamMap() {
    if (window.location.href.indexOf('?') > -1) {
        let paramPart = window.location.href.substring(window.location.href.indexOf('?') + 1);
        let paramArr = paramPart.split('&');
        return new Map(paramArr.map(e => [e.split('=')[0], e.split('=')[1]]));
    } else {
        return new Map();
    }
}

function createDateFromRichString(string) {
    if (string.indexOf('/') > -1) {
        let parts = string.split('/');
        return { 'date': parts[0], 'prec': parseInt(parts[1])};
    } else {
        return { 'date': string, 'prec': 3 };
    }
}

/*
function createBar(value, max, className) {
    if (!value || !max || max == 0 || value == 0) {
        return '';
    }
    let widthPerc = Math.round(value * 100 * 10 / max) / 10; //1 decimal place
    return '<table width="100%"><tr><td class="' + className + '" width="' + widthPerc + '%" height="30px"></td><td></td></tr></table>';
}
*/

function createProgress(value, max) {
    if (value == 0 && max > 0) {
        return '<table width="100px" class="progressbar_table><tr class="progressbar_tr">'
            + '<td class="progressbar_td2" width="100%" height="12px"></td>'
            + '</tr></table>';
    }
    if (!value || !max || max == 0) { // || value == 0
        return '';
    }
    let widthPerc = Math.round(value * 100 * 10 / max) / 10; //1 decimal place
    return '<table width="100px" class="progressbar_table><tr class="progressbar_tr">'
        + '<td class="progressbar_td1" width="' + widthPerc + '%" height="12px"></td>'
        + '<td class="progressbar_td2"></td>'
        + '</tr></table>';
}

function getDaysDelta(startDayString, endDayString) {
    return getDays(endDayString) - getDays(startDayString);
}

function getDays(dateString) {
    let parts = dateString.split('.');
    let result = (parseInt(parts[0]) - 1) * 365 + (parseInt(parts[1]) - 1) * 30 + parseInt(parts[2]);
    return result;
}

function generateId() {
    var uuid = Math.random().toString(36).slice(-6);
    console.log(uuid);
    return uuid;
}