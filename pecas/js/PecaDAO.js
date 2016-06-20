/* JavaScript Document */

var PecaDAO = {

	DB_KEY: "pecas",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(peca, tableController) {
		var list  = PecaDAO.list,
		    index = PecaDAO.getIndex(peca);
		
		if(index > -1) {
			list[index] = peca;
			PecaDAO.serializeAndSave();
			return PecaDAO.UPDATE;
		}
		else {
			list.push(peca);
			if(tableController) {
				tableController.addItem(peca);
			}
		}
		
		PecaDAO.serializeAndSave();

		return PecaDAO.NEW;
	},

	retrieve: function() {
		var list = PecaDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(nome) {
		var list  = PecaDAO.list,
		    index = PecaDAO.getIndex({'nome': nome});

		if (index > -1) {
			var peca = list[index];
			return peca;
		}

		return null;
	},

	getIndex: function(peca) {
		var list = PecaDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.nome == peca.nome) {
				return i;
			}
		}

		return -1;
	},

	delete: function(nome) {
		var list  = PecaDAO.list,
		    index = PecaDAO.getIndex({'nome': nome});

		if (index > -1) {
			list.splice(index, 1);
			PecaDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = PecaDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(PecaDAO.list);
			window.localStorage.setItem(PecaDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(PecaDAO.DB_KEY);
		if(json) {
			PecaDAO.list = JSON.parse(json);
		}
		else {
			PecaDAO.list = [];
		}
	}

};
