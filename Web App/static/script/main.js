var startlog = "STOP";



function start()
{
	//launchIntoFullscreen(document.documentElement);

		$( "#aModel" ).click(function() {
			$(location).attr('href','/mainchart');
	});

		$( "#aDatepicker" ).click(function() {
			$(location).attr('href','/datechart');
	});
	
		$( "#aSplate" ).click(function() {
			$(location).attr('href','/stoutchart');
	});

		$( "#aLplate" ).click(function() {
			$(location).attr('href','/largerchart');
	});
	
		$( "#aFridge" ).click(function() {
			$(location).attr('href','/fridgechart');
	});	
		$( "#aLivedata" ).click(function() {
			$(location).attr('href','/');
	});
		$( "#scrview" ).click(function() {
			screenfull.toggle($('#screen')[0]);
	
	});	
		$( "#moddownload" ).click(function() {
			$("#pdfform").show();
			$("#screen").css('opacity', '0.4');
			$("#screen").css('z-index', '-1');
			$("#pdfform").css('opacity', '1.0');
			$("#pdfform").css('z-index', '7');
	
	});
		$( "#pdfgenerate" ).click(function() {
			$("#pdfform").hide();
			$("#screen").css('opacity', '1.0');
			$("#screen").css('z-index', 'auto');
	
	});
	
	
	document.getElementById("myDropdown").classList.toggle("show");
	document.getElementById("myDropdown").classList.toggle("show");
	
	// Click Event Handlers
	$( "#logdata" ).click(function() {
		
		var urlstart = "/logtostart"
		var urlstop = "/logtostop"
		if ($(this).attr("state") == "off")
		{
			if (confirm('Are you sure you want to start logging?')) {
				$(this).attr("state","on");
				$(this).text("Stop Data Logging");
				var jqxhr = $.getJSON( urlstart, function() {
					console.log( "success" );
				});
			} else {
				// Do nothing!
			}
		}
		else
		{
			if (confirm('Are you sure you want to stop logging?')) {
				$(this).attr("state","off");
				$(this).text("Start Data Logging");
				var jqxhr = $.getJSON( urlstop, function() {
					console.log( "success" );
					});
				// ToDo post to server turn off logging
			} else {
				// Do nothing!
			}			
		}

	});
	
	
	// Close the dropdown if the user clicks outside of it
	window.onclick = function(event) {
	  if (!event.target.matches('.dropbtn')) {

		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
		  var openDropdown = dropdowns[i];
		  if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
			
		  }
		}
	  }
	}
	$("#menuclick").click(function() {
		document.getElementById("myDropdown").classList.toggle("show");
	});
	$("#menuimgclick").click(function() {
		document.getElementById("myDropdown").classList.toggle("show");
	});


	var jqxhr = $.get('/loggerstatus', function(data){
	})  .done(function(data) {
			if(data == "ERROR"){console.log("We have an Error calling [Myserver]/loggerstatus");}
			else{
				if(data == "START"){
					startlog = "START";
					$(this).attr("state","on");
					$('#logdata').text("Stop Data Logging");
				}
				if(data == "STOP"){
					startlog = "STOP";
					$(this).attr("state","off");
					$('#logdata').text("Start Data Logging");
				}
			}
		}).fail(function() {
			console.log("We have an Error calling [Myserver]/loggerstatus");
		});
		
		
		
}