"use strict";

class ViewEngine {
    constructor() {
        let paramMap = getParamMap();
        console.log('View: ' + paramMap.get('v'));

        this.prepareData();

        window.viewStatus = { "date": paramMap.get('d') };
        console.log('status: ');
        console.log(status);

        this.renderNavigation(paramMap);
        this.renderDateTitle(paramMap.get('d'));

        this.selectedView = this.createView(paramMap);
        let titleEl = document.getElementById('title');
        titleEl.textContent = this.selectedView.getTitle();
        let htmlTitleEl = document.getElementsByTagName('title')[0];
        htmlTitleEl.textContent = this.selectedView.getTitle();
        this.selectedView.render();

        generateId();
    }

    prepareData() {
        fyfwmby6543_persons.forEach(p => {
                if (!p.tags) {
                    p.tags = [];
                } else {
                    p.tags = p.tags.split(',');
                }

                [ "lv" ]
                    .forEach(t => {
                        if (!p.tags.includes(t)) {
                            p.tags.push(t + '-');
                        }
                    });
            }
        );

        fyfwmby6543_timelines.forEach(p => {
                if (!p.tags) {
                    p.tags = [];
                } else {
                    p.tags = p.tags.split(',');
                }

                [ "lv" ]
                    .forEach(t => {
                        if (!p.tags.includes(t)) {
                            p.tags.push(t + '-');
                        }
                    });
            }
        );
    }

    renderNavigation(paramMap) {
        let el = document.getElementById('navigation');
        let navLine = '';
        navLine += this.createNavigationItem('Laika skalas', 'timeline_list', paramMap);
        navLine += this.createNavigationItem('Personas', 'person_list', paramMap);
        el.innerHTML = navLine.substring(1);
    }

    createNavigationItem(title, key, paramMap) {
        let isActive = paramMap.get('v') == key;
        if (isActive) {
            return ' ' + '[' + title + ']'
        } else {
            return ' ' + '<a href="view.html?d=' + paramMap.get('d')  + '&v=' + key + '">[' + title + ']</a>';
        }
    }

    renderDateTitle(date) {
        let el = document.getElementById('date');
        el.textContent = date;
    }

    createView(paramMap) {
        let viewId = paramMap.get('v');
        if (viewId == 'pers') {
            return new PersView(paramMap.get('p'));
        } else if (viewId == 'tl') {
            return new TimelineView(paramMap.get('p'));
        }
        switch(viewId) {
            case 'person_list': return new PersonListView();
            case 'timeline_list': return new TimelineListView();

            case 'seja_l': return new SejaView();
            case 'cakste_k': return new CaksteKView();
            case 'vatlants': return new VAtlantsView();
        }
    }
}

class View {
    getTitle() {
        return 'getTitle';
    }
}