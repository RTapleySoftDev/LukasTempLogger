var arr;
var tankchart = null;
var stoutchart = null;
var largerchart = null;
var fridgechart = null;
var point = null;


// Function to Change custom Alarm overlay on Highcharts solid gauge
// Params:
// @idIn<String> id of overlay <div>
// @alarmState<String> (NORMAL HIGH LOW)
function alarmset(idIn,alarmState)
{

	var normalc = '#16bf16';//Green
	var highc = '#E50B0B';//Red
	var lowc = '#1616ba';//Blue
	//console.log(idIn + " : "+alarmState);
	switch(alarmState) {
		case "NORMAL":
			$(idIn).find(".dot").css('border', '10px solid '+normalc+'');
			$(idIn).find(".dot").hide();
			$(idIn).find(".pulse").css('border', '5px solid '+normalc+'');
			$(idIn).find(".pulse").hide();
			break;
		case "HIGH":
			$(idIn).find(".dot").css('border', '10px solid '+highc+'');
			$(idIn).find(".dot").show();
			$(idIn).find(".pulse").css('border', '5px solid '+highc+'');
			break;
		case "LOW":
			$(idIn).find(".dot").css('border', '10px solid '+lowc+'');
			$(idIn).find(".dot").show();
			$(idIn).find(".pulse").css('border', '5px solid '+lowc+'');
			break;
		default:
			break;
	}


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

   }

};

var gaugeOptions = {

    chart: {
        type: 'solidgauge',
		height: 175
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '90%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEEEEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
		style: {
              color: '#56BFD7',
			fontSize:'16px'
            },
        stops: [
            [0.15, '#4286f4'], // blue
            [0.25, '#DDDF0D'], // yellow
            [0.5, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 1,
        title: {
            y: -70,
			style: {
                color: '#56BFD7',
				fontSize:'16px'
            }
        },
        labels: {
		style: {
              color: '#56BFD7',
			fontSize:'14px'
            },
            y: 18
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
			enabled:true,
                y: 5,
                borderWidth: 1,
                useHTML: true,
			format: '<div style="text-align:center"><span style="font-size:14px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y}</span>' +
                   '<span style="font-size:14px;color:#56BFD7">&deg;C</span></div>'
            }
        }
    }
};
Highcharts.setOptions(Highcharts.theme);

function getData(){
	$('#loader').show();
	$("#screen").css('opacity', '0.4');

		$( "#aModel" ).click(function() {
			$(location).attr('href','/mainchart');
	});

		$( "#aDatepicker" ).click(function() {
			$(location).attr('href','/datechart');
	});

		$( "#aSplate" ).click(function() {
			$(location).attr('href','/sdatechart');
	});

		$( "#aLplate" ).click(function() {
			$(location).attr('href','/ldatechart');
	});

		$( "#aFridge" ).click(function() {
			$(location).attr('href','/fdatechart');
	});
// The Tank gauge

 tankchart = Highcharts.chart('container-tank', Highcharts.merge(gaugeOptions, {
    yAxis: {
        labels: {
		enabled: false,
		style: {
              color: '#56BFD7',
			fontSize:'14px'
            },
            y: 18
        },
	stops: [
	/*[0.15, '#4286f4'], // blue
	[0.25, '#DDDF0D'], // yellow
	[0.5, '#DF5353'] // red */

	[0.0, '#1616ba'], // blue
	[0.445, '#1616ba'], // blue
	[0.445, '#16bf16'], // green
	[0.55, '#16bf16'], // green
	[0.55, '#E50B0B'] // red
	//[0.75, '#DF5353'] // red
     ],

	tickPositions: [-3,-5], //8%
	tickColor: '#000000',
	tickPosition: 'inside',
	tickLength: 30,
	tickWidth: 2,
	zIndex: 100, //added
    reversed: false,
        min: -14,
        max: 6,
        title: {
			text: 'Tank Temperature'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Tank',
        data: [-4],

        tooltip: {
            valueSuffix: ''
        }
    }]

}));

// The Fridge gauge

 fridgechart = Highcharts.chart('container-fridge', Highcharts.merge(gaugeOptions, {
    yAxis: {
	labels: {
		enabled: false,
		x: 10, y: -10,

		style: {
			fontSize: 16
		}
	},
	stops: [
	/*[0.15, '#4286f4'], // blue
	[0.25, '#DDDF0D'], // yellow
	[0.5, '#DF5353'] // red */

	[0.0, '#1616ba'], // blue
	[0.44, '#1616ba'], // blue
	[0.44, '#16bf16'], // green
	[0.56, '#16bf16'], // green
	[0.56, '#E50B0B'] // red
     ],

	tickPositions: [1,3], //8%
	tickColor: '#000000',
	tickPosition: 'inside',
	tickLength: 30,
	tickWidth: 2,
	zIndex: 100, //added
    reversed: false,
        min: -8,
        max: 12,
        title: {
            text: 'Fridge Temp'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Fridge',
        data: [2],
        tooltip: {
            valueSuffix: ''
        }
    }]

}));

// The StoutPlate gauge

 stoutchart = Highcharts.chart('container-stoutplate', Highcharts.merge(gaugeOptions, {
    yAxis: {
        labels: {
		enabled: false,
		style: {
              color: '#56BFD7',
			fontSize:'14px'
            },
            y: 18
        },
	stops: [
	/*[0.15, '#4286f4'], // blue
	[0.25, '#DDDF0D'], // yellow
	[0.5, '#DF5353'] // red */

	[0.0, '#1616ba'], // blue
	[0.4, '#1616ba'], // blue
	[0.4, '#16bf16'], // green
	[0.6, '#16bf16'], // green
	[0.6, '#E50B0B'] // red
	//[0.75, '#DF5353'] // red
     ],

	tickPositions: [5,3], //8%
	tickColor: '#000000',
	tickPosition: 'inside',
	tickLength: 30,
	tickWidth: 2,
	zIndex: 100, //added
    reversed: false,
        min: -6,
        max: 14,
        title: {
            text: 'Stout plate Temp'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Stout Plate',
        data: [4],

        tooltip: {
            valueSuffix: ''
        }
    }]

}));

// The StoutIn gauge

 stoutinchart = Highcharts.chart('container-stoutin', Highcharts.merge(gaugeOptions, {
    yAxis: {
	labels: {
		enabled: false,
		x: 10, y: -10,

		style: {
			fontSize: 16
		}
	},
	stops: [
	/*[0.15, '#4286f4'], // blue
	[0.25, '#DDDF0D'], // yellow
	[0.5, '#DF5353'] // red */

	[0.0, '#1616ba'], // blue
	[0.44, '#1616ba'], // blue
	[0.44, '#16bf16'], // green
	[0.56, '#16bf16'], // green
	[0.56, '#E50B0B'] // red
     ],

	tickPositions: [10,6], //8%
	tickColor: '#000000',
	tickPosition: 'inside',
	tickLength: 30,
	tickWidth: 2,
	zIndex: 100, //added
    reversed: false,
        min: -10,
        max: 26,
        title: {
            text: 'Stout In Temp'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Stout In',
        data: [8],

        tooltip: {
            valueSuffix: ''
        }
    }]

}));

// The StoutOut gauge

 stoutoutchart = Highcharts.chart('container-stoutout', Highcharts.merge(gaugeOptions, {
    yAxis: {
	labels: {
		enabled: false,
		x: 10, y: -10,

		style: {
			fontSize: 16
		}
	},
	stops: [
	/*[0.15, '#4286f4'], // blue
	[0.25, '#DDDF0D'], // yellow
	[0.5, '#DF5353'] // red */

	[0.0, '#1616ba'], // blue
	[0.44, '#1616ba'], // blue
	[0.44, '#16bf16'], // green
	[0.55, '#16bf16'], // green
	[0.55, '#E50B0B'] // red
     ],

	tickPositions: [5,3], //8%
	tickColor: '#000000',
	tickPosition: 'inside',
	tickLength: 30,
	tickWidth: 2,
	zIndex: 100, //added
    reversed: false,
        min: -6,
        max: 14,
        title: {
            text: 'Stout Out Temp'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Stout Out',
        data: [4],

        tooltip: {
            valueSuffix: ''
        }
    }]

}));

// The Larger Plate gauge

 largerchart = Highcharts.chart('container-largerplate', Highcharts.merge(gaugeOptions, {
    yAxis: {
	labels: {
		enabled: false,
		x: 10, y: -10,

		style: {
			fontSize: 16
		}
	},
	stops: [

	[0.0, '#1616ba'], // blue
	[0.4, '#1616ba'], // blue
	[0.4, '#16bf16'], // green
	[0.6, '#16bf16'], // green
	[0.6, '#E50B0B'] // red
     ],

	tickPositions: [3,1], //8%
	tickColor: '#000000',
	tickPosition: 'inside',
	tickLength: 30,
	tickWidth: 2,
	zIndex: 100, //added
    reversed: false,
        min: -8,
        max: 12,
        title: {
            text: 'Larger Plate Temp'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Larger Plate',
        data: [2],
        tooltip: {
            valueSuffix: ''
        }
    }]

}));

// The Larger In gauge

 largerinchart = Highcharts.chart('container-largerin', Highcharts.merge(gaugeOptions, {
    yAxis: {
	labels: {
		enabled: false,
		x: 10, y: -10,

		style: {
			fontSize: 16
		}
	},
	stops: [


	[0.0, '#1616ba'], // blue
	[0.44, '#1616ba'], // blue
	[0.44, '#16bf16'], // green
	[0.56, '#16bf16'], // green
	[0.56, '#E50B0B'] // red
     ],

	tickPositions: [10,6], //8%
	tickColor: '#000000',
	tickPosition: 'inside',
	tickLength: 30,
	tickWidth: 2,
	zIndex: 100, //added
    reversed: false,
        min: -10,
        max: 26,
        title: {
            text: 'Larger In Temp'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Larger In',
        data: [8],
        tooltip: {
            valueSuffix: ''
        }
    }]

}));

// The Larger Out gauge

 largeroutchart = Highcharts.chart('container-largerout', Highcharts.merge(gaugeOptions, {
    yAxis: {
	labels: {
		enabled: false,
		x: 10, y: -10,

		style: {
			fontSize: 16
		}
	},
	stops: [
	[0.0, '#1616ba'], // blue
	[0.45, '#1616ba'], // blue
	[0.45, '#16bf16'], // green
	[0.55, '#16bf16'], // green
	[0.55, '#E50B0B'] // red
     ],

	tickPositions: [3,1], //8%
	tickColor: '#000000',
	tickPosition: 'inside',
	tickLength: 30,
	tickWidth: 2,
	zIndex: 100, //added
    reversed: false,
        min: -8,
        max: 12,
        title: {
            text: 'Larger Out Temp'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Larger Out',
        data: [2],
        tooltip: {
            valueSuffix: ''
        }
    }]

}));




setInterval(function(){

	$.getJSON( "/getlasttankdata", function( data ) {
	var arr = data;
	var d = new  Date(arr[0].realtime);
	var pumpLoad = 0.00;

	//pumpLoad = (arr[0].pumpress * 1.0).toFixed(2);
	pumpLoad = (arr[0].pumppress);
	if(arr[0].f1 < 0.15){arr[0].f1 = 0.0}
	if(arr[0].f2 < 0.15){arr[0].f2 = 0.0}
	if(arr[0].f3 < 0.15){arr[0].f3 = 0.0}
	if(arr[0].f4 < 0.15){arr[0].f4 = 0.0}
	var totalFlow = arr[0].f1+arr[0].f2+arr[0].f3+arr[0].f4;
	var avgTemp = (arr[0].t1 + arr[0].t2)/2;
	if(arr[0].compOn == 1){
		$("#compOn").text("On");
		$("#exPump").html('60<span class = "listtext">&nbsp Watts</span>');
		totalLoad = parseFloat(60.0 + parseFloat(pumpLoad) + 3000.00);
		console.log(totalLoad)
		$("#totalWatts1").html(totalLoad+'<span class = "listtext">Watts</span>')

		}
	else{
		$("#compOn").text("Off");
		$("#exPump").html('0<span class = "listtext">&nbsp Watts</span>');
		totalLoad = pumpLoad;
		$("#totalWatts1").html(''+totalLoad+'<span class = "listtext">Watts</span>')
	}
	$("#manPress").html(arr[0].pumpload+'<span class = "listtext">&nbsp bar</span>');
	$("#updateTime").text(d.toLocaleString());
	$("#flow1").html(''+(arr[0].f1).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
	$("#flow2").html(''+(arr[0].f2).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
	$("#flow3").html(''+(arr[0].f3).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
	$("#flow4").html(''+(arr[0].f4).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
	$("#totalFlow1").html(''+(totalFlow).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
	$("#temp1").html(''+(arr[0].t1).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
	$("#temp2").html(''+(arr[0].t2).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
	$("#temp3").html(''+(arr[0].t3).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
	$("#temp4").html(''+(arr[0].t4).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
	$("#temp15").html(''+(arr[0].t15).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
	$("#tankavrg").html(''+avgTemp.toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
	$("#manPump").html(''+pumpLoad +'<span class = "listtext">&nbsp Watts</span>');

	if (tankchart) {
		point = tankchart.series[0].data[0];
		point.y += avgTemp.toFixed(1) - point.y;
		point.update(point.y);
		if(point.y < -7)
		{
			alarmset("#alarm-tank","LOW");
		}
		else if(point.y > -2)
		{
			alarmset("#alarm-tank","HIGH");
		}
		else
		{
			alarmset("#alarm-tank","NORMAL");
		}


    }



	})  .done(function() {

		$.getJSON( "/getlastplatedata", function( data ) {
		var arr = data;
		//var d = new  Date(arr[0].realtime);
		if(arr[0].sf1 < 0.15){arr[0].f1 = 0.0}
		if(arr[0].lf2 < 0.15){arr[0].f2 = 0.0}
		if(arr[0].ff3 < 0.15){arr[0].f3 = 0.0}
		if(arr[0].f4 < 0.15){arr[0].f4 = 0.0}
		var totalFlow2 = arr[0].sf1+arr[0].lf2+arr[0].ff3+arr[0].f4;
		//var avgTemp = (arr[0].t1 + arr[0].t2)/2
		/*if(arr[0].compOn == 1){
			$("#compOn").text("On");
			$("#exPump").html('40<span class = "listtext">&nbsp Watts</span>');

			}
		else{
			$("#compOn").text("Off");
			$("#exPump").html('0<span class = "listtext">&nbsp Watts</span>');
		}*/
		//$("#updateTime").text(d.toLocaleString());
		$("#sf1").html(''+(arr[0].sf1).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
		$("#lf2").html(''+(arr[0].lf2).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
		$("#ff3").html(''+(arr[0].ff3).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
		$("#totalFlow2").html(''+(totalFlow2).toFixed(2)+'<span class = "listtext">&nbsp l/min</span>');
		$("#temp5").html(''+(arr[0].t5).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#temp6").html(''+(arr[0].t6).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#temp7").html(''+(arr[0].t7).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#temp8").html(''+(arr[0].t8).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#temp9").html(''+(arr[0].t9).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#temp10").html(''+(arr[0].t10).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#temp11").html(''+(arr[0].t11).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#temp12").html(''+(arr[0].t12).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#temp13").html(''+(arr[0].t13).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#temp14").html(''+(arr[0].t14).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#stoutIn").html(''+(arr[0].t20).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#stoutOut").html(''+(arr[0].t29).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#largerIn").html(''+(arr[0].t24).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#largerOut").html(''+(arr[0].t23).toFixed(2)+'<span class = "listtext">&nbsp&deg;C</span>');
		$("#svalve").html(''+arr[0].smodvalve+'<span class = "listtext">&nbsp %</span>');
		$("#lvalve").html(''+arr[0].lmodvalve+'<span class = "listtext">&nbsp %</span>');
		$("#fvalve").html(''+arr[0].fmodvalve+'<span class = "listtext">&nbsp %</span>');



	if (stoutchart){
		point = stoutchart.series[0].data[0];
		point.y += (arr[0].t7).toFixed(1) - point.y;
		point.update(point.y);
		if(point.y < 2)
		{
			alarmset("#alarm-stoutplate","LOW");
		}
		else if(point.y > 6)
		{
			alarmset("#alarm-stoutplate","HIGH");
		}
		else
		{
			alarmset("#alarm-stoutplate","NORMAL");
		}
	}

	if (largerchart) {
		point = largerchart.series[0].data[0];
		point.y += (arr[0].t10).toFixed(1) - point.y;
		point.update(point.y);
		if(point.y < 0)
		{
			alarmset("#alarm-largerplate","LOW");
		}
		else if(point.y > 4)
		{
			alarmset("#alarm-largerplate","HIGH");
		}
		else
		{
			alarmset("#alarm-largerplate","NORMAL");
		}
    }

	if (fridgechart) {
		point = fridgechart.series[0].data[0];
		point.y += (arr[0].t13).toFixed(1) - point.y;
		point.update(point.y);
		if(point.y < -1)
		{
			alarmset("#alarm-fridge","LOW");
		}
		else if(point.y > 5)
		{
			alarmset("#alarm-fridge","HIGH");
		}
		else
		{
			alarmset("#alarm-fridge","NORMAL");
		}
    }

	if (stoutinchart){
		point = stoutinchart.series[0].data[0];
		point.y += (arr[0].t20).toFixed(1) - point.y;
		point.update(point.y);

		if(point.y < -4)
		{
			alarmset("#alarm-stoutin","LOW");
		}
		else if(point.y > 12)
		{
			alarmset("#alarm-stoutin","HIGH");
		}
		else
		{
			alarmset("#alarm-stoutin","NORMAL");
		}
	}

	if (stoutoutchart){
		point = stoutoutchart.series[0].data[0];
		point.y += (arr[0].t29).toFixed(1) - point.y;
		point.update(point.y);
		if(point.y < 2.5)
		{
			alarmset("#alarm-stoutout","LOW");
		}
		else if(point.y > 5.5)
		{
			alarmset("#alarm-stoutout","HIGH");
		}
		else
		{
			alarmset("#alarm-stoutout","NORMAL");
		}
	}

	if (largerinchart){
		point = largerinchart.series[0].data[0];
		point.y += (arr[0].t24).toFixed(1) - point.y;
		point.update(point.y);
		if(point.y < 4)
		{
			alarmset("#alarm-largerin","LOW");
		}
		else if(point.y > 12)
		{
			alarmset("#alarm-largerin","HIGH");
		}
		else
		{
			alarmset("#alarm-largerin","NORMAL");
		}
	}

	if (largeroutchart){
		point = largeroutchart.series[0].data[0];
		point.y += (arr[0].t23).toFixed(1) - point.y;
		point.update(point.y);
		if(point.y < 0.5)
		{
			alarmset("#alarm-largerout","LOW");
		}
		else if(point.y > 3.5)
		{
			alarmset("#alarm-largerout","HIGH");
		}
		else
		{
			alarmset("#alarm-largerout","NORMAL");
		}
	}


		});

	  }).done(function(){
		  	$("#loader").hide();
			$("#screen").css('opacity', '1.0');
	  });

},5000);
}