// greekalpha.bet — recorta o MP3 do alfabeto em um arquivo por letra.
//
//   node cortar-audio.mjs
//
// Usa os trechos de `audioClips` (data.js) e grava assets/audio/letters/<id>.mp3,
// no mesmo formato do original (MP3 mono, 24 kHz, 48 kbps). Só precisa rodar
// quando o áudio ou os trechos mudarem. Requer o ffmpeg.
//
// Por que arquivos separados, e não pular para o trecho dentro do MP3
// inteiro: pular exige o arquivo carregado (ou um servidor que aceite ler
// pedaços), e o Safari só toca áudio iniciado no próprio clique. Com um
// arquivo por letra, ouvir é um play() simples, que funciona em todo lugar,
// e cada um tem uns poucos KB.

import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const { audioClips } = createRequire(import.meta.url)("./data.js");
const SRC = join(ROOT, "assets/audio/greek-alphabet-pronunciation.mp3");
const OUT = join(ROOT, "assets/audio/letters");
mkdirSync(OUT, { recursive: true });

// Folga: o começo e o fim medidos pelo silêncio cortam um pouco das bordas
// da palavra (o "a" final de "alpha" é baixo e cai abaixo do limiar).
const ANTES = 0.05, DEPOIS = 0.12, FADE = 0.015;

for (const [id, [ini, fim]] of Object.entries(audioClips)) {
  const de = Math.max(0, ini - ANTES), dur = fim + DEPOIS - de;
  execFileSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    "-ss", de.toFixed(3), "-t", dur.toFixed(3), "-i", SRC,
    "-af", `afade=t=in:d=${FADE},afade=t=out:st=${(dur - FADE).toFixed(3)}:d=${FADE}`,
    "-ac", "1", "-ar", "24000", "-b:a", "48k", "-map_metadata", "-1",
    join(OUT, `${id}.mp3`),
  ]);
}
console.log(`${Object.keys(audioClips).length} arquivos em assets/audio/letters/`);
