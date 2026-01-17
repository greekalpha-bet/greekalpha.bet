# GreekAlpha.bet

Uma ferramenta interativa para estudar o alfabeto grego, com glyphs, pronúncia e usos comuns em matemática, probabilidade e estatística.

- Demo local: abra [index.html](index.html) no navegador.

## Recursos
- Tabela interativa das letras gregas
- Modal com informações (grafia, pronúncia, usos)
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

## Estrutura importante
- [index.html](index.html) — página principal
- [style.css](style.css) — estilos
- [script.js](script.js) — lógica/JS
- assets/ — imagens, áudio e ícones
- LICENSE — licença do projeto (MIT)

## Contribuição
Pull requests bem-vindos. Abra uma issue para discutir mudanças maiores.

## Licença
Veja o arquivo [LICENSE](LICENSE).

---
Created and maintained by the greekalpha.bet project.
