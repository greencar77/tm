"use strict";

class PersView extends TimelineView {

    constructor(id) {
        super(id);
    }

    getTitle() {
        return this.entry.name + ' ' + this.entry.surname;
    }

    init() {
        this.entry = fyfwmby6543_persons.filter(e => e.id == this.id)[0]; //TODO dirty
        prepareTimelineData([this.entry]);
    }

    render() {
        console.log('Render PersView');
        let main = document.getElementById('mainview');

        this.renderPersInfo(main);

        if (!window['fyfwmby6543_' + this.id]) {
            window['fyfwmby6543_' + this.id] = [];
        }
        let data = window['fyfwmby6543_' + this.id];
        data.push({ 'd': this.entry.d, 'v': 'Mūžs'});
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
}