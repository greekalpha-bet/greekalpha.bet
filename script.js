/* greekalpha.bet — a tabela do alfabeto grego.

   Os dados ficam no topo: `data` são as 24 letras (glifo, nome, pronúncia
   e grafia grega); `uses`, os usos comuns de cada uma em matemática,
   probabilidade e estatística, em inglês e português; `writing`, como
   escrever cada uma (Unicode, LaTeX, HTML); e `confusables`, as perguntas
   do quiz sobre letras que se confundem. O resto, abaixo, é a interface. */

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

/* ======================================================================
   Interface. Tudo fica dentro de uma função, sem variáveis globais.
   ====================================================================== */
(() => {
  "use strict";

  const I18N = {
    "en": {
      blockMath: "MATHEMATICS",
      blockProb: "PROBABILITY",
      blockStats: "STATISTICS",
      noUse: "(no standard usage; it depends on the author's convention)",
      note: "Note: notations vary between books/fields; these are the most common usages.",
      chart: "Greek alphabet table",
      close: "Close",
      theme: "Toggle theme",
      audioPlay: "Play the alphabet pronunciation",
      audioStop: "Stop the pronunciation",
      print: "Print",
      language: "Language",
      quiz: "Practice: quiz",
      copy: "Copy",
      copied: "Copied",
      howToWrite: "HOW TO WRITE IT — click to copy",
      lower: "lowercase",
      variant: "variant",
      upper: "uppercase",
      latinUpper: "same as the Latin letter: LaTeX has no command for it",
      modeGlyph: "Glyph → name",
      modeName: "Name → glyph",
      modePairs: "Look-alikes",
      whichLetter: "Which letter is this?",
      whichGlyph: "Find this letter:",
      right: "Right!",
      wrong: "Not quite.",
      wrongIs: "It's",
      youChose: "You picked",
      next: "Next",
      review: "To review:",
      score: (r, n, s, b) => `${r}/${n} right · streak ${s} · best ${b}`,
    },
    "pt-BR": {
      blockMath: "MATEMÁTICA",
      blockProb: "PROBABILIDADE",
      blockStats: "ESTATÍSTICA",
      noUse: "(sem uso “padrão”; depende da convenção do autor)",
      note: "Obs.: notações variam entre livros/áreas; aqui estão os usos mais comuns.",
      chart: "Tabela do alfabeto grego",
      close: "Fechar",
      theme: "Alternar tema",
      audioPlay: "Ouvir a pronúncia do alfabeto",
      audioStop: "Parar a pronúncia",
      print: "Imprimir",
      language: "Idioma",
      quiz: "Praticar: quiz",
      copy: "Copiar",
      copied: "Copiado",
      howToWrite: "COMO ESCREVER — clique para copiar",
      lower: "minúscula",
      variant: "variante",
      upper: "maiúscula",
      latinUpper: "igual à letra latina: o LaTeX não tem comando para ela",
      modeGlyph: "Glifo → nome",
      modeName: "Nome → glifo",
      modePairs: "Parecidas",
      whichLetter: "Que letra é esta?",
      whichGlyph: "Encontre esta letra:",
      right: "Isso!",
      wrong: "Quase.",
      wrongIs: "É",
      youChose: "Você marcou",
      next: "Próxima",
      review: "Para revisar:",
      score: (r, n, s, b) => `${r}/${n} acertos · sequência ${s} · recorde ${b}`,
    },
  };

  // localStorage pode não existir (modo privado, bloqueio de cookies).
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem persistência */ } },
  };

  const $ = id => document.getElementById(id);
  const chart = $("chart");
  const stage = document.querySelector(".stage");
  const footer = document.querySelector(".site-footer");
  const backdrop = $("backdrop");
  const modal = backdrop.querySelector(".modal");
  const closeBtn = $("closeBtn");
  const themeToggle = $("themeToggle");
  const audioBtn = $("audioBtn");
  const printBtn = $("printBtn");
  const langToggle = $("langToggle");
  const langMenu = $("langMenu");

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  /* ---------------------------------------------------------- idioma */

  // Sem escolha salva, segue o navegador: português para quem usa pt-*.
  let lang = store.get("lang");
  if (!I18N[lang]) lang = (navigator.language || "").toLowerCase().startsWith("pt") ? "pt-BR" : "en";
  const t = key => I18N[lang][key];

  const label = (btn, text) => { btn.setAttribute("aria-label", text); btn.title = text; };

  function applyLanguage(next) {
    lang = I18N[next] ? next : "en";
    document.documentElement.lang = lang;
    chart.setAttribute("aria-label", t("chart"));
    label(closeBtn, t("close"));
    label(themeToggle, t("theme"));
    label(printBtn, t("print"));
    label(langToggle, t("language"));
    label(audioBtn, audioBtn.getAttribute("aria-pressed") === "true" ? t("audioStop") : t("audioPlay"));
    langMenu.querySelectorAll(".lang-item").forEach(b => b.setAttribute("aria-checked", String(b.dataset.lang === lang)));
    labelQuiz();
    // Os diálogos abertos trocam de língua junto.
    if (current && letterDialog.open) fillModal(current);
    if (quizDialog.open) newQuestion();
  }

  function closeMenu(focusToggle) {
    langMenu.hidden = true;
    langToggle.setAttribute("aria-expanded", "false");
    if (focusToggle) langToggle.focus();
  }

  langToggle.addEventListener("click", () => {
    if (!langMenu.hidden) return closeMenu(false);
    langMenu.hidden = false;
    langToggle.setAttribute("aria-expanded", "true");
    (langMenu.querySelector('[aria-checked="true"]') || langMenu.querySelector(".lang-item")).focus();
  });
  langMenu.addEventListener("click", e => {
    const item = e.target.closest(".lang-item");
    if (!item) return;
    applyLanguage(item.dataset.lang);
    store.set("lang", lang);
    closeMenu(true);
  });
  langMenu.addEventListener("keydown", e => {
    const items = [...langMenu.querySelectorAll(".lang-item")];
    const i = items.indexOf(document.activeElement);
    if (e.key === "Escape") closeMenu(true);
    else if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  });
  document.addEventListener("click", e => {
    if (!langMenu.hidden && !e.target.closest(".lang")) closeMenu(false);
  });

  /* ---------------------------------------------------------- tabela */

  // Seis letras por linha, com um fio entre as linhas. No celular, o CSS
  // desfaz as linhas (display: contents) e reorganiza em três colunas.
  function render() {
    const PER_ROW = 6;
    chart.replaceChildren();
    for (let r = 0; r < data.length; r += PER_ROW) {
      if (r) chart.appendChild(el("div", "rule"));
      const row = el("div", "row");
      data.slice(r, r + PER_ROW).forEach(item => row.appendChild(makeCell(item)));
      chart.appendChild(row);
    }
  }

  function makeCell(item) {
    const cell = el("button", "cell");
    cell.type = "button";
    cell.dataset.id = item.id;
    const latin = el("span", "latin");
    latin.append(el("span", "name", item.name), el("span", "ipa", item.ipa));
    const meta = el("span", "meta");
    meta.append(latin, el("span", "greek", item.greek));
    cell.append(el("span", "glyph", item.glyph), meta);
    cell.addEventListener("click", () => openModal(item));
    return cell;
  }

  /* ---------------------------------------------------------- ajuste à tela */

  // No desktop a tabela inteira cabe na tela, sem rolagem: mede-se o espaço
  // livre e aplica-se uma escala. No celular (ver o CSS) isso deixaria as
  // letras minúsculas; lá a tabela vira uma grade de três colunas que rola.
  const MOBILE = matchMedia("(max-width: 600px)");

  function fitToScreen() {
    if (MOBILE.matches) {
      chart.style.transform = chart.style.left = chart.style.top = "";
      return;
    }
    chart.style.transform = "scale(1)";
    const area = stage.getBoundingClientRect();
    // Quanto o rodapé fixo invade o palco (medido, sem número mágico).
    const overlap = footer ? Math.max(0, area.bottom - footer.getBoundingClientRect().top) : 0;
    const availW = area.width, availH = area.height - overlap;
    const { width: w, height: h } = chart.getBoundingClientRect();
    if (w <= 0 || h <= 0 || availW <= 0 || availH <= 0) return;
    const s = Math.min(availW / w, availH / h) * 0.995;
    chart.style.transform = `scale(${s})`;
    chart.style.left = `${Math.max(0, (availW - w * s) / 2)}px`;
    chart.style.top = `${Math.max(0, (availH - h * s) / 2)}px`;
  }

  // Um ajuste por quadro, venha o pedido de onde vier.
  let fitPending = 0;
  const scheduleFit = () => {
    cancelAnimationFrame(fitPending);
    fitPending = requestAnimationFrame(fitToScreen);
  };

  /* ---------------------------------------------------------- diálogos */

  // O comportamento comum ao modal da letra e ao quiz: o foco entra ao
  // abrir, não sai com Tab, Esc e o clique fora fecham, e ao fechar o foco
  // volta para onde estava.
  function makeDialog(backdropEl, onClose) {
    const box = backdropEl.querySelector(".modal");
    let lastFocus = null;
    const api = {
      get open() { return !backdropEl.hidden; },
      show(focusEl) {
        if (backdropEl.hidden) lastFocus = document.activeElement;
        backdropEl.hidden = false;
        document.body.classList.add("modal-open");
        (focusEl || box.querySelector(".close")).focus();
      },
      hide() {
        if (backdropEl.hidden) return;
        backdropEl.hidden = true;
        document.body.classList.remove("modal-open");
        if (onClose) onClose();
        if (lastFocus) lastFocus.focus();
      },
    };
    box.querySelector(".close").addEventListener("click", () => api.hide());
    backdropEl.addEventListener("click", e => { if (e.target === backdropEl) api.hide(); });
    document.addEventListener("keydown", e => {
      if (!api.open) return;
      if (e.key === "Escape") return api.hide();
      if (e.key === "Tab") {
        const f = [...box.querySelectorAll("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    return api;
  }

  /* ---------------------------------------------------------- copiar */

  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // Sem a API (http, navegador antigo): o caminho antigo, por seleção.
      const ta = el("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    btn.classList.add("is-copied");
    btn.setAttribute("aria-label", `${t("copied")}: ${text}`);
    clearTimeout(btn._t);
    btn._t = setTimeout(() => {
      btn.classList.remove("is-copied");
      btn.setAttribute("aria-label", `${t("copy")}: ${text}`);
    }, 1400);
  }

  function copyButton(text, cls) {
    const b = el("button", `copy ${cls}`, text);
    b.type = "button";
    b.setAttribute("aria-label", `${t("copy")}: ${text}`);
    b.addEventListener("click", () => copyText(text, b));
    return b;
  }

  // Uma linha por forma: o caractere, o LaTeX e a entidade HTML, cada um
  // num botão que copia.
  function writingBlock(id) {
    const w = writing[id];
    if (!w) return null;
    const box = el("section", "writing");
    box.appendChild(el("h3", null, t("howToWrite")));
    const table = el("div", "writing-rows");
    const row = (labelText, [ch, tex, ent, latin]) => {
      const r = el("div", "writing-row");
      r.append(el("span", "writing-label", labelText), copyButton(ch, "is-char"), copyButton(tex, "is-tex"), copyButton(ent, "is-ent"));
      if (latin) r.appendChild(el("span", "writing-hint", t("latinUpper")));
      table.appendChild(r);
    };
    w.lo.forEach((f, i) => row(i ? t("variant") : t("lower"), f));
    row(t("upper"), w.up);
    box.appendChild(table);
    return box;
  }

  /* ---------------------------------------------------------- modal da letra */

  let current = null;
  const letterDialog = makeDialog(backdrop, () => { current = null; });

  function block(title, items) {
    const b = el("section", "block");
    const ul = el("ul");
    (items && items.length ? items : [t("noUse")]).forEach(text => ul.appendChild(el("li", null, text)));
    b.append(el("h3", null, title), ul);
    return b;
  }

  function fillModal(item) {
    const u = (uses[item.id] || {})[lang] || {};
    $("bigGlyph").textContent = item.glyph;
    $("modalTitle").textContent = item.name;
    $("modalSub").textContent = `${item.greek} · ${item.ipa}`;
    $("modalBody").replaceChildren(
      block(t("blockMath"), u.math),
      block(t("blockProb"), u.prob),
      block(t("blockStats"), u.stats),
      writingBlock(item.id) || "",
      el("p", "note", t("note")));
  }

  function openModal(item) {
    current = item;
    fillModal(item);
    letterDialog.show(closeBtn);
  }
  const closeModal = () => letterDialog.hide();

  /* ---------------------------------------------------------- quiz */

  // Peso de cada letra: errar aumenta, acertar diminui, e as mais pesadas
  // são sorteadas mais vezes. Fica no navegador, entre visitas.
  const quizEls = {
    modes: $("quizModes"), ask: $("quizAsk"), prompt: $("quizPrompt"), options: $("quizOptions"),
    feedback: $("quizFeedback"), score: $("quizScore"), next: $("quizNext"), review: $("quizReview"),
  };
  const quiz = {
    mode: ["glyph", "name", "pairs"].includes(store.get("quizMode")) ? store.get("quizMode") : "glyph",
    weights: (() => { try { return JSON.parse(store.get("quizWeights")) || {}; } catch (e) { return {}; } })(),
    best: Number(store.get("quizBest")) || 0,
    right: 0, total: 0, streak: 0, q: null, last: null,
  };
  const quizDialog = makeDialog($("quizBackdrop"));
  const byId = Object.fromEntries(data.map(d => [d.id, d]));
  const lower = item => item.glyph[1];
  const nice = name => name[0] + name.slice(1).toLowerCase();
  const shuffle = xs => { const a = [...xs]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const weight = id => quiz.weights[id] || 1;

  function pickLetter() {
    const pool = data.filter(d => d.id !== quiz.last);
    let r = Math.random() * pool.reduce((s, d) => s + weight(d.id), 0);
    for (const d of pool) { r -= weight(d.id); if (r <= 0) return d; }
    return pool[pool.length - 1];
  }

  function newQuestion() {
    quiz.answered = false;
    quizEls.feedback.textContent = "";
    quizEls.feedback.className = "quiz-feedback";
    quizEls.next.hidden = true;
    let q;
    if (quiz.mode === "pairs") {
      const pool = confusables.filter(c => c !== quiz.last);
      const c = pool[Math.floor(Math.random() * pool.length)];
      quiz.last = c;
      q = { ask: c.ask[lang], prompt: "", options: shuffle(c.options), answer: c.options[0], why: c.why[lang], glyphOptions: true };
    } else {
      const item = pickLetter();
      quiz.last = item.id;
      const others = shuffle(data.filter(d => d.id !== item.id)).slice(0, 3);
      const choices = shuffle([item, ...others]);
      if (quiz.mode === "glyph") {
        // Às vezes a maiúscula, mas em geral a minúscula, que confunde mais.
        const ch = Math.random() < 0.3 ? item.glyph[0] : lower(item);
        q = { ask: t("whichLetter"), prompt: ch, promptClass: "is-glyph", options: choices.map(d => nice(d.name)), answer: nice(item.name), item, choices };
      } else {
        q = { ask: t("whichGlyph"), prompt: nice(item.name), promptClass: "is-name", options: choices.map(lower), answer: lower(item), item, choices, glyphOptions: true };
      }
    }
    quiz.q = q;
    quizEls.ask.textContent = q.ask;
    quizEls.prompt.textContent = q.prompt;
    quizEls.prompt.className = `quiz-prompt ${q.promptClass || ""}`;
    quizEls.prompt.hidden = !q.prompt;
    quizEls.options.replaceChildren(...q.options.map((text, i) => {
      const b = el("button", `quiz-option${q.glyphOptions ? " is-glyph" : ""}`);
      b.type = "button";
      b.append(el("span", "quiz-key", String(i + 1)), el("span", null, text));
      b.addEventListener("click", () => answer(i));
      return b;
    }));
    renderScore();
    quizEls.options.firstChild.focus();
  }

  function answer(i) {
    const q = quiz.q;
    if (quiz.answered) return;
    quiz.answered = true;
    const ok = q.options[i] === q.answer;
    quiz.total++;
    if (ok) { quiz.right++; quiz.streak++; } else quiz.streak = 0;
    if (quiz.streak > quiz.best) { quiz.best = quiz.streak; store.set("quizBest", quiz.best); }
    if (q.item) {
      const w = weight(q.item.id);
      quiz.weights[q.item.id] = ok ? Math.max(0.5, w * 0.6) : Math.min(8, w * 2 + 1);
      store.set("quizWeights", JSON.stringify(quiz.weights));
    }
    [...quizEls.options.children].forEach((b, j) => {
      b.disabled = true;
      if (q.options[j] === q.answer) b.classList.add("is-right");
      else if (j === i) b.classList.add("is-wrong");
    });
    let msg;
    if (q.item) {
      const it = q.item, tex = writing[it.id].lo[0][1];
      msg = `${lower(it)} = ${nice(it.name)} · ${tex}`;
      if (!ok) {
        const chosen = q.choices[i];
        msg = `${t("wrongIs")} ${lower(it)} = ${nice(it.name)}. ${t("youChose")} ${nice(chosen.name)} (${lower(chosen)}).`;
      }
    } else {
      msg = q.why;
    }
    quizEls.feedback.textContent = `${ok ? t("right") : t("wrong")} ${msg}`;
    quizEls.feedback.className = `quiz-feedback ${ok ? "is-right" : "is-wrong"}`;
    renderScore();
    quizEls.next.hidden = false;
    quizEls.next.focus();
  }

  function renderScore() {
    quizEls.score.textContent = t("score")(quiz.right, quiz.total, quiz.streak, quiz.best);
    const weak = data.filter(d => weight(d.id) >= 2).sort((a, b) => weight(b.id) - weight(a.id)).slice(0, 6);
    quizEls.review.textContent = weak.length ? `${t("review")} ${weak.map(lower).join("  ")}` : "";
  }

  function setMode(mode) {
    quiz.mode = mode;
    store.set("quizMode", mode);
    quizEls.modes.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    newQuestion();
  }

  function labelQuiz() {
    const names = { glyph: t("modeGlyph"), name: t("modeName"), pairs: t("modePairs") };
    quizEls.modes.querySelectorAll("button").forEach(b => { b.textContent = names[b.dataset.mode]; });
    quizEls.next.textContent = t("next");
    label($("quizClose"), t("close"));
    label($("quizBtn"), t("quiz"));
  }

  $("quizBtn").addEventListener("click", () => {
    if (letterDialog.open) letterDialog.hide();
    quizDialog.show();
    setMode(quiz.mode);
  });
  quizEls.modes.addEventListener("click", e => { const b = e.target.closest("button"); if (b) setMode(b.dataset.mode); });
  quizEls.next.addEventListener("click", newQuestion);
  document.addEventListener("keydown", e => {
    if (!quizDialog.open || e.altKey || e.ctrlKey || e.metaKey) return;
    const n = Number(e.key);
    if (n >= 1 && n <= 4 && !quiz.answered) { e.preventDefault(); answer(n - 1); }
  });

  /* ---------------------------------------------------------- tema */

  // O <head> já aplicou o tema antes da primeira pintura; aqui só o botão.
  const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
  themeToggle.setAttribute("aria-pressed", String(isLight()));
  themeToggle.addEventListener("click", () => {
    const next = isLight() ? "dark" : "light";
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    themeToggle.setAttribute("aria-pressed", String(next === "light"));
    store.set("theme", next);
  });

  /* ---------------------------------------------------------- áudio */

  // O MP3 (≈ 210 KB) só é baixado no primeiro clique, não em toda visita.
  let audio = null;
  const setPlaying = on => {
    audioBtn.setAttribute("aria-pressed", String(on));
    label(audioBtn, on ? t("audioStop") : t("audioPlay"));
  };
  audioBtn.addEventListener("click", () => {
    if (!audio) {
      audio = new Audio("./assets/audio/greek-alphabet-pronunciation.mp3");
      audio.addEventListener("ended", () => setPlaying(false));
      audio.addEventListener("pause", () => setPlaying(false));
    }
    if (audio.paused) {
      audio.currentTime = 0;
      audio.play().then(() => setPlaying(true), () => setPlaying(false));
    } else {
      audio.pause();
    }
  });

  /* ---------------------------------------------------------- imprimir */

  printBtn.addEventListener("click", () => {
    closeModal();
    window.print();
  });

  /* ---------------------------------------------------------- início */

  render();
  applyLanguage(lang);
  // A tabela muda de tamanho quando as fontes chegam; o palco, quando a
  // janela muda. Os dois disparam o ajuste, que roda uma vez por quadro.
  const ro = new ResizeObserver(scheduleFit);
  ro.observe(stage);
  ro.observe(chart);
  if (footer) ro.observe(footer);
  if (document.fonts) document.fonts.ready.then(scheduleFit);
  MOBILE.addEventListener("change", scheduleFit);
  scheduleFit();
})();
