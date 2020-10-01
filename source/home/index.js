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
		editable: true
	},
	{ 
		headerName: "Variable", 
		field: "Int_VariableId",
		width: 100,
		editable: true
	},
	{ 
		headerName: "Chart", 
		field: "Chart_Name",
		editable: true
	},
	{ 
		headerName: "Question Type", 
		field: "Int_QuestionType",
		editable: true
	},
	{ 
		headerName: "Chart value", 
		field: "Chart_Value",
		editable: true
	},
	{ 
		headerName: "Moments ID", 
		field: "Int_MomentsId",
		editable: true
	},
	{ 
		headerName: "Min value", 
		field: "Float_MinValue",
		editable: true
	},
	{ 
		headerName: "Max value", 
		field: "Float_MaxValue",
		editable: true
	},
	{ 
		headerName: "Min value nominale", 
		field: "Float_MinValueNominal",
		editable: true
	},
	{ 
		headerName: "Max value nominale", 
		field: "Float_MaxValueNominale",
		editable: true
	},
	{ 
		headerName: "Date", 
		field: "DateTime_Date",
		editable: true,
		onCellValueChanged: () => {
			console.log("ghoo");
		}
	},
	{
		headerName: "Calculation Example",
		cellRenderer: ({ data }) => {
			const {
				Float_MinValue,
				Float_MaxValue
			} = data;

			return Float_MinValue * Float_MaxValue;
		}
	},
	{
		headerName: "Dropdown",
		cellRenderer: "link"
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
		link: link
	},
	suppressHorizontalScroll: false,
	rowData: data
};

document.addEventListener('DOMContentLoaded', () => {
	new agGrid.Grid(gridDiv, gridOptions);

	gridApi = gridOptions.api;
});

btnDelete.addEventListener("click", () => {
	const selectedNodes = gridApi.getSelectedNodes();

	for (let i = 0; i < data.length; i++) {
		const isSelected = selectedNodes.filter(({ data: item }) => { return data[i].Int_Id === item.Int_Id; });

		if (isSelected.length)
			data.splice(i, 1);
	}

	gridApi.setRowData(data);
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

  	var newPrice = Math.floor(Math.random() * 100000);
  	selectedNode.setDataValue("Float_MinValue", newPrice);
})

function link() {
	const aTag = document.createElement("div");
	aTag.appendChild(document.createElement("button"));
	return aTag;
}