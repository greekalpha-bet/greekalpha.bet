/* greekalpha.bet — os dados do alfabeto grego, a única fonte.

   O navegador carrega este arquivo antes do script.js, e o build.mjs gera
   as páginas estáticas a partir dele. Depois de editar algo aqui, rode
   `node build.mjs` para refazer o HTML.

   Aqui estão: `data` são as 24 letras (glifo, nome, pronúncia
   e grafia grega); `uses`, os usos comuns de cada uma em matemática,
   probabilidade e estatística, em inglês e português; `writing`, como
   escrever cada uma (Unicode, LaTeX, HTML); `confusables`, as perguntas
   do quiz sobre letras que se confundem; `audioClips`, o trecho de cada
   letra no áudio; `examples`, fórmulas em que cada letra aparece; e
   `namesPt`, os nomes em português. */

const data = [
  { id:"alpha",   glyph:"Αα", name:"ALPHA",   ipa:"[a]",  greek:"ἄλφα" },
  { id:"beta",    glyph:"Ββ", name:"BETA",    ipa:"[b]",  greek:"βῆτα" },
  { id:"gamma",   glyph:"Γγ", name:"GAMMA",   ipa:"[g]",  greek:"γάμμα" },
  { id:"delta",   glyph:"Δδ", name:"DELTA",   ipa:"[d]",  greek:"δέλτα" },
  { id:"epsilon", glyph:"Εε", name:"EPSILON", ipa:"[e]",  greek:"ἐ ψιλόν" },
  { id:"zeta",    glyph:"Ζζ", name:"ZETA",    ipa:"[dz]", greek:"ζῆτα" },

  { id:"eta",     glyph:"Ηη", name:"ETA",     ipa:"[ɛː]", greek:"ἦτα" },
  { id:"theta",   glyph:"Θθ", name:"THETA",   ipa:"[tʰ]", greek:"θῆτα" },
  { id:"iota",    glyph:"Ιι", name:"IOTA",    ipa:"[i]",  greek:"ἰῶτα" },
  { id:"kappa",   glyph:"Κκ", name:"KAPPA",   ipa:"[k]",  greek:"κάππα" },
  { id:"lambda",  glyph:"Λλ", name:"LAMBDA",  ipa:"[l]",  greek:"λάμβδα" },
  { id:"mu",      glyph:"Μμ", name:"MU",      ipa:"[m]",  greek:"μῦ" },

  { id:"nu",      glyph:"Νν", name:"NU",      ipa:"[n]",  greek:"νῦ" },
  { id:"xi",      glyph:"Ξξ", name:"XI",      ipa:"[ks]", greek:"ξεῖ" },
  { id:"omicron", glyph:"Οο", name:"OMICRON", ipa:"[o]",  greek:"ὂ μικρόν" },
  { id:"pi",      glyph:"Ππ", name:"PI",      ipa:"[p]",  greek:"πεῖ" },
  { id:"rho",     glyph:"Ρρ", name:"RHO",     ipa:"[r]",  greek:"ῥῶ" },
  { id:"sigma",   glyph:"Σσς",name:"SIGMA",   ipa:"[s]",  greek:"σίγμα" },

  { id:"tau",     glyph:"Ττ", name:"TAU",     ipa:"[t]",  greek:"ταῦ" },
  { id:"upsilon", glyph:"Υυ", name:"UPSILON", ipa:"[u]",  greek:"ὖ ψιλόν" },
  { id:"phi",     glyph:"Φφ", name:"PHI",     ipa:"[pʰ]", greek:"φεῖ" },
  { id:"chi",     glyph:"Χχ", name:"CHI",     ipa:"[kʰ]", greek:"χεῖ" },
  { id:"psi",     glyph:"Ψψ", name:"PSI",     ipa:"[ps]", greek:"ψεῖ" },
  { id:"omega",   glyph:"Ωω", name:"OMEGA",   ipa:"[ɔː]", greek:"ὦ μέγα" },
];

/* uses (short versions for mobile) - bilingual: 'pt-BR' and 'en' */
const uses = {
  alpha: {
    'pt-BR': {
      math: ["Ângulo/constante em fórmulas.", "Parâmetro em funções e séries."],
      prob: ["Parâmetro de forma em Beta/Gamma (convenção comum).", "Nível de significância em testes (via estatística)."],
      stats: ["Nível de significância (α) e erro tipo I.", "Em modelos, pode aparecer como parâmetro/hiperparâmetro."]
    },
    'en': {
      math: ["Angle/constant in formulas.", "Parameter in functions and series."],
      prob: ["Shape parameter in Beta/Gamma distributions (common convention).", "Significance level in hypothesis tests (α)."],
      stats: ["Significance level (α) and Type I error.", "Can appear as a model/ hyper-parameter."]
    }
  },
  beta: {
    'pt-BR': {
      math: ["Função Beta B(·,·) e integrais.", "Constantes/coeficientes genéricos."],
      prob: ["Distribuição Beta (parâmetros α, β).", "Parâmetro em modelos bayesianos (hiperparâmetro)."],
      stats: ["Coeficientes em regressão (β).", "Erro tipo II (β) e poder (1−β)."]
    },
    'en': {
      math: ["Beta function B(·,·) and integrals.", "Generic constants/coefficients."],
      prob: ["Beta distribution (parameters α, β).", "Prior/hyperparameter in Bayesian models."],
      stats: ["Regression coefficients (β).", "Type II error (β) and power (1−β)."]
    }
  },
  gamma: {
    'pt-BR': {
      math: ["Função Gamma Γ(·).", "Constante de Euler–Mascheroni (γ) em análise."],
      prob: ["Distribuição Gamma (forma/escala, convenções).", "Aparece em Poisson–Gamma (conjugação)."],
      stats: ["Ligada a estimação em modelos com Gamma/Exponencial.", "Aparece em verossimilhança e funções especiais."]
    },
    'en': {
      math: ["Gamma function Γ(·).", "Euler–Mascheroni constant (γ) in analysis."],
      prob: ["Gamma distribution (shape/scale conventions).", "Appears in Poisson–Gamma conjugacy."],
      stats: ["Used in models/estimation with Gamma/Exponential families.", "Shows up in likelihoods and special functions."]
    }
  },
  delta: {
    'pt-BR': {
      math: ["Variação/diferença: Δx.", "Delta de Kronecker δᵢⱼ e delta de Dirac δ(·)."],
      prob: ["Massa pontual pode ser escrita com δ(·) em teoria de medidas.", "Diferença entre eventos/valores (Δ)."],
      stats: ["Diferença de médias/efeitos: Δ.", "Incrementos em otimização numérica."]
    },
    'en': {
      math: ["Change/difference: Δx.", "Kronecker delta δᵢⱼ and Dirac delta δ(·)."],
      prob: ["Point mass can be written with δ(·) in measure theory.", "Difference between events/values (Δ)."],
      stats: ["Difference of means/effects: Δ.", "Increments in numerical optimization."]
    }
  },
  epsilon: {
    'pt-BR': {
      math: ["Quantidade “muito pequena” (ε).", "Limites: definições ε–δ."],
      prob: ["Erros/perturbações pequenas em aproximações.", "Margem ε em desigualdades/limites."],
      stats: ["Erro/resíduo (ε) em regressão.", "Precisão numérica (machine epsilon)."]
    },
    'en': {
      math: ["A very small quantity (ε).", "Limits: ε–δ definitions."],
      prob: ["Small errors/perturbations in approximations.", "Margin ε in inequalities/limits."],
      stats: ["Error/residual (ε) in regression.", "Numerical precision (machine epsilon)."]
    }
  },
  zeta: {
    'pt-BR': {
      math: ["Função zeta de Riemann ζ(s).", "Aparece em séries e teoria dos números."],
      prob: ["Menos comum; pode surgir em funções especiais.", "Às vezes parâmetro/constante em modelos específicos."],
      stats: ["Raro como padrão; usado em alguns textos para parâmetros auxiliares.", "Se aparecer, é convenção do autor."]
    },
    'en': {
      math: ["Riemann zeta function ζ(s).", "Occurs in series and number theory."],
      prob: ["Less common; appears in special functions.", "Sometimes used as a parameter/constant in specific models."],
      stats: ["Rare as a standard; used in some contexts as auxiliary parameter.", "If used, it's author-specific convention."]
    }
  },
  eta: {
    'pt-BR': {
      math: ["Parâmetro/constante em diversas áreas.", "Notação de eficiência/viscosidade (fora da matemática pura)."],
      prob: ["Raro como padrão; pode ser parâmetro em textos específicos."],
      stats: ["Tamanho de efeito: η² (ANOVA).", "Outras medidas: η (convenções em alguns livros)."]
    },
    'en': {
      math: ["Parameter/constant across areas.", "Notation for efficiency/viscosity (in applied contexts)."],
      prob: ["Rare as a standard; may be a parameter in specific texts."],
      stats: ["Effect size: η² (ANOVA).", "Other measures: η (by convention in some texts)."]
    }
  },
  theta: {
    'pt-BR': {
      math: ["Ângulo (θ) e coordenadas polares.", "Parâmetro genérico em funções."],
      prob: ["Parâmetro desconhecido do modelo (θ).", "Bayes: prior/posterior sobre θ."],
      stats: ["Parâmetro do modelo a ser estimado (θ).", "MLE/MAP e inferência sobre θ."]
    },
    'en': {
      math: ["Angle (θ) and polar coordinates.", "Generic parameter in functions."],
      prob: ["Unknown model parameter (θ).", "Bayes: prior/posterior over θ."],
      stats: ["Model parameter to be estimated (θ).", "MLE/MAP and inference for θ."]
    }
  },
  iota: {
    'pt-BR': {
      math: ["Notação rara hoje; pode indicar inclusão/índice.", "Em alguns textos: operador/pequena quantidade."],
      prob: ["Pouco usado; depende do autor."],
      stats: ["Pouco usado; se aparecer, normalmente é convenção local do material."]
    },
    'en': {
      math: ["Rare notation today; may indicate inclusion/index.", "Sometimes used for a small operator/quantity."],
      prob: ["Seldom used; depends on the author."],
      stats: ["Seldom used; if present, usually local convention."]
    }
  },
  kappa: {
    'pt-BR': {
      math: ["Curvatura κ em geometria.", "Constante/índice em fórmulas."],
      prob: ["Parâmetro de concentração (ex.: von Mises, em alguns contextos)."],
      stats: ["Coeficiente Kappa de Cohen (concordância).", "Pode aparecer em estatística direcional."]
    },
    'en': {
      math: ["Curvature κ in geometry.", "Constant/index in formulas."],
      prob: ["Concentration parameter (e.g., von Mises)."],
      stats: ["Cohen's Kappa (agreement measure).", "Appears in directional statistics."]
    }
  },
  lambda: {
    'pt-BR': {
      math: ["Autovalores (λ).", "Multiplicador de Lagrange (λ)."],
      prob: ["Taxa em Poisson (λ) e Exponencial (λ).", "Intensidade em processos de Poisson."],
      stats: ["Parâmetro de taxa/regularização (λ) em alguns métodos.", "Aparece em GLMs/penalizações (ridge/lasso em convenções)."]
    },
    'en': {
      math: ["Eigenvalues (λ).", "Lagrange multiplier (λ)."],
      prob: ["Rate in Poisson/Exponential (λ).", "Intensity in Poisson processes."],
      stats: ["Rate/regularization parameter (λ).", "Appears in GLMs/penalties (ridge/lasso)."]
    }
  },
  mu: {
    'pt-BR': {
      math: ["Constante/índice; prefixo micro (μ) em unidades."],
      prob: ["Parâmetro de localização (μ) em Normais e outras famílias.", "Média teórica quando existe."],
      stats: ["Média populacional (μ).", "Estimativa: \u03bĉ (mu chapéu) em alguns textos."]
    },
    'en': {
      math: ["Constant/index; micro prefix (μ) in units."],
      prob: ["Location parameter (μ) in Normal and other families.", "Theoretical mean when it exists."],
      stats: ["Population mean (μ).", "Estimate: \u03bĉ (mu-hat) in some texts."]
    }
  },
  nu: {
    'pt-BR': {
      math: ["Frequência ν (em aplicações).", "Índice/parâmetro em funções especiais."],
      prob: ["Parâmetro de liberdade/forma em algumas famílias (convenções)."],
      stats: ["Graus de liberdade (ν).", "Muito comum em t de Student e qui-quadrado (via ν)."]
    },
    'en': {
      math: ["Frequency ν (in applications).", "Index/parameter in special functions."],
      prob: ["Degrees of freedom/shape parameter in some families."],
      stats: ["Degrees of freedom (ν).", "Common in Student's t and chi-square distributions."]
    }
  },
  xi: {
    'pt-BR': {
      math: ["Variável/índice (ξ).", "Aparece em PDEs e funções especiais."],
      prob: ["Variável aleatória (ξ) em alguns textos.", "Parâmetro em modelos estocásticos (convenção)."],
      stats: ["Às vezes usado para observações latentes/ruído.", "Depende da convenção do autor."]
    },
    'en': {
      math: ["Variable/index (ξ).", "Appears in PDEs and special functions."],
      prob: ["Random variable (ξ) in some texts.", "Parameter in stochastic models (convention)."],
      stats: ["Sometimes used for latent observations/noise.", "Depends on author convention."]
    }
  },
  omicron: {
    'pt-BR': {
      math: ["Notação assintótica: o(n), o(1).", "“Pequeno-o” (ordem estrita)."],
      prob: ["Aparece em limites de sequência de variáveis (o_p(1)).", "Em convergência em probabilidade."],
      stats: ["Notação: o_p(1), O_p(·) em teoria assintótica.", "Muito usado em econometria/teoria de estimadores."]
    },
    'en': {
      math: ["Asymptotic notation: o(n), o(1).", "Small-o (strict order)."],
      prob: ["Appears in limits of sequences (o_p(1)).", "In convergence in probability."],
      stats: ["Notation: o_p(1), O_p(·) in asymptotic theory.", "Used in econometrics/estimation theory."]
    }
  },
  pi: {
    'pt-BR': {
      math: ["Constante π.", "Operador produto Π (pi maiúsculo)."],
      prob: ["Aparece em densidades/normalizações (π).", "Em Bayes, π(θ) pode denotar prior (convenção)."],
      stats: ["Pode denotar proporção/probabilidade em modelos (π).", "Em logística: π(x)=P(Y=1|x) (convenção)."]
    },
    'en': {
      math: ["Constant π.", "Product operator Π (uppercase Pi)."],
      prob: ["Appears in densities/normalizations (π).", "In Bayes, π(θ) may denote a prior."],
      stats: ["May denote proportion/probability (π).", "In logistic: π(x)=P(Y=1|x)."]
    }
  },
  rho: {
    'pt-BR': {
      math: ["Coordenada radial ρ (às vezes).", "Parâmetro/constante em equações."],
      prob: ["Densidade/medida em alguns contextos (ρ).", "Pode aparecer como parâmetro de dependência."],
      stats: ["Correlação populacional (ρ).", "Spearman ρ (correlação por postos)."]
    },
    'en': {
      math: ["Radial coordinate ρ (sometimes).", "Parameter/constant in equations."],
      prob: ["Density/measure in some contexts (ρ).", "Can appear as a dependence parameter."],
      stats: ["Population correlation (ρ).", "Spearman's ρ (rank correlation)."]
    }
  },
  sigma: {
    'pt-BR': {
      math: ["Somatório Σ (sigma maiúsculo).", "Estruturas: σ-álgebra (sigma)."],
      prob: ["Espaços de prob.: σ-álgebra (F).", "σ(X) = σ-álgebra gerada por X."],
      stats: ["Desvio-padrão populacional (σ).", "Variância (σ²) em modelos normais."]
    },
    'en': {
      math: ["Summation Σ (uppercase sigma).", "Structures: σ-algebra (sigma)."],
      prob: ["Probability spaces: σ-algebra (F).", "σ(X) = σ-algebra generated by X."],
      stats: ["Population standard deviation (σ).", "Variance (σ²) in normal models."]
    }
  },
  tau: {
    'pt-BR': {
      math: ["Constante/tempo característico (aplicações).", "Notação em topologia (τ) em alguns textos."],
      prob: ["Menos comum; aparece em modelos específicos.", "Parâmetro/limiar em certas construções."],
      stats: ["Kendall’s τ (correlação por concordância).", "Muito usado em estatística não-paramétrica."]
    },
    'en': {
      math: ["Constant/characteristic time (applications).", "Topology notation (τ) in some texts."],
      prob: ["Less common; appears in specific models.", "Parameter/threshold in certain constructions."],
      stats: ["Kendall's τ (rank correlation).", "Common in nonparametric statistics."]
    }
  },
  upsilon: {
    'pt-BR': {
      math: ["Pouco usado; às vezes em funções especiais.", "Pode ser usado como variável auxiliar."],
      prob: ["Raro como padrão; depende do autor."],
      stats: ["Raro; se aparecer, é convenção do material."]
    },
    'en': {
      math: ["Seldom used; sometimes in special functions.", "May be used as an auxiliary variable."],
      prob: ["Rare as a standard; depends on the author."],
      stats: ["Rare; if used, it's a material-specific convention."]
    }
  },
  phi: {
    'pt-BR': {
      math: ["φ: ângulo/função genérica; razão áurea (φ) em alguns contextos.", "Φ: função de distribuição normal padrão (comum)."],
      prob: ["φ/Φ aparecem em densidade/CDF da Normal.", "Também pode denotar função característica (varia por autor)."],
      stats: ["Φ(z): CDF da N(0,1) em testes e ICs.", "φ(z): densidade normal em regressão/GLMs."]
    },
    'en': {
      math: ["φ: angle/generic function; golden ratio (φ) sometimes.", "Φ: standard normal CDF (often)."],
      prob: ["φ/Φ appear in the Normal density/CDF.", "Can also denote characteristic function (author dependent)."],
      stats: ["Φ(z): CDF of N(0,1) in tests and CIs.", "φ(z): normal density in regression/GLMs."]
    }
  },
  chi: {
    'pt-BR': {
      math: ["Letra usada em funções especiais.", "Índice/variável em algumas áreas."],
      prob: ["Distribuição qui-quadrado χ².", "Aparece em testes e medidas de distância."],
      stats: ["Testes χ² (aderência/independência).", "Estatística χ² em tabelas de contingência."]
    },
    'en': {
      math: ["Letter used in special functions.", "Index/variable in some areas."],
      prob: ["Chi-square distribution χ².", "Appears in tests and distance measures."],
      stats: ["χ² tests (goodness-of-fit/independence).", "χ² statistic in contingency tables."]
    }
  },
  psi: {
    'pt-BR': {
      math: ["Função digama ψ(x) (derivada de log Γ).", "Símbolo genérico em análise."],
      prob: ["Surge em momentos/estimativas envolvendo Γ/Beta.", "Aparece em inferência bayesiana com conjugações."],
      stats: ["Digama ψ em MLE de Gamma/Dirichlet.", "Usado em EM/variacional em alguns modelos."]
    },
    'en': {
      math: ["Digamma function ψ(x) (derivative of log Γ).", "Generic symbol in analysis."],
      prob: ["Appears in moments/estimates involving Γ/Beta.", "Shows up in Bayesian conjugacy contexts."],
      stats: ["Digamma ψ in MLE of Gamma/Dirichlet.", "Used in EM/variational algorithms in some models."]
    }
  },
  omega: {
    'pt-BR': {
      math: ["Notação de ordem: Ω(·) (limite inferior assintótico).", "Conjunto/constante em vários contextos."],
      prob: ["Espaço amostral: Ω.", "Eventos são subconjuntos de Ω."],
      stats: ["Base formal: (Ω, F, P).", "Ajuda a organizar eventos/variáveis aleatórias."]
    },
    'en': {
      math: ["Order notation: Ω(·) (asymptotic lower bound).", "Set/constant in various contexts."],
      prob: ["Sample space: Ω.", "Events are subsets of Ω."],
      stats: ["Formal basis: (Ω, F, P).", "Organizes events/random variables."]
    }
  }
};

/* Como escrever cada letra: [caractere, comando LaTeX, entidade HTML].
   `lo` traz a minúscula e, quando há, a variante de forma; `up`, a
   maiúscula. Maiúsculas iguais às latinas não têm comando em LaTeX: lá
   se usa a letra latina (A, B, E…), e `latin` marca isso. Atenção a dois
   pares: em LaTeX, \epsilon dá ϵ e \varepsilon dá ε; \phi dá ϕ e
   \varphi dá φ (o contrário do que muita gente espera). */
const writing = {
  alpha:   { lo: [["α", "\\alpha", "&alpha;"]], up: ["Α", "A", "&Alpha;", "latin"] },
  beta:    { lo: [["β", "\\beta", "&beta;"]], up: ["Β", "B", "&Beta;", "latin"] },
  gamma:   { lo: [["γ", "\\gamma", "&gamma;"]], up: ["Γ", "\\Gamma", "&Gamma;"] },
  delta:   { lo: [["δ", "\\delta", "&delta;"]], up: ["Δ", "\\Delta", "&Delta;"] },
  epsilon: { lo: [["ε", "\\varepsilon", "&epsilon;"], ["ϵ", "\\epsilon", "&epsiv;"]], up: ["Ε", "E", "&Epsilon;", "latin"] },
  zeta:    { lo: [["ζ", "\\zeta", "&zeta;"]], up: ["Ζ", "Z", "&Zeta;", "latin"] },
  eta:     { lo: [["η", "\\eta", "&eta;"]], up: ["Η", "H", "&Eta;", "latin"] },
  theta:   { lo: [["θ", "\\theta", "&theta;"], ["ϑ", "\\vartheta", "&thetav;"]], up: ["Θ", "\\Theta", "&Theta;"] },
  iota:    { lo: [["ι", "\\iota", "&iota;"]], up: ["Ι", "I", "&Iota;", "latin"] },
  kappa:   { lo: [["κ", "\\kappa", "&kappa;"], ["ϰ", "\\varkappa", "&kappav;"]], up: ["Κ", "K", "&Kappa;", "latin"] },
  lambda:  { lo: [["λ", "\\lambda", "&lambda;"]], up: ["Λ", "\\Lambda", "&Lambda;"] },
  mu:      { lo: [["μ", "\\mu", "&mu;"]], up: ["Μ", "M", "&Mu;", "latin"] },
  nu:      { lo: [["ν", "\\nu", "&nu;"]], up: ["Ν", "N", "&Nu;", "latin"] },
  xi:      { lo: [["ξ", "\\xi", "&xi;"]], up: ["Ξ", "\\Xi", "&Xi;"] },
  omicron: { lo: [["ο", "o", "&omicron;"]], up: ["Ο", "O", "&Omicron;", "latin"] },
  pi:      { lo: [["π", "\\pi", "&pi;"], ["ϖ", "\\varpi", "&piv;"]], up: ["Π", "\\Pi", "&Pi;"] },
  rho:     { lo: [["ρ", "\\rho", "&rho;"], ["ϱ", "\\varrho", "&rhov;"]], up: ["Ρ", "P", "&Rho;", "latin"] },
  sigma:   { lo: [["σ", "\\sigma", "&sigma;"], ["ς", "\\varsigma", "&sigmaf;"]], up: ["Σ", "\\Sigma", "&Sigma;"] },
  tau:     { lo: [["τ", "\\tau", "&tau;"]], up: ["Τ", "T", "&Tau;", "latin"] },
  upsilon: { lo: [["υ", "\\upsilon", "&upsilon;"]], up: ["Υ", "\\Upsilon", "&Upsilon;"] },
  phi:     { lo: [["φ", "\\varphi", "&phi;"], ["ϕ", "\\phi", "&phiv;"]], up: ["Φ", "\\Phi", "&Phi;"] },
  chi:     { lo: [["χ", "\\chi", "&chi;"]], up: ["Χ", "X", "&Chi;", "latin"] },
  psi:     { lo: [["ψ", "\\psi", "&psi;"]], up: ["Ψ", "\\Psi", "&Psi;"] },
  omega:   { lo: [["ω", "\\omega", "&omega;"]], up: ["Ω", "\\Omega", "&Omega;"] },
};

/* Quiz, modo "pares que confundem": a resposta é sempre a primeira opção
   (a ordem na tela é sorteada). Só entram pares que dá para distinguir à
   vista — ο e o, por exemplo, são idênticos e ficaram de fora. */
const confusables = [
  { ask: { "en": "Which one is the Greek nu?", "pt-BR": "Qual é o nu grego?" }, options: ["ν", "v", "υ", "γ"],
    why: { "en": "ν (nu) is angular, with the right stroke taller; the Latin v is symmetrical; υ (upsilon) is round at the bottom; γ (gamma) drops below the line.",
           "pt-BR": "ν (nu) é anguloso, com o traço da direita mais alto; o v latino é simétrico; υ (upsilon) é redondo embaixo; γ (gama) desce abaixo da linha." } },
  { ask: { "en": "Which one is the Greek upsilon?", "pt-BR": "Qual é o upsilon grego?" }, options: ["υ", "u", "ν", "v"],
    why: { "en": "υ is round at the bottom and open at the top, without the little tail of the Latin u.",
           "pt-BR": "υ é redondo embaixo e aberto em cima, sem a perninha do u latino." } },
  { ask: { "en": "Which one is the Greek rho?", "pt-BR": "Qual é o rô grego?" }, options: ["ρ", "p", "φ", "β"],
    why: { "en": "In ρ the stem grows out of the bowl in one curve; the Latin p has a separate straight stem.",
           "pt-BR": "No ρ a haste nasce da própria curva, num traço só; o p latino tem uma haste reta à parte." } },
  { ask: { "en": "Which one is the Greek chi?", "pt-BR": "Qual é o qui grego?" }, options: ["χ", "x", "κ", "λ"],
    why: { "en": "χ drops below the baseline and its strokes curve; the Latin x sits on the line.",
           "pt-BR": "χ desce abaixo da linha e tem os traços curvos; o x latino fica apoiado na linha." } },
  { ask: { "en": "Which one is the Greek eta?", "pt-BR": "Qual é o eta grego?" }, options: ["η", "n", "μ", "ν"],
    why: { "en": "η has a right leg that drops below the baseline; the Latin n doesn't.",
           "pt-BR": "η tem a perna da direita descendo abaixo da linha; o n latino não." } },
  { ask: { "en": "Which one is the Greek omega?", "pt-BR": "Qual é o ômega grego?" }, options: ["ω", "w", "ϖ", "π"],
    why: { "en": "ω is round, like two u's joined; the Latin w is angular; ϖ is the variant pi, with a bar on top.",
           "pt-BR": "ω é arredondado, como dois u colados; o w latino é anguloso; ϖ é a variante do pi, com uma barra em cima." } },
  { ask: { "en": "Which one is the Greek iota?", "pt-BR": "Qual é o iota grego?" }, options: ["ι", "i", "l", "ı"],
    why: { "en": "ι (iota) is short and has no dot; ı is the Turkish dotless i, a Latin letter.",
           "pt-BR": "ι (iota) é curto e sem pingo; ı é o i sem pingo do turco, uma letra latina." } },
  { ask: { "en": "Which one is the Greek kappa?", "pt-BR": "Qual é o capa grego?" }, options: ["κ", "k", "χ", "x"],
    why: { "en": "κ fits in the height of lowercase letters; the Latin k has a tall ascender.",
           "pt-BR": "κ cabe na altura das minúsculas; o k latino tem a haste alta." } },
  { ask: { "en": "Which one is zeta?", "pt-BR": "Qual é o zeta?" }, options: ["ζ", "ξ", "ς", "γ"],
    why: { "en": "ζ has a single turn before the tail; ξ has two; ς is the final sigma.",
           "pt-BR": "ζ tem uma volta só antes da cauda; ξ tem duas; ς é o sigma final." } },
  { ask: { "en": "Which one is xi?", "pt-BR": "Qual é o xi?" }, options: ["ξ", "ζ", "ε", "ς"],
    why: { "en": "ξ has two turns stacked before the tail — like a 3 with a tail; ζ has only one.",
           "pt-BR": "ξ tem duas voltas empilhadas antes da cauda, como um 3 com rabo; ζ tem uma só." } },
  { ask: { "en": "Which one is the “element of” symbol (not a letter)?", "pt-BR": "Qual é o símbolo de “pertence a” (não a letra)?" }, options: ["∈", "ε", "ϵ", "€"],
    why: { "en": "∈ (element of, \\in in LaTeX) is a symbol of its own, derived from the lunate epsilon ϵ.",
           "pt-BR": "∈ (pertence, \\in em LaTeX) é um símbolo à parte, derivado do epsilon lunado ϵ." } },
  { ask: { "en": "Which one is the summation operator (not the letter)?", "pt-BR": "Qual é o operador de somatório (não a letra)?" }, options: ["∑", "Σ", "Ε", "∏"],
    why: { "en": "∑ (U+2211, \\sum) is the operator, larger and with more air; Σ (U+03A3) is the letter. Copied as text, they are different characters.",
           "pt-BR": "∑ (U+2211, \\sum) é o operador, maior e mais espaçado; Σ (U+03A3) é a letra. Copiados como texto, são caracteres diferentes." } },
  { ask: { "en": "Which one is the shape written with \\varphi?", "pt-BR": "Qual é a forma escrita com \\varphi?" }, options: ["φ", "ϕ", "ψ", "θ"],
    why: { "en": "\\varphi gives the open, loopy φ; \\phi gives ϕ, with a straight stroke through a closed circle.",
           "pt-BR": "\\varphi dá o φ aberto, em laço; \\phi dá ϕ, com um traço reto atravessando um círculo fechado." } },
  { ask: { "en": "Which one is \\vartheta?", "pt-BR": "Qual é o \\vartheta?" }, options: ["ϑ", "θ", "δ", "ϕ"],
    why: { "en": "ϑ is the cursive theta, open at the top right; θ is the closed oval with a bar.",
           "pt-BR": "ϑ é o teta cursivo, aberto em cima à direita; θ é o oval fechado com uma barra." } },
];

/* Onde cada letra é pronunciada no MP3 do alfabeto, em segundos [início,
   fim]. Medido pelas pausas entre as letras (ffmpeg silencedetect, -35 dB,
   pausas de 0,25 s ou mais: 24 trechos, um por letra, na ordem). O
   cortar-audio.mjs grava cada trecho em assets/audio/letters/<id>.mp3,
   que é o que o botão "Ouvir" toca. */
const audioClips = {
  alpha: [0, 0.56],         beta: [1.58, 2.0],      gamma: [2.98, 3.42],    delta: [4.47, 4.92],
  epsilon: [5.9, 6.46],     zeta: [7.46, 7.89],     eta: [8.9, 9.25],       theta: [10.29, 10.68],
  iota: [11.67, 12.13],     kappa: [13.15, 13.5],   lambda: [14.5, 14.97],  mu: [16.0, 16.57],
  nu: [17.55, 18.13],       xi: [19.13, 19.72],     omicron: [20.68, 21.22], pi: [22.25, 22.48],
  rho: [23.51, 23.79],      sigma: [24.83, 25.32],  tau: [26.34, 26.6],     upsilon: [27.63, 28.2],
  phi: [29.23, 29.85],      chi: [30.84, 31.54],    psi: [32.53, 33.09],    omega: [34.08, 34.56],
};

/* Exemplos de fórmula: onde a letra aparece de verdade. `f` em texto
   (Unicode; um objeto { en, pt } quando a escrita muda com a língua),
   `en`/`pt` o que é, e `link`, quando houver, a página no
   morrisonkuhlsen.com que a explica, em cada língua. */
const MK = "https://morrisonkuhlsen.com";
const examples = {
  alpha: [
    { f: "P(rejeitar H₀ | H₀ verdadeira) = α", en: "α is the Type I error rate: the chance of rejecting a true null hypothesis.", pt: "α é a taxa de erro tipo I: a chance de rejeitar uma hipótese nula verdadeira.",
      link: { en: "/en/formulas/statistical-power.html", pt: "/formulas/poder-estatistico.html" } },
    { f: "IC de 1 − α:  x̄ ± z₍α/2₎ · σ/√n", en: "A confidence interval at level 1 − α (95% when α = 0.05).", pt: "Um intervalo de confiança de nível 1 − α (95% quando α = 0,05).",
      link: { en: "/en/formulas/confidence-interval.html", pt: "/formulas/intervalo-confianca.html" } },
  ],
  beta: [
    { f: "poder = 1 − β", en: "β is the Type II error rate; 1 − β, the power of a test.", pt: "β é a taxa de erro tipo II; 1 − β, o poder do teste.",
      link: { en: "/en/formulas/statistical-power.html", pt: "/formulas/poder-estatistico.html" } },
    { f: "y = β₀ + β₁x + ε", en: "Intercept and slope of a linear regression.", pt: "Intercepto e inclinação de uma regressão linear.",
      link: { en: "/en/formulas/linear-regression.html", pt: "/formulas/regressao-linear.html" } },
  ],
  gamma: [
    { f: "Γ(n) = (n − 1)!", en: "The Gamma function extends the factorial (here, for whole n ≥ 1).", pt: "A função Gama estende o fatorial (aqui, para n inteiro ≥ 1)." },
  ],
  delta: [
    { f: "Δ = b² − 4ac", en: "The discriminant of a quadratic: it tells how many real roots there are.", pt: "O discriminante da equação do 2º grau: diz quantas raízes reais há.",
      link: { en: "/en/formulas/quadratic-formula.html", pt: "/matematica-basica/equacao-2grau.html" } },
    { f: "Δy / Δx", en: "Change in y over change in x: the slope between two points.", pt: "Variação de y sobre variação de x: a inclinação entre dois pontos." },
  ],
  epsilon: [
    { f: "y = β₀ + β₁x + ε", en: "ε is the error term: what the line does not explain.", pt: "ε é o termo de erro: o que a reta não explica.",
      link: { en: "/en/formulas/linear-regression.html", pt: "/formulas/regressao-linear.html" } },
    { f: "∀ε > 0, ∃δ > 0: |x − a| < δ ⇒ |f(x) − L| < ε", en: "The ε–δ definition of a limit.", pt: "A definição de limite por ε–δ." },
  ],
  zeta: [
    { f: "ζ(2) = Σ 1/n² = π²/6", en: "The Riemann zeta function at 2 (the Basel problem).", pt: "A função zeta de Riemann em 2 (o problema da Basileia)." },
  ],
  eta: [
    { f: "η² = SQ_entre / SQ_total", en: "Effect size in ANOVA: the share of the variation explained by the groups.", pt: "Tamanho de efeito na ANOVA: a fração da variação explicada pelos grupos.",
      link: { en: "/en/statistical-tests/one-way-anova/", pt: "/testes-estatisticos/anova/" } },
  ],
  theta: [
    { f: "θ̂ = argmax L(θ)", en: "The maximum likelihood estimate of a parameter θ.", pt: "A estimativa de máxima verossimilhança de um parâmetro θ." },
    { f: { en: "x = r cos θ,  y = r sin θ", pt: "x = r cos θ,  y = r sen θ" }, en: "Polar coordinates: θ is the angle.", pt: "Coordenadas polares: θ é o ângulo." },
  ],
  kappa: [
    { f: "κ = (pₒ − pₑ) / (1 − pₑ)", en: "Cohen's kappa: agreement between two raters beyond chance.", pt: "Kappa de Cohen: concordância entre dois avaliadores além do acaso.",
      link: { en: "/en/statistical-tests/cohens-kappa/", pt: "/testes-estatisticos/kappa/" } },
  ],
  lambda: [
    { f: "P(X = k) = λᵏ e^(−λ) / k!", en: "The Poisson distribution: λ is the average rate of events.", pt: "A distribuição de Poisson: λ é a taxa média de eventos.",
      link: { en: "/en/formulas/poisson-distribution.html", pt: "/formulas/distribuicao-poisson.html" } },
    { f: "Av = λv", en: "λ is an eigenvalue of the matrix A.", pt: "λ é um autovalor da matriz A." },
  ],
  mu: [
    { f: "Z = (X − μ) / σ", en: "Standardising: how many standard deviations X is from the mean μ.", pt: "Padronização: a quantos desvios-padrão X está da média μ.",
      link: { en: "/en/formulas/z-score.html", pt: "/formulas/z-score.html" } },
  ],
  nu: [
    { f: "t ~ t(ν),  ν = n − 1", en: "ν is the degrees of freedom of the t distribution.", pt: "ν são os graus de liberdade da distribuição t.",
      link: { en: "/en/formulas/students-t-test.html", pt: "/formulas/t-student.html" } },
  ],
  pi: [
    { f: "f(x) = e^(−(x − μ)²/(2σ²)) / (σ√(2π))", en: "π in the normal density: it makes the area under the curve equal 1.", pt: "π na densidade normal: é o que faz a área sob a curva dar 1.",
      link: { en: "/en/formulas/normal-distribution.html", pt: "/formulas/distribuicao-normal.html" } },
    { f: "C = 2πr", en: "π is the ratio of a circle's circumference to its diameter.", pt: "π é a razão entre o comprimento da circunferência e o diâmetro.",
      link: { pt: "/matematica-basica/constantes.html#pi" } },
    { f: "Π xᵢ = x₁ · x₂ · … · xₙ", en: "The uppercase Π is the product operator, as Σ is for sums.", pt: "O Π maiúsculo é o operador produto, como o Σ é o da soma." },
  ],
  rho: [
    { f: "ρ = Cov(X, Y) / (σₓ σᵧ)", en: "The population correlation between X and Y.", pt: "A correlação populacional entre X e Y.",
      link: { en: "/en/formulas/pearson-correlation.html", pt: "/formulas/coeficiente-pearson.html" } },
    { f: "ρₛ = 1 − 6 Σ dᵢ² / (n(n² − 1))", en: "Spearman's rank correlation (without ties).", pt: "A correlação de postos de Spearman (sem empates).",
      link: { en: "/en/statistical-tests/spearman-correlation/", pt: "/testes-estatisticos/spearman/" } },
  ],
  sigma: [
    { f: "Z = (X − μ) / σ", en: "σ, the population standard deviation, is the unit of the z-score.", pt: "σ, o desvio-padrão populacional, é a unidade do escore z.",
      link: { en: "/en/formulas/z-score.html", pt: "/formulas/z-score.html" } },
    { f: "Σ xᵢ = x₁ + x₂ + … + xₙ", en: "The uppercase Σ is the summation operator.", pt: "O Σ maiúsculo é o operador de somatório." },
  ],
  tau: [
    { f: "τ = (C − D) / (n(n − 1)/2)", en: "Kendall's tau: concordant minus discordant pairs, over all pairs.", pt: "O tau de Kendall: pares concordantes menos discordantes, sobre todos os pares.",
      link: { en: "/en/statistical-tests/kendall-tau/", pt: "/testes-estatisticos/kendall/" } },
  ],
  phi: [
    { f: "Φ(z) = P(Z ≤ z)", en: "Φ is the cumulative distribution function of the standard normal.", pt: "Φ é a função de distribuição acumulada da normal padrão.",
      link: { en: "/ztable.html", pt: "/ztable.html" } },
    { f: { en: "φ = (1 + √5) / 2 ≈ 1.618", pt: "φ = (1 + √5) / 2 ≈ 1,618" }, en: "φ is also the golden ratio.", pt: "φ também é a razão áurea.",
      link: { pt: "/matematica-basica/constantes.html#phi" } },
  ],
  chi: [
    { f: "χ² = Σ (O − E)² / E", en: "The chi-square statistic: observed against expected counts.", pt: "A estatística qui-quadrado: contagens observadas contra esperadas.",
      link: { en: "/en/formulas/chi-square-test.html", pt: "/formulas/qui-quadrado.html" } },
  ],
  psi: [
    { f: "ψ(x) = d/dx ln Γ(x)", en: "The digamma function, the derivative of the log of Γ.", pt: "A função digama, a derivada do logaritmo de Γ." },
  ],
  omega: [
    { f: "P(Ω) = 1", en: "Ω is the sample space: everything that can happen has probability 1.", pt: "Ω é o espaço amostral: tudo o que pode acontecer tem probabilidade 1.",
      link: { pt: "/matematica-basica/conjuntos.html" } },
  ],
};

/* Nomes em português, para as páginas em /pt/: o rótulo (maiúsculas, como
   na tabela) e o slug do endereço (sem acento). */
const namesPt = {
  alpha: ["ALFA", "alfa"],       beta: ["BETA", "beta"],         gamma: ["GAMA", "gama"],
  delta: ["DELTA", "delta"],     epsilon: ["ÉPSILON", "epsilon"], zeta: ["ZETA", "zeta"],
  eta: ["ETA", "eta"],           theta: ["TETA", "teta"],         iota: ["IOTA", "iota"],
  kappa: ["CAPA", "capa"],       lambda: ["LAMBDA", "lambda"],    mu: ["MI", "mi"],
  nu: ["NI", "ni"],              xi: ["CSI", "csi"],              omicron: ["ÔMICRON", "omicron"],
  pi: ["PI", "pi"],              rho: ["RÔ", "ro"],               sigma: ["SIGMA", "sigma"],
  tau: ["TAU", "tau"],           upsilon: ["ÚPSILON", "upsilon"], phi: ["FI", "fi"],
  chi: ["QUI", "qui"],           psi: ["PSI", "psi"],             omega: ["ÔMEGA", "omega"],
};

// No navegador estes dados ficam no escopo global (os scripts clássicos o
// dividem); no Node, o build.mjs os importa por aqui.
if (typeof module !== "undefined") module.exports = { data, uses, writing, confusables, namesPt, audioClips, examples, MK };
