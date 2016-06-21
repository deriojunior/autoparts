/* JavaScript Document */

var TableController = {

	table: null,

	setTable: function(table) {
		this.table = table;
	},

	addItem: function(item, editCallback, deleteCallback) {
		if(item) {
			var tbody = TableController.table.tBodies[0],
			    row = TableController.createNewRow(),
			    index = 0;
			
			row.cells[index++].innerHTML = item.date;
			row.cells[index++].innerHTML = item.usuario;
			row.cells[index++].innerHTML = item.quantidade;
			row.cells[index++].innerHTML = item.preco;
			row.cells[index++].innerHTML = item.preco * item.quantidade;
			row.cells[index++].innerHTML = item.funcionario;
			TableController.createActions(row.cells[index++], item, editCallback, deleteCallback);

			tbody.appendChild(row);
		}
	},

	addList: function(list, editCallback, deleteCallback) {
		if(list && list.length > 0) {
			for (var i = 0; i < list.length; i++) {
				TableController.addItem(list[i], editCallback, deleteCallback);
			}
		}
	},

	clearList: function() {
		TableController.table.tBodies[0].innerHTML = "";
	},
	
	createNewRow: function() {
		var row = document.createElement('tr');
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		return row;
	},

	createActions: function(cell, item, editCallback, deleteCallback) {
		var editElement = document.createElement("span"),
		    deleteElement = document.createElement("span");

		editElement.innerHTML = "Edit";
		editElement.setAttribute("data-date", item.date);
		editElement.className = "btn btn-success";

		deleteElement.innerHTML = "Delete";
		deleteElement.setAttribute("data-date", item.date);
		deleteElement.className = "btn btn-danger";

		if(editCallback) {
			editElement.onclick = function(){
				var date = editElement.getAttribute('data-date');
				editCallback(date);
			};
		}

		if(deleteCallback) {
			deleteElement.onclick = function(){
				var date = deleteElement.getAttribute('data-date');
				deleteCallback(date,deleteElement);
			};
		}

		cell.appendChild(editElement);
		cell.appendChild(deleteElement);
	}
};
