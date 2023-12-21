"use strict";

class VAtlantsView extends TimelineView {

    constructor(id) {
        super(id);
    }

    getTitle() {
        return 'Pasaules vēstures atlants';
    }

    render() {
        console.log('Render VAtlantsView');
        let main = document.getElementById('mainview');
        let table = document.createElement('table');
        let data = fyfwmby6543_vatlants;
        expandDates(data);
        data = data.filter(e => e.start.date <= window.viewStatus.date && window.viewStatus.date <= e.end.date);
        data.sort(entrySorterByDelta);
        data.forEach(e => {
            let tr = document.createElement('tr');

            tr.appendChild(createDateCell(e));
            tr.appendChild(this.createProgressCell(e));

            let contentTd = document.createElement('td');
            contentTd.textContent = e.name + ' (p: ' + e.page + ')';
            tr.appendChild(contentTd);

            table.appendChild(tr);
        }
        );
        main.appendChild(table);
    }

    createProgressCell(entry) {
        let result = document.createElement('td');
        if (!window.viewStatus.date) {
            alert('Status date is missing!');
            return;
        }
        let actualDay = getDaysDelta(entry.start.date, window.viewStatus.date);
        let maxDay = getDaysDelta(entry.start.date, entry.end.date);
        result.innerHTML = createProgress(actualDay, maxDay, entry.end.prec == -1? 'unended': null);
        return result;
    }
}