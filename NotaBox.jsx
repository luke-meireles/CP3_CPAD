import { View, Text, StyleSheet } from 'react-native';
import { calcularPontuacao, corDaPontuacao } from './nota';

export function NotaBox({ nota, pequeno }) {
  const pontuacao = calcularPontuacao(nota);

  return (
    <View
      style={[
        styles.caixa,
        pequeno ? styles.caixaPequena : null,
        { backgroundColor: corDaPontuacao(pontuacao) },
      ]}
    >
      <Text style={[styles.numero, pequeno ? styles.numeroPequeno : null]}>
        {pontuacao === null ? 'tbd' : pontuacao}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaPequena: { width: 38, height: 38, borderRadius: 6 },
  numero: { fontSize: 24, fontWeight: 'bold', color: '#262626' },
  numeroPequeno: { fontSize: 15 },
});
