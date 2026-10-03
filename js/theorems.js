/* Secret theorem popup: opened by the footer button or by the Konami code.
   To add a theorem, append [name, statement, Wikipedia article title] to THEOREMS. */
(function () {
    'use strict';

    var WIKI = 'https://en.wikipedia.org/wiki/';

    var THEOREMS = [
        // ── Real analysis ──────────────────────────────────────────────
        ['Intermediate Value Theorem', 'A continuous function on [a, b] takes every value between f(a) and f(b).', 'Intermediate_value_theorem'],
        ['Mean Value Theorem', 'If f is continuous on [a, b] and differentiable on (a, b), there is c with f′(c) = (f(b) − f(a)) / (b − a).', 'Mean_value_theorem'],
        ['Rolle’s theorem', 'If f is continuous on [a, b], differentiable on (a, b) and f(a) = f(b), then f′(c) = 0 for some c in (a, b).', 'Rolle\'s_theorem'],
        ['Extreme Value Theorem', 'A continuous real function on a compact set attains a maximum and a minimum.', 'Extreme_value_theorem'],
        ['Fundamental Theorem of Calculus', 'If f is continuous on [a, b] and F(x) = ∫ from a to x of f(t) dt, then F′ = f, and ∫ from a to b of f = F(b) − F(a).', 'Fundamental_theorem_of_calculus'],
        ['Taylor’s theorem', 'Near a, a smooth function equals its Taylor polynomial of degree n plus a remainder f^(n+1)(ξ)(x − a)^(n+1) / (n + 1)! for some ξ between a and x.', 'Taylor\'s_theorem'],
        ['Bolzano–Weierstrass theorem', 'Every bounded sequence in ℝⁿ has a convergent subsequence.', 'Bolzano–Weierstrass_theorem'],
        ['Heine–Borel theorem', 'A subset of ℝⁿ is compact if and only if it is closed and bounded.', 'Heine–Borel_theorem'],
        ['Monotone Convergence Theorem', 'A bounded monotone sequence of real numbers converges.', 'Monotone_convergence_theorem'],
        ['Weierstrass approximation theorem', 'Every continuous function on [a, b] is a uniform limit of polynomials.', 'Stone–Weierstrass_theorem'],
        ['Arzelà–Ascoli theorem', 'A uniformly bounded, equicontinuous sequence of functions on a compact space has a uniformly convergent subsequence.', 'Arzelà–Ascoli_theorem'],
        ['Symmetry of second derivatives (Schwarz)', 'If the second partial derivatives of f are continuous, then ∂²f/∂x∂y = ∂²f/∂y∂x.', 'Symmetry_of_second_derivatives'],
        ['Inverse Function Theorem', 'If f is C¹ and its derivative at a is invertible, then f is invertible near a with a C¹ inverse.', 'Inverse_function_theorem'],
        ['Implicit Function Theorem', 'If F(x, y) = 0 and ∂F/∂y is invertible at a point, then near that point y can be written as a smooth function of x.', 'Implicit_function_theorem'],
        ['Pythagorean theorem', 'In a right triangle with legs a, b and hypotenuse c: a² + b² = c².', 'Pythagorean_theorem'],

        // ── Measure theory & integration ───────────────────────────────
        ['Dominated Convergence Theorem', 'If fₙ → f pointwise and |fₙ| ≤ g with g integrable, then ∫ fₙ → ∫ f.', 'Dominated_convergence_theorem'],
        ['Fubini’s theorem', 'For an integrable function on a product space, the double integral equals the iterated integrals taken in either order.', 'Fubini\'s_theorem'],
        ['Radon–Nikodym theorem', 'If a σ-finite measure ν is absolutely continuous with respect to μ, then ν has a density with respect to μ.', 'Radon–Nikodym_theorem'],

        // ── Vector calculus ────────────────────────────────────────────
        ['Stokes’ theorem', 'The integral of dω over a manifold M equals the integral of ω over its boundary ∂M.', 'Stokes\'_theorem'],
        ['Divergence theorem', 'The flux of a vector field F through a closed surface equals the integral of div F over the enclosed volume.', 'Divergence_theorem'],

        // ── Complex analysis ───────────────────────────────────────────
        ['Cauchy’s integral theorem', 'If f is holomorphic on a simply connected domain, its integral over every closed contour is 0.', 'Cauchy\'s_integral_theorem'],
        ['Cauchy’s integral formula', 'For f holomorphic inside a simple closed contour C and a inside C: f(a) = (1 / 2πi) ∮ f(z) / (z − a) dz.', 'Cauchy\'s_integral_formula'],
        ['Residue theorem', 'The integral of a meromorphic function over a closed contour is 2πi times the sum of its residues inside.', 'Residue_theorem'],
        ['Liouville’s theorem', 'A bounded entire function is constant.', 'Liouville\'s_theorem_(complex_analysis)'],
        ['Fundamental Theorem of Algebra', 'Every non-constant polynomial with complex coefficients has a root in ℂ.', 'Fundamental_theorem_of_algebra'],
        ['Maximum modulus principle', 'A non-constant holomorphic function on a domain cannot attain its maximum modulus at an interior point.', 'Maximum_modulus_principle'],
        ['Riemann mapping theorem', 'Every simply connected open proper subset of ℂ is conformally equivalent to the open unit disk.', 'Riemann_mapping_theorem'],
        ['Picard’s little theorem', 'A non-constant entire function takes every complex value with at most one exception.', 'Picard_theorem'],

        // ── Functional analysis ────────────────────────────────────────
        ['Banach fixed-point theorem', 'A contraction on a non-empty complete metric space has exactly one fixed point.', 'Banach_fixed-point_theorem'],
        ['Hahn–Banach theorem', 'A bounded linear functional on a subspace of a normed space extends to the whole space with the same norm.', 'Hahn–Banach_theorem'],
        ['Open Mapping Theorem', 'A surjective bounded linear operator between Banach spaces is an open map.', 'Open_mapping_theorem_(functional_analysis)'],
        ['Uniform Boundedness Principle', 'A pointwise bounded family of bounded operators from a Banach space is uniformly bounded in norm.', 'Uniform_boundedness_principle'],
        ['Riesz representation theorem', 'Every continuous linear functional on a Hilbert space H has the form x ↦ ⟨x, y⟩ for a unique y in H.', 'Riesz_representation_theorem'],
        ['Banach–Alaoglu theorem', 'The closed unit ball of the dual of a normed space is compact in the weak-* topology.', 'Banach–Alaoglu_theorem'],
        ['Krein–Milman theorem', 'A compact convex set in a locally convex space is the closed convex hull of its extreme points.', 'Krein–Milman_theorem'],
        ['Spectral theorem', 'A real symmetric matrix has real eigenvalues and an orthonormal basis of eigenvectors.', 'Spectral_theorem'],
        ['Plancherel theorem', 'The Fourier transform is an isometry of L²(ℝ): the energy of a function equals the energy of its Fourier transform.', 'Plancherel_theorem'],
        ['Fourier inversion theorem', 'Under suitable conditions a function can be recovered from its Fourier transform by the inverse Fourier transform.', 'Fourier_inversion_theorem'],
        ['Nyquist–Shannon sampling theorem', 'A signal containing no frequencies above B can be perfectly reconstructed from samples taken at a rate above 2B.', 'Nyquist–Shannon_sampling_theorem'],

        // ── Differential equations & dynamics ──────────────────────────
        ['Picard–Lindelöf theorem', 'If f is Lipschitz in y, the equation y′ = f(t, y), y(t₀) = y₀ has a unique solution on a small time interval.', 'Picard–Lindelöf_theorem'],
        ['Cauchy–Kovalevskaya theorem', 'A Cauchy problem for a PDE with analytic data has a unique local analytic solution.', 'Cauchy–Kovalevskaya_theorem'],
        ['Poincaré–Bendixson theorem', 'A bounded trajectory of a planar flow that does not approach a fixed point approaches a periodic orbit.', 'Poincaré–Bendixson_theorem'],

        // ── Linear algebra ─────────────────────────────────────────────
        ['Cauchy–Schwarz inequality', '|⟨u, v⟩| ≤ ‖u‖ ‖v‖, with equality if and only if u and v are linearly dependent.', 'Cauchy–Schwarz_inequality'],
        ['Rank–nullity theorem', 'For a linear map T on a finite-dimensional space V: dim V = dim ker T + dim im T.', 'Rank–nullity_theorem'],
        ['Cayley–Hamilton theorem', 'Every square matrix satisfies its own characteristic polynomial.', 'Cayley–Hamilton_theorem'],
        ['Jordan normal form', 'Every square complex matrix is similar to a block-diagonal matrix of Jordan blocks.', 'Jordan_normal_form'],
        ['Singular value decomposition', 'Every real matrix A can be written A = UΣVᵀ with U, V orthogonal and Σ diagonal with non-negative entries.', 'Singular_value_decomposition'],
        ['Perron–Frobenius theorem', 'A matrix with positive entries has a simple positive eigenvalue equal to its spectral radius, with a positive eigenvector.', 'Perron–Frobenius_theorem'],

        // ── Abstract algebra ───────────────────────────────────────────
        ['Lagrange’s theorem', 'In a finite group G, the order of every subgroup divides |G|.', 'Lagrange\'s_theorem_(group_theory)'],
        ['Cauchy’s theorem (groups)', 'If a prime p divides the order of a finite group G, then G has an element of order p.', 'Cauchy\'s_theorem_(group_theory)'],
        ['Sylow theorems', 'If pᵏ divides |G| for a prime p, then G has a subgroup of order pᵏ, and all maximal p-subgroups are conjugate.', 'Sylow_theorems'],
        ['Cayley’s theorem', 'Every group is isomorphic to a subgroup of a symmetric group.', 'Cayley\'s_theorem'],
        ['First Isomorphism Theorem', 'For a group homomorphism φ: G → H, the quotient G / ker φ is isomorphic to the image of φ.', 'Isomorphism_theorems'],
        ['Abel–Ruffini theorem', 'There is no general solution in radicals to polynomial equations of degree five or higher.', 'Abel–Ruffini_theorem'],
        ['Fundamental Theorem of Galois Theory', 'Subgroups of the Galois group of a finite Galois extension correspond bijectively to intermediate fields.', 'Fundamental_theorem_of_Galois_theory'],
        ['Wedderburn’s little theorem', 'Every finite division ring is a field.', 'Wedderburn\'s_little_theorem'],
        ['Hilbert’s Nullstellensatz', 'Over an algebraically closed field, the polynomials vanishing on the zero set of an ideal I are exactly the elements of the radical of I.', 'Hilbert\'s_Nullstellensatz'],

        // ── Number theory ──────────────────────────────────────────────
        ['Fundamental Theorem of Arithmetic', 'Every integer greater than 1 factors into primes in exactly one way, up to order.', 'Fundamental_theorem_of_arithmetic'],
        ['Euclid’s theorem', 'There are infinitely many prime numbers.', 'Euclid\'s_theorem'],
        ['Fermat’s little theorem', 'If p is prime and p does not divide a, then a^(p−1) ≡ 1 (mod p).', 'Fermat\'s_little_theorem'],
        ['Euler’s theorem', 'If a and n are coprime, then a^φ(n) ≡ 1 (mod n), where φ is Euler’s totient function.', 'Euler\'s_theorem'],
        ['Wilson’s theorem', 'An integer n > 1 is prime if and only if (n − 1)! ≡ −1 (mod n).', 'Wilson\'s_theorem'],
        ['Chinese Remainder Theorem', 'If n₁, …, nₖ are pairwise coprime, the system x ≡ aᵢ (mod nᵢ) has a unique solution modulo n₁ ⋯ nₖ.', 'Chinese_remainder_theorem'],
        ['Quadratic reciprocity', 'For distinct odd primes p and q: (p/q)(q/p) = (−1)^((p−1)(q−1)/4).', 'Quadratic_reciprocity'],
        ['Fermat’s theorem on sums of two squares', 'An odd prime p is a sum of two squares if and only if p ≡ 1 (mod 4).', 'Fermat\'s_theorem_on_sums_of_two_squares'],
        ['Lagrange’s four-square theorem', 'Every natural number is the sum of four integer squares.', 'Lagrange\'s_four-square_theorem'],
        ['Dirichlet’s theorem on arithmetic progressions', 'If a and d are coprime, the progression a, a + d, a + 2d, … contains infinitely many primes.', 'Dirichlet\'s_theorem_on_arithmetic_progressions'],
        ['Prime Number Theorem', 'The number π(x) of primes up to x satisfies π(x) ~ x / ln x as x → ∞.', 'Prime_number_theorem'],
        ['Fermat’s Last Theorem', 'For n > 2 there are no positive integers a, b, c with aⁿ + bⁿ = cⁿ (proved by Andrew Wiles).', 'Fermat\'s_Last_Theorem'],

        // ── Topology & geometry ────────────────────────────────────────
        ['Brouwer fixed-point theorem', 'Every continuous map from a closed ball in ℝⁿ to itself has a fixed point.', 'Brouwer_fixed-point_theorem'],
        ['Jordan curve theorem', 'A simple closed curve in the plane separates it into exactly two regions, an inside and an outside.', 'Jordan_curve_theorem'],
        ['Hairy ball theorem', 'Every continuous tangent vector field on the 2-sphere vanishes somewhere.', 'Hairy_ball_theorem'],
        ['Borsuk–Ulam theorem', 'Every continuous map from the n-sphere to ℝⁿ sends some pair of antipodal points to the same value.', 'Borsuk–Ulam_theorem'],
        ['Tychonoff’s theorem', 'Any product of compact topological spaces is compact.', 'Tychonoff\'s_theorem'],
        ['Euler’s polyhedron formula', 'For a convex polyhedron with V vertices, E edges and F faces: V − E + F = 2.', 'Euler_characteristic'],
        ['Gauss–Bonnet theorem', 'For a compact surface M, the integral of the Gaussian curvature equals 2π times the Euler characteristic of M.', 'Gauss–Bonnet_theorem'],
        ['Poincaré conjecture (Perelman)', 'Every simply connected closed 3-manifold is homeomorphic to the 3-sphere.', 'Poincaré_conjecture'],
        ['Thales’ theorem', 'An angle inscribed in a semicircle is a right angle.', 'Thales\'s_theorem'],

        // ── Combinatorics & graph theory ───────────────────────────────
        ['Pigeonhole principle', 'If n items are put into m boxes with n > m, some box contains more than one item.', 'Pigeonhole_principle'],
        ['Binomial theorem', '(x + y)ⁿ = ∑ over k of C(n, k) xⁿ⁻ᵏ yᵏ.', 'Binomial_theorem'],
        ['Ramsey’s theorem', 'For every k there is N such that every 2-colouring of the edges of the complete graph on N vertices contains a single-coloured complete subgraph on k vertices.', 'Ramsey\'s_theorem'],
        ['Hall’s marriage theorem', 'A bipartite graph has a matching covering one side if and only if every subset of that side has at least as many neighbours as members.', 'Hall\'s_marriage_theorem'],
        ['Cayley’s formula', 'There are nⁿ⁻² labelled trees on n vertices.', 'Cayley\'s_formula'],
        ['Euler’s theorem on Eulerian circuits', 'A connected graph has a closed walk using every edge exactly once if and only if every vertex has even degree.', 'Eulerian_path'],
        ['Kuratowski’s theorem', 'A graph is planar if and only if it contains no subdivision of K₅ or K₃,₃.', 'Kuratowski\'s_theorem'],
        ['Four Colour Theorem', 'Every planar map can be coloured with at most four colours so that neighbouring regions differ.', 'Four_color_theorem'],
        ['Max-flow min-cut theorem', 'In a flow network, the maximum flow from source to sink equals the minimum capacity of a cut separating them.', 'Max-flow_min-cut_theorem'],

        // ── Probability & statistics ───────────────────────────────────
        ['Strong Law of Large Numbers', 'If X₁, X₂, … are i.i.d. with finite mean μ, then the sample average converges to μ almost surely.', 'Law_of_large_numbers'],
        ['Central Limit Theorem', 'For i.i.d. Xᵢ with mean μ and variance σ² > 0, √n (sample mean − μ) / σ converges in distribution to N(0, 1).', 'Central_limit_theorem'],
        ['Bayes’ theorem', 'P(A | B) = P(B | A) P(A) / P(B).', 'Bayes\'_theorem'],
        ['Chebyshev’s inequality', 'P(|X − μ| ≥ kσ) ≤ 1 / k² for any random variable with mean μ and standard deviation σ.', 'Chebyshev\'s_inequality'],
        ['Jensen’s inequality', 'For a convex function φ, φ(E[X]) ≤ E[φ(X)].', 'Jensen\'s_inequality'],
        ['AM–GM inequality', 'The arithmetic mean of non-negative numbers is at least their geometric mean, with equality only when all are equal.', 'AM–GM_inequality'],
        ['Borel–Cantelli lemma', 'If the probabilities of events Aₙ have a finite sum, then almost surely only finitely many Aₙ occur.', 'Borel–Cantelli_lemma'],
        ['Kolmogorov’s zero–one law', 'Every tail event of a sequence of independent random variables has probability 0 or 1.', 'Kolmogorov\'s_zero–one_law'],
        ['Doob’s martingale convergence theorem', 'A martingale bounded in L¹ converges almost surely to a finite random variable.', 'Doob\'s_martingale_convergence_theorems'],
        ['Donsker’s theorem', 'A rescaled random walk converges in distribution, as a path, to Brownian motion.', 'Donsker\'s_theorem'],
        ['Cramér–Rao bound', 'The variance of any unbiased estimator is at least the inverse of the Fisher information.', 'Cramér–Rao_bound'],

        // ── Stochastic analysis & rough paths ──────────────────────────
        ['Itô’s formula', 'For f ∈ C² and Brownian motion W: f(Wₜ) = f(W₀) + ∫ f′(Wₛ) dWₛ + ½ ∫ f″(Wₛ) ds.', 'Itô\'s_lemma'],
        ['Girsanov’s theorem', 'Under an equivalent change of measure, Brownian motion becomes a Brownian motion with drift, and the drift can be chosen freely.', 'Girsanov_theorem'],
        ['Feynman–Kac formula', 'The solution of a parabolic PDE can be written as an expectation over paths of a diffusion.', 'Feynman–Kac_formula'],
        ['Kolmogorov continuity theorem', 'If E|Xₜ − Xₛ|^a ≤ C|t − s|^(1+b), then X has a modification whose paths are γ-Hölder for every γ < b/a.', 'Kolmogorov_continuity_theorem'],
        ['Sewing lemma (rough paths)', 'If a two-parameter family Ξ satisfies |Ξₛₜ − Ξₛᵤ − Ξᵤₜ| ≤ C|t − s|^θ with θ > 1, there is a unique additive I with |Iₛₜ − Ξₛₜ| ≤ C′|t − s|^θ.', 'Rough_path'],

        // ── Logic, set theory & computation ────────────────────────────
        ['Cantor’s theorem', 'For every set X, the set of its subsets has strictly larger cardinality than X.', 'Cantor\'s_theorem'],
        ['Cantor–Schröder–Bernstein theorem', 'If there are injections A → B and B → A, then there is a bijection between A and B.', 'Schröder–Bernstein_theorem'],
        ['Gödel’s incompleteness theorems', 'Any consistent, effectively axiomatised system containing arithmetic has true statements it cannot prove, and cannot prove its own consistency.', 'Gödel\'s_incompleteness_theorems'],
        ['Compactness theorem', 'A set of first-order sentences has a model if and only if every finite subset of it has a model.', 'Compactness_theorem'],
        ['Undecidability of the halting problem', 'No algorithm can decide, for every program and input, whether the program eventually halts (Turing).', 'Halting_problem'],
        ['Zorn’s lemma', 'If every chain in a non-empty partially ordered set has an upper bound, the set has a maximal element.', 'Zorn\'s_lemma'],
        ['Banach–Tarski paradox', 'A solid ball in ℝ³ can be cut into finitely many pieces and reassembled into two balls of the same size as the original.', 'Banach–Tarski_paradox'],

        // ── Optimisation, games & information ──────────────────────────
        ['Nash’s existence theorem', 'Every finite game has at least one Nash equilibrium in mixed strategies.', 'Nash_equilibrium'],
        ['Von Neumann’s minimax theorem', 'In a finite two-player zero-sum game, max over strategies of min payoff equals min over strategies of max payoff.', 'Minimax_theorem'],
        ['Karush–Kuhn–Tucker conditions', 'At a local optimum of a constrained problem (under regularity assumptions), the gradient of the objective is a combination of the constraint gradients with sign conditions.', 'Karush–Kuhn–Tucker_conditions'],
        ['Shannon’s noisy-channel coding theorem', 'Reliable communication over a noisy channel is possible at any rate below the channel capacity, and impossible above it.', 'Noisy-channel_coding_theorem'],
        ['Noether’s theorem', 'Every continuous symmetry of the action of a physical system corresponds to a conserved quantity.', 'Noether\'s_theorem']
    ];

    var KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    var progress = 0;
    var deck = [];

    // Draw without repeats until every theorem has been shown, then reshuffle.
    function pick() {
        if (!deck.length) {
            for (var i = 0; i < THEOREMS.length; i++) deck.push(i);
            for (i = deck.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = deck[i]; deck[i] = deck[j]; deck[j] = tmp;
            }
        }
        return THEOREMS[deck.pop()];
    }

    function showTheorem() {
        var modalEl = document.getElementById('theoremModal');
        if (!modalEl || !window.bootstrap) return;
        var t = pick();
        document.getElementById('theoremModalLabel').textContent = t[0];
        document.getElementById('theoremStatement').textContent = t[1];
        var link = document.getElementById('theoremLink');
        if (link) link.href = WIKI + encodeURI(t[2]);
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
