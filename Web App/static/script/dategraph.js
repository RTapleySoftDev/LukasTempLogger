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


function fillChart(){
	$('#selectFile').change(function() {
		selection = $(this).find("option:selected").text()
		updateChart(datechart, selection);
	});

	$( "#scrview" ).click(function() {
		screenfull.toggle($('#screen')[0]);
	
	});

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



	$.getJSON("/getdropdownlist",function(data){

	//var arr = JSON.parse(data);
	$.each(data, function (i, p) {
		$('#selectFile').append($('<option></option>').val(i).html(p));
	});

	}).done(function(){
		var file = $('#selectFile').find(":selected").text();
		$.getJSON("/getdataforchart", { file: file },function( data ) {
			
		var arr = data;
		tankarr = data;
		var tn = $.now();
		names = ['Probe Temp', 'Bottom Tank', 'Manifold Flow', 'Manifold Ret', 'Room'];
		fnames = ['Bottle Cooler', 'Spare', 'Larger Plate', 'Stout Plate', 'Comp On-Off'];
		temp1 = []; //Temp Probe
		var tempArr = [];

			for(var i = 0; i < arr.length; i++) {
				//Probe Temp
				tempArr[0] = (arr[i].Time*1000) + tn;
				tempArr[1] = arr[i].ProbeTemp;
				temp1[i] = tempArr;
				tempArr = [];


			}
		seriesOptions[0] = {
			name:names[0],
			data:temp1, //Probe Temp
            dataGrouping: {
                forced:true
            }
		};

			}).done(function(){
				createChart();
				$("#loader").hide();
				$("#screen").css('opacity', '1.0');
		});
	});

}

function updateChart(chartIn,fileIN){
	seriesOptions = [];
			$.getJSON("/getdataforchart", { file: fileIN },function( data ) {
			
		var arr = data;
		tankarr = data;
		var tn = $.now();
		names = ['Probe Temp', 'Bottom Tank', 'Manifold Flow', 'Manifold Ret', 'Room'];
		fnames = ['Bottle Cooler', 'Spare', 'Larger Plate', 'Stout Plate', 'Comp On-Off'];
		temp1 = []; //Temp Probe
		var tempArr = [];

			for(var i = 0; i < arr.length; i++) {
				//Probe Temp
				tempArr[0] = (arr[i].Time*1000) + tn;
				tempArr[1] = arr[i].ProbeTemp;
				temp1[i] = tempArr;
				tempArr = [];


			}
		seriesOptions[0] = {
			name:names[0],
			data:temp1, //Probe Temp
            dataGrouping: {
                forced:true
            }
		};

			}).done(function() {
		datechart.update({series: seriesOptions});
		datechart.xAxis[0].setExtremes(null,null);
		console.log(seriesOptions);
		$("#loader").hide();
		//console.log("Hide1 line 123");
		$("#screen").css('opacity', '1.0');


	  });
}

function fillOtherData(indexIn){

	var avgtemp = (tankarr[indexIn].ProbeTemp);
	$("#tankavrg").html(''+avgtemp.toFixed(2)+'<span class = "listtext">&deg;C</span>');

}



Highcharts.theme = {
   colors: ['#90ee7e','#2b908f', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
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
		inputDateFormat: '%H:%M:%S',
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
				csvFromDate = Highcharts.dateFormat('%H:%M:%S', event.xAxis[0].min);
				csvToDate = Highcharts.dateFormat('%H:%M:%S', event.xAxis[0].max);

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
            height: '100%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, ],

        title: {
            text: 'Oven Temperature Probe'
        },

        subtitle: {
            text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
        },

        series: seriesOptions

    });

}

