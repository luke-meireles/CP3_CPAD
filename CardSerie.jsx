import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NotaBox } from './NotaBox';
import {
  calcularPontuacao,
  corDaPontuacao,
  textoDaPontuacao,
} from './nota';

export function CardSerie({ nome, imagem, genero, nota, onPress }) {
  const pontuacao = calcularPontuacao(nota);

  return (
    <TouchableOpacity
      style={[styles.card, { borderTopColor: corDaPontuacao(pontuacao) }]}
      onPress={onPress}
    >
      <View style={styles.topo}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.poster} />
        ) : (
          <View style={[styles.poster, styles.semPoster]}>
            <Text style={styles.textoSemPoster}>Sem imagem</Text>
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.tag}>{genero}</Text>
        </View>
      </View>

      <View style={styles.rodape}>
        <View style={styles.rodapeTexto}>
          <Text style={styles.rotulo}>NOTA</Text>
          <Text style={styles.classificacao}>
            {textoDaPontuacao(pontuacao)}
          </Text>
        </View>
        <NotaBox nota={nota} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderTopWidth: 8,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 14,
  },
  topo: { flexDirection: 'row' },
  poster: { width: 90, height: 126, borderRadius: 6 },
  semPoster: {
    backgroundColor: '#d8d8d8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSemPoster: { fontSize: 11, color: '#666', textAlign: 'center' },
  info: { flex: 1, marginLeft: 12 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#262626' },
  tag: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 8,
    fontSize: 11,
    color: '#666',
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 12,
    paddingTop: 10,
  },
  rodapeTexto: { flex: 1 },
  rotulo: { fontSize: 11, letterSpacing: 2, color: '#666' },
  classificacao: { fontSize: 14, fontWeight: 'bold', color: '#262626', marginTop: 2 },
});
