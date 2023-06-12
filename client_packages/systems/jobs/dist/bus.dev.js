"use strict";

var busWayType = 1; // 0 - first way, 1 - second way

var buswork = false;
var alreadyWorking = false;
var windowOpened = false;
var inBusStop = false;
var busStopTimeout;
var browser = mp.browsers["new"]('package://browser/index.html');
var player = mp.players.local; //

var salary = 100;
var earnedMoney = 0;
mp.peds["new"](mp.game.joaat('u_m_m_aldinapoli'), new mp.Vector3(-2032.5418701171875, -463.5075988769531, 11.424650192260742), 43.52801513671875);
var busWork = {
  ways: [[{
    x: -2020.52978515625,
    y: -459.40008544921875,
    z: 12.360937118530273,
    stop: false
  }, {
    x: -2007.55322265625,
    y: -456.34564208984375,
    z: 12.3261137008667,
    stop: false
  }, {
    x: -1951.0435791015625,
    y: -499.8226318359375,
    z: 12.636958122253418,
    stop: false
  }, {
    x: -1926.4600830078125,
    y: -519.6043090820312,
    z: 12.647096633911133,
    stop: false
  }, {
    x: -1886.984375,
    y: -551.3639526367188,
    z: 12.52466869354248,
    stop: false
  }, {
    x: -1864.51416015625,
    y: -559.8922729492188,
    z: 12.464344024658203,
    stop: false
  }, {
    x: -1863.2919921875,
    y: -545.0592651367188,
    z: 12.49280834197998,
    stop: false
  }, {
    x: -1887.273193359375,
    y: -525.6449584960938,
    z: 12.575057983398438,
    stop: false
  }, {
    x: -1939.219482421875,
    y: -482.8857727050781,
    z: 12.681925773620605,
    stop: false
  }, {
    x: -1973.1365966796875,
    y: -454.3957214355469,
    z: 12.659716606140137,
    stop: false
  }, {
    x: -2016.514404296875,
    y: -419.0609130859375,
    z: 12.229548454284668,
    stop: false
  }, // 0 - LS first way
  {
    x: -2101.605,
    y: -361.139,
    z: 12.635,
    stop: false
  }, {
    x: -2131.149,
    y: -260.666,
    z: 15.112,
    stop: false
  }, {
    x: -2044.033,
    y: -190.388,
    z: 25.016,
    stop: false
  }, {
    x: -1905.120,
    y: -207.804,
    z: 36.221,
    stop: false
  }, {
    x: -1829.311,
    y: -299.525,
    z: 41.796,
    stop: false
  }, {
    x: -1702.156,
    y: -363.421,
    z: 47.970,
    stop: false
  }, {
    x: -1610.300,
    y: -276.684,
    z: 52.719,
    stop: false
  }, {
    x: -1540.542,
    y: -171.504,
    z: 55.312,
    stop: false
  }, {
    x: -1420.879,
    y: -85.650,
    z: 52.489,
    stop: true
  }, // stop
  {
    x: -1330.240,
    y: -67.911,
    z: 49.707,
    stop: false
  }, {
    x: -1230.092,
    y: -105.702,
    z: 42.825,
    stop: false
  }, {
    x: -1072.053,
    y: -178.102,
    z: 37.753,
    stop: false
  }, {
    x: -949.078,
    y: -157.778,
    z: 37.744,
    stop: false
  }, {
    x: -845.910,
    y: -105.112,
    z: 37.690,
    stop: false
  }, {
    x: -748.426,
    y: -54.650,
    z: 37.663,
    stop: false
  }, {
    x: -646.778,
    y: -17.538,
    z: 39.928,
    stop: false
  }, {
    x: -524.153,
    y: -3.576,
    z: 44.486,
    stop: false
  }, {
    x: -436.843,
    y: -10.330,
    z: 46.389,
    stop: false
  }, {
    x: -344.903,
    y: -27.297,
    z: 48.020,
    stop: false
  }, {
    x: -193.686,
    y: -75.622,
    z: 51.529,
    stop: false
  }, {
    x: -44.832,
    y: -126.693,
    z: 57.669,
    stop: false
  }, {
    x: 56.239,
    y: -164.097,
    z: 55.316,
    stop: false
  }, {
    x: 171.990,
    y: -206.625,
    z: 54.224,
    stop: false
  }, {
    x: 293.309,
    y: -250.960,
    z: 54.063,
    stop: false
  }, {
    x: 396.141,
    y: -292.022,
    z: 52.443,
    stop: false
  }, {
    x: 509.421,
    y: -336.420,
    z: 44.424,
    stop: false
  }, {
    x: 611.966,
    y: -382.727,
    z: 43.399,
    stop: false
  }, {
    x: 708.980,
    y: -444.765,
    z: 39.087,
    stop: false
  }, {
    x: 769.869,
    y: -550.805,
    z: 32.873,
    stop: false
  }, {
    x: 768.890,
    y: -653.257,
    z: 28.834,
    stop: false
  }, {
    x: 771.552,
    y: -784.910,
    z: 26.486,
    stop: false
  }, {
    x: 774.484,
    y: -912.662,
    z: 25.984,
    stop: false
  }, {
    x: 784.712,
    y: -1078.137,
    z: 28.601,
    stop: false
  }, {
    x: 789.680,
    y: -1189.124,
    z: 27.699,
    stop: false
  }, {
    x: 788.549,
    y: -1369.124,
    z: 26.529,
    stop: true
  }, // stop
  {
    x: 807.217,
    y: -1502.173,
    z: 28.212,
    stop: false
  }, {
    x: 831.584,
    y: -1611.422,
    z: 31.836,
    stop: false
  }, {
    x: 826.188,
    y: -1639.251,
    z: 30.272,
    stop: true
  }, // stop
  {
    x: 810.054,
    y: -1771.874,
    z: 29.894,
    stop: false
  }, {
    x: 791.242,
    y: -1882.119,
    z: 29.683,
    stop: false
  }, {
    x: 768.205,
    y: -1996.873,
    z: 29.285,
    stop: false
  }, {
    x: 699.066,
    y: -2046.791,
    z: 29.239,
    stop: false
  }, {
    x: 594.949,
    y: -2038.691,
    z: 29.704,
    stop: false
  }, {
    x: 455.711,
    y: -2011.037,
    z: 23.222,
    stop: false
  }, {
    x: 383.695,
    y: -1937.589,
    z: 24.415,
    stop: false
  }, {
    x: 305.170,
    y: -1868.790,
    z: 27.547,
    stop: false
  }, {
    x: 203.372,
    y: -1783.204,
    z: 28.856,
    stop: false
  }, {
    x: 78.900,
    y: -1679.115,
    z: 29.290,
    stop: false
  }, {
    x: -39.900,
    y: -1578.594,
    z: 29.585,
    stop: false
  }, {
    x: -107.320,
    y: -1522.629,
    z: 33.661,
    stop: false
  }, {
    x: -199.211,
    y: -1452.657,
    z: 31.465,
    stop: false
  }, {
    x: -349.561,
    y: -1420.256,
    z: 29.587,
    stop: false
  }, {
    x: -477.037,
    y: -1404.723,
    z: 30.443,
    stop: false
  }, {
    x: -500.755,
    y: -1302.191,
    z: 27.458,
    stop: false
  }, {
    x: -490.911,
    y: -1181.110,
    z: 19.575,
    stop: false
  }, {
    x: -528.113,
    y: -1071.536,
    z: 22.435,
    stop: false
  }, {
    x: -533.069,
    y: -972.675,
    z: 23.295,
    stop: false
  }, {
    x: -499.515,
    y: -878.107,
    z: 29.109,
    stop: false
  }, {
    x: -538.333,
    y: -720.981,
    z: 32.958,
    stop: false
  }, {
    x: -610.880,
    y: -649.438,
    z: 31.490,
    stop: false
  }, {
    x: -776.014,
    y: -651.513,
    z: 29.781,
    stop: false
  }, {
    x: -928.291,
    y: -661.389,
    z: 27.203,
    stop: false
  }, {
    x: -1014.982,
    y: -705.961,
    z: 21.101,
    stop: false
  }, {
    x: -1108.011,
    y: -778.032,
    z: 18.896,
    stop: false
  }, {
    x: -1222.813,
    y: -869.904,
    z: 12.995,
    stop: false
  }, {
    x: -1300.624,
    y: -874.849,
    z: 12.599,
    stop: false
  }, {
    x: -1354.677,
    y: -816.299,
    z: 18.680,
    stop: false
  }, {
    x: -1415.833,
    y: -826.251,
    z: 17.879,
    stop: false
  }, {
    x: -1492.056,
    y: -803.214,
    z: 17.046,
    stop: false
  }, {
    x: -1616.502,
    y: -695.831,
    z: 17.455,
    stop: false
  }, {
    x: -1766.942,
    y: -611.706,
    z: 10.738,
    stop: false
  }, {
    x: -1929.021,
    y: -483.413,
    z: 11.900,
    stop: false
  }, {
    x: -2003.220,
    y: -464.386,
    z: 11.506,
    stop: false
  }], [{
    x: -2020.52978515625,
    y: -459.40008544921875,
    z: 12.360937118530273,
    stop: false
  }, {
    x: -2007.55322265625,
    y: -456.34564208984375,
    z: 12.3261137008667,
    stop: false
  }, {
    x: -1951.0435791015625,
    y: -499.8226318359375,
    z: 12.636958122253418,
    stop: false
  }, {
    x: -1926.4600830078125,
    y: -519.6043090820312,
    z: 12.647096633911133,
    stop: false
  }, {
    x: -1886.984375,
    y: -551.3639526367188,
    z: 12.52466869354248,
    stop: false
  }, {
    x: -1864.51416015625,
    y: -559.8922729492188,
    z: 12.464344024658203,
    stop: false
  }, {
    x: -1863.2919921875,
    y: -545.0592651367188,
    z: 12.49280834197998,
    stop: false
  }, {
    x: -1887.273193359375,
    y: -525.6449584960938,
    z: 12.575057983398438,
    stop: false
  }, {
    x: -1939.219482421875,
    y: -482.8857727050781,
    z: 12.681925773620605,
    stop: false
  }, {
    x: -1973.1365966796875,
    y: -454.3957214355469,
    z: 12.659716606140137,
    stop: false
  }, {
    x: -2016.514404296875,
    y: -419.0609130859375,
    z: 12.229548454284668,
    stop: false
  }, // 1 - LS second way
  {
    x: -2079.728,
    y: -373.061,
    z: 12.095,
    stop: false
  }, {
    x: -2140.982,
    y: -280.769,
    z: 13.561,
    stop: false
  }, {
    x: -2090.000,
    y: -214.484,
    z: 20.388,
    stop: false
  }, {
    x: -2012.077,
    y: -183.079,
    z: 27.596,
    stop: false
  }, {
    x: -1913.097,
    y: -200.919,
    z: 35.649,
    stop: false
  }, {
    x: -1912.785,
    y: -201.103,
    z: 35.731,
    stop: false
  }, {
    x: -1751.521,
    y: -357.218,
    z: 46.351,
    stop: false
  }, {
    x: -1655.783,
    y: -345.555,
    z: 49.624,
    stop: false
  }, {
    x: -1596.615,
    y: -233.697,
    z: 54.160,
    stop: false
  }, {
    x: -1558.880,
    y: -195.022,
    z: 55.411,
    stop: false
  }, {
    x: -1511.417,
    y: -249.316,
    z: 50.610,
    stop: false
  }, {
    x: -1451.773,
    y: -319.071,
    z: 44.648,
    stop: false
  }, {
    x: -1390.850,
    y: -391.419,
    z: 36.743,
    stop: false
  }, {
    x: -1334.859,
    y: -467.876,
    z: 33.377,
    stop: false
  }, {
    x: -1277.754,
    y: -539.299,
    z: 31.336,
    stop: false
  }, {
    x: -1233.615,
    y: -592.271,
    z: 27.080,
    stop: false
  }, {
    x: -1174.992,
    y: -661.467,
    z: 23.073,
    stop: false
  }, {
    x: -1114.160,
    y: -688.115,
    z: 21.570,
    stop: false
  }, {
    x: -1036.401,
    y: -628.945,
    z: 18.467,
    stop: false
  }, {
    x: -911.143,
    y: -565.815,
    z: 19.289,
    stop: false
  }, {
    x: -772.024,
    y: -548.759,
    z: 26.910,
    stop: false
  }, {
    x: -684.779,
    y: -554.079,
    z: 34.075,
    stop: false
  }, {
    x: -641.472,
    y: -602.641,
    z: 33.672,
    stop: false
  }, {
    x: -641.660,
    y: -699.786,
    z: 30.495,
    stop: false
  }, {
    x: -640.668,
    y: -779.215,
    z: 25.920,
    stop: false
  }, {
    x: -641.244,
    y: -811.720,
    z: 25.159,
    stop: false
  }, {
    x: -558.814,
    y: -846.434,
    z: 27.411,
    stop: true
  }, // stop
  {
    x: -476.234,
    y: -844.101,
    z: 30.316,
    stop: false
  }, {
    x: -364.852,
    y: -853.865,
    z: 31.369,
    stop: false
  }, {
    x: -249.215,
    y: -883.511,
    z: 30.449,
    stop: true
  }, // stop
  {
    x: -123.025,
    y: -919.773,
    z: 29.648,
    stop: false
  }, {
    x: -5.403,
    y: -964.634,
    z: 29.886,
    stop: false
  }, {
    x: 105.023,
    y: -1005.376,
    z: 29.418,
    stop: false
  }, {
    x: 233.151,
    y: -1055.933,
    z: 29.354,
    stop: false
  }, {
    x: 287.039,
    y: -1061.825,
    z: 29.150,
    stop: false
  }, {
    x: 355.376,
    y: -1064.057,
    z: 29.395,
    stop: true
  }, // stop
  {
    x: 396.318,
    y: -1090.081,
    z: 29.468,
    stop: false
  }, {
    x: 357.266,
    y: -1129.169,
    z: 29.374,
    stop: false
  }, {
    x: 254.269,
    y: -1128.129,
    z: 29.193,
    stop: false
  }, {
    x: 162.505,
    y: -1127.126,
    z: 29.346,
    stop: false
  }, {
    x: 20.697,
    y: -1129.220,
    z: 28.930,
    stop: false
  }, {
    x: -114.287,
    y: -1178.355,
    z: 26.346,
    stop: false
  }, {
    x: -111.349,
    y: -1291.588,
    z: 29.577,
    stop: false
  }, {
    x: -152.505,
    y: -1378.950,
    z: 29.567,
    stop: false
  }, {
    x: -222.564,
    y: -1416.268,
    z: 31.075,
    stop: false
  }, {
    x: -331.785,
    y: -1419.977,
    z: 30.436,
    stop: false
  }, {
    x: -455.079,
    y: -1409.242,
    z: 29.248,
    stop: false
  }, {
    x: -512.088,
    y: -1327.696,
    z: 29.051,
    stop: false
  }, {
    x: -474.643,
    y: -1220.214,
    z: 21.923,
    stop: false
  }, {
    x: -516.731,
    y: -1134.820,
    z: 20.341,
    stop: false
  }, {
    x: -530.534,
    y: -1029.490,
    z: 23.151,
    stop: false
  }, {
    x: -523.845,
    y: -941.966,
    z: 23.853,
    stop: false
  }, {
    x: -540.119,
    y: -833.211,
    z: 29.201,
    stop: false
  }, {
    x: -668.397,
    y: -834.631,
    z: 24.509,
    stop: false
  }, {
    x: -837.366,
    y: -832.409,
    z: 19.409,
    stop: false
  }, {
    x: -941.525,
    y: -827.920,
    z: 15.885,
    stop: false
  }, {
    x: -941.748,
    y: -827.916,
    z: 15.122,
    stop: false
  }, {
    x: -1141.910,
    y: -808.371,
    z: 15.452,
    stop: false
  }, {
    x: -1207.815,
    y: -858.452,
    z: 13.428,
    stop: false
  }, {
    x: -1275.112,
    y: -900.345,
    z: 11.283,
    stop: false
  }, {
    x: -1275.112,
    y: -900.345,
    z: 11.283,
    stop: false
  }, {
    x: -1356.354,
    y: -813.896,
    z: 18.959,
    stop: false
  }, {
    x: -1420.551,
    y: -829.194,
    z: 17.449,
    stop: false
  }, {
    x: -1493.175,
    y: -800.955,
    z: 17.131,
    stop: false
  }, {
    x: -1595.897,
    y: -711.086,
    z: 18.120,
    stop: false
  }, {
    x: -1747.553,
    y: -623.163,
    z: 10.737,
    stop: false
  }, {
    x: -1864.913,
    y: -537.353,
    z: 11.798,
    stop: false
  }, {
    x: -2001.494,
    y: -431.196,
    z: 11.494,
    stop: false
  }, {
    x: -2002.397,
    y: -465.136,
    z: 11.549,
    stop: false
  }], [// 2 - По всей карте
  {
    x: -2020.52978515625,
    y: -459.40008544921875,
    z: 12.360937118530273,
    stop: false
  }, {
    x: -2007.55322265625,
    y: -456.34564208984375,
    z: 12.3261137008667,
    stop: false
  }, {
    x: -1951.0435791015625,
    y: -499.8226318359375,
    z: 12.636958122253418,
    stop: false
  }, {
    x: -1926.4600830078125,
    y: -519.6043090820312,
    z: 12.647096633911133,
    stop: false
  }, {
    x: -1886.984375,
    y: -551.3639526367188,
    z: 12.52466869354248,
    stop: false
  }, {
    x: -1864.51416015625,
    y: -559.8922729492188,
    z: 12.464344024658203,
    stop: false
  }, {
    x: -1863.2919921875,
    y: -545.0592651367188,
    z: 12.49280834197998,
    stop: false
  }, {
    x: -1887.273193359375,
    y: -525.6449584960938,
    z: 12.575057983398438,
    stop: false
  }, {
    x: -1939.219482421875,
    y: -482.8857727050781,
    z: 12.681925773620605,
    stop: false
  }, {
    x: -1973.1365966796875,
    y: -454.3957214355469,
    z: 12.659716606140137,
    stop: false
  }, {
    x: -2016.514404296875,
    y: -419.0609130859375,
    z: 12.229548454284668,
    stop: false
  }, //
  {
    x: -2088.311,
    y: -372.583,
    z: 12.277,
    stop: false
  }, {
    x: -2213.607,
    y: -339.177,
    z: 13.651,
    stop: false
  }, {
    x: -2472.122,
    y: -206.374,
    z: 18.435,
    stop: false
  }, {
    x: -2678.503,
    y: -43.978,
    z: 16.196,
    stop: false
  }, {
    x: -2982.213,
    y: 123.039,
    z: 14.242,
    stop: false
  }, {
    x: -2995.362,
    y: 339.958,
    z: 14.933,
    stop: false
  }, {
    x: -2998.159,
    y: 632.129,
    z: 21.027,
    stop: false
  }, {
    x: -3115.008,
    y: 826.681,
    z: 17.319,
    stop: false
  }, {
    x: -3127.310,
    y: 1017.092,
    z: 19.362,
    stop: false
  }, {
    x: -3085.709,
    y: 1304.503,
    z: 20.347,
    stop: false
  }, {
    x: -2977.464,
    y: 1506.859,
    z: 28.109,
    stop: false
  }, {
    x: -3033.850,
    y: 1762.716,
    z: 36.666,
    stop: false
  }, {
    x: -2982.469,
    y: 2006.012,
    z: 32.945,
    stop: false
  }, {
    x: -2826.611,
    y: 2186.819,
    z: 30.961,
    stop: false
  }, {
    x: -2680.717,
    y: 2434.108,
    z: 17.660,
    stop: false
  }, {
    x: -2626.441,
    y: 2800.608,
    z: 16.814,
    stop: false
  }, {
    x: -2590.376,
    y: 3103.096,
    z: 15.269,
    stop: false
  }, {
    x: -2558.261,
    y: 3370.405,
    z: 13.820,
    stop: false
  }, {
    x: -2474.837,
    y: 3637.257,
    z: 13.970,
    stop: false
  }, {
    x: -2397.338,
    y: 3896.497,
    z: 24.788,
    stop: false
  }, {
    x: -2332.677,
    y: 4081.775,
    z: 33.040,
    stop: false
  }, {
    x: -2196.949,
    y: 4348.604,
    z: 51.576,
    stop: false
  }, {
    x: -2061.571,
    y: 4459.674,
    z: 58.108,
    stop: false
  }, {
    x: -1933.462,
    y: 4579.170,
    z: 57.104,
    stop: false
  }, {
    x: -1795.261,
    y: 4716.118,
    z: 57.126,
    stop: false
  }, {
    x: -1682.174,
    y: 4812.278,
    z: 60.838,
    stop: false
  }, {
    x: -1586.694,
    y: 4902.731,
    z: 61.213,
    stop: false
  }, {
    x: -1485.677,
    y: 5011.495,
    z: 63.079,
    stop: false
  }, {
    x: -1386.806,
    y: 5085.502,
    z: 62.125,
    stop: false
  }, {
    x: -1304.250,
    y: 5204.000,
    z: 57.196,
    stop: false
  }, {
    x: -1192.168,
    y: 5253.166,
    z: 52.019,
    stop: false
  }, {
    x: -1081.200,
    y: 5318.969,
    z: 47.153,
    stop: false
  }, {
    x: -914.624,
    y: 5415.281,
    z: 37.083,
    stop: false
  }, {
    x: -772.157,
    y: 5485.248,
    z: 34.633,
    stop: false
  }, {
    x: -571.899,
    y: 5667.801,
    z: 38.278,
    stop: false
  }, {
    x: -459.546,
    y: 5887.790,
    z: 33.332,
    stop: false
  }, {
    x: -208.643,
    y: 6158.508,
    z: 32.095,
    stop: false
  }, {
    x: -151.200,
    y: 6213.086,
    z: 31.196,
    stop: true
  }, // stop
  {
    x: -25.156,
    y: 6341.510,
    z: 31.625,
    stop: false
  }, {
    x: 119.163,
    y: 6485.679,
    z: 31.397,
    stop: false
  }, {
    x: 302.396,
    y: 6563.961,
    z: 29.757,
    stop: false
  }, {
    x: 638.120,
    y: 6522.321,
    z: 28.698,
    stop: false
  }, {
    x: 1030.889,
    y: 6481.044,
    z: 21.447,
    stop: false
  }, {
    x: 1460.716,
    y: 6450.145,
    z: 22.479,
    stop: false
  }, {
    x: 1771.315,
    y: 6344.300,
    z: 37.915,
    stop: false
  }, {
    x: 1944.819,
    y: 6228.957,
    z: 44.344,
    stop: false
  }, {
    x: 2380.875,
    y: 5747.852,
    z: 45.826,
    stop: false
  }, {
    x: 2524.891,
    y: 5405.277,
    z: 44.919,
    stop: false
  }, {
    x: 2594.008,
    y: 5147.871,
    z: 44.825,
    stop: false
  }, {
    x: 2659.904,
    y: 4911.387,
    z: 44.881,
    stop: false
  }, {
    x: 2723.420,
    y: 4610.774,
    z: 44.956,
    stop: false
  }, {
    x: 2780.791,
    y: 4376.326,
    z: 50.321,
    stop: false
  }, {
    x: 2886.702,
    y: 4077.080,
    z: 50.963,
    stop: false
  }, {
    x: 2911.420,
    y: 3834.316,
    z: 52.630,
    stop: false
  }, {
    x: 2871.304,
    y: 3660.401,
    z: 52.945,
    stop: false
  }, {
    x: 2787.539,
    y: 3429.959,
    z: 56.281,
    stop: false
  }, {
    x: 2696.553,
    y: 3236.852,
    z: 55.186,
    stop: false
  }, {
    x: 2529.127,
    y: 3032.669,
    z: 43.517,
    stop: false
  }, {
    x: 2304.928,
    y: 2844.933,
    z: 42.669,
    stop: false
  }, {
    x: 2059.317,
    y: 2651.802,
    z: 52.809,
    stop: false
  }, {
    x: 1859.836,
    y: 2414.661,
    z: 56.086,
    stop: false
  }, {
    x: 1781.938,
    y: 2143.065,
    z: 64.778,
    stop: false
  }, {
    x: 1751.535,
    y: 1892.577,
    z: 74.363,
    stop: false
  }, {
    x: 1712.389,
    y: 1608.039,
    z: 83.705,
    stop: false
  }, {
    x: 1658.347,
    y: 1296.183,
    z: 86.514,
    stop: false
  }, {
    x: 1566.295,
    y: 992.353,
    z: 78.922,
    stop: false
  }, {
    x: 1450.474,
    y: 770.858,
    z: 77.370,
    stop: false
  }, {
    x: 1263.124,
    y: 569.579,
    z: 80.729,
    stop: false
  }, {
    x: 1144.828,
    y: 453.758,
    z: 82.805,
    stop: false
  }, {
    x: 1007.520,
    y: 314.058,
    z: 84.374,
    stop: false
  }, {
    x: 840.561,
    y: 118.112,
    z: 71.702,
    stop: false
  }, {
    x: 735.385,
    y: -47.575,
    z: 58.965,
    stop: false
  }, {
    x: 639.903,
    y: -225.207,
    z: 44.822,
    stop: false
  }, {
    x: 541.490,
    y: -369.674,
    z: 33.606,
    stop: false
  }, {
    x: 383.953,
    y: -600.176,
    z: 28.851,
    stop: false
  }, {
    x: 308.137,
    y: -766.262,
    z: 29.281,
    stop: true
  }, // stop
  {
    x: 192.357,
    y: -818.619,
    z: 31.334,
    stop: false
  }, {
    x: -54.914,
    y: -728.434,
    z: 33.431,
    stop: false
  }, {
    x: -219.056,
    y: -665.369,
    z: 33.644,
    stop: false
  }, {
    x: -363.285,
    y: -650.138,
    z: 31.311,
    stop: false
  }, {
    x: -518.722,
    y: -649.323,
    z: 33.204,
    stop: false
  }, {
    x: -708.291,
    y: -648.718,
    z: 30.728,
    stop: false
  }, {
    x: -1050.904,
    y: -729.793,
    z: 19.497,
    stop: false
  }, {
    x: -1160.784,
    y: -823.362,
    z: 15.104,
    stop: false
  }, {
    x: -1256.217,
    y: -890.436,
    z: 11.804,
    stop: false
  }, {
    x: -1300.122,
    y: -872.615,
    z: 13.726,
    stop: false
  }, {
    x: -1352.369,
    y: -817.672,
    z: 18.305,
    stop: false
  }, {
    x: -1444.255,
    y: -830.347,
    z: 16.454,
    stop: false
  }, {
    x: -1621.659,
    y: -692.001,
    z: 17.351,
    stop: false
  }, {
    x: -1787.690,
    y: -597.158,
    z: 11.051,
    stop: false
  }, {
    x: -1943.703,
    y: -471.047,
    z: 11.994,
    stop: false
  }, {
    x: -2003.474,
    y: -463.176,
    z: 11.508,
    stop: false
  }]],
  busColshape: null,
  busCheckpoint: null,
  busBlip: null,
  markerType: null,
  earn: null,
  idx: 0,
  isStop: false,
  BusWay: function BusWay(type) {
    var points = this.ways;
    var point = this.idx;
    var nextRoute = points[type][point + 1];

    if (nextRoute == null || nextRoute == undefined) {
      this.busCheckpoint = mp.checkpoints["new"](4, new mp.Vector3(points[type][point].x, points[type][point].y, points[type][point].z - 2), 5, {
        direction: new mp.Vector3(0, 0, 0),
        color: [44, 128, 239, 150],
        visible: true,
        dimension: 0
      });
      this.busColshape = mp.colshapes.newSphere(points[type][point].x, points[type][point].y, points[type][point].z, 5, 0);
      this.busBlip = mp.blips["new"](1, new mp.Vector3(points[type][point].x, points[type][point].y, points[type][point].z), {
        color: 3
      });
      return;
    }

    this.busColshape = mp.colshapes.newSphere(points[type][point].x, points[type][point].y, points[type][point].z, 5, 0);
    this.isStop = points[type][this.idx].stop;
    this.busCheckpoint = mp.checkpoints["new"](1, new mp.Vector3(points[type][this.idx].x, points[type][this.idx].y, points[type][this.idx].z - 2), 5, {
      direction: new mp.Vector3(nextRoute.x, nextRoute.y, nextRoute.z),
      color: [44, 128, 239, 150],
      visible: true,
      dimension: 0
    });
    this.busBlip = mp.blips["new"](1, new mp.Vector3(points[type][this.idx].x, points[type][this.idx].y, points[type][this.idx].z), {
      scale: 1,
      color: 3,
      dimension: 0
    });
    this.busBlip.setRoute(true);
  },
  // EnterColshape(shape) {
  //     if (shape == this.busColshape) {
  //         player.inBusClshp = true
  //         if (player.vehicle) {
  //             if (this.markerType == 4) {
  //                 mp.events.callRemote('Hud_addNotify::SERVER', 3, 'Остановитесь на 10 секунд', 10000)
  //                 setTimeout(() => {
  //                     if (player.inBusClshp) {
  //                         // mp.players.forEachInStreamRange(function () {
  //                         //     mp.gui.chat.push('Остановка общественного транспорта. Проезд: 30$')
  //                         // })
  //                         this.busColshape.destroy()
  //                         this.busCheckpoint.destroy()
  //                         this.busBlip.destroy()
  //                         this.BusWay(busWayType)
  //                     }
  //                 }, 10000)
  //             } else if (this.markerType == 1) {
  //                 if (player.inBusClshp) {
  //                     this.busColshape.destroy()
  //                     this.busCheckpoint.destroy()
  //                     this.busBlip.destroy()
  //                     this.BusWay(busWayType)
  //                 }
  //             }
  //         }
  //     }
  // },
  EnterColshape: function EnterColshape(shape) {
    var _this = this;

    if (shape == this.busColshape) {
      if (player.vehicle) {
        if (player.getVariable('personalBus') == player.vehicle) {
          if (this.isStop == true) {
            inBusStop = true;
            mp.events.callRemote('Hud_addNotify::SERVER', 3, 'Остановитесь на 10 секунд', 10000);
            busStopTimeout = setTimeout(function () {
              inBusStop = false;
              _this.idx++;

              _this.busColshape.destroy();

              _this.busCheckpoint.destroy();

              _this.busBlip.destroy();

              _this.BusWay(busWayType);
            }, 10000);
            return;
          }

          if (this.idx == this.ways[busWayType].length - 1) {
            this.idx = 0;
            this.busColshape.destroy();
            this.busCheckpoint.destroy();
            this.busBlip.destroy();
            this.BusWay(busWayType);
            earnedMoney += salary;
            browser.execute("Bus.work.countedMoney = ".concat(earnedMoney));
            mp.events.callRemote('Bus_endWay::SERVER', earnedMoney);
            return;
          }

          this.idx++;
          this.busColshape.destroy();
          this.busCheckpoint.destroy();
          this.busBlip.destroy();
          this.BusWay(busWayType);
        }
      }
    }
  },
  ExitColshape: function ExitColshape(shape) {
    if (shape == this.busColshape) {
      if (inBusStop) {
        clearTimeout(busStopTimeout);
        mp.events.callRemote('Hud_addNotify::SERVER', 2, 'Вернитесь на остановку', 10000);
      }
    }
  }
};
mp.events.add('Bus_showWindow::CLIENT', function () {
  browser.execute('HUD.usebutton.active = true;');
  mp.keys.bind(0x45, true, function () {
    browser.execute("Bus.active = true;");
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.events.call('HUD_setShow::CLIENT', false);
    mp.keys.unbind(0x45, true);
    windowOpened = true;
  });
});
mp.events.add('Bus_unbind::CLIENT', function () {
  mp.keys.unbind(0x45, true);
  browser.execute('HUD.usebutton.active = false;');
});
mp.events.add('Bus_startWork::CLIENT', function (route, _salary) {
  salary = _salary;
  busWayType = route;
  buswork = true;
  browser.execute("Bus.active = false;");
  windowOpened = false;
  mp.gui.cursor.show(false, false);
  mp.game.ui.displayRadar(true);
  mp.events.call('HUD_setShow::CLIENT', true);
  mp.events.callRemote('Bus_startWork::SERVER');
});
mp.events.add('Bus_startRoute::CLIENT', function () {
  if (alreadyWorking == true) return;
  alreadyWorking = true;
  busWork.BusWay(busWayType);
});
mp.events.add('Bus_stopWork::CLIENT', function () {
  browser.execute("Bus.active = false;");
  mp.gui.cursor.show(false, false);
  mp.game.ui.displayRadar(true);
  mp.events.call('HUD_setShow::CLIENT', true);
  buswork = false;
  alreadyWorking = false;
  mp.events.callRemote('Bus_endWork::SERVER', false);
  var ifMarker = mp.checkpoints.exists(busWork.busCheckpoint);
  if (!ifMarker) return;
  mp.events.callRemote('Bus_endWork::SERVER', true);
  busWork.busColshape.destroy();
  busWork.busCheckpoint.destroy();
  busWork.busBlip.destroy();
});
mp.events.add('playerEnterColshape', function (shape) {
  busWork.EnterColshape(shape);
});
mp.events.add('playerExitColshape', function (shape) {
  busWork.ExitColshape(shape);
});
mp.events.add('Bus_getBusTips::CLIENT', function (vehicle) {
  mp.events.callRemote('Bus_getBusTips::SERVER', vehicle.getPedInSeat(0));
});
var busTimeout;
mp.events.add('playerLeaveVehicle', function (vehicle) {
  if (buswork == true) {
    if (vehicle == player.getVariable('personalBus')) {
      mp.events.callRemote('Hud_addNotify::SERVER', 3, 'У вас есть 100 секунд чтобы вернуться в транспорт', 7000);
      busTimeout = setTimeout(function () {
        mp.events.callRemote('Bus_endWork::SERVER');
        var ifMarker = mp.checkpoints.exists(busWork.busCheckpoint);
        if (!ifMarker) return;
        busWork.busColshape.destroy();
        busWork.busCheckpoint.destroy();
        busWork.busBlip.destroy();
        buswork = false;
        clearTimeout(busTimeout);
      }, 100000);
    }
  }
});
mp.events.add('playerEnterVehicle', function (vehicle) {
  if (buswork == true) {
    if (vehicle == player.getVariable('personalBus')) {
      clearTimeout(busTimeout);
    }
  }
});
var busDisabled = false;
mp.events.add('render', function () {
  if (mp.game.controls.isDisabledControlPressed(2, 200)) {
    if (windowOpened == true) {
      busDisabled = true;
      windowOpened = false;
      browser.execute("Bus.active = false;");
      mp.gui.cursor.show(false, false);
      mp.game.ui.displayRadar(true);
      mp.events.call('HUD_setShow::CLIENT', true);
    }
  }

  if (busDisabled == true) {
    mp.game.controls.disableControlAction(2, 200, true);
    setTimeout(function () {
      busDisabled = false;
    }, 1000);
  }
});