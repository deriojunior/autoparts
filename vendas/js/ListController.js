var ListController = {

setPeca: function() {
	PecaDAO.unserializeAndParse();
	var list = PecaDAO.retrieve();
	var selectPeca = document.getElementById('listPeca');
	if(list){
		for (var i = 0; i < list.length; i++) {
			var option = document.createElement('option');
			option.text = list[i].nome;
			selectPeca.add(option);
		};	
	}
	if(list.length == 1){
		selectPeca.value = list[0].nome;
	}
	
},
setUsuario: function() {
	UsuarioDAO.unserializeAndParse();
	var list = UsuarioDAO.retrieve();
	var selectUsuario = document.getElementById('listUsuario');
	if(list){
		for (var i = 0; i < list.length; i++) {
			var option = document.createElement('option');
			option.text = list[i].nome;
			selectUsuario.add(option);
		};	
	}
	if(list.length == 1){
		selectUsuario.value = list[0].nome;
	}
},
setFuncionario:function() {
	FuncionarioDAO.unserializeAndParse();
	var list = FuncionarioDAO.retrieve();
	var selectFuncionario = document.getElementById('listFuncionario');
	if(list){
		for (var i = 0; i < list.length; i++) {
			var option = document.createElement('option');
			option.text = list[i].nome;
			selectFuncionario.add(option);
		};	
	}
	if(list.length == 1){
		selectFuncionario.value = list[0].nome;
	}
},
loadSelects: function() {
	ListController.setPeca();
	ListController.setUsuario();
	ListController.setFuncionario();
}

};