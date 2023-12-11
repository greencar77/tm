"use strict";

class ResourceLink {

    static wiki(entry) {
        if (entry.wikiUrl) {
            let result = document.createElement('a');
            result.setAttribute('href', entry.wikiUrl);
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