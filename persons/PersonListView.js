"use strict";

class PersonListView extends View {
    filterConfig = {
            "tagPropName": "tags",
            "filters": null,
            "ignorableTags": null,
            "entryCreator": (entry, skippingTags) => this.entryCreator(entry, skippingTags),
            "appName": "app.selectedView",
            "filterPropertyName": "filterApp",
            "itemsComparator": (a, b) => {
                if (a.id && b.id) {
                    if (a.id == b.id) {
                        return 0;
                    }
                    if (a.id > b.id) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                return 0;
            },
            "tagGroups": [
                {
                    "title": "Year",
                    "byPrefix": "y_",
                },
                {
                    "title": "Year/Month",
                    "byPrefix": "m_",
                },
                {
                    "title": "Status",
                    "byPrefix": "status_",
                },
            ],
            "containerFn": () => this.createContainerTable,
        };

    getId() {
        return 'person_list';
    }

    getTitle() {
        return 'Personas';
    }

    render() {
        let main = document.getElementById('mainview');

        let filterPanel = document.createElement('filterdemo-panel');
        filterPanel.id = 'f1';
        main.appendChild(filterPanel);

        let data = fyfwmby6543_persons;
        preparePersonData(data);
        data = data.filter(e => e.start.date <= window.viewStatus.date && window.viewStatus.date <= e.end.date);
        data.sort(this.entrySorterBySurnameName);

        this.filterApp = new FilterCore(data, this.filterConfig);
        this.filterApp.init();
    }

    entryCreator(e, skippingTags) {
        let tr = document.createElement('tr');
        tr.appendChild(createDateCell(e));
        tr.appendChild(this.createProgressCell(e));

        let contentTd = document.createElement('td');
        if (!e.id) {
            alert('Missing id ' + e.name + ' ' + e.surname);
        }
        contentTd.innerHTML = '<a href="view.html?d=' + window.viewStatus.date + '&v=pers&p=' + e.id + '">' + e.name + ' ' + e.surname + '</a>';
        tr.appendChild(contentTd);

        return tr;
    }

    createContainerTable() {
        let outerElement = document.createElement('div');
        let innerElement = document.createElement('table');
        innerElement.setAttribute('class', 'filter');
        outerElement.appendChild(innerElement);
        return { "outer": outerElement, "inner": innerElement };
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

    entrySorterBySurnameName(a, b) {
        let an = a.surname + '_' + a.name;
        let bn = b.surname + '_' + b.name;
        if (an < bn) {
            return -1;
        }
        if (an > bn) {
            return 1;
        }
        return 0;
    }
}