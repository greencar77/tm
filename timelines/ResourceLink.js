"use strict";

class ResourceLink {

    static appendAllLinks(parent, entry) {
        let link;
        link = ResourceLink.wiki(entry);
        if (link) {
            parent.appendChild(link);
        }
        link = ResourceLink.timeNote(entry);
        if (link) {
            parent.appendChild(link);
        }
        link = ResourceLink.historia(entry);
        if (link) {
            parent.appendChild(link);
        }
        link = ResourceLink.enciklopedija(entry);
        if (link) {
            parent.appendChild(link);
        }
        link = ResourceLink.literatura(entry);
        if (link) {
            parent.appendChild(link);
        }
        link = ResourceLink.rulers(entry);
        if (link) {
            parent.appendChild(link);
        }
    }

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

    static literatura(entry) {
        if (entry.url_lit) {
            let result = document.createElement('a');
            result.setAttribute('href', 'https://www.literatura.lv/personas/' + entry.url_lit);
            result.textContent = '[literatura]';
            return result;
        }
        return '';
    }

    static rulers(entry) {
        if (entry.url_rulorg) {
            let result = document.createElement('a');
            result.setAttribute('href', 'https://rulers.org/' + entry.url_rulorg);
            result.textContent = '[rulers.org]';
            return result;
        }
        return '';
    }
}