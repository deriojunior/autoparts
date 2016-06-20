/* JavaScript */

var Index = {

	init: function() {
		Index.setForm();
		Index.listFuncionarios();
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {
			form.onsubmit = function() {
				Index.saveFuncionario(form);
				return false;
			};
		}
	},
	
	mascara: function (t, mask){
		var i = t.value.length;
		var saida = mask.substring(1,0);
		var texto = mask.substring(i)
		if (texto.substring(0,1) != saida){
			t.value += texto.substring(0,1);
		}
	}, 

	saveFuncionario: function(form) {
		var funcionario = {};
		funcionario.nome  = form.nome.value;
		funcionario.telefone = form.telefone.value;
		funcionario.email = form.email.value;
		funcionario.cidade = form.cidade.value;
		funcionario.estado = form.estado.value;
		
		if(FuncionarioDAO.save(funcionario) == FuncionarioDAO.NEW) {
			TableController.addItem(funcionario, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listProdutores();
		}

		form.nome.value = form.cidade.value = form.bairro.value = form.rua.value = form.numero.value = form.celular.value = form.celular2.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tabela-funcionarios');
		TableController.setTable(table);
	},

	listFuncionarios: function() {
		Index.setTable();
		var funcionarioList = FuncionarioDAO.retrieve();
		if (funcionarioList && funcionarioList.length) {
			TableController.addList(funcionarioList, Index.edit, Index.delete);
		}
	}, 

	edit: function(nome) {
		if(confirm("Você deseja editar o funcionário " + nome + " ?")) {
			var funcionario = FuncionarioDAO.get(nome);
			if (funcionario) {
				var form = document.getElementById('form');
				form.nome.value  = funcionario.nome;
				form.cidade.value = funcionario.telefone;
				form.bairro.value = funcionario.email;
				form.rua.value = funcionario.cidade;
				form.numero.value = funcionario.estado;
			}
		}
	},

	delete: function(nome, element) {
		if(confirm("Você deseja deletar o funcionário " + nome + " ?")) {
			var funcionario = FuncionarioDAO.get(nome);
			if (funcionario) {
				if(FuncionarioDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};

//initialization
FuncionarioDAO.unserializeAndParse();
Index.init();