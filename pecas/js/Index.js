

var Index = {

	init: function() {
		Index.setForm();
		Index.listPecas();
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {
			form.onsubmit = function() {
				Index.savePeca(form);
				return false;
			};
		}
	},


	savePeca: function(form) {
		var peca = {};
		peca.nome  = form.nome.value;
		peca.carro = form.carro.value;
		peca.ano = form.ano.value;
		
		if(PecaDAO.save(peca) == PecaDAO.NEW) {
			TableController.addItem(peca, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listPecas();
		}

		form.nome.value = form.descricao.value = form.ano.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tabela-pecas');
		TableController.setTable(table);
	},

	listPecas: function() {
		Index.setTable();
		var pecaList = PecaDAO.retrieve();
		if (pecaList && pecaList.length) {
			TableController.addList(pecaList, Index.edit, Index.delete);
		}
	}, 

	edit: function(nome) {
		if(confirm("Você deseja editar a peça " + nome + " ?")) {
			var peca = PecaDAO.get(nome);
			if (peca) {
				var form = document.getElementById('form');
				form.nome.value  = peca.nome;
				form.ano.value = peca.ano;
				form.descricao.value = peca.descricao;
			}
		}
	},


	delete: function(nome, element) {
		if(confirm("Você deseja deletar a peça " + nome)) {
			var peca = PecaDAO.get(nome);
			if (peca) {
				if(PecaDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};

PecaDAO.unserializeAndParse();
Index.init();