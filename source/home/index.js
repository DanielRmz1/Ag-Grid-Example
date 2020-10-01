const gridDiv = document.getElementById("myGrid");
const selectedRows = document.getElementById("selectedRows");
const btnAdd = document.getElementById("add");
const btnDelete = document.getElementById("delete");

let gridApi;

const columnDefs = [
	{
		headerName: "ID",
		field: "Int_Id",
		checkboxSelection: true,
		headerCheckboxSelection: true,
		width: 150,
		editable: true,
		filter: true,
		sortable: true,
		sortingOrder: ["desc"]
	},
	{
		headerName: "Variable",
		field: "Int_VariableId",
		width: 100,
		editable: true,
		filter: true,
		sortable: true
	},
	{ 
		headerName: "Chart", 
		field: "Chart_Name",
		editable: true,
		filter: true,
		sortable: true
	},
	{ 
		headerName: "Question Type", 
		field: "Int_QuestionType",
		editable: true,
		filter: true,
		sortable: true
	},
	{ 
		headerName: "Chart value", 
		field: "Chart_Value",
		editable: true,
		filter: true,
		sortable: true
	},
	{ 
		headerName: "Moments ID", 
		field: "Int_MomentsId",
		editable: true,
		filter: true,
		sortable: true
	},
	{ 
		headerName: "Min value", 
		field: "Float_MinValue",
		editable: true,
		filter: true,
		sortable: true
	},
	{ 
		headerName: "Max value", 
		field: "Float_MaxValue",
		editable: true,
		filter: true,
		sortable: true
	},
	{ 
		headerName: "Min value nominale", 
		field: "Float_MinValueNominal",
		editable: true,
		filter: true,
		sortable: true
	},
	{ 
		headerName: "Max value nominale", 
		field: "Float_MaxValueNominale",
		editable: true,
		filter: true,
		sortable: true
	},
	{ 
		headerName: "Date",
		field: "DateTime_Date",
		editable: true,
		onCellValueChanged: () => {
			console.log("ghoo");
		},
		filter: true,
		sortable: true
	},
	{
		headerName: "Calculation Example",
		cellRenderer: ({ data }) => {
			const {
				Float_MinValue,
				Float_MaxValue
			} = data;

			return Float_MinValue * Float_MaxValue;
		},
		filter: true,
		sortable: true
	},
	{
		headerName: "Dropdown",
		cellRenderer: "renderDropdown",
		field: "color",
		cellStyle: ({ data }) => {
			return {
				backgroundColor: data.color
			};
		}
	},
	{
		headerName: "Buttons",
		cellRenderer: "deleteIcon"
	}
];

const gridOptions = {
	columnDefs: columnDefs,
	rowSelection: "multiple",
	suppressRowClickSelection: true,
	pagination: true,
	paginationPageSize: 50,
	onRowSelected: () => {
		changeDeleteButtonState();
	},
	components: {
		renderDropdown: renderDropdown,
		deleteIcon: deleteIcon
	},
	animateRows: true,
	suppressHorizontalScroll: false,
	rowData: data
};

document.addEventListener('DOMContentLoaded', () => {
	new agGrid.Grid(gridDiv, gridOptions);

	gridApi = gridOptions.api;
});

btnDelete.addEventListener("click", () => {
	const selectedNodes = gridApi.getSelectedNodes();

	data = data.map((node) => {
		const isSelected = selectedNodes.filter(({ data: item }) => item.Int_Id === node.Int_Id);

		if (!isSelected.length) {
			return node;
		}

		return {
			...node,
			removed: true
		};
	});

	updateTable();
	changeDeleteButtonState(true);
})

changeDeleteButtonState = (disable) => {
	const selectedNodes = gridApi.getSelectedNodes().length;

	if (disable || selectedNodes === 0) 
	{
		selectedRows.innerHTML = 0;
		btnDelete.classList.add("disabled");
	} else {
		selectedRows.innerHTML = selectedNodes;
		btnDelete.classList.remove("disabled");
	}
}

btnAdd.addEventListener("click", () => {
	const selectedNode = gridApi.getSelectedNodes()[0];
	const calc = Math.floor(Math.random() * 100000);
	selectedNode.setDataValue("Float_MinValue", calc);
})

function renderDropdown(node) {
	console.log(node);
	const select = document.createElement("select");
	select.classList.add("dropdown");
	select.addEventListener("change", (e) => dropdownChange(e, node));

	select.innerHTML = '<option value = "#FFFFFF">White</option>' +
	'<option value = "#FF0000" ' + isSelected("#FF0000", node.data.color) + '>Red</option>' +
	'<option value = "#FFCC00" ' + isSelected("#FFCC00", node.data.color) + '>Orange</option>' +
	'<option value = "#FFFF00" ' + isSelected("#FFFF00", node.data.color) + '>Yellow</option>' +
	'<option value = "#00FF00" ' + isSelected("#00FF00", node.data.color) + '>Green</option>' +
	'<option value = "#0000FF" ' + isSelected("#0000FF", node.data.color) + '>Blue</option>' +
	'<option value = "#663366" ' + isSelected("#663366", node.data.color) + '>Indigo</option>' +
	'<option value = "#FF00FF" ' + isSelected("#FF00FF", node.data.color) + '>Violet</option>';
	return select;
}

function isSelected(value1, value2) {
	return value1 == value2 ? "selected" : "";
}

function deleteIcon(node) {
	const div = document.createElement("div");
	const iTag = document.createElement("i");
	iTag.classList.add("fas");
	iTag.classList.add("fa-trash");
	iTag.classList.add("icon");

	iTag.addEventListener("click", () => {
		deleteRecord(node);
	});

	const editTag = document.createElement("i");
	editTag.classList.add("fas");
	editTag.classList.add("fa-pen");
	editTag.classList.add("icon");

	editTag.addEventListener("click", () => {
		deleteRecord(node);
	});

	div.append(iTag);
	div.append(editTag);

	return div;
}

function deleteRecord(node) {
	data = data.map((x) => {
		if (x.Int_Id !== node.data.Int_Id) {
			return x;
		}

		return {
			...x,
			removed: true
		};
	});

	updateTable();
}

function updateTable() {
	data = data.filter(x => !x.removed);
	gridApi.setRowData(data);
}

function dropdownChange(event, { node }) {
	node.setDataValue("color", event.target.value);
}