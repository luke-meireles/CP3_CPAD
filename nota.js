export function calcularPontuacao(nota) {
  if (!nota) return null;
  return Math.round(nota * 10);
}

export function corDaPontuacao(pontuacao) {
  if (pontuacao === null) return '#d8d8d8';
  if (pontuacao >= 75) return '#00ce7a';
  if (pontuacao >= 50) return '#ffbd3f';
  return '#ff6874';
}

export function textoDaPontuacao(pontuacao) {
  if (pontuacao === null) return 'Sem avaliações';
  if (pontuacao >= 90) return 'Otimo';
  if (pontuacao >= 75) return 'Bom';
  if (pontuacao >= 50) return 'Mediano';
  return 'Ruim';
}
