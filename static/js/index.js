$(document).ready(function() {
    // Check for click events on the navbar burger icon
	// round to 2 decimal places
	for (var i = 0; i < result_data.length; i++) {
		for (var key in result_data[i]) {
			if (key == "question") {
				continue;
			}
            // if i>=15 and it's a number, round to 2 decimal places
			if (i >= 15 && typeof result_data[i][key] == "number") {
				result_data[i][key] = Math.round(result_data[i][key] * 100) / 100;
			} else if (i < 15) {
				result_data[i][key] = Math.round(result_data[i][key]);
			}
		}
	}

	var transposed_data = [];
    var transposed_secondary_data = [];

	var model_names = [];
	// get all keys except question
	for (var key in result_data[0]) {
		if (key == "question") {
			continue;
		}
		if (!model_names.includes(key)) {
			model_names.push(key);
			transposed_data.push({"model_name": key});
            transposed_secondary_data.push({"model_name": key});
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

	for (var i = 0; i < secondary_data.length; i++) {
		var row = secondary_data[i];
		for (var key in row) {
			if (key == "question") {
				continue;
			}
			var j = model_names.indexOf(key);
			transposed_secondary_data[j][row['question']] = row[key];
		}
	}


	var table = $('#myTopTable').DataTable({
		"data": transposed_data,
		"columns": [
	        { "data": "model_name",
              "render": function(data, type, row, meta){
                // Render the model name as a clickable link
                return '<a id="' + data.replace(" ", "_") + '">'+ data +'</a>';
                } 
            },  
			{ "data": "Avg" },
			{ "data": "Cost" },
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
				"targets": [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
				"createdCell": function (td, cellData, rowData, row, col) {
					var pValue = parseFloat(cellData);
					var color = getColor(pValue);
					$(td).css('background-color', color);
					// if the target is <= 15, then remove the text
					$(td).text("");
				}
			},
			{
				"targets": [1,2],
				"createdCell": function (td, cellData, rowData, row, col) {
                    // check if cellData includes *, if so skip
                    if (typeof cellData == "number") {
					var pValue = parseFloat(cellData);
                        // if the target is <= 15, then remove the text
                        var string = pValue.toFixed(2).toString();
                        if (col == 2) {
                            string = '$' + string;
                        }
                        if (col == 1) {
                            string = string + '%';
                        }
                        if (string.length < 6) {
                            // Add a non-breaking space (invisible but retains width)
                            string = '\u00A0' + '\u00A0' + string;
                        }
                        $(td).text(string);
                    } else if (cellData == "N/A") {
                        $(td).text('\u00A0' +'\u00A0' + '\u00A0' + "N/A");
                    }
				}
			},
			{ width: '20%', targets: 0, className: 'model-names' },
			// set font size of last two columns
			{ width: '5%', targets: 1, className: 'avg-cost' },
			{ width: '5%', targets: 2, className: 'avg-cost' },
		],
	});

    var secondary_table = $('#secondaryTable').DataTable({
		"data": transposed_secondary_data,
		"columns": [
	        { "data": "model_name"},  
			{ "data": "Input Tokens" },
			{ "data": "Input Cost" },
			{ "data": "Output Tokens" },
			{ "data": "Output Cost" },
			
	    ],
		"pageLength": 17,
		"order": [],
		"fixedColumns": true,
		"scrollX": false,
		"lengthChange": false,
		"info": false,  // Disable the info text
		"searching": false,  // Disable the search box
		"paging": false,  // Disable the pagination
		"ordering": false,  // Disable the sorting
		// remove alternating row colors
		"stripeClasses": [],
		"columnDefs": [
			{
				"targets": [1,2,3,4],
				"createdCell": function (td, cellData, rowData, row, col) {
                    // check if cellData includes *, if so skip
                    if (typeof cellData == "number") {
					    var pValue = parseFloat(cellData);
                        // if the target is <= 15, then remove the text
                        
                        if (col == 2 || col == 4) {
                            var string = pValue.toFixed(2).toString();
                            string = '$' + string;
                            if (string.length < 6) {
                                // Add a non-breaking space (invisible but retains width)
                                string = '\u00A0' + '\u00A0' + string;
                            }
                        } else {
                            var string = pValue.toFixed(0).toString();
                            if (string.length < 4) {
                                // Add a non-breaking space (invisible but retains width)
                                string = '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + string;
                            }
                            if (string.length < 5) {
                                // Add a non-breaking space (invisible but retains width)
                                string = '\u00A0' + '\u00A0' + string;
                            }
                        }
                        
                        $(td).text(string);
                    } else if (cellData == "N/A") {
                        $(td).text('\u00A0' +'\u00A0' + '\u00A0' + "N/A");
                    }
				}
			},
			{targets: 0, className: 'model-names-secondary'},
			// set font size of last two columns
			{width: "20%", targets: [1,2,3,4], className: 'avg-cost-secondary' },
		],
	});
	table.columns.adjust().draw();
    secondary_table.columns.adjust().draw();

    // set up captureTask and captureModelName links 

    // for every row in table myTopTable's tbody take the first td and make it clickable 
    // using onclick 
    var rows = table.table().container().querySelectorAll("tbody tr");
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector("td");
        td.onclick = function() {
            var modelName = this.querySelector("a").innerHTML;
            captureModelName(modelName.replace(" ", "_"));
        }
    }
    // for every th after the first 3 do the same 
    var ths = table.table().container().querySelectorAll("thead th");
    for (var i = 3; i < ths.length; i++) {
        ths[i].onclick = function() {
            var task = this.querySelector("a").innerHTML;
            captureTask(task);
        }
    }


    // default to open?
    //captureTask(1); 
    //captureModelName("o1 (medium)");

    // Add FAQ collapse functionality
    $('.faq-question').click(function() {
        // Toggle the active class on the question
        $(this).toggleClass('is-active');
        
        // Toggle the visibility of the answer
        var answer = $(this).next('.faq-answer');
        if (answer.is(':visible')) {
            answer.slideUp();
        } else {
            answer.slideDown();
        }
    });
})

function getColor(value) {
	var red = 255;
	var green = 255;
	// define 5 color levels, 0-20, 20-40, 40-60, 60-80, 80-100
	// give the same color for the same level
	if (value > 75) {
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


function captureTask(task) {
    var table = $('#myTopTable').DataTable();
    var as = table.table().container().querySelectorAll("a");

    for (var i = 0; i < as.length; i++) {
        // find <a> element as a child of ths[i] 
        if (as[i].id == window.currTask) {
            as[i].style.color = "black";
        }
        if (as[i].id == task) {
            as[i].style.color = "#276dff";
        }
    }

    window.currTask = task; 
    if (window.currModelName) {
        updateTraces(window.currModelName, task);
        document.getElementById("traces").style.display = "inline-block";
    }
}

function captureModelName(modelName) {
    var table = $('#myTopTable').DataTable();
    var as = table.table().container().querySelectorAll("a");

    for (var i = 0; i < as.length; i++) {
        // find <a> element as a child of ths[i] 
        if (as[i].id == window.currModelName) {
            as[i].style.color = "inherit"
            // remove bold 
            as[i].style.fontWeight = "normal";
        }
        if (as[i].id == modelName) {
            as[i].style.color = "#276dff"
            // make bold
            as[i].style.fontWeight = "bold";
        }
    }

    window.currModelName = modelName;
    // if currTask exists show the interactions element 
    if (window.currTask) {
        updateTraces(modelName, window.currTask);
        document.getElementById("traces").style.display = "inline-block";
    }

}
function openTab(evt, traceIdx) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById("tab"+traceIdx).style.display = "block";
    evt.currentTarget.className += " active";
  }

function updateTraces(model, task) {
    model = model.replace("_", " ");
    // for every th after the first 3 do the same 
    let table = $('#myTopTable').DataTable();
    var ths = table.table().container().querySelectorAll("thead th");
    for (var i = 4; i < ths.length; i++) {
        if (ths[i].querySelector("a").innerHTML == task) {
            var taskIdx = i; 
            break; 
        }
    }

    // get the main table and find the row with name "model" and column with id "task" 
    var rows = table.table().container().querySelectorAll("tbody tr");
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector("td");
        for (var j = 0; j < td.parentElement.children.length; j++) {
            var cell = td.parentElement.children[j];
            cell.classList.remove("target");
        }
    }

    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector("td");
        if (td.querySelector("a").innerHTML == model) {
            // found this row now iterate over it's tds 
            for (var j = 0; j < td.parentElement.children.length; j++) {
                if (j+1 == taskIdx) {
                    var cell = td.parentElement.children[j];
                    // add class "target" to this cell
                    cell.classList.add("target"); 
                }
            }
        }
    }



    tracesBox = document.getElementById("traces");


    var heading = document.createElement("h2");
    heading.className = "tracesHeading";
    heading.innerHTML = "Solution: Model " + model + " for Problem #" + task;
    tracesBox.innerHTML = "";
    tracesBox.appendChild(heading);

    // For now only interaction 0 from array 
    // create a div 
    var problem_label = document.createElement("h4");
    problem_label.innerHTML = "Problem";
    problem_label.style.fontWeight = "bold";
    var problem_box = document.createElement("div");
    problem_box.className = "marked box problem-box";
    problem_box.innerHTML = traces[task].statement;
    tracesBox.appendChild(problem_label);
    tracesBox.appendChild(problem_box);

    var solution_label = document.createElement("h4");
    solution_label.style.fontWeight = "bold";
    solution_label.innerHTML = "Correct Answer";
    var solution_box = document.createElement("div");
    solution_box.className = "marked box solution-box";
    solution_box.innerHTML = traces[task].gold_answer;
    tracesBox.appendChild(solution_label);
    tracesBox.appendChild(solution_box);

    // Actual model traces start here 
    var modelTraces = traces[task]["models"][model];
    var numTraces = modelTraces.length;

    // Add tabs 
    var tab = document.createElement("div");
    tab.className = "tab";
    // for each in numTraces create a tablinks 
    for (let i = 0; i < numTraces; i++) {
        (function(currentIndex) {
            var tablink = document.createElement("button");
            tablink.className = "tablinks";
            let idx = i+1;
            tablink.onclick = function(event) {
                openTab(event, i);
            } 
            tablink.innerHTML = "Run " + idx;
            tab.appendChild(tablink);
        })(i);
    }
    tracesBox.appendChild(tab);

    // Now make divs with tabcontent 
    for (var i = 0; i < numTraces; i++) {
        var tabcontent = document.createElement("div");
        tabcontent.className = "tabcontent";
        tabcontent.id = "tab" + i;

        var response_label = document.createElement("h4");
        response_label.style.fontWeight = "bold";
        response_label.innerHTML = "Full Model Solution";
        var response_box = document.createElement("div");
        response_box.className = "marked box response-box";
        response_box.innerHTML = modelTraces[i].solution;

        var parsed_answer_label = document.createElement("h4");
        parsed_answer_label.style.fontWeight = "bold";
        parsed_answer_label.innerHTML = "Parsed Answer";
        var parsed_answer_box = document.createElement("div");
        parsed_answer_box.innerHTML = modelTraces[i].parsed_answer;
        let ok_cls = (modelTraces[i].parsed_answer==traces[task].gold_answer) ? "correct" : "incorrect";
        parsed_answer_box.className = "marked box parsed-answer-box " + ok_cls;


        tabcontent.appendChild(parsed_answer_label);
        tabcontent.appendChild(parsed_answer_box);
        tabcontent.appendChild(response_label);
        tabcontent.appendChild(response_box);
        tracesBox.appendChild(tabcontent);
    }
    // open manually fist tab 
    document.getElementById("tab0").style.display = "block";
    document.getElementsByClassName("tablinks")[0].className += " active";
    
    MathJax.typesetPromise();
}