d3.json("samples.json").then((samplesData) => {
    // console.log(samplesData);
    // Create dropdown menu and append id value
    var selector = d3.selectAll("#selDataset");
    var nameIds = samplesData.names;
    // console.log(nameIds);

    nameIds.forEach((id) => {
        selector.append("option")
        .text(id)
        .property("value", id);
    });

    var firstSubject = nameIds[0];
    // console.log(firstSubject); // display the first id
    buildChart(firstSubject);
    demographicTable(firstSubject);

});

function optionChanged(newSelection) {
    buildChart(newSelection);
    demographicTable(newSelection);
}

// create Demographic table
function demographicTable(samples) {
    d3.json("samples.json").then((samplesData) => {
        var metadata = samplesData.metadata;
        // console.log(metadata); //display metadata from json file
        var selectID = metadata.filter(m => m.id == samples);
        var results = selectID[0];
        // console.log(results); // display demographic info for first id only
        var metaPanel = d3.select("#sample-metadata");
        metaPanel.html("");
        Object.entries(results).forEach(([key, value]) => {
            metaPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
        })
    })
}


function buildChart(samplesData) {
    d3.json("samples.json").then((samplesData) => {
        var sample_values = samplesData.sample_values;
        var otu_ids = samplesData.otu_ids;
        var otu_labels = samplesData.otu_labels;
        var trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(d=> `OTU ${d}`),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };
        var layout = {
            title: "Top 10 UTOs Results"
        };

        Plotly.newPlot("bar", trace1, layout);

        var trace2 = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };
        var layout = {
            title: "Top 10 OTUs Results"
        };

        Plotly.newPlot("bubble", trace2, layout);

    });
}

