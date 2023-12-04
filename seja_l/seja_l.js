"use strict";

class SejaView extends View {

    getId() {
        return 'lzjfld';
    }

    getTitle() {
        return 'Ludvigs Sēja';
    }

    render() {
        console.log('Render SejaView');
        let main = document.getElementById('mainview');
        let table = document.createElement('table');
        let data = fyfwmby6543_seja_l;
        expandDates(data);
        data = data.filter(e => e.start.date <= window.viewStatus.date && window.viewStatus.date <= e.end.date);
        data.sort(entrySorterByDelta);
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

    createProgressCell(entry) {
        let result = document.createElement('td');
        if (!window.viewStatus.date) {
            alert('Status date is missing!');
            return;
        }
        let actualDay = getDaysDelta(entry.start.date, window.viewStatus.date);
        result.innerHTML = createProgress(actualDay, entry.end.delta);
        return result;
    }
}