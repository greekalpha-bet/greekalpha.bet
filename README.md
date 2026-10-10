# GreekAlpha.bet

Uma ferramenta interativa para estudar o alfabeto grego, com glyphs, pronúncia e usos comuns em matemática, probabilidade e estatística.

- Demo local: abra [index.html](index.html) no navegador.

## Recursos
- Tabela interativa das letras gregas, em inglês (`/`) e português (`/pt/`)
- Uma página por letra, com usos, como escrever (Unicode, LaTeX, HTML) e letras com que não confundir
- Modal com informações (grafia, pronúncia, usos) e cópia com um clique
- Quiz com repetição espaçada (glifo → nome, nome → glifo, letras parecidas)
- Troca de tema (claro/escuro)
- Áudio de pronúncia: `assets/audio/greek-alphabet-pronunciation.mp3`
- Alternância de idioma (EN / PT-BR)

## Executando localmente
Este projeto é estático — basta servir os arquivos ou abrir `index.html` diretamente.

Opções recomendadas (no diretório do projeto):

- Servidor simples com Python 3 (recomendado):

```powershell
python -m http.server 8000
# abra http://localhost:8000
```

- Usando `npx serve` (Node.js):

```bash
npx serve .
```

## Estrutura
- [data.js](data.js) — **a única fonte dos dados**: as letras, os usos (EN/PT), como escrever cada uma (Unicode, LaTeX, HTML), as perguntas de letras parecidas e os nomes em português
- [build.mjs](build.mjs) — gera o HTML estático a partir do `data.js`
- [script.js](script.js) — a interface (modal, quiz, cópia, tema, áudio, ajuste da tabela à tela)
- [style.css](style.css) — estilos
- assets/ — imagens e áudio
- LICENSE — licença do projeto (MIT)

### Páginas geradas (não edite à mão)
`node build.mjs` (Node 18+, sem dependências) escreve:
- `index.html` e `pt/index.html` — a tabela, em inglês e português, já pronta no HTML
- `<letra>/index.html` e `pt/<letra>/index.html` — uma página por letra (ex.: `/sigma/`, `/pt/teta/`)
- `sitemap.xml` e `robots.txt`

Depois de mudar o `data.js` ou o `build.mjs`, rode `node build.mjs` e faça commit do HTML gerado junto: o GitHub Pages serve os arquivos como estão. Ao mudar o CSS ou o JS, aumente `VERSION` no `build.mjs` para os navegadores não usarem a versão em cache.

## Contribuição
Pull requests bem-vindos. Abra uma issue para discutir mudanças maiores.

## Licença
Veja o arquivo [LICENSE](LICENSE).

---
Created and maintained by the greekalpha.bet project.
