var Index = {


	calcularMedia:function(peca){
		var soma = Index.calcularSoma(peca);
		var quantidade = Index.contador(peca);
		if(quantidade != 0){
			var media = soma / quantidade;
			media = media.toFixed(2);
			return media;
		} else {
			console.log("Não existe registro de Peças " + peca);
			return "-----";
		}

	},
	calcularSoma:function(peca){
		var soma = parseInt(0);

		VendaDAO.unserializeAndParse();
		var listVendas = VendaDAO.retrieve();

		for (var i = 0; i < listVendas.length; i++) {
			if(peca == listVendas[i].peca)
			soma = parseInt(soma) + parseInt(listVendas[i].quantidade);
		};

		if(soma == 0){
			return "-----";
		}
		return soma;

	},
	contador:function(peca){
		var contador = 0;

		VendaDAO.unserializeAndParse();
		var listVendas = VendaDAO.retrieve();

		for (var i = 0; i < listVendas.length; i++) {
			if(peca == listVendas[i].peca){
				contador++;
			}
		};

		return contador;
	},
	carregarTabela:function(){
		var tabela = document.getElementById("tbody");

		PecaDAO.unserializeAndParse();
		var listPeca = PecaDAO.retrieve();

		var nome,
			soma,
			media;

		for (var i = 0; i < listPeca.length; i++) {
			nome = listPeca[i].nome;
			soma = Index.calcularSoma(nome);
			media = Index.calcularMedia(nome);

			var row = Index.createNewRow(),
				index = 0;
			
			row.cells[index++].innerHTML = nome;
			row.cells[index++].innerHTML = soma
			row.cells[index++].innerHTML = media;

			tabela.appendChild(row);
		}
	},

	createNewRow: function() {
		var row = document.createElement('tr');
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		return row;
	}
	
}
Index.carregarTabela();