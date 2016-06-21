/* JavaScript Document */

var UsuarioDAO = {

	DB_KEY: "usuarios",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(usuario, tableController) {
		var list  = UsuarioDAO.list,
		    index = UsuarioDAO.getIndex(usuario);
		
		if(index > -1) {
			list[index] = usuario;
			UsuarioDAO.serializeAndSave();
			return UsuarioDAO.UPDATE;
		}
		else {
			list.push(usuario);
			if(tableController) {
				tableController.addItem(usuario);
			}
		}
		
		UsuarioDAO.serializeAndSave();

		return UsuarioDAO.NEW;
	},

	retrieve: function() {
		var list = UsuarioDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(nome) {
		var list  = UsuarioDAO.list,
		    index = UsuarioDAO.getIndex({'nome': nome});

		if (index > -1) {
			var usuario = list[index];
			return usuario;
		}

		return null;
	},

	getIndex: function(usuario) {
		var list = UsuarioDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.nome == usuario.nome) {
				return i;
			}
		}

		return -1;
	},

	delete: function(nome) {
		var list  = UsuarioDAO.list,
		    index = UsuarioDAO.getIndex({'nome': nome});

		if (index > -1) {
			list.splice(index, 1);
			UsuarioDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = UsuarioDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(UsuarioDAO.list);
			window.localStorage.setItem(UsuarioDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(UsuarioDAO.DB_KEY);
		if(json) {
			UsuarioDAO.list = JSON.parse(json);
		}
		else {
			UsuarioDAO.list = [];
		}
	}

};
