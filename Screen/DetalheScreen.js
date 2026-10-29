import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NotaBox } from '../NotaBox';
import { calcularPontuacao, textoDaPontuacao } from '../nota';

export default function DetalheScreen({ route }) {
  const { id, nome, imagem, nota, generos } = route.params;

  const [episodios, setEpisodios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarEpisodios() {
      try {
        const resposta = await fetch(
          `https://api.tvmaze.com/shows/${id}/episodes`
        );

        if (!resposta.ok) {
          throw new Error('Erro HTTP ' + resposta.status);
        }

        const json = await resposta.json();
        setEpisodios(json);
      } catch (e) {
        setErro('Não foi possível carregar os episódios. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    }

    buscarEpisodios();
  }, [id]);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#00ce7a" />
        <Text style={styles.textoAuxiliar}>Carregando episódios</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.poster} />
        ) : (
          <View style={[styles.poster, styles.semPoster]}>
            <Text style={styles.textoSemPoster}>Sem imagem</Text>
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.generos}>
            {generos && generos.length > 0 ? generos.join(' · ') : 'Série'}
          </Text>
          <View style={styles.linhaNota}>
            <NotaBox nota={nota} />
            <Text style={styles.classificacao}>
              {textoDaPontuacao(calcularPontuacao(nota))}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.secao}>Episódios ({episodios.length})</Text>

      <FlatList
        data={episodios}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.episodio}>
            <View style={styles.episodioTexto}>
              <Text style={styles.codigo}>
                T{item.season} · E{item.number ? item.number : '-'}
              </Text>
              <Text style={styles.nomeEpisodio}>{item.name}</Text>
            </View>
            <NotaBox
              nota={item.rating ? item.rating.average : null}
              pequeno={true}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  textoAuxiliar: { marginTop: 12, color: '#666' },
  erro: { color: '#ff6874', fontSize: 16, textAlign: 'center' },
  cabecalho: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f2f2f2',
  },
  poster: { width: 100, height: 140, borderRadius: 6 },
  semPoster: {
    backgroundColor: '#d8d8d8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSemPoster: { fontSize: 11, color: '#666', textAlign: 'center' },
  info: { flex: 1, marginLeft: 12 },
  nome: { fontSize: 22, fontWeight: 'bold', color: '#262626' },
  generos: { fontSize: 13, color: '#666', marginTop: 4 },
  linhaNota: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  classificacao: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#262626',
  },
  secao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#262626',
    marginHorizontal: 12,
    marginTop: 14,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  episodio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  episodioTexto: { flex: 1, marginRight: 10 },
  codigo: { fontSize: 12, fontWeight: 'bold', color: '#666' },
  nomeEpisodio: { fontSize: 15, color: '#262626', marginTop: 2 },
});
