import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { CardSerie } from '../CardSerie';

export default function ListaScreen({ navigation }) {
  const [series, setSeries] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState('');
  const [ordem, setOrdem] = useState('nota');

  useEffect(() => {
    async function buscarSeries() {
      try {
        const resposta = await fetch('https://api.tvmaze.com/shows');

        if (!resposta.ok) {
          throw new Error('Erro HTTP ' + resposta.status);
        }

        const json = await resposta.json();
        setSeries(json);
      } catch (e) {
        setErro('Não foi possível carregar as séries. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    }

    buscarSeries();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#00ce7a" />
        <Text style={styles.textoAuxiliar}>Carregando séries...</Text>
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

  const textoBusca = busca.trim().toLowerCase();

const filtradas = series.filter((serie) =>
  serie.name.toLowerCase().includes(textoBusca)
);

const seriesExibidas = [...filtradas].sort((a, b) => {
  if (ordem === 'alfabetica') {
    return a.name.localeCompare(b.name);
  }
  const notaA = a.rating && a.rating.average ? a.rating.average : 0;
  const notaB = b.rating && b.rating.average ? b.rating.average : 0;
  return notaB - notaA;
});

  return (
    <View style={styles.container}>
      <Text style={styles.secao}>Séries em destaque</Text>

      <TextInput
  style={styles.input}
  placeholder="Buscar série..."
  value={busca}
  onChangeText={setBusca}
/>

<View style={styles.linhaOrdem}>
  <Text style={styles.rotuloOrdem}>Ordenar por:</Text>

  <TouchableOpacity
    style={[styles.opcao, ordem === 'nota' ? styles.opcaoAtiva : null]}
    onPress={() => setOrdem('nota')}
  >
    <Text style={[styles.textoOpcao, ordem === 'nota' ? styles.textoAtivo : null]}>
      Nota
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.opcao, ordem === 'alfabetica' ? styles.opcaoAtiva : null]}
    onPress={() => setOrdem('alfabetica')}
  >
    <Text style={[styles.textoOpcao, ordem === 'alfabetica' ? styles.textoAtivo : null]}>
      A–Z
    </Text>
  </TouchableOpacity>
</View>
    {seriesExibidas.length === 0 ? (
  <Text style={styles.vazio}>Nenhuma série encontrada.</Text>
) : (
      <FlatList
        data={seriesExibidas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const imagem = item.image ? item.image.medium : null;
          const nota = item.rating ? item.rating.average : null;
          const genero =
            item.genres && item.genres.length > 0 ? item.genres[0] : 'Série';

          return (
            <CardSerie
              nome={item.name}
              imagem={imagem}
              genero={genero}
              nota={nota}
              onPress={() =>
                navigation.navigate('Detalhe', {
                  id: item.id,
                  nome: item.name,
                  imagem: imagem,
                  nota: nota,
                  generos: item.genres,
                })
              }
            />
          );
        }}
      />
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  secao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262626',
    marginHorizontal: 12,
    marginTop: 16,
    marginBottom: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  textoAuxiliar: { marginTop: 12, color: '#666' },
  erro: { color: '#ff6874', fontSize: 16, textAlign: 'center' },
input: {
  backgroundColor: '#f2f2f2',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  fontSize: 15,
  marginHorizontal: 12,
},
linhaOrdem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 12,
  marginTop: 10,
  marginBottom: 12,
},
rotuloOrdem: { fontSize: 13, color: '#666', marginRight: 8 },
opcao: {
  borderWidth: 1,
  borderColor: '#262626',
  borderRadius: 16,
  paddingHorizontal: 14,
  paddingVertical: 5,
  marginRight: 8,
},
opcaoAtiva: { backgroundColor: '#262626' },
textoOpcao: { fontSize: 13, fontWeight: 'bold', color: '#262626' },
textoAtivo: { color: '#fff' },
vazio: { textAlign: 'center', color: '#666', marginTop: 24 },
});
