// Homework 12: Plot.ly - Belly Button Biodiversity

// Use the D3 library to read in samples.json
var drawChart = function(x_data, y_data, hoverText, metadata) {

    var metadata_panel = d3.select("#sample-metadata");
    metadata_panel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        metadata_panel.append("p").text(`${key}: ${value}`);
    });

    /* Create a horizontal bar chart using:
     'sample_values' as the values for the bar chart
     'otu_ids' as the labels for the bar chart, and
     'otu_labels' as the hovertext for the chart */
    var trace = {
        x: x_data,
        y: y_data,
        text: hoverText,
        type: 'bar',
        orientation: 'h'
    };

    var data = [trace];

    var layout1 = {
        title: "Bar Chart: Sample Values by OTU IDs",
        font: {color: "MidnightBlue", size: 14},
        width: 1000,
        height: 500
    };

    Plotly.newPlot('bar', data, layout1);

    /* Create a bubble chart that displays each sample and uses:
     'otu_ids' for the x values
     'sample_values' for the y values
     'sample_values' for the marker size
     'otu_ids' for the marker colors, and
     'otu_labels for the text values
    */
    var trace2 = {
        x: x_data,
        y: y_data,
        text: hoverText,
        mode: 'markers',
        marker: {
            size: y_data,
            color: x_data
        }
    };

    var data2 = [trace2];

    var layout2 = {
        title: "Bubble Chart: Sample Values by OTU IDs<br>Marker Size relative to Sample Values",
        font: {color: "MidnightBlue", size: 14},
    };

    Plotly.newPlot('bubble', data2, layout2);
};

// Display the sample metadata, i.e., an individual's demographic information
var populateDropdown = function(names) {

    var selectTag = d3.select("#selDataset");
    var options = selectTag.selectAll('option').data(names);

    options.enter()
        .append('option')
        .attr('value', function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });
};

// Update all of the plots any time that a new sample is selected
var optionChanged = function(newValue) {

    d3.json("data/samples.json").then(function(data) {

    sample_new = data["samples"].filter(function(sample) {

        return sample.id == newValue;

    });
    
    metadata_new = data["metadata"].filter(function(metadata) {

        return metadata.id == newValue;

    });
    
    
    x_data = sample_new[0]["otu_ids"];
    y_data = sample_new[0]["sample_values"];
    hoverText = sample_new[0]["otu_labels"];
    
    console.log(x_data);
    console.log(y_data);
    console.log(hoverText);
    
    drawChart(x_data, y_data, hoverText, metadata_new[0]);
    });
};

d3.json("data/samples.json").then(function(data) {

    // Populate dropdown with names
    populateDropdown(data["names"]);

    //Populate the page with the first value
    x_data = data["samples"][0]["otu_ids"];
    y_data = data["samples"][0]["sample_values"];
    hoverText = data["samples"][0]["otu_labels"];
    metadata = data["metadata"][0];

    //Draw the chart on load
    drawChart(x_data, y_data, hoverText, metadata);
});