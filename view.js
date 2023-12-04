"use strict";

class ViewEngine {
    constructor() {
        let paramMap = getParamMap();
        console.log('View: ' + paramMap.get('v'));

        this.prepareData();

        window.viewStatus = { "date": paramMap.get('d') };
        console.log('status: ');
        console.log(status);

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
    }

    renderDateTitle(date) {
        let el = document.getElementById('date');
        el.textContent = date;
    }

    createView(paramMap) {
        let viewId = paramMap.get('v');
        if (viewId == 'pers') {
            return new PersView(paramMap.get('p'));
        }
        switch(viewId) {
            case 'person_list': return new PersonListView();

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