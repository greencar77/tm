"use strict";

class PersView extends View {

    constructor(id) {
        super();
        this.id = id;
        this.person = fyfwmby6543_persons.filter(e => e.id == this.id)[0]; //TODO dirty
        preparePersonData([this.person]);
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.person.name + ' ' + this.person.surname;
    }

    render() {
        console.log('Render PersView');
        let main = document.getElementById('mainview');

        this.renderPersInfo(main);

        if (!window['fyfwmby6543_' + this.id]) {
            window['fyfwmby6543_' + this.id] = [];
        }
        let data = window['fyfwmby6543_' + this.id];
        data.push({ 'd': this.person.d, 'v': 'Mūžs'});
        expandDates(data);
        data = data.filter(e => e.start.date <= window.viewStatus.date && window.viewStatus.date <= e.end.date);
        data.sort(entrySorterByDelta);
        let table = document.createElement('table');
        table.setAttribute('class', 'eventTable');
        data.forEach(e => {
            let tr = document.createElement('tr');
            tr.appendChild(createDateCell(e));
            tr.appendChild(this.createProgressCell(e));

            let contentTd = document.createElement('td');
            contentTd.textContent = e.v;
            tr.appendChild(contentTd);

            table.appendChild(tr);
            }
        );
        main.appendChild(table);
    }

    renderPersInfo(parent) {
        let div = document.createElement('div');
        let birthDeathEl = document.createElement('p');
        birthDeathEl.textContent = createDisplayDate(this.person.start) + ' - ' + createDisplayDate(this.person.end);
        div.appendChild(birthDeathEl);
        if (this.person.wikiUrl) {
            let wikiA = document.createElement('a');
            wikiA.setAttribute('href', this.person.wikiUrl);
            wikiA.textContent = '[Wiki]';
            div.appendChild(wikiA);
        }
        if (this.person.timenote) {
            let wikiA = document.createElement('a');
            wikiA.setAttribute('href', 'https://timenote.info/lv/' + this.person.timenote);
            wikiA.textContent = '[TimeNote]';
            div.appendChild(wikiA);
        }
        parent.appendChild(div);
    }

    createProgressCell(entry) {
        let result = document.createElement('td');
        if (!window.viewStatus.date) {
            alert('Status date is missing!');
            return;
        }
        let actualDay = getDaysDelta(entry.start.date, window.viewStatus.date);
        result.innerHTML = createProgress(actualDay, entry.end.delta, entry.end.prec == -1? 'unended': null);
        return result;
    }
}