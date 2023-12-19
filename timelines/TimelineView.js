"use strict";

class TimelineView extends View {

    constructor(id) {
        super();
        this.id = id;
        this.init();
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.entry.title;
    }

    init() {
        this.entry = fyfwmby6543_timelines.filter(e => e.id == this.id)[0]; //TODO dirty
        prepareTimelineData([this.entry]);
    }

    render() {
        console.log('Render TimelineView');
        let main = document.getElementById('mainview');

        this.renderPersInfo(main);

        if (!window['fyfwmby6543_' + this.id]) {
            window['fyfwmby6543_' + this.id] = [];
        }
        let data = window['fyfwmby6543_' + this.id];
        data.push({ 'd': this.entry.d, 'v': 'Periods'});
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
        birthDeathEl.textContent = createDisplayDate(this.entry.start) + ' - ' + createDisplayDate(this.entry.end);
        div.appendChild(birthDeathEl);

        let link;
        link = ResourceLink.wiki(this.entry);
        if (link) {
            div.appendChild(link);
        }
        link = ResourceLink.timeNote(this.entry);
        if (link) {
            div.appendChild(link);
        }
        link = ResourceLink.historia(this.entry);
        if (link) {
            div.appendChild(link);
        }
        link = ResourceLink.enciklopedija(this.entry);
        if (link) {
            div.appendChild(link);
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