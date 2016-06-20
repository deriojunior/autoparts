/* JavaScript Document */

var FuncionarioDAO = {

	DB_KEY: "funcionarios",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(funcionario, tableController) {
		var list  = FuncionarioDAO.list,
		    index = FuncionarioDAO.getIndex(funcionario);
		
		if(index > -1) {
			list[index] = funcionario;
			FuncionarioDAO.serializeAndSave();
			return FuncionarioDAO.UPDATE;
		}
		else {
			list.push(funcionario);
			if(tableController) {
				tableController.addItem(funcionario);
			}
		}
		
		FuncionarioDAO.serializeAndSave();

		return FuncionarioDAO.NEW;
	},

	retrieve: function() {
		var list = FuncionarioDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(nome) {
		var list  = FuncionarioDAO.list,
		    index = FuncionarioDAO.getIndex({'nome': nome});

		if (index > -1) {
			var funcionario = list[index];
			return funcionario;
		}

		return null;
	},

	getIndex: function(funcionario) {
		var list = FuncionarioDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.nome == funcionario.nome) {
				return i;
			}
		}

		return -1;
	},

	delete: function(nome) {
		var list  = FuncionarioDAO.list,
		    index = FuncionarioDAO.getIndex({'nome': nome});

		if (index > -1) {
			list.splice(index, 1);
			FuncionarioDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = FuncionarioDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(FuncionarioDAO.list);
			window.localStorage.setItem(FuncionarioDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(FuncionarioDAO.DB_KEY);
		if(json) {
			FuncionarioDAO.list = JSON.parse(json);
		}
		else {
			FuncionarioDAO.list = [];
		}
	}

};
