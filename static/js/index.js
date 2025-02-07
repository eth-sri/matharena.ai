window.HELP_IMPROVE_VIDEOJS = false;

var result_data = [
    {
        "question": 1,
        "gemini-2.0-flash": 100.0,
        "gpt-4o": 25.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 2,
        "gemini-2.0-flash": 100.0,
        "gpt-4o": 75.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 3,
        "gemini-2.0-flash": 50.0,
        "gpt-4o": 25.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 4,
        "gemini-2.0-flash": 100.0,
        "gpt-4o": 100.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 5,
        "gemini-2.0-flash": 0.0,
        "gpt-4o": 0.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 6,
        "gemini-2.0-flash": 100.0,
        "gpt-4o": 25.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 7,
        "gemini-2.0-flash": 100.0,
        "gpt-4o": 50.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 8,
        "gemini-2.0-flash": 0.0,
        "gpt-4o": 0.0,
        "o3-mini": 87.5,
        "DeepSeek-R1": 75.0
    },
    {
        "question": 9,
        "gemini-2.0-flash": 0.0,
        "gpt-4o": 0.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 10,
        "gemini-2.0-flash": 0.0,
        "gpt-4o": 0.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 11,
        "gemini-2.0-flash": 0.0,
        "gpt-4o": 0.0,
        "o3-mini": 62.5,
        "DeepSeek-R1": 0.0
    },
    {
        "question": 12,
        "gemini-2.0-flash": 0.0,
        "gpt-4o": 0.0,
        "o3-mini": 0.0,
        "DeepSeek-R1": 0.0
    },
    {
        "question": 13,
        "gemini-2.0-flash": 50.0,
        "gpt-4o": 0.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 14,
        "gemini-2.0-flash": 0.0,
        "gpt-4o": 0.0,
        "o3-mini": 62.5,
        "DeepSeek-R1": 100.0
    },
    {
        "question": 15,
        "gemini-2.0-flash": 0.0,
        "gpt-4o": 0.0,
        "o3-mini": 100.0,
        "DeepSeek-R1": 87.5
    },
    {
        "question": "Avg",
        "gemini-2.0-flash": 40.00000000000001,
        "gpt-4o": 20.0,
        "o3-mini": 87.50000000000001,
        "DeepSeek-R1": 84.16666666666667
    },
    {
        "question": "Cost",
        "gemini-2.0-flash": 0.022952,
        "gpt-4o": 0.62633,
        "o3-mini": 5.0773888000000005,
        "DeepSeek-R1": 6.354445999999999
    }
];

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
					$(td).text("");
				}
			},
			{
				"targets": [16,17],
				"createdCell": function (td, cellData, rowData, row, col) {
					var pValue = parseFloat(cellData);
					// if the target is <= 15, then remove the text
					var string = pValue.toFixed(2).toString();
					if (col == 17) {
						string = '$' + string;
					}
					if (string.length < 5) {
						// Add a non-breaking space (invisible but retains width)
						string = '\u00A0' + '\u00A0' + string;
					}
					$(td).text(string);
					
				}
			},
			{ width: '20%', targets: 0, className: 'model-names' },
			// set font size of last two columns
			{ width: '5%', targets: 16, className: 'avg-cost' },
			{ width: '5%', targets: 17, className: 'avg-cost' },
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
	if (value >= 66.6666) {
		red = 0;
		green = 255;
	} else if (value >= 33.333333) {
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