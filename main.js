function main() 
{

    let labels = ["Voice and Accountability", "Political Stability", "Government Effectiveness", "Regulatory Quality", "Rule of Law", "Corruption Control"]
    let labelsAcr = ["vae","pve","gee","rqe","rle","cce"]
    var margin = { top: 50, left: 50, right: 50, bottom: 50},
        height = 700,
        width = 1250 - margin.left - margin.right;

        // var svg = d3.select("#map")
        // var svg = d3.select("#map")
        var svg = d3.select("body").append("svg")
        // .append("svg")
        // .attr("height", height + margin.top + margin. bottom) 
        .attr("height", height)
        .attr("id","map")
        // .attr("z-index",2)
        let curYear = 1998;
        // .attr("width", width + margin. left + margin. right)
        // let radar = d3.select("#radar")

        let radarOn = 0

        let curParam = "vae";
        let selected;
        // .append("g")
        // .attr("transform", "translate(" + margin. left + "," + margin.top + ")");
        var playing = false;
        var currentAttribute = 0;
        var attributeArray = [];

        var projection = d3.geoMercator()
        .translate([width/2 +90,height/2 + 90])
        .center([0, 0])
        .scale(200)
        .rotate([-12,0])
        // .rotate([-180,0]);


        var path = d3.geoPath()
        .projection(projection)

    var color = d3.scaleThreshold()
    // .domain(d3.range(-2.5, 2.5))
    .domain(d3.range(-5,5))

    .range(d3.schemeBlues[9])
    // .range(d3.schemeReds[5])

    function radar(i, curYear, svg)
    {
        // i is the root from which you can get the object's properties
        d3.select("#radar").remove()

        svg.selectAll("path")
        .attr("stroke",function(d)
        {
            if(d == i)
            {
                return "red";
            }
        })
        .attr("stroke-width",function(d)
        {
            if(d == i)
                return "1px";
        })

            let radar = d3.select("body").append("svg")
            .attr("width",500)
            .attr("height",550)
            .attr("id","radar")
            .attr("background-color","white")
            
            var centerX = 250;
            var centerY = 300;

            radar.append("rect")
            .attr("fill","white")
            .attr("opacity","90%")
            .attr("rx","10px")
            .attr("ry","10px")
            .attr("width",500)
            .attr("height",550)

            radar.append("rect")
            .attr("fill","steelblue")
            .attr("rx","10px")
            .attr("ry","10px")
            .attr("width","480")
            .attr("height","40")
            .attr("x","10")
            .attr("y","500")
            .on("mouseover",function()
            {
                d3.select(this).attr("opacity","50%")
            })
            .on("mouseout",function()
            {
                d3.select(this).transition().duration(500).attr("opacity","100%")
            })
            .on("click",function()
            {
                radarOn = 0
                d3.selectAll("path")
                .attr("stroke","black")
                .attr("stroke-width","0.1px")
                d3.selectAll("#radar").remove()
            })
            
            radar.append("text")
            .attr("fill","white")
            .attr("x", centerX - 12)
            .attr("y", 525)
            .attr("font-size","1em")
            .text("Close")
            .attr("pointer-events","none")

            // d3.selectAll("line").remove()
            // d3.selectAll("text").remove()
            // radar.selectAll("path").remove()
            function angleToCoordinate(angle, value){
                let x = Math.cos(angle) * radialScale(value);
                let y = Math.sin(angle) * radialScale(value);
                return {"x": centerX + x, "y": centerY - y};
            }
            
            // d3.select("#radar").attr("z-index","10")
            // .classed("radar-clicked",true)
            // .attr("width", 600)
            // .attr("height", 300)
        // .attr("y","750px")
        let radialScale = d3.scaleLinear()
        .domain([0,10])
        .range([0,250]);
        let ticks = [2,4,6,8,10];
        let scale = [-2.5,-1.25,0,1.25,2.5]
    
        scale.forEach(t =>
            radar.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("fill", "none")
            .attr("stroke", function()
                {
                    if (t == 0)
                        return "red";
                        else
                        return "black"
                }
            )
            .attr("r", radialScale((t+2.5)*1.25))
        );
    
        scale.forEach((t,j) =>
            radar.append("text")
            .attr("x", centerX+5)
            .attr("y", centerY - radialScale((t+2.5)*1.25))
            // .text(i.toString())
            .text(function()
            {
                return scale[j];
            })
        );
        for (var j = 0; j < 6; j++) {
            let ft_name = labelsAcr[j]
            let angle = (Math.PI / 2) + (2 * Math.PI * j / 6);
            let line_coordinate = angleToCoordinate(angle, 7);
            let label_coordinate = angleToCoordinate(angle, 7.5);
        
            //draw axis line
            radar.append("line")
            .attr("x1", centerX)
            .attr("y1", centerY)
            .attr("x2", line_coordinate.x)
            .attr("y2", line_coordinate.y)
            .attr("stroke","black");
        
            //draw axis label
            radar.append("text")
            .attr("x", label_coordinate.x)
            .attr("y", label_coordinate.y)
            .attr("text-align","center")
            .text(ft_name);
        }
    // var num = 61
    // console.log(i)
        radar.append("text")
        .attr("x",10)
        .attr("y","50")
        .attr("font-size","2em")
        .text(i.properties.name)
    
        let line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
    
        let coordinates = [];
        for (var j = 0; j < 6; j++){
    
            let angle = (Math.PI / 2) + (2 * Math.PI * j / 6);
            coordinates.push(angleToCoordinate(angle, (i.properties.years[curYear][labelsAcr[j]]+2.5)*1.25));
        }
    
        radar.append("path")
        .datum(coordinates)
        .attr("d",line)
        .attr("stroke-width", 3)
        .attr("stroke", color)
        .attr("fill", "aqua")
        .attr("stroke-opacity", 1)
        .attr("opacity", 0.5);
    }

var data = d3.json('sample.json')

data.then(function(data)
{

    var geometries = data.objects.countries.geometries

    // console.log(topojson.feature(geometries, geometries.id).features)
    // console.log(geometries[0].properties.vae)
    // console.log(geometries)
    // console.log(data)
    // var num = toString(1996)
    // console.log(geometries[2].properties.name)
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
            var selector = geometries[i].properties.years[1998];
            var chosen = selector.vae;
            // console.log(vae)
            if(chosen) {
                var cur = color(chosen*-2)
                // avg += cur
                // console.log(avg)
                return cur
            }
            else
                return "#cccccc"

        })
        .attr("d", path)
        



        d3.selectAll("path")
        .attr("stroke","black")
        .attr("stroke-width","0.1px")
        .on('mouseover',function(d,i)
        {
            // console.log(i.properties.years[attributeArray[currentAttribute]])
            var info = i.properties.years[attributeArray[currentAttribute]][curParam]
            d3.select(this)
            .transition()
            .duration(300)
            .attr("opacity", "50%");

            var text = d3.select("#label")
            .append("g")
            .attr("font-size", "24px")
            .text(this.id+": "+info)  
            // .text(this.id)          
            
        })
        .on('mouseout',function(i)
        {
            d3.select(this)
            .transition()
            .duration(500)
            .attr("opacity","100%")

            d3.select("#label")
            .text("")

        })
        .on('click',function(d,i)
        {
            // console.log(i)
            radarOn = 1
            selected = i
            radar(i, curYear, svg)
        })

        function newParam(param)
        {
            d3.selectAll("path")
                .transition()
                .duration(2000)
                .attr("fill", function(d,j)
                {

                    var selected = geometries[j].properties.years[1998][param];
                    
                    if(selected)
                        return color(selected*-2)
                    else
                        return "#cccccc"
                });

                currentAttribute = 0;
        }

        function changeParamText(cur)
        {
            d3.select("#param").html(cur)

        }

        d3.select("#vae")
        .on("click", function()
        {
            curParam = "vae"
            newParam(curParam)
            d3.select(this)
            changeParamText("Voice & Accountability")
        })
        

        d3.select("#pve")
        .on("click", function()
        {
            // console.log("this is working")
            // currentAttribute = -1;
            curParam = "pve"
            newParam(curParam)
            changeParamText("Political Stability")
        })

        d3.select("#gee")
        .on("click", function()
        {
            // console.log("this is working")
            curParam = "gee"
            newParam(curParam)
            changeParamText("Government Effectiveness")
        })

        d3.select("#rqe")
        .on("click", function()
        {
            curParam = "rqe"
            newParam(curParam)
            changeParamText("Regulatory Quality")
        })

        d3.select("#rle")
        .on("click", function()
        {
            curParam = "rle"
            newParam(curParam)
            changeParamText("Rule of Law")
        })
        d3.select("#cce")
        .on("click", function()
        {
            curParam = "cce"
            newParam(curParam)
            changeParamText("Corruption Control")
        })
        for(var i = 1998; i < 2021; i += 2)
            attributeArray.push(i);

        var timer;  // create timer object
        d3.select('#play')  
          .on('click', function() {  // when user clicks the play button
            d3.select('#clock').html("Global Corruption: "+attributeArray[currentAttribute]);  // update the clock
            d3.select("#size").attr("value", +attributeArray[currentAttribute])
            d3.select("#size").attr("value",attributeArray[currentAttribute])

            if(playing == false) {  // if the map is currently playing
              timer = setInterval(function(){   // set a JS interval
                if(currentAttribute < attributeArray.length-1) {  
                    currentAttribute +=1;
                    curYear = attributeArray[currentAttribute]  // increment the current attribute counter
                } else {
                    currentAttribute = 0;  // or reset it to zero
                    curYear = attributeArray[currentAttribute]
                }
                // sequenceMap();  // update the representation of the map 

                if(radarOn == 1)
                    radar(selected,curYear, svg)

                svg.selectAll("path")
                .transition()
                .duration(2000)
                .attr("fill", function(d,j)
                {
                    // var vae = geometries[j].properties.years[attributeArray[currentAttribute]][curParam];
                    var vae = geometries[j].properties.years[attributeArray[currentAttribute]][curParam];

                    if(vae) 
                    {
                        return color(vae*-2)
                    }
                    else
                        return "#cccccc"
                });


                d3.select('#clock').html("Global Corruption: "+attributeArray[currentAttribute]);  // update the clock
                d3.select("#size").attr("value",attributeArray[currentAttribute])
            }, 2000);
                d3.select("#size").attr("value",attributeArray[currentAttribute])
            
              d3.select(this).html('Stop');  // change the button label to stop
              playing = true;   // change the status of the animation
            } 
            
            // else if (currentAttribute != 1998) //not really working rn
            // {
            //     clearInterval(timer);
            //     d3.select(this).html('Reset');
            //     currentAttribute = 1998;
            //     // playing = false;
            // }

            else {    // else if is currently playing
              clearInterval(timer);   // stop the animation by clearing the interval
              d3.select(this).html('Play');   // change the button label to play
            //   currentAttribute = 0;
              d3.select("#size").attr("value",attributeArray[currentAttribute])

              playing = false;   // change the status again
            }
        });

        d3.select("#size").on("input", function() {
            // console.log(this.value)
            curYear = +this.value;
            // d3.select('#year').text(curYear);
            
            d3.select('#clock').html("Global Corruption: "+curYear);  // update the clock
              
            // svg.selectAll("path").each(function(d) { 
            svg.selectAll("path")
            .transition()
            .duration(200)
            .attr("fill", function(d,j)
            {
                // var vae = geometries[j].properties.years[attributeArray[currentAttribute]][curParam];
                var vae = geometries[j].properties.years[curYear][curParam];

                if(vae) 
                {
                    return color(vae*-2)
                }
                else
                    return "#cccccc"
            });
            if(radarOn == 1)
                radar(selected,curYear, svg)


                // this.style.opacity = d.FIRE_SIZE > goal ? 1 : 0; 
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