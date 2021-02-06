// read json file
d3.csv("samples.json").then((importedData) => {
    //display data
    // console.log(importedData);
    var data = importedData;


// Slice the first 10 objects for plotting
data = data.slice(0, 10);

 // Reverse the array due to Plotly's defaults
 data = data.reverse();

 var trace1 = {
     x: data.map(row => row.uto_ids),
     y: data.map(row => row.uto_labels),
     type: "bar",
     orientation:"h"
 };

 var sample_values = [trace1];

 var layout = {
     title: "Top 10 OTUs results",
 };

 Plotly.newPlot("plot", sample_values, layout);

});

