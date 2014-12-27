// Module for parsing JSON into CSV
var csvConverter = {
	convertCSV: function (objArray) {
		var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
		var headers = Object.keys(array[0]);
		return this.parseHeaders(headers, array);
	},
	parseHeaders: function(headers, array) {
		var str = '';
		headers.forEach(function(item) {
			str += item + ',';
		});
		str += '\r\n';
		return this.parseBody(array, str);
	},
	parseBody: function(array, str) {
		array.forEach(function (item, index) {
			var line = '';
			for (var index in item) {
			  if (line !== '') { line += ','; }
				line += item[index];
			}
		  str += line + '\r\n';
		});
		return str;
	}
}
