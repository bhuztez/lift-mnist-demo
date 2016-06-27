function Trainer(){
function asm_module(stdlib, foreign, heap){
"use asm";
var HEAP = new stdlib.Float32Array(heap);
var offv30=23976;
var offv31=24176;
var offv32=0;
var offv33=8;
var offv37=53728;
var offv38=16;
var offv75=24;
var offv16=26962;
var offv17=3224;
var offv8=53746;
var offv153=53510;
var offv154=3424;
var offv139=48390;
var offv176=32340;
var offv175=24376;
var offv162=3434;
var offv118=24386;
var offv119=3444;
var offv132=24402;
var offv133=6004;
var offv117=27162;
var offv110=41958;
var offv74=35550;
var offv45=32332;
var offv88=38758;
var offv46=8564;
var offv89=32350;
var offv81=41974;
var offv23=53520;
var offv67=8572;
var offv66=45174;
var offv62=11772;
var offv61=14972;
var offv60=27194;
var offv125=18172;
var offv124=50950;
var offv3=20732;
var offv4=20932;
var offv120=21132;
var offv161=27202;
var offv9=23692;
var offv149=23892;
var offv148=23902;
var offv90=23912;
var offv91=23928;
var offv96=23944;
var offv95=48374;
var offv104=23960;
var offv103=27178;
var offv168=53736;
var offv52=53720;
var offv147=27212;
var offv59=38750;
var offv146=29772;

var Infinity = stdlib.Infinity;
var NaN = stdlib.NaN;
var acos = stdlib.Math.acos;
var asin = stdlib.Math.asin;
var atan = stdlib.Math.atan;
var cos = stdlib.Math.cos;
var sin = stdlib.Math.sin;
var tan = stdlib.Math.tan;
var exp = stdlib.Math.exp;
var log = stdlib.Math.log;
var ceil = stdlib.Math.ceil;
var floor = stdlib.Math.floor;
var sqrt = stdlib.Math.sqrt;
var abs = stdlib.Math.abs;
var min = stdlib.Math.min;
var max = stdlib.Math.max;
var atan2 = stdlib.Math.atan2;
var pow = stdlib.Math.pow;
var imul = stdlib.Math.imul;
var fround = stdlib.Math.fround;
var E = stdlib.Math.E;
var LN10 = stdlib.Math.LN10;
var LN2 = stdlib.Math.LN2;
var LOG2E = stdlib.Math.LOG2E;
var LOG10E = stdlib.Math.LOG10E;
var PI = stdlib.Math.PI;
var SQRT1_2 = stdlib.Math.SQRT1_2;
var SQRT2 = stdlib.Math.SQRT2;

function imax(a, b){
  a = a|0;
  b = b|0;
  return (( (a|0) > (b|0) )?a:b)|0;
}

function imin(a, b){
  a = a|0;
  b = b|0;
  return ( ( (a|0) < (b|0) )?a:b)|0;
}

function calc(){


var c1= 0;

for(c1 = 0; (((c1|0)<=(2559|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv124 + c1) << 2 >> 2] = fround((((0.001 * (+HEAP[(offv119 + c1) << 2 >> 2])) + (+HEAP[(offv120 + c1) << 2 >> 2])) / 20.0));
}
for(c1 = 0; (((c1|0)<=(9|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv153 + c1) << 2 >> 2] = fround((((0.001 * (+HEAP[(offv148 + c1) << 2 >> 2])) + (+HEAP[(offv149 + c1) << 2 >> 2])) / 20.0));
}
for(c1 = 0; (((c1|0)<=(9|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv161 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv153 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv154 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(9|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv168 + c1) << 2 >> 2] = fround(((pow((((+HEAP[(offv162 + c1) << 2 >> 2]) + 1.e-06) / ((+HEAP[(offv161 + c1) << 2 >> 2]) + 1.e-06)),0.5)) * (+HEAP[(offv153 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(9|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv175 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv168 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv162 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv8 + c1) << 2 >> 2] = fround((((0.001 * (+HEAP[(offv3 + c1) << 2 >> 2])) + (+HEAP[(offv4 + c1) << 2 >> 2])) / 20.0));
}
for(c1 = 0; (((c1|0)<=(199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv16 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv8 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv9 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv23 + c1) << 2 >> 2] = fround(((pow((((+HEAP[(offv17 + c1) << 2 >> 2]) + 1.e-06) / ((+HEAP[(offv16 + c1) << 2 >> 2]) + 1.e-06)),0.5)) * (+HEAP[(offv8 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv30 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv23 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv17 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(3199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv66 + c1) << 2 >> 2] = fround((((0.001 * (+HEAP[(offv61 + c1) << 2 >> 2])) + (+HEAP[(offv62 + c1) << 2 >> 2])) / 20.0));
}
for(c1 = 0; (((c1|0)<=(3199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv74 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv66 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv67 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(3199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv81 + c1) << 2 >> 2] = fround(((pow((((+HEAP[(offv75 + c1) << 2 >> 2]) + 1.e-06) / ((+HEAP[(offv74 + c1) << 2 >> 2]) + 1.e-06)),0.5)) * (+HEAP[(offv66 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(7|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv37 + c1) << 2 >> 2] = fround((((0.001 * (+HEAP[(offv32 + c1) << 2 >> 2])) + (+HEAP[(offv33 + c1) << 2 >> 2])) / 20.0));
}
for(c1 = 0; (((c1|0)<=(7|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv45 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv37 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv38 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(7|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv52 + c1) << 2 >> 2] = fround(((pow((((+HEAP[(offv46 + c1) << 2 >> 2]) + 1.e-06) / ((+HEAP[(offv45 + c1) << 2 >> 2]) + 1.e-06)),0.5)) * (+HEAP[(offv37 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(15|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv95 + c1) << 2 >> 2] = fround((((0.001 * (+HEAP[(offv90 + c1) << 2 >> 2])) + (+HEAP[(offv91 + c1) << 2 >> 2])) / 20.0));
}
for(c1 = 0; (((c1|0)<=(15|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv103 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv95 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv96 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(15|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv110 + c1) << 2 >> 2] = fround(((pow((((+HEAP[(offv104 + c1) << 2 >> 2]) + 1.e-06) / ((+HEAP[(offv103 + c1) << 2 >> 2]) + 1.e-06)),0.5)) * (+HEAP[(offv95 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(15|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv118 + c1) << 2 >> 2] = fround(((+HEAP[(offv90 + c1) << 2 >> 2]) - (+HEAP[(offv110 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(3199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv89 + c1) << 2 >> 2] = fround(((+HEAP[(offv61 + c1) << 2 >> 2]) - (+HEAP[(offv81 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(15|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv117 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv110 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv104 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(2559|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv132 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv124 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv125 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(2559|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv139 + c1) << 2 >> 2] = fround(((pow((((+HEAP[(offv133 + c1) << 2 >> 2]) + 1.e-06) / ((+HEAP[(offv132 + c1) << 2 >> 2]) + 1.e-06)),0.5)) * (+HEAP[(offv124 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(2559|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv147 + c1) << 2 >> 2] = fround(((+HEAP[(offv119 + c1) << 2 >> 2]) - (+HEAP[(offv139 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv31 + c1) << 2 >> 2] = fround(((+HEAP[(offv3 + c1) << 2 >> 2]) - (+HEAP[(offv23 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(7|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv59 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv52 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv46 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(2559|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv146 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv139 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv133 + c1) << 2 >> 2]))));
}
for(c1 = 0; (((c1|0)<=(7|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv60 + c1) << 2 >> 2] = fround(((+HEAP[(offv32 + c1) << 2 >> 2]) - (+HEAP[(offv52 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(9|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv176 + c1) << 2 >> 2] = fround(((+HEAP[(offv148 + c1) << 2 >> 2]) - (+HEAP[(offv168 + c1) << 2 >> 2])));
}
for(c1 = 0; (((c1|0)<=(3199|0))|0); c1 = (c1 + 1)|0){
HEAP[(offv88 + c1) << 2 >> 2] = fround(((0.050000000000000044 * (pow((+HEAP[(offv81 + c1) << 2 >> 2]),2.0))) + (0.95 * (+HEAP[(offv75 + c1) << 2 >> 2]))));
}

}

return {calc:calc};
}

var buffer = new ArrayBuffer(262144);
var mod = asm_module(window, null, buffer);


var arrays = {
dB: new Float32Array(buffer,95568,10),
nB: new Float32Array(buffer,129360,10),
Ws1: new Float32Array(buffer,119088,2560),
K2: new Float32Array(buffer,59888,3200),
K1: new Float32Array(buffer,82928,200),
dK2: new Float32Array(buffer,47088,3200),
nW: new Float32Array(buffer,108848,2560),
nK1: new Float32Array(buffer,96704,200),
nB2: new Float32Array(buffer,97544,16),
nB1: new Float32Array(buffer,108776,8),
K2s1: new Float32Array(buffer,155032,3200),
B1g0: new Float32Array(buffer,64,8),
B1s0: new Float32Array(buffer,34256,8),
B1s1: new Float32Array(buffer,155000,8),
K1s1: new Float32Array(buffer,95904,200),
K1s0: new Float32Array(buffer,12896,200),
B: new Float32Array(buffer,95608,10),
B2g1: new Float32Array(buffer,108712,16),
B2g0: new Float32Array(buffer,95776,16),
dK1: new Float32Array(buffer,83728,200),
dB1: new Float32Array(buffer,32,8),
Wg1: new Float32Array(buffer,97608,2560),
Wg0: new Float32Array(buffer,72688,2560),
W: new Float32Array(buffer,13776,2560),
B2s0: new Float32Array(buffer,95840,16),
Bg0: new Float32Array(buffer,13696,10),
Bg1: new Float32Array(buffer,108808,10),
Bs0: new Float32Array(buffer,13736,10),
Bs1: new Float32Array(buffer,97504,10),
K2g0: new Float32Array(buffer,34288,3200),
K2g1: new Float32Array(buffer,142200,3200),
K1g1: new Float32Array(buffer,107848,200),
K1g0: new Float32Array(buffer,94768,200),
nK2: new Float32Array(buffer,129400,3200),
B1g1: new Float32Array(buffer,129328,8),
Ws0: new Float32Array(buffer,24016,2560),
B1: new Float32Array(buffer,0,8),
B2: new Float32Array(buffer,95648,16),
B2s1: new Float32Array(buffer,108648,16),
dW: new Float32Array(buffer,84528,2560),
dB2: new Float32Array(buffer,95712,16),
K2s0: new Float32Array(buffer,96,3200),

};

return {arrays: arrays, calc: mod.calc};
}

