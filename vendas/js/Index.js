Deployed in external server
HTML5 API
Report


var Index = {

	init: function() {
		Index.setForm();
		Index.listVendas();
		ListController.loadSelects();
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {
			form.onsubmit = function() {
				Index.saveVenda(form);
				return false;
			};
		}
	},

	saveVenda: function(form) {
		var venda = {};
		venda.funcionario  = form.listFuncionario.value;
		venda.usuario = form.listUsuario.value;
		venda.date = form.date.value;
		venda.quantidade = form.quantidade.value;
		venda.peca = form.listPeca.value;
		venda.preco = form.preco.value;
		
		if(VendaDAO.save(venda) == VendaDAO.NEW) {
			TableController.addItem(venda, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listVendas();
		}

		form.quantidade.value = form.listUsuario.value = form.listPeca.value = form.date.value = form.listFuncionario.value = form.preco.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tabela-vendas');
		TableController.setTable(table);
	},

	listVendas: function() {
		Index.setTable();
		var vendaList = VendaDAO.retrieve();
		if (vendaList && vendaList.length) {
			TableController.addList(vendaList, Index.edit, Index.delete);
		}
	}, 

	edit: function(venda) {
		if(confirm("Você deseja editar a venda de" + venda + " ?")) {
			var venda = VendaDAO.get(venda);
			if (venda) {
				var form = document.getElementById('form');
				form.listFuncionario.value  = venda.funcionario;
				form.listUsuario.value = venda.usuario;
				form.date.value = venda.date;
				form.quantidade.value = venda.quantidade;
				form.listPeca.value = venda.peca;
				form.preco.value = venda.preco;
			}
		}
	},

	delete: function(venda, element) {
		if(confirm("Você deseja deletar a venda de " + venda + " ?")) {
			var venda = VendaDAO.get(venda);
			if (venda) {
				if(VendaDAO.delete(venda)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};

VendaDAO.unserializeAndParse();
Index.init();