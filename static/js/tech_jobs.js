urlstring='/readData'

Plotly.d3.json(urlstring, function(err, rows){

function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
    }

var allJobTitles = unpack(rows, 'occ_title'),
    allCityx = unpack(rows, 'area_title'),
    allWage10 = unpack(rows, 'a_pct10'),
    allWage25 = unpack(rows, 'a_pct25'),
    allWage75 = unpack(rows, 'a_pct75'),
    allWage90 = unpack(rows, 'a_pct90'),
    listofJobs = [],
    currentCity = [],
    currentWage10 = [],
    currentWage25 = [],
    currentWage75 = [],
    currentWage90 = [];

  for (var i = 0; i < allJobTitles.length; i++ ){
    if (listofJobs.indexOf(allJobTitles[i]) === -1 ){
      listofJobs.push(allJobTitles[i]);
    }
  }
  
  function getJobData(chosenJob) {
    currentCity = [];
    currentWage10 = [],
    currentWage25 = [],
    currentWage75 = [],
    currentWage90 = [];
    for (var i = 0 ; i < allJobTitles.length ; i++){
      if ( allJobTitles[i] === chosenJob ) {
        currentCity.push(allCityx[i]);
        currentWage10.push(allWage10[i]);
        currentWage25.push(allWage25[i]);
        currentWage75.push(allWage75[i]);
        currentWage90.push(allWage90[i]);
      } 
    }
  };

// Default Country Data
setBarChart('Actuaries');
  
function setBarChart(chosenJob) {
  getJobData(chosenJob);  

    var trace1 = {
      x: currentCity,
      y: currentWage10,
      name: '10th percentile wage',
      type: 'bar',
      text: currentWage10,
      textposition: 'auto',
      hoverinfo: 'on',
      marker: {color: '#f0f8ff'},
      transforms: [{
        type: 'aggregate',
        groups: currentCity,
        aggregations: [
          {target: 'y', func: 'avg', enabled: true},
        ]
      }]
    };

    var trace2 = {
      x: currentCity,
      y: currentWage25,
      name: '25th percentile wage',
      type: 'bar',
      text: currentWage25,
      textposition: 'auto',
      hoverinfo: 'on',
      marker: {color: '#b5ddff'},
      transforms: [{
        type: 'aggregate',
        groups: currentCity,
        aggregations: [
          {target: 'y', func: 'avg', enabled: true},
        ]
      }]
    };

    var trace3 = {
      x: currentCity,
      y: currentWage75,
      name: '70th percentile wage',
      type: 'bar',
      text: currentWage75,
      textposition: 'auto',
      hoverinfo: 'on',
      marker: {color: '#7ac1ff'},
      transforms: [{
        type: 'aggregate',
        groups: currentCity,
        aggregations: [
          {target: 'y', func: 'avg', enabled: true},
        ]
      }]
    };

    var trace4 = {
      x: currentCity,
      y: currentWage90,
      name: '90th percentile wage',
      type: 'bar',
      text: currentWage90,
      textposition: 'auto',
      hoverinfo: 'on',
      marker: {color: '#3fa6ff'},
      transforms: [{
        type: 'aggregate',
        groups: currentCity,
        aggregations: [
          {target: 'y', func: 'avg', enabled: true},
        ]
      }]
    };

    var data = [trace1,trace2,trace3,trace4];

    var layout = {
      title: 'Wages for<br>'+ chosenJob + ' across Tech Hub Cities',
      font: {
        family: 'Arial',
        size: 14,
        color: '#00090c'
      },
      xaxis: {
        tickson: "boundaries",
        ticklen: 15,
        showdividers: true,
        dividercolor: 'grey',
        dividerwidth: 2
      },
      yaxis: {range: [0, 250000]},
    };

    Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});
};
  
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    JobSelector = innerContainer.querySelector('.jobdata');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}

assignOptions(listofJobs, JobSelector);

function updateJob(){
  setBarChart(JobSelector.value);
}
  
JobSelector.addEventListener('change', updateJob, false);
});
