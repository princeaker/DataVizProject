var hr_url = "https://raw.githubusercontent.com/jkastelan/DAA2018_jlk635/master/searchhr.json";

var county_URL = "https://raw.githubusercontent.com/TNRIS/tx.geojson/master/counties/tx_counties.geojson";

d3.queue()
.defer(d3.json, hr_url)
.defer(d3.json, county_URL).
await(createChart)


function createChart(error, benchmark, county){

  var margin = {'left': 40, 'right': 30, 
               'top':10, 'bottom': 20}
  var svg = d3.select('#scatterSvg').append('svg')
.style("width", 1200)
.style("height", 600);
  
  var toolx = 150;

  var gChart = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var gMap   = svg.append("g")
                  .attr("transform", "translate(550, 0)"); 
  
  
  createMap(gMap, benchmark, county);
  createScatter(gChart,benchmark, county);
  
  
  function createScatter(g, benchmark, county){
      var height = 500;
      var width = 1000;
  
      var x = d3.scaleLinear().domain([0, .12]).range([0, 500]);
      var y = d3.scaleLinear().domain([0, .12]).range([500, 0]);
  
      var xAxis = d3.axisBottom(x)
      var yAxis = d3.axisLeft(y)
  
      var tooltip = d3.select("#scatterSvg")
        .append("div")
        .attr("class", "tooltip");


  
    var circle = g.selectAll('circle').data(benchmark).enter()
        .append('circle').attr("cx", function(d){
            return x(d.White);
    })
    .attr("cy", function(d){
        return y(d.Black);
    })
    .attr("r", function(d){
      return  2 + (d.bcount / 150);
    })
    .style('fill', 'orange');
  

circle =
          g.selectAll('circle').data(benchmark)
      .on("mouseover", function(d){
       

  var name = d.index,


  // highlight         
 // try to draw a shape over the Map
      canvasSize = [650, 650],
      projection = d3.geoMercator()
                     .scale(Math.pow(2, 10.66 + 0.50))
                     .center([-99.9018,31.9686])
                     .translate([canvasSize[0]/2.7, canvasSize[1]/2.5]);
      
// We create a path generator (which can take a set of points to generate a path)

// using the created projection.
      var path       = d3.geoPath()
                     .projection(projection);

    var key  = name;
    var matched = county.features.filter(d => d.properties.COUNTY==key);
  
//   Let's create a path for each (new) county shape
  var hl = gMap.selectAll(".select")
    .data(matched, d => d.properties.COUNTY);
  
  hl.enter().append("path")
      .attr("class", "select")
      .attr("d", path);
  
  hl.exit().remove();

          tooltip
              .style("left", d3.event.pageX + toolx + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(d.index + "<br/> Minorities Searched:" + d.bcount)
        })
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    g.append("g")
      .attr("class", "y axis")
      .call(yAxis)

    var line = g.append("line")
            .attr("x1", 0)
            .attr("y1", 500)
            .attr("x2", 500)
            .attr("y2", 0)
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "5")
    .attr("stroke", 'black');
    
     // text function 
var Text = g.append('text')
 .attr("class", "color-bar-label")
  .attr("x", 200)
  .attr('y', 550)
  .attr('font-weight', 'bold')
  .text("White Benchmark")
//  console.log(byCuisine)
   g.exit().style("opacity", 0)
//  console.log(d => )

    var Text = g.append('text')
 .attr("class", "color-bar-label")
  .attr("x", -300)
  .attr('y', -25)
  .attr('font-weight', 'bold')
  .attr('transform', 'rotate(-90)')
  .text("Minority Benchmark")
//  console.log(byCuisine)
   g.exit().style("opacity", 0)
//  console.log(d => )
    
      d3.select('#h').on("click", function(){
       updateMap(gMap, benchmark, 1); 
    var circle = g.selectAll('circle').data(benchmark)
    .transition().duration(500)
    .attr("cx", function(d){
      return x(d.White);
    })
    .attr("cy", function(d){
      return y(d.Hispanic);
    })
    .attr("r", function(d){
      return  2 + (d.hcount / 300);
    })
    .style("fill", "purple")
    .style("stroke", "purple");
        
        
   
    
    circle =
          g.selectAll('circle').data(benchmark)
      .on("mouseover", function(d){
      var name = d.index,


  // highlight         
 // try to draw a shape over the Map
      canvasSize = [650, 650],
      projection = d3.geoMercator()
                     .scale(Math.pow(2, 10.66 + 0.50))
                     .center([-99.9018,31.9686])
                     .translate([canvasSize[0]/2.7, canvasSize[1]/2.5]);
      
// We create a path generator (which can take a set of points to generate a path)

// using the created projection.
      var path       = d3.geoPath()
                     .projection(projection);

    var key  = name;
    var matched = county.features.filter(d => d.properties.COUNTY==key);
  
//   Let's create a path for each (new) county shape
  var hl = gMap.selectAll(".select")
    .data(matched, d => d.properties.COUNTY);
  
  hl.enter().append("path")
      .attr("class", "select")
      .attr("d", path);
  
  hl.exit().remove();

          tooltip
              .style("left", d3.event.pageX + toolx + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(d.index + "<br/> Minorities Searched:" + d.hcount)
        })
      })

  
    d3.select('#a').on("click", function(){
      updateMap(gMap, benchmark, 2);
    var circle = g.selectAll('circle').data(benchmark).
    transition().duration(500).attr("cx", function(d){
      return x(d.White);
    })
    .attr("cy", function(d){
      return y(d.Asian);
    })
    .attr("r", function(d){
      return  2 + (d.acount / 75);
    })
    .style("fill", "green")
    .style("stroke", "green");
      
      circle =
          g.selectAll('circle').data(benchmark)
      .on("mouseover", function(d){
        var name = d.index,


  // highlight         
 // try to draw a shape over the Map
      canvasSize = [650, 650],
      projection = d3.geoMercator()
                     .scale(Math.pow(2, 10.66 + 0.50))
                     .center([-99.9018,31.9686])
                     .translate([canvasSize[0]/2.7, canvasSize[1]/2.5]);
      
// We create a path generator (which can take a set of points to generate a path)

// using the created projection.
      var path       = d3.geoPath()
                     .projection(projection);

    var key  = name;
    var matched = county.features.filter(d => d.properties.COUNTY==key);
  
//   Let's create a path for each (new) county shape
  var hl = gMap.selectAll(".select")
    .data(matched, d => d.properties.COUNTY);
  
  hl.enter().append("path")
      .attr("class", "select")
      .attr("d", path);
  
  hl.exit().remove();

        
          tooltip
              .style("left", d3.event.pageX + toolx + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(d.index + "<br/> Minorities Searched:" + d.acount)
        })
    })
    
    d3.select('#b').on("click", function(){
      updateMap(gMap, benchmark, 0);
    var circle = g.selectAll('circle').data(benchmark).transition()
    .duration(500).attr("cx", function(d){
      return x(d.White);
    })
    .attr("cy", function(d){
      return y(d.Black);
    })
    .attr("r", function(d){
      return  2 + (d.bcount / 150);
    })
    .style("fill", "orange")
    .style("stroke", "orange");
      
      circle =
          g.selectAll('circle').data(benchmark)
      .on("mouseover", function(d){
        var name = d.index,


  // highlight         
 // try to draw a shape over the Map
      canvasSize = [650, 650],
      projection = d3.geoMercator()
                     .scale(Math.pow(2, 10.66 + 0.50))
                     .center([-99.9018,31.9686])
                     .translate([canvasSize[0]/2.7, canvasSize[1]/2.5]);
      
// We create a path generator (which can take a set of points to generate a path)

// using the created projection.
      var path       = d3.geoPath()
                     .projection(projection);

    var key  = name;
    var matched = county.features.filter(d => d.properties.COUNTY==key);
  
//   Let's create a path for each (new) county shape
  var hl = gMap.selectAll(".select")
    .data(matched, d => d.properties.COUNTY);
  
  hl.enter().append("path")
      .attr("class", "select")
      .attr("d", path);
  
  hl.exit().remove();

        
          tooltip
              .style("left", d3.event.pageX + toolx + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(d.index + "<br/> Minorities Searched:" + d.bcount)
        })
  })
      }
  
  
    
    
 function createMap(g, benchmark, county){
      let canvasSize = [650, 650],
      projection = d3.geoMercator()
                     .scale(Math.pow(2, 10.66 + 0.50))
                     .center([-99.9018,31.9686])
                     .translate([canvasSize[0]/2.7, canvasSize[1]/2.5]),
      
// We create a path generator (which can take a set of points to generate a path)

// using the created projection.
      path       = d3.geoPath()
                     .projection(projection);

//   Let's create a path for each (new) county shape
  g.selectAll(".county")
    .data(county.features)
    .enter().append("path")
      .attr("class", "county")
      .attr("d", path);
   
        g.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(285,20)")
    .append("text")
    .attr("class", "axis--map--caption")
    .attr("y", -16);

  updateMap(g, benchmark, 0);
 
    }

    function updateMap(g, benchmark, i){
      var data     = benchmark.map(d => [d.Asian, d.Black, d.Hispanic, d.White, d.index]),
      maxCount = d3.max(data, d => d[i]-d[3]),
      minCount = d3.min(data, d => d[i]-d[3]),
      meanCount = d3.mean(data, d => d[i]-d[3]),
      devCount = d3.deviation(data, d => d[i]-d[3]),
//       steps    = 3,
      color = d3.scaleQuantile()
  .domain([-5, -2 ,2, 5])
  .range(['DarkTurquoise', 'LightGrey', 'IndianRed' ]);
//       d3.schemeRdBu[steps]
//      color =    d3.scaleQuantile()
//   .domain([minCount, maxCount])
//   .range(d3.schemeRdBu[steps]);
//   console.log(color.domain())
//   console.log(devCount)
          
//     console.log([minCount,meanCount -2*devCount, meanCount -devCount, 0 , meanCount + devCount]);
      
//       color    = d3.scaleThreshold()
//                    .domain(d3.range(minCount, maxCount, (maxCount - minCount)/steps))
//                    .range(d3.schemeRdBu[steps]);
          
          
var x = d3.scaleQuantile()
          .domain(([-5, -2 , 2   ,5])).range([-100, -40 , 40 , 100]);
      
            
//       var x = d3.scaleLinear().domain([minCount, meanCount - (2 * devCount), meanCount,meanCount + (2 * devCount), maxCount]).rangeRound([-200, 50, 0, 50, 250]);


counties = g.selectAll(".county")
                  .data(data, d => (d[4]?d[4]:d.properties.COUNTY));                  

  counties
    .transition().duration(300)
    .style("fill",  d => color((d[i]-d[3])/devCount));
  
     counties.exit()
      .transition().duration(300)
      .style("fill", "none");
  var legend   = d3.select(".legend");
   // For updating the legends, we get all the 'rect' shapes, and
  // perform an invert map to get the ranges for each color.

      
let boxes = legend.selectAll("rect")
    .data(color.range().map(function(d) {
//         d = color.invert(d);
              d = color.invertExtent(d); 
        if (d[0]==null) d[0] = x.domain()[0];
        if (d[1]==null) d[1] = x.domain()[1];

        return d;
      }));

      
  //   // We then create/update all boxes to the appropriate size and color
  boxes
    .enter().append("rect")
    .merge(boxes)
      .attr("height", 10)
      .attr("x", d => x(d[0]))
      .attr("width", d => (x(d[1]) - x(d[0])))
      .attr("fill", d => color(d[0]));

//       console.log(steps)            console.log(color.domain());

  // Update the tick values
  legend.call(d3.axisBottom(x)
//       .ticks(4)
      .tickSize(10,0)
      .tickValues([-5, -2* devCount, 2* devCount, 5 ])
      .tickFormat(d3.format(".2f"))) 
      .select(".domain")
      .remove();

       var Category = ['Black', 'Hispanic', 'Asian', 'White'];
  // ... and the title of the legend box
  legend.select(".axis--map--caption")
    .attr("x", x.range()[0])
    .attr('y', -7)
    .text(`Difference between Search Rate for ${Category[i]} and White Drivers`);
    }
  
}
