(function () {
    'use strict';

    var N = 240;             // points per path
    var MAX_PATHS = 5;
    var COLORS = ['#50817e', '#c0562d', '#3a5ba0', '#8a4f9e', '#b08900'];

    var canvas = document.getElementById('plot');
    var ctx = canvas.getContext('2d');
    var alphaEl = document.getElementById('alpha');
    var countEl = document.getElementById('count');
    var alphaOut = document.getElementById('alphaOut');
    var countOut = document.getElementById('countOut');
    var statusEl = document.getElementById('status');
    var btnTime = document.getElementById('modeTime');
    var btnPlane = document.getElementById('modePlane');

    var mode = 'time';       // 'time' | 'plane'
    var noise = [];          // noise[p] = N standard normals, fixed until "Resample"
    var paths = [];          // paths[p] = N values (X at times 1/N ... 1)
    var frame = 0;

    function gauss() {
        var u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }

    function resample() {
        noise = [];
        // 2 * MAX_PATHS vectors: pairs (X1, X2) for the plane view
        for (var p = 0; p < 2 * MAX_PATHS; p++) {
            var z = new Float64Array(N);
            for (var i = 0; i < N; i++) z[i] = gauss();
            noise.push(z);
        }
    }

    // Lower Cholesky factor of the fractional Brownian motion covariance
    // R(s,t) = (s^2H + t^2H - |t-s|^2H) / 2 at t_i = i / N, i = 1..N
    function choleskyFBM(H) {
        var twoH = 2 * H;
        var L = new Array(N);
        var t = new Float64Array(N);
        for (var i = 0; i < N; i++) t[i] = (i + 1) / N;
        for (i = 0; i < N; i++) {
            L[i] = new Float64Array(i + 1);
            for (var j = 0; j <= i; j++) {
                var cov = 0.5 * (Math.pow(t[i], twoH) + Math.pow(t[j], twoH) - Math.pow(Math.abs(t[i] - t[j]), twoH));
                var s = cov;
                for (var k = 0; k < j; k++) s -= L[i][k] * L[j][k];
                if (i === j) L[i][j] = Math.sqrt(Math.max(s, 1e-12));
                else L[i][j] = s / L[j][j];
            }
        }
        return L;
    }

    function applyL(L, z) {
        var out = new Float64Array(N + 1); // out[0] = 0 (path starts at the origin)
        for (var i = 0; i < N; i++) {
            var s = 0;
            for (var k = 0; k <= i; k++) s += L[i][k] * z[k];
            out[i + 1] = s;
        }
        return out;
    }

    function compute() {
        var H = parseFloat(alphaEl.value);
        var L = choleskyFBM(H);
        paths = [];
        for (var p = 0; p < 2 * MAX_PATHS; p++) paths.push(applyL(L, noise[p]));
    }

    function fitCanvas() {
        var dpr = window.devicePixelRatio || 1;
        var w = canvas.clientWidth, h = canvas.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { w: w, h: h };
    }

    function lerpColor(t) {
        // blue (start) -> orange (end)
        var a = [58, 91, 160], b = [230, 126, 34];
        var c = a.map(function (x, i) { return Math.round(x + (b[i] - x) * t); });
        return 'rgb(' + c.join(',') + ')';
    }

    function drawTime(size) {
        var count = parseInt(countEl.value, 10);
        var lo = Infinity, hi = -Infinity, p, i;
        for (p = 0; p < count; p++) for (i = 0; i <= N; i++) { lo = Math.min(lo, paths[p][i]); hi = Math.max(hi, paths[p][i]); }
        var pad = 24, span = (hi - lo) || 1;
        function X(i) { return pad + (size.w - 2 * pad) * i / N; }
        function Y(v) { return size.h - pad - (size.h - 2 * pad) * (v - lo) / span; }
        // zero line
        ctx.strokeStyle = '#c9d6d4'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(pad, Y(0)); ctx.lineTo(size.w - pad, Y(0)); ctx.stroke(); ctx.setLineDash([]);
        for (p = 0; p < count; p++) {
            ctx.strokeStyle = COLORS[p]; ctx.lineWidth = 1.8; ctx.lineJoin = 'round';
            ctx.beginPath();
            for (i = 0; i <= N; i++) { if (i === 0) ctx.moveTo(X(i), Y(paths[p][i])); else ctx.lineTo(X(i), Y(paths[p][i])); }
            ctx.stroke();
        }
        ctx.fillStyle = '#5d6b6a'; ctx.font = '12px Nunito, sans-serif';
        ctx.fillText('time →', size.w - pad - 52, size.h - 6);
    }

    function drawPlane(size) {
        var count = parseInt(countEl.value, 10);
        var lo = Infinity, hi = -Infinity, p, i;
        for (p = 0; p < count; p++) for (i = 0; i <= N; i++) {
            var a = paths[2 * p][i], b = paths[2 * p + 1][i];
            lo = Math.min(lo, a, b); hi = Math.max(hi, a, b);
        }
        var pad = 24, span = (hi - lo) || 1, side = Math.min(size.w, size.h) - 2 * pad;
        var ox = (size.w - side) / 2, oy = (size.h - side) / 2;
        function X(v) { return ox + side * (v - lo) / span; }
        function Y(v) { return oy + side - side * (v - lo) / span; }
        ctx.lineWidth = 1.6; ctx.lineCap = 'round';
        for (p = 0; p < count; p++) {
            var x = paths[2 * p], y = paths[2 * p + 1];
            for (i = 1; i <= N; i++) {
                ctx.strokeStyle = lerpColor(i / N);
                ctx.beginPath(); ctx.moveTo(X(x[i - 1]), Y(y[i - 1])); ctx.lineTo(X(x[i]), Y(y[i])); ctx.stroke();
            }
            ctx.fillStyle = '#1d2a29';
            ctx.beginPath(); ctx.arc(X(x[0]), Y(y[0]), 3, 0, 2 * Math.PI); ctx.fill();
        }
    }

    function describe() {
        var a = parseFloat(alphaEl.value);
        var word = a >= 0.75 ? 'almost smooth' : a >= 0.5 ? 'moderately rough' : a >= 0.34 ? 'rough' : 'very rough, below the 1/3 threshold';
        var view = mode === 'time' ? 'path over time' : 'curve in the plane';
        statusEl.textContent = 'Showing ' + countEl.value + ' ' + (countEl.value === '1' ? 'sample' : 'samples') +
            ' with α = ' + a.toFixed(2) + ' (' + word + '), ' + view + '.';
        canvas.setAttribute('aria-label', 'Plot of ' + countEl.value + ' random ' + view + ' with Hölder exponent ' + a.toFixed(2) + ', ' + word + '.');
    }

    function draw() {
        frame = 0;
        var size = fitCanvas();
        ctx.clearRect(0, 0, size.w, size.h);
        if (mode === 'time') drawTime(size); else drawPlane(size);
        describe();
    }

    function schedule() { if (!frame) frame = requestAnimationFrame(draw); }

    function update() {
        alphaOut.textContent = parseFloat(alphaEl.value).toFixed(2);
        countOut.textContent = countEl.value;
        compute();
        schedule();
    }

    function setMode(m) {
        mode = m;
        btnTime.setAttribute('aria-pressed', String(m === 'time'));
        btnPlane.setAttribute('aria-pressed', String(m === 'plane'));
        schedule();
    }

    alphaEl.addEventListener('input', update);
    countEl.addEventListener('input', function () { countOut.textContent = countEl.value; schedule(); });
    document.getElementById('resample').addEventListener('click', function () { resample(); update(); });
    btnTime.addEventListener('click', function () { setMode('time'); });
    btnPlane.addEventListener('click', function () { setMode('plane'); });
    window.addEventListener('resize', schedule);

    resample();
    update();
})();
