/* Secret theorem popup: opened by the footer button or by the Konami code. */
(function () {
    'use strict';

    var THEOREMS = [
        ['Pythagorean theorem', 'In a right triangle with legs a, b and hypotenuse c: a² + b² = c².'],
        ['Fundamental Theorem of Calculus', 'If f is continuous on [a, b], then F(x) = ∫ₐˣ f(t) dt satisfies F′ = f, and ∫ₐᵇ f = F(b) − F(a).'],
        ['Intermediate Value Theorem', 'A continuous function on [a, b] takes every value between f(a) and f(b).'],
        ['Bolzano–Weierstrass theorem', 'Every bounded sequence in ℝⁿ has a convergent subsequence.'],
        ['Heine–Borel theorem', 'A subset of ℝⁿ is compact if and only if it is closed and bounded.'],
        ['Banach fixed-point theorem', 'A contraction on a non-empty complete metric space has exactly one fixed point.'],
        ['Brouwer fixed-point theorem', 'Every continuous map from a closed ball in ℝⁿ to itself has a fixed point.'],
        ['Cauchy–Schwarz inequality', '|⟨u, v⟩| ≤ ‖u‖ ‖v‖, with equality if and only if u and v are linearly dependent.'],
        ['Spectral theorem', 'A real symmetric matrix has real eigenvalues and an orthonormal basis of eigenvectors.'],
        ['Cayley–Hamilton theorem', 'Every square matrix satisfies its own characteristic polynomial.'],
        ['Lagrange’s theorem', 'In a finite group G, the order of every subgroup divides |G|.'],
        ['Fermat’s little theorem', 'If p is prime and p does not divide a, then aᵖ⁻¹ ≡ 1 (mod p).'],
        ['Euler’s polyhedron formula', 'For a convex polyhedron with V vertices, E edges and F faces: V − E + F = 2.'],
        ['Prime Number Theorem', 'The number π(x) of primes up to x satisfies π(x) ~ x / ln x as x → ∞.'],
        ['Strong Law of Large Numbers', 'If X₁, X₂, … are i.i.d. with finite mean μ, then (X₁ + ⋯ + Xₙ)/n → μ almost surely.'],
        ['Central Limit Theorem', 'For i.i.d. Xᵢ with mean μ and variance σ² > 0, √n (X̄ₙ − μ)/σ converges in distribution to N(0, 1).'],
        ['Itô’s formula', 'For f ∈ C² and Brownian motion W: f(Wₜ) = f(W₀) + ∫ f′(Wₛ) dWₛ + ½ ∫ f″(Wₛ) ds.'],
        ['Kolmogorov continuity theorem', 'If E|Xₜ − Xₛ|ᵃ ≤ C|t − s|¹⁺ᵇ, then X has a modification whose paths are γ-Hölder for every γ < b/a.'],
        ['Sewing lemma', 'If a two-parameter family Ξ satisfies |Ξₛₜ − Ξₛᵤ − Ξᵤₜ| ≤ C|t − s|ᶿ with θ > 1, there is a unique additive I with |Iₛₜ − Ξₛₜ| ≤ C′|t − s|ᶿ.']
    ];

    var KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    var progress = 0;
    var last = -1;

    function pick() {
        var i;
        do { i = Math.floor(Math.random() * THEOREMS.length); } while (i === last && THEOREMS.length > 1);
        last = i;
        return THEOREMS[i];
    }

    function showTheorem() {
        var modalEl = document.getElementById('theoremModal');
        if (!modalEl || !window.bootstrap) return;
        var t = pick();
        document.getElementById('theoremModalLabel').textContent = t[0];
        document.getElementById('theoremStatement').textContent = t[1];
        window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }

    document.addEventListener('keydown', function (e) {
        var k = (e.key || '').toLowerCase();
        progress = (k === KONAMI[progress]) ? progress + 1 : (k === KONAMI[0] ? 1 : 0);
        if (progress === KONAMI.length) { progress = 0; showTheorem(); }
    });

    var btn = document.getElementById('secretBtn');
    if (btn) btn.addEventListener('click', showTheorem);
    var again = document.getElementById('theoremAgain');
    if (again) again.addEventListener('click', showTheorem);

    if (window.console && console.info) console.info('Psst: try the Konami code, or find the little ∑ in the footer.');
})();
