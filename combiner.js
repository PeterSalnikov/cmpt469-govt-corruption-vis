arrayList = [], obj_c_processed = [];

const wgi= require('./sample.json'); 
// console.log(wgi);

const world = require('./world-copy.json');
console.log(world.objects.countries.geometries[0].properties)

var countries = world.objects.countries.geometries;

var len = world.objects.countries.geometries.length;
console.log(len)

// console.log(countries[242].properties)

var test = JSON.parse(countries)

var i;
for(i = 0; i < len; i++)
{
    test[i]["properties"].push({"year": "1996"});
    console.log(test[i].properties)
}

// for (var i in wgi) {
//     var obj = {id: wgi[i].id, name: wgi[i].name, goal: wgi[i].goal};

//     for (var j in world) {
//         if (g[i].id == world[j].id) {
//             obj.circle = world[j].circle;
//             obj_c_processed[world[j].id] = true;
//         }
//     }

//     obj.circle = obj.circle || 'no';
//     arrayList.push(obj);
// }

// for (var j in c){
//     if (typeof obj_c_processed[c[j].id] == 'undefined') {
//         arrayList.push({id: c[j].id, name: c[j].name, goal: 'no', circle: c[j].circle});
//     }
// }
