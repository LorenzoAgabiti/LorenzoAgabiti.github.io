/* Secret theorem popup: opened by the footer button or by the Konami code.
   To add a theorem, append [name, statement, Wikipedia article title] to THEOREMS.
   Statements are written in LaTeX between $...$ inside R`...` (no backslash doubling needed). */
(function () {
    'use strict';

    var WIKI = 'https://en.wikipedia.org/wiki/';

    var R = String.raw; // statements are LaTeX, rendered with KaTeX

    var THEOREMS = [
        // ── Real analysis ──────────────────────────────────────────────
        ['Intermediate Value Theorem', R`A continuous function on $[a,b]$ takes every value between $f(a)$ and $f(b)$.`, 'Intermediate_value_theorem'],
        ['Mean Value Theorem', R`If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, there is $c$ with $f'(c) = \dfrac{f(b)-f(a)}{b-a}$.`, 'Mean_value_theorem'],
        ['Rolle’s theorem', R`If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$ and $f(a)=f(b)$, then $f'(c)=0$ for some $c\in(a,b)$.`, 'Rolle\'s_theorem'],
        ['Extreme Value Theorem', R`A continuous real function on a compact set attains a maximum and a minimum.`, 'Extreme_value_theorem'],
        ['Fundamental Theorem of Calculus', R`If $f$ is continuous on $[a,b]$ and $F(x)=\int_a^x f(t)\,dt$, then $F'=f$, and $\int_a^b f = F(b)-F(a)$.`, 'Fundamental_theorem_of_calculus'],
        ['Taylor’s theorem', R`Near $a$, a smooth function equals its Taylor polynomial of degree $n$ plus a remainder $\dfrac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$ for some $\xi$ between $a$ and $x$.`, 'Taylor\'s_theorem'],
        ['Bolzano–Weierstrass theorem', R`Every bounded sequence in $\mathbb{R}^n$ has a convergent subsequence.`, 'Bolzano–Weierstrass_theorem'],
        ['Heine–Borel theorem', R`A subset of $\mathbb{R}^n$ is compact if and only if it is closed and bounded.`, 'Heine–Borel_theorem'],
        ['Monotone Convergence Theorem', R`A bounded monotone sequence of real numbers converges.`, 'Monotone_convergence_theorem'],
        ['Weierstrass approximation theorem', R`Every continuous function on $[a,b]$ is a uniform limit of polynomials.`, 'Stone–Weierstrass_theorem'],
        ['Arzelà–Ascoli theorem', R`A uniformly bounded, equicontinuous sequence of functions on a compact space has a uniformly convergent subsequence.`, 'Arzelà–Ascoli_theorem'],
        ['Symmetry of second derivatives (Schwarz)', R`If the second partial derivatives of $f$ are continuous, then $\dfrac{\partial^2 f}{\partial x\,\partial y} = \dfrac{\partial^2 f}{\partial y\,\partial x}$.`, 'Symmetry_of_second_derivatives'],
        ['Inverse Function Theorem', R`If $f$ is $C^1$ and its derivative at $a$ is invertible, then $f$ is invertible near $a$ with a $C^1$ inverse.`, 'Inverse_function_theorem'],
        ['Implicit Function Theorem', R`If $F(x,y)=0$ and $\partial F/\partial y$ is invertible at a point, then near that point $y$ can be written as a smooth function of $x$.`, 'Implicit_function_theorem'],
        ['Pythagorean theorem', R`In a right triangle with legs $a,b$ and hypotenuse $c$: $a^2+b^2=c^2$.`, 'Pythagorean_theorem'],

        // ── Measure theory & integration ───────────────────────────────
        ['Dominated Convergence Theorem', R`If $f_n\to f$ pointwise and $|f_n|\le g$ with $g$ integrable, then $\int f_n \to \int f$.`, 'Dominated_convergence_theorem'],
        ['Fubini’s theorem', R`For an integrable function on a product space, the double integral equals the iterated integrals taken in either order.`, 'Fubini\'s_theorem'],
        ['Radon–Nikodym theorem', R`If a $\sigma$-finite measure $\nu$ is absolutely continuous with respect to $\mu$, then $\nu$ has a density with respect to $\mu$: $\nu(A)=\int_A \dfrac{d\nu}{d\mu}\,d\mu$.`, 'Radon–Nikodym_theorem'],

        // ── Vector calculus ────────────────────────────────────────────
        ['Stokes’ theorem', R`The integral of $d\omega$ over a manifold $M$ equals the integral of $\omega$ over its boundary: $\int_M d\omega = \int_{\partial M}\omega$.`, 'Stokes\'_theorem'],
        ['Divergence theorem', R`The flux of a vector field $\mathbf{F}$ through a closed surface equals the integral of $\nabla\cdot\mathbf{F}$ over the enclosed volume: $\oint_{\partial V}\mathbf{F}\cdot d\mathbf{S}=\int_V \nabla\cdot\mathbf{F}\,dV$.`, 'Divergence_theorem'],

        // ── Complex analysis ───────────────────────────────────────────
        ['Cauchy’s integral theorem', R`If $f$ is holomorphic on a simply connected domain, its integral over every closed contour is $0$.`, 'Cauchy\'s_integral_theorem'],
        ['Cauchy’s integral formula', R`For $f$ holomorphic inside a simple closed contour $C$ and $a$ inside $C$: $f(a)=\dfrac{1}{2\pi i}\oint_C \dfrac{f(z)}{z-a}\,dz$.`, 'Cauchy\'s_integral_formula'],
        ['Residue theorem', R`The integral of a meromorphic function over a closed contour is $2\pi i$ times the sum of its residues inside: $\oint_C f\,dz = 2\pi i\sum_k \operatorname{Res}(f,a_k)$.`, 'Residue_theorem'],
        ['Liouville’s theorem', R`A bounded entire function is constant.`, 'Liouville\'s_theorem_(complex_analysis)'],
        ['Fundamental Theorem of Algebra', R`Every non-constant polynomial with complex coefficients has a root in $\mathbb{C}$.`, 'Fundamental_theorem_of_algebra'],
        ['Maximum modulus principle', R`A non-constant holomorphic function on a domain cannot attain its maximum modulus at an interior point.`, 'Maximum_modulus_principle'],
        ['Riemann mapping theorem', R`Every simply connected open proper subset of $\mathbb{C}$ is conformally equivalent to the open unit disk.`, 'Riemann_mapping_theorem'],
        ['Picard’s little theorem', R`A non-constant entire function takes every complex value with at most one exception.`, 'Picard_theorem'],

        // ── Functional analysis ────────────────────────────────────────
        ['Banach fixed-point theorem', R`A contraction on a non-empty complete metric space has exactly one fixed point.`, 'Banach_fixed-point_theorem'],
        ['Hahn–Banach theorem', R`A bounded linear functional on a subspace of a normed space extends to the whole space with the same norm.`, 'Hahn–Banach_theorem'],
        ['Open Mapping Theorem', R`A surjective bounded linear operator between Banach spaces is an open map.`, 'Open_mapping_theorem_(functional_analysis)'],
        ['Uniform Boundedness Principle', R`A pointwise bounded family of bounded operators from a Banach space is uniformly bounded in norm.`, 'Uniform_boundedness_principle'],
        ['Riesz representation theorem', R`Every continuous linear functional on a Hilbert space $H$ has the form $x\mapsto\langle x,y\rangle$ for a unique $y\in H$.`, 'Riesz_representation_theorem'],
        ['Banach–Alaoglu theorem', R`The closed unit ball of the dual of a normed space is compact in the weak-$*$ topology.`, 'Banach–Alaoglu_theorem'],
        ['Krein–Milman theorem', R`A compact convex set in a locally convex space is the closed convex hull of its extreme points.`, 'Krein–Milman_theorem'],
        ['Spectral theorem', R`A real symmetric matrix has real eigenvalues and an orthonormal basis of eigenvectors: $A=Q\Lambda Q^{\top}$.`, 'Spectral_theorem'],
        ['Plancherel theorem', R`The Fourier transform is an isometry of $L^2(\mathbb{R})$: $\int |f(x)|^2\,dx=\int |\hat f(\xi)|^2\,d\xi$.`, 'Plancherel_theorem'],
        ['Fourier inversion theorem', R`Under suitable conditions a function can be recovered from its Fourier transform: $f(x)=\int \hat f(\xi)\,e^{2\pi i x\xi}\,d\xi$.`, 'Fourier_inversion_theorem'],
        ['Nyquist–Shannon sampling theorem', R`A signal containing no frequencies above $B$ can be perfectly reconstructed from samples taken at a rate above $2B$.`, 'Nyquist–Shannon_sampling_theorem'],

        // ── Differential equations & dynamics ──────────────────────────
        ['Picard–Lindelöf theorem', R`If $f$ is Lipschitz in $y$, the equation $y'=f(t,y)$, $y(t_0)=y_0$ has a unique solution on a small time interval.`, 'Picard–Lindelöf_theorem'],
        ['Cauchy–Kovalevskaya theorem', R`A Cauchy problem for a PDE with analytic data has a unique local analytic solution.`, 'Cauchy–Kovalevskaya_theorem'],
        ['Poincaré–Bendixson theorem', R`A bounded trajectory of a planar flow that does not approach a fixed point approaches a periodic orbit.`, 'Poincaré–Bendixson_theorem'],

        // ── Linear algebra ─────────────────────────────────────────────
        ['Cauchy–Schwarz inequality', R`$|\langle u,v\rangle|\le \|u\|\,\|v\|$, with equality if and only if $u$ and $v$ are linearly dependent.`, 'Cauchy–Schwarz_inequality'],
        ['Rank–nullity theorem', R`For a linear map $T$ on a finite-dimensional space $V$: $\dim V=\dim\ker T+\dim\operatorname{im} T$.`, 'Rank–nullity_theorem'],
        ['Cayley–Hamilton theorem', R`Every square matrix satisfies its own characteristic polynomial: $p_A(A)=0$.`, 'Cayley–Hamilton_theorem'],
        ['Jordan normal form', R`Every square complex matrix is similar to a block-diagonal matrix of Jordan blocks.`, 'Jordan_normal_form'],
        ['Singular value decomposition', R`Every real matrix $A$ can be written $A=U\Sigma V^{\top}$ with $U,V$ orthogonal and $\Sigma$ diagonal with non-negative entries.`, 'Singular_value_decomposition'],
        ['Perron–Frobenius theorem', R`A matrix with positive entries has a simple positive eigenvalue equal to its spectral radius, with a positive eigenvector.`, 'Perron–Frobenius_theorem'],

        // ── Abstract algebra ───────────────────────────────────────────
        ['Lagrange’s theorem', R`In a finite group $G$, the order of every subgroup divides $|G|$.`, 'Lagrange\'s_theorem_(group_theory)'],
        ['Cauchy’s theorem (groups)', R`If a prime $p$ divides the order of a finite group $G$, then $G$ has an element of order $p$.`, 'Cauchy\'s_theorem_(group_theory)'],
        ['Sylow theorems', R`If $p^k$ divides $|G|$ for a prime $p$, then $G$ has a subgroup of order $p^k$, and all maximal $p$-subgroups are conjugate.`, 'Sylow_theorems'],
        ['Cayley’s theorem', R`Every group is isomorphic to a subgroup of a symmetric group.`, 'Cayley\'s_theorem'],
        ['First Isomorphism Theorem', R`For a group homomorphism $\varphi:G\to H$, the quotient $G/\ker\varphi$ is isomorphic to the image of $\varphi$.`, 'Isomorphism_theorems'],
        ['Abel–Ruffini theorem', R`There is no general solution in radicals to polynomial equations of degree five or higher.`, 'Abel–Ruffini_theorem'],
        ['Fundamental Theorem of Galois Theory', R`Subgroups of the Galois group of a finite Galois extension correspond bijectively to intermediate fields.`, 'Fundamental_theorem_of_Galois_theory'],
        ['Wedderburn’s little theorem', R`Every finite division ring is a field.`, 'Wedderburn\'s_little_theorem'],
        ['Hilbert’s Nullstellensatz', R`Over an algebraically closed field, the polynomials vanishing on the zero set of an ideal $I$ are exactly the elements of the radical $\sqrt{I}$.`, 'Hilbert\'s_Nullstellensatz'],

        // ── Number theory ──────────────────────────────────────────────
        ['Fundamental Theorem of Arithmetic', R`Every integer greater than $1$ factors into primes in exactly one way, up to order.`, 'Fundamental_theorem_of_arithmetic'],
        ['Euclid’s theorem', R`There are infinitely many prime numbers.`, 'Euclid\'s_theorem'],
        ['Fermat’s little theorem', R`If $p$ is prime and $p\nmid a$, then $a^{p-1}\equiv 1 \pmod p$.`, 'Fermat\'s_little_theorem'],
        ['Euler’s theorem', R`If $a$ and $n$ are coprime, then $a^{\varphi(n)}\equiv 1\pmod n$, where $\varphi$ is Euler’s totient function.`, 'Euler\'s_theorem'],
        ['Wilson’s theorem', R`An integer $n>1$ is prime if and only if $(n-1)!\equiv -1\pmod n$.`, 'Wilson\'s_theorem'],
        ['Chinese Remainder Theorem', R`If $n_1,\dots,n_k$ are pairwise coprime, the system $x\equiv a_i \pmod{n_i}$ has a unique solution modulo $n_1\cdots n_k$.`, 'Chinese_remainder_theorem'],
        ['Quadratic reciprocity', R`For distinct odd primes $p$ and $q$: $\left(\dfrac{p}{q}\right)\left(\dfrac{q}{p}\right)=(-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}$.`, 'Quadratic_reciprocity'],
        ['Fermat’s theorem on sums of two squares', R`An odd prime $p$ is a sum of two squares if and only if $p\equiv 1\pmod 4$.`, 'Fermat\'s_theorem_on_sums_of_two_squares'],
        ['Lagrange’s four-square theorem', R`Every natural number is the sum of four integer squares.`, 'Lagrange\'s_four-square_theorem'],
        ['Dirichlet’s theorem on arithmetic progressions', R`If $a$ and $d$ are coprime, the progression $a,\ a+d,\ a+2d,\ \dots$ contains infinitely many primes.`, 'Dirichlet\'s_theorem_on_arithmetic_progressions'],
        ['Prime Number Theorem', R`The number $\pi(x)$ of primes up to $x$ satisfies $\pi(x)\sim \dfrac{x}{\ln x}$ as $x\to\infty$.`, 'Prime_number_theorem'],
        ['Fermat’s Last Theorem', R`For $n>2$ there are no positive integers $a,b,c$ with $a^n+b^n=c^n$ (proved by Andrew Wiles).`, 'Fermat\'s_Last_Theorem'],

        // ── Topology & geometry ────────────────────────────────────────
        ['Brouwer fixed-point theorem', R`Every continuous map from a closed ball in $\mathbb{R}^n$ to itself has a fixed point.`, 'Brouwer_fixed-point_theorem'],
        ['Jordan curve theorem', R`A simple closed curve in the plane separates it into exactly two regions, an inside and an outside.`, 'Jordan_curve_theorem'],
        ['Hairy ball theorem', R`Every continuous tangent vector field on the 2-sphere vanishes somewhere.`, 'Hairy_ball_theorem'],
        ['Borsuk–Ulam theorem', R`Every continuous map from the $n$-sphere to $\mathbb{R}^n$ sends some pair of antipodal points to the same value.`, 'Borsuk–Ulam_theorem'],
        ['Tychonoff’s theorem', R`Any product of compact topological spaces is compact.`, 'Tychonoff\'s_theorem'],
        ['Euler’s polyhedron formula', R`For a convex polyhedron with $V$ vertices, $E$ edges and $F$ faces: $V-E+F=2$.`, 'Euler_characteristic'],
        ['Gauss–Bonnet theorem', R`For a compact surface $M$: $\int_M K\,dA = 2\pi\,\chi(M)$, where $K$ is the Gaussian curvature and $\chi$ the Euler characteristic.`, 'Gauss–Bonnet_theorem'],
        ['Poincaré conjecture (Perelman)', R`Every simply connected closed 3-manifold is homeomorphic to the 3-sphere.`, 'Poincaré_conjecture'],
        ['Thales’ theorem', R`An angle inscribed in a semicircle is a right angle.`, 'Thales\'s_theorem'],

        // ── Combinatorics & graph theory ───────────────────────────────
        ['Pigeonhole principle', R`If $n$ items are put into $m$ boxes with $n>m$, some box contains more than one item.`, 'Pigeonhole_principle'],
        ['Binomial theorem', R`$(x+y)^n=\sum_{k=0}^{n}\binom{n}{k}x^{n-k}y^k$.`, 'Binomial_theorem'],
        ['Ramsey’s theorem', R`For every $k$ there is $N$ such that every 2-colouring of the edges of the complete graph $K_N$ contains a single-coloured complete subgraph on $k$ vertices.`, 'Ramsey\'s_theorem'],
        ['Hall’s marriage theorem', R`A bipartite graph has a matching covering one side if and only if every subset of that side has at least as many neighbours as members.`, 'Hall\'s_marriage_theorem'],
        ['Cayley’s formula', R`There are $n^{n-2}$ labelled trees on $n$ vertices.`, 'Cayley\'s_formula'],
        ['Euler’s theorem on Eulerian circuits', R`A connected graph has a closed walk using every edge exactly once if and only if every vertex has even degree.`, 'Eulerian_path'],
        ['Kuratowski’s theorem', R`A graph is planar if and only if it contains no subdivision of $K_5$ or $K_{3,3}$.`, 'Kuratowski\'s_theorem'],
        ['Four Colour Theorem', R`Every planar map can be coloured with at most four colours so that neighbouring regions differ.`, 'Four_color_theorem'],
        ['Max-flow min-cut theorem', R`In a flow network, the maximum flow from source to sink equals the minimum capacity of a cut separating them.`, 'Max-flow_min-cut_theorem'],

        // ── Probability & statistics ───────────────────────────────────
        ['Strong Law of Large Numbers', R`If $X_1,X_2,\dots$ are i.i.d. with finite mean $\mu$, then $\dfrac{1}{n}\sum_{i=1}^n X_i\to\mu$ almost surely.`, 'Law_of_large_numbers'],
        ['Central Limit Theorem', R`For i.i.d. $X_i$ with mean $\mu$ and variance $\sigma^2>0$: $\dfrac{\sqrt{n}\,(\bar X_n-\mu)}{\sigma}\xrightarrow{d} N(0,1)$.`, 'Central_limit_theorem'],
        ['Bayes’ theorem', R`$P(A\mid B)=\dfrac{P(B\mid A)\,P(A)}{P(B)}$.`, 'Bayes\'_theorem'],
        ['Chebyshev’s inequality', R`$P(|X-\mu|\ge k\sigma)\le \dfrac{1}{k^2}$ for any random variable with mean $\mu$ and standard deviation $\sigma$.`, 'Chebyshev\'s_inequality'],
        ['Jensen’s inequality', R`For a convex function $\varphi$: $\varphi(\mathbb{E}[X])\le \mathbb{E}[\varphi(X)]$.`, 'Jensen\'s_inequality'],
        ['AM–GM inequality', R`$\dfrac{x_1+\cdots+x_n}{n}\ge \sqrt[n]{x_1\cdots x_n}$ for non-negative $x_i$, with equality only when all are equal.`, 'AM–GM_inequality'],
        ['Borel–Cantelli lemma', R`If $\sum_n P(A_n)<\infty$, then almost surely only finitely many $A_n$ occur.`, 'Borel–Cantelli_lemma'],
        ['Kolmogorov’s zero–one law', R`Every tail event of a sequence of independent random variables has probability $0$ or $1$.`, 'Kolmogorov\'s_zero–one_law'],
        ['Doob’s martingale convergence theorem', R`A martingale bounded in $L^1$ converges almost surely to a finite random variable.`, 'Doob\'s_martingale_convergence_theorems'],
        ['Donsker’s theorem', R`A rescaled random walk converges in distribution, as a path, to Brownian motion.`, 'Donsker\'s_theorem'],
        ['Cramér–Rao bound', R`The variance of any unbiased estimator $\hat\theta$ satisfies $\operatorname{Var}(\hat\theta)\ge \dfrac{1}{I(\theta)}$, where $I$ is the Fisher information.`, 'Cramér–Rao_bound'],

        // ── Stochastic analysis & rough paths ──────────────────────────
        ['Itô’s formula', R`For $f\in C^2$ and Brownian motion $W$: $f(W_t)=f(W_0)+\int_0^t f'(W_s)\,dW_s+\dfrac12\int_0^t f''(W_s)\,ds$.`, 'Itô\'s_lemma'],
        ['Girsanov’s theorem', R`Under an equivalent change of measure, Brownian motion becomes a Brownian motion with drift, and the drift can be chosen freely.`, 'Girsanov_theorem'],
        ['Feynman–Kac formula', R`The solution of a parabolic PDE can be written as an expectation over paths of a diffusion.`, 'Feynman–Kac_formula'],
        ['Kolmogorov continuity theorem', R`If $\mathbb{E}|X_t-X_s|^a\le C|t-s|^{1+b}$, then $X$ has a modification whose paths are $\gamma$-Hölder for every $\gamma<b/a$.`, 'Kolmogorov_continuity_theorem'],
        ['Sewing lemma (rough paths)', R`If a two-parameter family $\Xi$ satisfies $|\Xi_{s,t}-\Xi_{s,u}-\Xi_{u,t}|\le C|t-s|^{\theta}$ with $\theta>1$, there is a unique additive $I$ with $|I_{s,t}-\Xi_{s,t}|\le C'|t-s|^{\theta}$.`, 'Rough_path'],

        // ── Logic, set theory & computation ────────────────────────────
        ['Cantor’s theorem', R`For every set $X$, the power set $\mathcal{P}(X)$ has strictly larger cardinality than $X$.`, 'Cantor\'s_theorem'],
        ['Cantor–Schröder–Bernstein theorem', R`If there are injections $A\to B$ and $B\to A$, then there is a bijection between $A$ and $B$.`, 'Schröder–Bernstein_theorem'],
        ['Gödel’s incompleteness theorems', R`Any consistent, effectively axiomatised system containing arithmetic has true statements it cannot prove, and cannot prove its own consistency.`, 'Gödel\'s_incompleteness_theorems'],
        ['Compactness theorem', R`A set of first-order sentences has a model if and only if every finite subset of it has a model.`, 'Compactness_theorem'],
        ['Undecidability of the halting problem', R`No algorithm can decide, for every program and input, whether the program eventually halts (Turing).`, 'Halting_problem'],
        ['Zorn’s lemma', R`If every chain in a non-empty partially ordered set has an upper bound, the set has a maximal element.`, 'Zorn\'s_lemma'],
        ['Banach–Tarski paradox', R`A solid ball in $\mathbb{R}^3$ can be cut into finitely many pieces and reassembled into two balls of the same size as the original.`, 'Banach–Tarski_paradox'],

        // ── Optimisation, games & information ──────────────────────────
        ['Nash’s existence theorem', R`Every finite game has at least one Nash equilibrium in mixed strategies.`, 'Nash_equilibrium'],
        ['Von Neumann’s minimax theorem', R`In a finite two-player zero-sum game: $\max_x\min_y x^{\top}Ay=\min_y\max_x x^{\top}Ay$.`, 'Minimax_theorem'],
        ['Karush–Kuhn–Tucker conditions', R`At a local optimum of a constrained problem (under regularity assumptions), $\nabla f(x^*)+\sum_i\mu_i\nabla g_i(x^*)+\sum_j\lambda_j\nabla h_j(x^*)=0$ with $\mu_i\ge0$ and $\mu_i g_i(x^*)=0$.`, 'Karush–Kuhn–Tucker_conditions'],
        ['Shannon’s noisy-channel coding theorem', R`Reliable communication over a noisy channel is possible at any rate below the channel capacity $C$, and impossible above it.`, 'Noisy-channel_coding_theorem'],
        ['Noether’s theorem', R`Every continuous symmetry of the action of a physical system corresponds to a conserved quantity.`, 'Noether\'s_theorem']
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
        var stmt = document.getElementById('theoremStatement');
        stmt.textContent = t[1];
        if (window.renderMathInElement) {
            window.renderMathInElement(stmt, {
                delimiters: [{ left: '$', right: '$', display: false }],
                throwOnError: false
            });
        }
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
