class NegotiationController {

    constructor() {

        let $ =  document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputQuantity = $('#quantidade');
        this._inputValue = $('#valor');

        this._listNegotiations = new Bind(new ListNegotiations(), new NegotiationViews($('#negotiationsList')), 'add', 'clean');

        this._message =  new Bind(new Message(), new MessageViews($('#messageNotification')), 'text');
    }

    add(ev) {
        ev.preventDefault();

        this._listNegotiations.add(this._createNegotiation());
        this._message.text = 'Negociação encaminhada com sucesso';
        this._clearForm();
    }

    delete() {
        this._listNegotiations.clean();
        this._message.text = 'Lista de Negociações apagadas com sucesso';
    }

    import() {
        let service = new NegotiationService();

        service.getAllNegotiations()
            .then(negotiations => {
                negotiations.forEach(el => this._listNegotiations.add(el));
                this._message.text = "Negociações importadas com sucesso!"
            })
            .catch(err => this._message.text = err);

    }

    _createNegotiation() {
        return new Negotiation(DateHelper.textToDate(this._inputDate), this._inputQuantity.value, this._inputValue.value);
    }

    _clearForm() {
        this._inputDate.value = '';
        this._inputQuantity.value = 1;
        this._inputValue.value = 0.0;
        this._inputDate.focus();
    }
}