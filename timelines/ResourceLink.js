"use strict";

class ResourceLink {

    static wiki(entry) {
        if (entry.url_wiki) {
            let result = document.createElement('a');
            result.setAttribute('href', entry.url_wiki);
            result.textContent = '[Wiki]';
            return result;
        }
        return '';
    }

    static timeNote(entry) {
        if (entry.url_timenote) {
            let result = document.createElement('a');
            result.setAttribute('href', 'https://timenote.info/lv/' + entry.url_timenote);
            result.textContent = '[TimeNote]';
            return result;
        }
        return '';
    }

    static historia(entry) {
        if (entry.url_historia) {
            let result = document.createElement('a');
            result.setAttribute('href', 'https://www.historia.lv/personas/' + entry.url_historia);
            result.textContent = '[Historia]';
            return result;
        }
        return '';
    }

    static enciklopedija(entry) {
        if (entry.url_enc) {
            let result = document.createElement('a');
            result.setAttribute('href', 'https://enciklopedija.lv/skirklis/' + entry.url_enc);
            result.textContent = '[Enciklopēdija]';
            return result;
        }
        return '';
    }
}