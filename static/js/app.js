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
    // buildChart(firstSubject);
    demographicTable(firstSubject);

});

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

function buildChart(samples) {
    d3.json("samples.json").then((samplesData) => {
        var samples = samplesData.samples;
        var chartID = samples.filter(s => s.id == samples);
        var results = chartID[0];
        var sample_values = results.sample_values;
        var otu_ids = results.otu_ids;
        var otu_labels = results.otu_lables;
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_lables,
            mode: "markers",
        }
    })
}

function optionChanged(newSelection) {
    buildChart(newSelection);
    demographicTable(newSelection);
}