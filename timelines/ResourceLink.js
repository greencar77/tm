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
        if (entry.timenote) {
            let result = document.createElement('a');
            result.setAttribute('href', 'https://timenote.info/lv/' + entry.timenote);
            result.textContent = '[TimeNote]';
            return result;
        }
        return '';
    }
}