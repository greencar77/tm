"use strict";

class CaksteKView extends View {

    getId() {
        return 'cakste_k';
    }

    getTitle() {
        return 'Konstantīns Čakste';
    }

    render() {
        console.log('Render SejaView');
        let main = document.getElementById('mainview');
        let table = document.createElement('table');
        let data = fyfwmby6543_cakste_k;
        expandDates(data);
        data = data.filter(e => e.start.date <= window.viewStatus.date && window.viewStatus.date <= e.end.date);
        data.sort((a, b) => {
            if (a.start.date < b.start.date) {
                return -1;
            }
            if (a.start.date > b.start.date) {
                return 1;
            }
            return 0;
        });
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
        let maxDay = getDaysDelta(entry.start.date, entry.end.date);
        result.innerHTML = createProgress(actualDay, maxDay);
        return result;
    }
}