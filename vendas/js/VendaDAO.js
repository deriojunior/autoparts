/* JavaScript Document */

var VendaDAO = {

	DB_KEY: "vendas",
	NEW: 1,
	UPdate: 2,

	list: [], 

	save: function(venda, tableController) {
		var list  = VendaDAO.list,
		    index = VendaDAO.getIndex(venda);
		
		if(index > -1) {
			list[index] = venda;
			VendaDAO.serializeAndSave();
			return VendaDAO.UPdate;
		}
		else {
			list.push(venda);
			if(tableController) {
				tableController.addItem(venda);
			}
		}
		
		VendaDAO.serializeAndSave();

		return VendaDAO.NEW;
	},

	retrieve: function() {
		var list = VendaDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(date) {
		var list  = VendaDAO.list,
		    index = VendaDAO.getIndex({'date': date});

		if (index > -1) {
			var venda = list[index];
			return venda;
		}

		return null;
	},

	getIndex: function(venda) {
		var list = VendaDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.date == venda.date) {
				return i;
			}
		}

		return -1;
	},

	delete: function(venda) {
		var list  = VendaDAO.list,
		    index = VendaDAO.getIndex(venda);

		if (index > -1) {
			list.splice(index, 1);
			VendaDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = VendaDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(VendaDAO.list);
			window.localStorage.setItem(VendaDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(VendaDAO.DB_KEY);
		if(json) {
			VendaDAO.list = JSON.parse(json);
		}
		else {
			VendaDAO.list = [];
		}
	}

};
