window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

	var result_data = [
		{
			"question": "1",
			"o3-mini": 37.70260975919686,
			"o1": 38.29287639470158,
			"o1-mini": 37.094060258750325,
			"gemini-flash-thinking": 24.78530607445193,
			"R1": 72.21790948523868
		},
		{
			"question": "2",
			"o3-mini": 88.58263766958378,
			"o1": 40.808982006452446,
			"o1-mini": 67.95179019080467,
			"gemini-flash-thinking": 26.210391127120403,
			"R1": 26.606092680654225
		},
		{
			"question": "3",
			"o3-mini": 32.292631859975366,
			"o1": 10.178465478507025,
			"o1-mini": 43.05198767148764,
			"gemini-flash-thinking": 96.66598471980551,
			"R1": 0.0059895503774609615
		},
		{
			"question": "4",
			"o3-mini": 40.93877143728203,
			"o1": 54.83048793228736,
			"o1-mini": 47.93831858960096,
			"gemini-flash-thinking": 30.51957814109979,
			"R1": 14.427930594034432
		},
		{
			"question": "5",
			"o3-mini": 87.35486495119402,
			"o1": 76.29496196328641,
			"o1-mini": 5.890612734712731,
			"gemini-flash-thinking": 88.35531679462402,
			"R1": 62.86841203725457
		},
		{
			"question": "6",
			"o3-mini": 48.883096786027856,
			"o1": 57.20572974932411,
			"o1-mini": 49.397074969061904,
			"gemini-flash-thinking": 86.64291338511303,
			"R1": 55.85284277193574
		},
		{
			"question": "7",
			"o3-mini": 59.57964665983033,
			"o1": 40.54358822604305,
			"o1-mini": 16.539948318449383,
			"gemini-flash-thinking": 56.01779974189404,
			"R1": 88.78806700014425
		},
		{
			"question": "8",
			"o3-mini": 8.125483251003729,
			"o1": 99.73786927297861,
			"o1-mini": 58.62528704461442,
			"gemini-flash-thinking": 37.29479476452151,
			"R1": 33.76186365849716
		},
		{
			"question": "9",
			"o3-mini": 52.716021617083484,
			"o1": 52.80684219050421,
			"o1-mini": 70.95484639156875,
			"gemini-flash-thinking": 25.517273120519768,
			"R1": 31.51655772405678
		},
		{
			"question": "10",
			"o3-mini": 5.445118169739882,
			"o1": 77.63069262587243,
			"o1-mini": 56.73138788385456,
			"gemini-flash-thinking": 45.86597271807549,
			"R1": 18.73050961488808
		},
		{
			"question": "11",
			"o3-mini": 44.453997027691685,
			"o1": 65.42203138808989,
			"o1-mini": 65.03488908914098,
			"gemini-flash-thinking": 60.98657231037009,
			"R1": 96.58407727502563
		},
		{
			"question": "12",
			"o3-mini": 89.044679835056,
			"o1": 67.88409717904986,
			"o1-mini": 9.180743851421747,
			"gemini-flash-thinking": 56.56695119417958,
			"R1": 78.8944912749766
		},
		{
			"question": "13",
			"o3-mini": 29.582691336652346,
			"o1": 61.51043625204441,
			"o1-mini": 46.912722325745314,
			"gemini-flash-thinking": 15.494070623376121,
			"R1": 87.13047500782741
		},
		{
			"question": "14",
			"o3-mini": 41.15854447856335,
			"o1": 46.79964750417591,
			"o1-mini": 41.619515510584314,
			"gemini-flash-thinking": 90.43045745060863,
			"R1": 28.715267463410633
		},
		{
			"question": "15",
			"o3-mini": 81.2795077475023,
			"o1": 62.39231987390714,
			"o1-mini": 14.166792845785835,
			"gemini-flash-thinking": 57.54645680351541,
			"R1": 8.753480866788287
		},
		{
			"question": "Avg",
			"o3-mini": 44.07546659685077,
			"o1": 15.220032804823413,
			"o1-mini": 79.10136273350315,
			"gemini-flash-thinking": 72.54579560084939,
			"R1": 73.82886646198018
		},
		{
			"question": "Cost",
			"o3-mini": 35.21238591032715,
			"o1": 44.82431686215931,
			"o1-mini": 36.15297879572278,
			"gemini-flash-thinking": 56.803203857076866,
			"R1": 1.071109897558209
		}
	]

	// round to 2 decimal places
	for (var i = 0; i < result_data.length; i++) {
		for (var key in result_data[i]) {
			if (key == "question") {
				continue;
			}
			if (i >= 15) {
				result_data[i][key] = Math.round(result_data[i][key] * 100) / 100;
			} else {
				result_data[i][key] = Math.round(result_data[i][key]);
			}
		}
	}

	var transposed_data = [];

	var model_names = [];
	// get all keys except question
	for (var key in result_data[0]) {
		if (key == "question") {
			continue;
		}
		if (!model_names.includes(key)) {
			model_names.push(key);
			transposed_data.push({"model_name": key});
		}
	}

	for (var i = 0; i < result_data.length; i++) {
		var row = result_data[i];
		for (var key in row) {
			if (key == "question") {
				continue;
			}
			var j = model_names.indexOf(key);
			transposed_data[j][row['question']] = row[key];
		}
	}
	var table = $('#myTopTable').DataTable({
		"data": transposed_data,
		"columns": [
	        { "data": "model_name" },
			{ "data": "1" },
			{ "data": "2" },
			{ "data": "3" },
			{ "data": "4" },
			{ "data": "5" },
			{ "data": "6" },
			{ "data": "7" },
			{ "data": "8" },
			{ "data": "9" },
			{ "data": "10" },
			{ "data": "11" },
			{ "data": "12" },
			{ "data": "13" },
			{ "data": "14" },
			{ "data": "15" },
			{ "data": "Avg" },
			{ "data": "Cost" },
	    ],
		"pageLength": 17,
		"order": [],
		"fixedColumns": true,
		"scrollX": true,
		"lengthChange": false,
		"info": false,  // Disable the info text
		"searching": false,  // Disable the search box
		"paging": false,  // Disable the pagination
		"ordering": false,  // Disable the sorting
		// remove alternating row colors
		"stripeClasses": [],
		"columnDefs": [
			{
				"targets": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
				"createdCell": function (td, cellData, rowData, row, col) {
					var pValue = parseFloat(cellData);
					var color = getColor(pValue);
					$(td).css('background-color', color);
					// if the target is <= 15, then remove the text
					if (col < 16) {
						$(td).text("");
					}
				}
			},
			{ width: '20%', targets: 0 }
		],
	});
	table.columns.adjust().draw();
	// table_here.columns.adjust().draw();
})

function getColor(value) {
	var red = 255;
	var green = 255;
	// define 5 color levels, 0-20, 20-40, 40-60, 60-80, 80-100
	// give the same color for the same level
	if (value >= 75) {
		red = 0;
		green = 255;
	} else if (value >= 25) {
		red = 255;
		green = 255;
	} else {
		red = 255;
		green = 0;
	}


	// if (value >= 50) {
	// 	green = 255;
	// 	red = 255 - (255 / 50 * value - 255);
	// } else {
	// 	green = (255 / 50 * value);
	// 	red = 255;
	// }
	return 'rgba(' + red + ',' + green + ',0,0.2)';
}