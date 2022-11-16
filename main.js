function main() 
{

    var margin = { top: 50, left: 50, right: 50, bottom: 50},
        height = 700,
        width = 1250 - margin.left - margin.right;

        // var svg = d3.select("#map")
        var svg = d3.select("#map")
        // .append("svg")
        // .attr("height", height + margin.top + margin. bottom) 
        .attr("height", height)
        // .attr("width", width + margin. left + margin. right)

        // .append("g")
        // .attr("transform", "translate(" + margin. left + "," + margin.top + ")");
        var playing = false;
        var currentAttribute = 0;
        var attributeArray = [];
        /*
        Read in world. topojson
        Read in in capitals.csv
        */
        // d3.queue()
        // .defer(d3.json, "world.topojson")
        // .await (ready)



        // var data = d3.json("world.topojson", function(error, d) 
        // {
        //     if (error) return console.error(error);
        //     // console.log(d);
        // });

        var projection = d3.geoMercator()
        .translate([width/2 +90,height/2 + 90])
        .center([0, 0])
        .scale(200)
        .rotate([-12,0])
        // .rotate([-180,0]);

        // var path = d3.geoPath()
        // .projection(projection);

        var path = d3.geoPath()
        .projection(projection)


        
        // var g = svg.append("g")
    // var promises = [
    // d3.json('world.topojson'),
    // d3.csv('wgidataset.csv')
    // ]

    var color = d3.scaleThreshold()
    .domain(d3.range(-2.5, 2.5))
    .range(d3.schemeReds[6]);

    // data.then(function(data)
    // {
        // Promise.all(promises).then(ready)
        // const mousemove = function(event, topology) {
        //     // Tooltip
        //     //   .html('Fire Name: ' + d.FIRE_NAME + "<br>Year: " + d.FIRE_YEAR + 
        //     //   '<br>Size: '+d.FIRE_SIZE+' hectares<br>State: '+d.STATE +
        //     //   '<br>Cause: '+d.STAT_CAUSE_DESCR)
        //     //   .style("left", (event.x/2+20) + "px")
        //     //   .style("top", (event.y/2-30) + "px")
        //     console
        //   }
// function ready([world, corruption]) {

// var data = d3.json('joined.json')
var data = d3.json('sample.json')

data.then(function(data)
{

    
    // var data = {};
    // corruption.forEach(function(d){
    //   data[d.country] = d.vae;
    // });

    var geometries = data.objects.countries.geometries

    // console.log(topojson.feature(geometries, geometries.id).features)
    // console.log(geometries[0].properties.vae)
    console.log(geometries)
    // console.log(data)
    var num = toString(1996)
    console.log(geometries[2].properties.name)
    // console.log(geometries[0].properties.color)

        var countries = svg.selectAll("path")
        .data(topojson.feature(data, data.objects.countries).features)
        .enter().append("path")
        .attr("class", "country")
        .attr("id", function(d,i)
        {
            return geometries[i].properties.name;
        })
        .attr("fill", function(d,i)
        {
            var vae = geometries[i].properties.years[1998].vae;
            // console.log(vae)
            if(vae)
                return color(vae*-1)
            else
                return "#cccccc"

        })
        .attr("d", path)
        .on('mouseover',function(d,i)
        {
            // console.log(d.bbox)
            d3.select(this)
            .transition()
            .duration(300)
            .attr("opacity", "50%");

            countries.append("text")
            .attr("x", "50")
            .attr("y", "800")
            .attr("dy", ".35em")
            .text(this.id)
            
        })
        .on('mouseout',function(i)
        {
            d3.select(this)
            .transition()
            .duration(500)
            .attr("opacity","100%")
        })

        // for(var i = 1998; i < 2021; i += 2)
        // {
        //     d3.selectAll("path")
        //     .transition()
        //     .duration(2000)
        //     .attr("fill", function(d,j)
        //         {
        //             console.log(i)
        //             var vae = geometries[j].properties.years[i].vae;
        //             // console.log(vae)
        //             if(vae)
        //                 return color(vae*-1)
        //             else
        //                 return "#cccccc"
        
        //         })
        // }

        for(var i = 1998; i < 2021; i += 2)
            attributeArray.push(i);

        var timer;  // create timer object
        d3.select('#play')  
          .on('click', function() {  // when user clicks the play button
            if(playing == false) {  // if the map is currently playing
              timer = setInterval(function(){   // set a JS interval
                if(currentAttribute < attributeArray.length-1) {  
                    currentAttribute +=1;  // increment the current attribute counter
                } else {
                    currentAttribute = 0;  // or reset it to zero
                }
                // sequenceMap();  // update the representation of the map 
                d3.selectAll("path")
                .transition()
                .duration(2000)
                .attr("fill", function(d,j)
                {
                    var vae = geometries[j].properties.years[attributeArray[currentAttribute]].vae;
                    if(vae)
                        return color(vae*-1)
                    else
                        return "#cccccc"
                });
                d3.select('#clock').html("Global Corruption: Year "+attributeArray[currentAttribute]);  // update the clock
              }, 2000);
            
              d3.select(this).html('stop');  // change the button label to stop
              playing = true;   // change the status of the animation
            } else {    // else if is currently playing
              clearInterval(timer);   // stop the animation by clearing the interval
              d3.select(this).html('play');   // change the button label to play
              playing = false;   // change the status again
            }
        });

    });

 


    var zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on('zoom', function(event) {
        svg.selectAll('path')
         .attr('transform', event.transform);
});

svg.call(zoom);

}