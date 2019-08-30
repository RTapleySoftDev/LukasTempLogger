var seriesOptions = [];
var seriesOptionsf = [];
var lastEnteredDate = '';
var fromdate = '';
var todate = '';
var csvFromDate = '';
var csvToDate = '';
var fd = '';
var td = '';
var todaysDate = null;
var chosenFromDate = null;
var firstRecordDate = new Date('2018-03-16T14:03:02');
var datechart = null;
var names = [];
var temp1 = [];
var temp2 = [];
var temp3 = [];
var temp4 = [];
var tankarr= null;


function setDatePicker(fromIn,toIn){
	$("#from").datepicker("setDate", fromIn);
	$("#to").datepicker("setDate", toIn);
	$("#from").datepicker( "option", "minDate", firstRecordDate);
	$("#from").datepicker( "option", "maxDate", toIn);
	$("#to").datepicker( "option", "minDate", firstRecordDate);
	$("#to").datepicker( "option", "maxDate", toIn);
}

function fillTickBoxes(namesIn){
	var htmlOut = '';
	for(var i = 0; i < namesIn.length; i++) {
		htmlOut += '<label style = "color:'+datechart.options.colors[i]+'";><input type="checkbox"  value="'+i+'" name="chart" checked />'+namesIn[i]+'</label>';
	}
	return htmlOut;
}



function fillOtherData(indexIn){
	var totalLoad = 0;
	if(tankarr[indexIn].f1 < 0.15){tankarr[indexIn].f1 = 0.0;}
	if(tankarr[indexIn].f2 < 0.15){tankarr[indexIn].f2 = 0.0;}
	if(tankarr[indexIn].f3 < 0.15){tankarr[indexIn].f3 = 0.0;}
	if(tankarr[indexIn].f4 < 0.15){tankarr[indexIn].f4 = 0.0;}
	$("#flow1").html(''+(tankarr[indexIn].f1).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
	$("#flow2").html(''+(tankarr[indexIn].f2).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
	$("#flow3").html(''+(tankarr[indexIn].f4).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
	$("#flow4").html(''+(tankarr[indexIn].f3).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');

	if(tankarr[indexIn].compOn == 1){
		$("#compOn").text("On");
		$("#exPump").html('60<span class = "listtext">&nbsp Watts</span>');
		totalLoad = totalLoad + 3060;
		$("#manPress").html('2.2 <span class = "listtext">bar</span></span></li>');//Change When new wiring installed

	}
	else{
		$("#compOn").text("Off");
		$("#exPump").html('0<span class = "listtext">&nbsp Watts</span>');
		$("#manPress").html('0.0 <span class = "listtext">bar</span></span></li>');//Change When new wiring installed
		totalLoad = 0;

	}

	//TODO Change when  new wiring installed
	$("#manPress").html(''+tankarr[indexIn].pumpload+' <span class = "listtext">bar</span></span></li>');
	//console.log(tankarr[indexIn].pumppress);
	var pumpload = (tankarr[indexIn].pumppress);
	pumpload = Math.floor(pumpload);
	var pumploadConv = ''+pumpload;
	$("#manPump").html(''+pumploadConv+'<span class = "listtext">&nbsp Watts</span>');
	totalLoad = totalLoad + pumpload;
	$("#totalWatts1").html(''+totalLoad+'<span class = "listtext">&nbsp Watts</span>');
	var avgtemp = (tankarr[indexIn].t1 + tankarr[indexIn].t2)/2;
	$("#tankavrg").html(''+avgtemp.toFixed(2)+'<span class = "listtext">&deg;C</span>');

}

function updateChart(chartIn,fromIn,toIn){

	seriesOptions = [];
	$.get( "/getfromtotankdata", { fromdate: fromIn, todate: toIn },function( data ) {
		$("#loader").show();
		$("#screen").css('opacity', '0.4');
		//console.log("Show1 line 78");
		console.log(fromIn+" : "+toIn);
	var arr = JSON.parse(data);
	tankarr = JSON.parse(data);

		names = ['Top Tank', 'Bottom Tank', 'Manifold Flow', 'Manifold Ret', 'Room'];
		fnames = ['Bottle Cooler', 'Spare', 'Larger Plate', 'Stout Plate', 'Comp On-Off'];
		temp1 = []; //Top Tank
		temp2 = []; //Bottom Tank
		temp4 = []; // Manifold Flow
		temp15 = []; // Manifold Ret
		temp3 = []; // Room Temp
		flow1 = []; // Bottle Cooler
		flow2 = []; // Spare
		flow3 = []; // Stout Plate
		flow4 = []; // Larger Plate
		comp = []; // Compressor
		var tempArr = [];

			for(var i = 0; i < arr.length; i++) {
				//Top Tank
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t1;
				temp1[i] = tempArr;
				tempArr = [];
				//Bottom Tank
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t2;
				temp2[i] = tempArr;
				tempArr = [];
				//Manifold Flow
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t4;
				temp4[i] = tempArr;
				tempArr = [];
				//Manifold Ret
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t15;
				temp15[i] = tempArr;
				tempArr = [];
				//Room Temp
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t3;
				temp3[i] = tempArr;
				tempArr = [];
				//Bottle Cooler
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].f1;
				flow1[i] = tempArr;
				tempArr = [];
				//Spare
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].f2;
				flow2[i] = tempArr;
				tempArr = [];
				//Stout Plate
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].f4;
				flow3[i] = tempArr;
				tempArr = [];
				//Larger Plate
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].f3;
				flow4[i] = tempArr;
				tempArr = [];
				//Compressor
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].compOn;
				comp[i] = tempArr;
				tempArr = [];

			}
		seriesOptions[0] = {
			name:names[0],
			data:temp1, //Tank Top
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[1] = {
			name:names[1],
			data:temp2, // Tank Bottom
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[2] = {
			name:names[2],
			data:temp4, //Manifold Flow
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[3] = {
			name:names[3],
			data:temp15,// Manifold Ret
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[4] = {
			name:names[4],
			data:temp3,// Room Temp
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[5] = {
			name:fnames[0],
			data:flow1, // Bottle Cooler
            yAxis: 1,
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[6] = {
			name:fnames[1],
			data:flow2, //Spare
            yAxis: 1,
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[7] = {
			name:fnames[2],
			data:flow4,// Stout Plate
            yAxis: 1,
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[8] = {
			name:fnames[3],
			data:flow3,// Larger Plate
            yAxis: 1,
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[9] = {
			name:fnames[4],
			data:comp,// Compressor
            yAxis: 2,
            dataGrouping: {
                forced:true
            }
		};
		//console.log(seriesOptions);
		//$("#container-graph").text(temp1.length);


	})  .done(function() {
		datechart.update({series: seriesOptions});
		datechart.xAxis[0].setExtremes(null,null);
		console.log(seriesOptions);
		$("#loader").hide();
		//console.log("Hide1 line 123");
		$("#screen").css('opacity', '1.0');


	  });
	  	$("#loader").show();
		$("#screen").css('opacity', '0.4');
		//console.log("Show5 line 128");

}

function fillChart(){

	$("#screen").css('opacity', '0.4');

	// CSV DOWNLOAD Handler
	$("#csvdownload").click(function(e){
		console.log(csvFromDate);
		console.log(csvToDate);
		$.get( "/getfromtotankdatacsv", { fromdate: csvFromDate, todate: csvToDate },function(data) {
			$("#loader").show();
			$("#screen").css('opacity', '0.4');
			console.log(data);
		}).done(function() {

		$("#loader").hide();
		$("#screen").css('opacity', '1.0');
		    e.preventDefault();  //stop the browser from following
			window.location.href = 'https://www.pythonanywhere.com/user/rel2018/files/home/rel2018/mysite/static/file/tanktemp.csv';
	  });
	});

	// DATE PICKER 	Handler
	var dateFormat = "dd/mm/yy hh:mm:ss";
	  from = $( "#from" )
		.datepicker({
		  defaultDate: 0,
		  changeMonth: true,
		  numberOfMonths: 2,
		  maxDate: 0,
		  dateFormat: 'dd-mm-yy'


		})
		.on( "change", function() {
		  to.datepicker( "option", "minDate", getDate( this ) );
		  chosenFromDate = $( "#from" ).datepicker( "getDate"  );
		  $("#from").datepicker( "option", "minDate", firstRecordDate);
		  $("#to").datepicker( "option", "minDate", chosenFromDate );
		  $("#from").datepicker( "option", "maxDate", todaysDate);
		  $("#to").datepicker( "option", "maxDate", todaysDate);

		  fd = $( "#from" ).datepicker( "getDate"  ).toISOString().slice(0, 19).replace('T', ' ');
		  //console.log(fd);
		});
	  to = $( "#to" ).datepicker({
		defaultDate: 0,
		changeMonth: true,
		numberOfMonths: 2,
		maxDate: 0,
		dateFormat: 'dd-mm-yy'
	  })
	  .on( "change", function() {
		from.datepicker( "option", "maxDate", getDate( this ) );
		$("#from").datepicker( "option", "minDate", firstRecordDate);
		$("#to").datepicker( "option", "minDate", firstRecordDate);
		$("#from").datepicker( "option", "maxDate", todaysDate);
		$("#to").datepicker( "option", "maxDate", todaysDate);
		td = $( "#to" ).datepicker( "getDate"  ).toISOString().slice(0, 19).replace('T', ' ');
		updateChart(datechart,fd,td);
	  });

	function getDate( element ) {
	  var date;
	  try {
		date = $.datepicker.parseDate( dateFormat, element.value );
	  } catch( error ) {
		date = null;
	  }

	  return date;
	}



$.getJSON("/getlastdatetankdata",function(data){

	lastEnteredDate = data[0].realtime;
	var ts = (data[0].stamptime*1000);
	todaysDate = new Date(ts);
	todate = new Date(ts).toISOString().slice(0, 19).replace('T', ' ');
	var tsminus = (data[0].stamptime-86400)*1000;
	fromdate = new Date(tsminus).toISOString().slice(0, 19).replace('T', ' ');
	setDatePicker(new Date(tsminus), new Date(ts));
	//console.log(new Date(tsminus));
	//console.log(new Date(ts));



}).done(function(){
	$("#screen").css('opacity', '0.4');

$.get( "/getfromtotankdata", { fromdate: fromdate, todate: todate },function( data ) {
	$("#loader").show();
	$("#screen").css('opacity', '0.4');
	var arr = JSON.parse(data);
	tankarr = JSON.parse(data);

		names = ['Top Tank', 'Bottom Tank', 'Manifold Flow', 'Manifold Ret', 'Room'];
		fnames = ['Bottle Cooler', 'Spare', 'Larger Plate', 'Stout Plate', 'Comp On-Off'];
		temp1 = []; //Top Tank
		temp2 = []; //Bottom Tank
		temp4 = []; // Manifold Flow
		temp15 = []; // Manifold Ret
		temp3 = []; // Room Temp
		flow1 = []; // Bottle Cooler
		flow2 = []; // Spare
		flow3 = []; // Stout Plate
		flow4 = []; // Larger Plate
		comp = []; // Compressor
		var tempArr = [];

			for(var i = 0; i < arr.length; i++) {
				//Top Tank
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t1;
				temp1[i] = tempArr;
				tempArr = [];
				//Bottom Tank
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t2;
				temp2[i] = tempArr;
				tempArr = [];
				//Manifold Flow
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t4;
				temp4[i] = tempArr;
				tempArr = [];
				//Manifold Ret
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t15;
				temp15[i] = tempArr;
				tempArr = [];
				//Room Temp
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].t3;
				temp3[i] = tempArr;
				tempArr = [];
				//Bottle Cooler
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].f1;
				flow1[i] = tempArr;
				tempArr = [];
				//Spare
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].f2;
				flow2[i] = tempArr;
				tempArr = [];
				//Stout Plate
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].f4;
				flow3[i] = tempArr;
				tempArr = [];
				//Larger Plate
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].f3;
				flow4[i] = tempArr;
				tempArr = [];
				//Compressor
				tempArr[0] = arr[i].time*1000;
				tempArr[1] = arr[i].compOn;
				comp[i] = tempArr;
				tempArr = [];

			}
		seriesOptions[0] = {
			name:names[0],
			data:temp1, //Tank Top
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[1] = {
			name:names[1],
			data:temp2, // Tank Bottom
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[2] = {
			name:names[2],
			data:temp4, //Manifold Flow
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[3] = {
			name:names[3],
			data:temp15,// Manifold Ret
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[4] = {
			name:names[4],
			data:temp3,// Room Temp
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[5] = {
			name:fnames[0],
			data:flow1, // Bottle Cooler
            yAxis: 1,
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[6] = {
			name:fnames[1],
			data:flow2, //Spare
            yAxis: 1,
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[7] = {
			name:fnames[2],
			data:flow4,// Stout Plate
            yAxis: 1,
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[8] = {
			name:fnames[3],
			data:flow3,// Larger Plate
            yAxis: 1,
            dataGrouping: {
                forced:true
            }
		};
		seriesOptions[9] = {
			name:fnames[4],
			data:comp,// Compressor
            yAxis: 2,
            dataGrouping: {
                forced:true
            }
		};

	//$("#container-graph").text(temp1.length);


})  .done(function() {
	createChart();
	var ticks = fillTickBoxes(names);
	$("#checks").html(ticks);
	// Handler for tick boxs
	$("input[name='chart']").change(function() {
		if(this.checked)
		{
			for (var i = 0; i < names.length; i++)
			{
				if(this.value == i)
				{
					var j = i+1;
					var vname = "temp"+j+"";
					seriesOptions[i] = {name:names[i],data:window[vname]};
				}

			}

			datechart.update({series: seriesOptions});
		}
		else
		{
			for (var i = 0; i < names.length; i++)
			{
				if(this.value == i)
				{
					seriesOptions[i] = {name:names[i],data:[{}]};
				}

			}

			datechart.update({series: seriesOptions});
		}

	});
	$("#loader").hide();
	//console.log("hide2 line 272");
	$("#screen").css('opacity', '1.0');
  });
});

}


Highcharts.theme = {
   colors: ['#f45b5b','#2b908f', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
   chart: {
	   height:600,
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
         ]
      },
      style: {
         fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },

   xAxis: {
	   ordinal: false,
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },


	  /*useHTML:true,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      },
	  valueDecimals: 2,
       valueSuffix: '&deg;C',*/

        tooltip: {
			useHTML:true,
			backgroundColor: 'rgba(0, 0, 0, 0.85)',
			style: {
				color: '#F0F0F0'
			},

            shared: true,
			split: true,
            formatter: function() {
			fillOtherData(this.points[0].point.index);
			var s = [];
			var d = new Date(this.x - 3600000);
			var hour = d.getHours();
			var min = d.getMinutes();
			var sec = d.getSeconds();
			s.push(hour+':'+min+':'+sec);
			$.each(this.points, function(){
				var serie = this.series;
				console.log(serie.options.name);
			if(serie.options.name == "Spare"){
				s.push('<span style="color:' + serie.color + '">' + serie.options.name +
					'</span style = "color:#F0F0F0">: <b>' + Highcharts.numberFormat(this.y,2,'.') + ' l/min</b><br/>');
			} else if(serie.options.name == "Bottle Cooler"){
				s.push('<span style="color:' + serie.color + '">' + serie.options.name +
					'</span style = "color:#F0F0F0">: <b>' + Highcharts.numberFormat(this.y,2,'.') + ' l/min</b><br/>');
			} else if(serie.options.name == "Larger Plate"){
				s.push('<span style="color:' + serie.color + '">' + serie.options.name +
					'</span style = "color:#F0F0F0">: <b>' + Highcharts.numberFormat(this.y,2,'.') + ' l/min</b><br/>');
			} else if(serie.options.name == "Stout Plate"){
				s.push('<span style="color:' + serie.color + '">' + serie.options.name +
					'</span style = "color:#F0F0F0">: <b>' + Highcharts.numberFormat(this.y,2,'.') + ' l/min</b><br/>');
			} else if(serie.options.name == "Comp On-Off"){
				if (this.y == 0){s.push('<span style="color:' + serie.color + '">Comp</span style = "color:#F0F0F0">: <b> Off </b><br/>');}
				if (this.y == 1){s.push('<span style="color:' + serie.color + '">Comp</span style = "color:#F0F0F0">: <b> On </b><br/>');}

			}
			else{
				s.push('<span style="color:' + serie.color + '">' + serie.options.name +
					'</span style = "color:#F0F0F0">: <b>' + Highcharts.numberFormat(this.y,2,'.') + '&deg;C</b><br/>');
			}
			});

                /*var s = "";
                $.each(this.points, function(){
                    var serie = this.series;
                    //NOTE: may cause efficiency issue when we got lots of points, data in series
                    //should be change from [x, y] to {"x": x, "y": y, "index": index}
                    var index = this.series.data.indexOf(this.point);
                    s += '<span style="color:' + serie.color + '">' + serie.options.name +
					'</span style = "color:#F0F0F0">: <b>' + Highcharts.numberFormat(this.y,2,'.') + '&deg;C</b><br/></b><br/>';
                    $.each(serie.options.composition, function(name, value) {
                        s += '<b>' + name + ':</b> ' + value[index] + '<br>';

                    });
                });*/

                return s;
            },

		},


   plotOptions: {
      series: {
		  dataGrouping:
		  {
			  enabled:false
		  },
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
        rangeSelector: {
		inputDateFormat: '%b %e %Y %H:%M',
		inputBoxWidth: 125,
            buttons: [ {
                type: 'all',
                text: 'All'
            }],
		inputStyle: {
            color: '#56BFD7',
            fontWeight: 'bold'
        },
        labelStyle: {
            color: 'silver',
            fontWeight: 'bold'
        },

            selected: 0 // all
        },
   navigator: {
	enabled: false
   },
   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};



function createChart()
{


	Highcharts.setOptions(Highcharts.theme);
    var start = +new Date();
    // Create the chart
   datechart =  Highcharts.stockChart('container-graph', {
        chart: {
			height: 499,
            events: {
                load: function () {
                    this.setTitle(null, {
                        text: 'Built chart in ' + (new Date() - start) + 'ms'
                    });
                },

			selection: function(event) {
				csvFromDate = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', event.xAxis[0].min);
				csvToDate = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', event.xAxis[0].max);

			}
		},

            zoomType: 'x'
        },

		exporting: {
				enabled: false
			},

        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Temperature (°C)',
				style:{
					color: '#E0E0E0'
				}
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
			plotBands: [{
            color: '#515151',
            from: 0.0,
            to: 100.00
        }],

            labels: {
                align: 'right',
                x: -3
            },

            title: {
                text: 'Flow l/min',
				style:{
					color: '#E0E0E0'
				}
            },
            top: '62%',
            height: '28%',
            offset: 0,
            lineWidth: 2,
			min:0
        },{
			plotBands: [{
            color: '#515151',
            from: 0,
            to: 1
        }],
            labels: {
                align: 'right',
                x: -3
            },

            title: {
                text: 'Comp',
				style:{
					color: '#E0E0E0'
				}
            },
            top: '90%',
            height: '8%',
            offset: 0,
            lineWidth: 2,
			min:0
        }],

        title: {
            text: 'Tank Data by Date'
        },

        subtitle: {
            text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
        },

        series: seriesOptions

    });



}

