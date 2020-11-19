///////////////////////// EXCEL Sheet tutus  ///////////////////////////////////

				
var xlsx  = require('xlsx');
var wb =  xlsx.readFile('../excel_test.xlsx');
var ws = wb.Sheets["Book2"];

	var data = xlsx.utils.sheet_to_json(ws);
	

	var newData = data.map(function(record){
		// record.new = record.Sales - record.Coast;
		delete record.name;
		return record;
	});
		//create new excel file updating last contents
		var newWB = xlsx.utils.book_new();
		var newWS = xlsx.utils.json_to_sheet(newData);
		xlsx.utils.book_append_sheet(newWB,newWS,"new Data");

		xlsx.writeFile(newWB,"New excel file.xlsx");
	
//console.log(newData);
///////////////////////////////////////////////////////////////