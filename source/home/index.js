const gridDiv = document.getElementById("myGrid");
const btn = document.getElementById("btn");

const columnDefs = [
	{ headerName: "ID", field: "Int_Id" },
	{ headerName: "Variable", field: "Int_VariableId" },
	{ headerName: "Chart", field: "Chart_Name" },
	{ headerName: "Question Type", field: "Int_QuestionType" },
	{ headerName: "Chart value", field: "Chart_Value" },
	{ headerName: "Moments ID", field: "Int_MomentsId" },
	{ headerName: "Min value", field: "Float_MinValue" },
	{ headerName: "Max value", field: "Float_MaxValue" },
	{ headerName: "Min value nominale", field: "Float_MinValueNominal" },
	{ headerName: "Max value nominale", field: "Float_MaxValueNominale" },
	{ headerName: "Date", field: "DateTime_Date" }
];

const gridOptions = {
	columnDefs: columnDefs,
	rowData: data
};

document.addEventListener('DOMContentLoaded', () => {
	new agGrid.Grid(gridDiv, gridOptions);
});

btn.addEventListener("click", () => {
	navigator.clipboard.readText().then(text => console.log(text));
});