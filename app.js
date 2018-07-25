var svgWidth = 500;
var svgHeight = 500;

var margin = {
    top: 50,
    right: 100,
    bottom: 150,
    left: 100
  };
 var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#Chart")
              .append("svg")
              .attr("width", svgWidth)
              .attr("height", svgHeight)

var chartGroup = svg.append("g")
                      .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 2: Create scale functions
  // ==============================



d3.csv("Diabetes.csv", function(err, data){
  console.log(data);
  data.forEach(function (d){
    d.Sample_Size = +d.Sample_Size;
    d.Data_value = +d.Data_value;
    d.Total =+ d.Total; 
  });
  console.log(data);

  var xLinearScale = d3.scaleLinear()
    .domain([0, ((d3.max(data, (d) => d.Data_value))+4)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .range([height, 0]);
  
  var heavyMax = d3.max(data, d => d.Total); {
      yMax = heavyMax
  };
    yLinearScale.domain([0, (yMax+5)]);

var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

  chartGroup.append("g")
            .call(leftAxis);

var circlesGroup1 = chartGroup.selectAll("g")
                                .data(data)
                                .enter()
                                .append("circle")
                                .attr("cx", d => xLinearScale(d.Data_value))
                                .attr("cy", d => yLinearScale(d.Total))
                                .attr("r", "15")
                                .attr("fill", "rgb(41, 128, 185)")
                                .attr("opacity", ".5")
});



  