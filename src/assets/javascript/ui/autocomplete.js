module.exports = {
    searchIndex: ['Madrid', 'Barcelona', 'Paris', 'Bilbao'],
    locators: {
        input: "searchBox",
        ul: "searchResults"
    },
    model: {
        inputTerms: '',
        termsArray: '',
        prefix: '',
        terms: '',
        results: '',
        sortedResults: ''
    },
    search: function () {
        this.model.inputTerms = document.getElementById(this.locators.input).value.toLowerCase();
        this.model.results = [];
        this.model.termsArray = [this.model.inputTerms];
        this.model.prefix = this.model.termsArray.length === 1 ? '' : this.model.termsArray.slice(0, -1).join(' ') + ' ';
        this.model.terms = this.model.termsArray[this.model.termsArray.length - 1].toLowerCase();

        for (var i = 0; i < this.searchIndex.length; i++) {
            var a = this.searchIndex[i].toLowerCase(),
                t = a.indexOf(this.model.terms);

            if (t > -1) {
                this.model.results.push(a);
            }
        }
        this.evaluateResults();
    },

    evaluateResults: function () {
        if (this.model.results.length > 0
            && this.model.inputTerms.length > 0
            && this.model.terms.length !== 0) {
            this.model.sortedResults = this.model.results.sort(this.sortResults.bind(this));
            this.appendResults();
        }
        else if (this.model.inputTerms.length > 0 && this.model.terms.length !== 0) {
            document.getElementById(this.locators.ul).innerHTML = '<li> No hay coincidencias con:'
                + this.model.inputTerms
                + ' </li>';

        }
        else if (this.model.inputTerms.length !== 0
            && this.model.terms.length === 0) {
            return;
        }
        else {
            this.clearResults();
        }
    },

    sortResults: function (a, b) {
        if (a.indexOf(this.model.terms) < b.indexOf(this.model.terms)) return -1;
        if (a.indexOf(this.model.terms) > b.indexOf(this.model.terms)) return 1;
        return 0;
    },

    appendResults: function () {
        this.clearResults();
        var autocompleteList = document.getElementById(this.locators.ul);
        for (var i = 0; i < this.model.sortedResults.length && i < 10; i++) {
            var li = document.createElement("li"),
                result = this.model.prefix
                    + this.model.sortedResults[i].toLowerCase().replace(this.model.terms, '<strong>'
                        + this.model.terms
                        + '</strong>');

            li.innerHTML = result;
            autocompleteList.appendChild(li);
        }

        if (autocompleteList.className !== "term-list") {
            autocompleteList.className = "term-list";
        }
    },

    clearResults: function () {
        var autocompleteList = document.getElementById(this.locators.ul);
        autocompleteList.className = "term-list hidden";
        autocompleteList.innerHTML = '';
    },

    bindClick: function () {
        $("#searchResults").on('click', 'li', function () {
            $("#searchBox").val($(this).text());
            $("#searchResults").addClass('u-hidden')
        })
    },
    init: function () {
        var that = this;
        document.getElementById(that.locators.input).addEventListener("keyup", function () {
            that.search(that);
        }, false);
        this.bindClick();
    }
};