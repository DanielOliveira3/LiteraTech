import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ---- Tipos ----
type Categoria = { key: string; label: string };
type Produto = {
  id: string;
  titulo: string;
  preco: number;
  categoria: string;
  autor: string;
  editora: string;
  descricao: string;
  imagem: string;
};

// ---- Mock Data ----
const CATEGORIES: Categoria[] = [
  { key: "todos", label: "Todos" },
  { key: "acao", label: "Ação" },
  { key: "comedia", label: "Comédia" },
  { key: "fabula", label: "Fábula" },
  { key: "hq", label: "HQ" },
  { key: "romance", label: "Romance" },
  { key: "terror", label: "Terror" },
];

const PRODUCTS: Produto[] = [
  {
    id: "16",
    titulo: "Drácula",
    preco: 29.9,
    categoria: "hq",
    autor: "Bram Stoker",
    editora: "Principis",
    descricao: "Retrata um mito literário que hoje conhecemos como vampiro.",
    imagem:
      "//livros/HQ/IMG/Drácula.png",
  },
    {
    id: "17",
    titulo: "Memórias póstumas de Brás Cubas",
    preco: 32.9,
    categoria: "hq",
    autor: "Machado de Assis",
    editora: "Principis",
    descricao: "Toda a riqueza do clássico foi transportada magistralmente para as histórias em quadrinhos ",
    imagem:
      "//livros/HQ/IMG/Memórias Postumas de Brás Cubas.jpg",
  },
   {
    id: "18",
    titulo: "Tom Strong-Um século de aventuras",
    preco: 34.9,
    categoria: "hq",
    autor: "Alan Moore",
    editora: "DEVIR EDITORA",
    descricao: "Auxiliado por um incrível grupo formado pela sua esposa Dhalua (a filha de um poderoso chefe tribal), sua filha Tesla, o gorila falante Rei Salomão e o robô Pneuman, Tom Strong enfrenta todo tipo de ameaças do passado.",
    imagem:
      "//livros/HQ/IMG/Tom Strong-Um século de aventuras.png",
  },
  {
    id: "19",
    titulo: "DEXTER",
    preco: 49.9,
    categoria: "hq",
    autor: "Jeff Lindsay",
    editora: "Planeta",
    descricao: "Dexter, o psicopata dos psicopatas, depois de fazer grande sucesso nos livros e na TV, agora invade as páginas dos quadrinhos.",
    imagem:
      "//livros/HQ/IMG/DEXTER.jpg",
  },
  {
    id: "20",
    titulo: "O livro de Deus",
    preco: 19.9,
    categoria: "hq",
    autor: "Ben Avery",
    editora: "100% Cristão",
    descricao: "A incrível história de como Deus presenteou a Bíblia para o mundo",
    imagem:
      "//livros/HQ/IMG/O livro de Deus.jpg",
  },
    {
    id: "21",
    titulo: "A culpa é das estrelas",
    preco: 39.4,
    categoria: "romance",
    autor: "John Green",
    editora: "Intrínseca",
    descricao: "em todo bom enredo há uma reviravolta, e a de Hazel se chama Augustus Waters, um garoto bonito que certo dia aparece no Grupo de Apoio a Crianças com Câncer.",
    imagem:
      "//livros/romance/img/A_Culpa_E_Das_Estrelas.PNG",
  },
  {
    id: "22",
    titulo: "Para todos os garotos que já amei Vol. 1",
    preco: 39.4,
    categoria: "romance",
    autor: "Jenny Han",
    editora: "Intrínseca",
    descricao: " Lara Jean guarda suas cartas de amor em uma caixa azul-petróleo que ganhou da mãe. Não são cartas que ela recebeu de alguém, mas que ela mesma escreveu.",
    imagem:
      "//livros/romance/img/Para_todos_os_garotos_que_já_amei_Vol_1.PNG",
  },
  {
    id: "23",
    titulo: "P.S.: Ainda amo você Vol. 2",
    preco: 43.9,
    categoria: "romance",
    autor: "Jenny Han",
    editora: "Intrínseca",
    descricao: "Lara Jean sempre teve uma vida amorosa muito movimentada, pelo menos na cabeça dela.",
    imagem:
      "//livros/romance/img/P.S_Ainda_amo_você_Vol_2.PNG",
  },
  {
    id: "24",
    titulo: "Agora e para sempre, Lara Jean Vol. 3",
    preco: 44.99,
    categoria: "romance",
    autor: "Jenny Han",
    editora: "Intrínseca",
    descricao: "Ainda amo você Lara Jean descobriu os altos e baixos de estar em um relacionamento que não é de faz de conta.",
    imagem:
      "//livros/romance/img/Agora_e_para_sempre_Lara_Jean_Vol_3.PNG",
  },
  {
    id: "25",
    titulo: "O grande Gatsby",
    preco: 49.9,
    categoria: "romance",
    autor: "F. Scott Fitzgerald",
    editora: "Penguin-Companhia",
    descricao: "retrata a Nova York dos anos 1920, marcada por jazz, festas e ostentação.",
    imagem:
      "//livros/romance/img/Agora_e_para_sempre_Lara_Jean_Vol_3.PNG",
  },
  {
    id: "26",
    titulo: "O gato preto",
    preco: 39.9,
    categoria: "terror",
    autor: "Edgar Allan Pou",
    editora: "Lebooks Editora",
    descricao: "The Black Cat é um conto do escritor estadunidense Edgar Allan Poe.",
    imagem:
      "//livros/terror/img/O_GATO_PRETO.PNG",
  },
  {
    id: "27",
    titulo: "O cemitério",
    preco: 78.99,
    categoria: "terror",
    autor: "Stephen King",
    editora: "Suma",
    descricao: "o médico Louis Creed descobre um terreno amaldiçoado capaz de ressuscitar mortos.",
    imagem:
      "//livros/terror/img/O_cemitério.PNG",
  },
  {
    id: "28",
    titulo: "O Vilarejo",
    preco: 59.9,
    categoria: "terror",
    autor: "Raphael Montes",
    editora: "Suma",
    descricao: "Em 1589, o padre e demonologista Peter Binsfeld fez a ligação de cada um dos pecados capitais a um demônio, supostamente responsável por invocar o mal nas pessoas.",
    imagem:
      "//livros/terror/img/O_Vilarejo.PNG",
  },
  {
    id: "29",
    titulo: "Terra Amaldiçoada",
    preco: 85.31,
    categoria: "terror",
    autor: "Douglas Lobo",
    editora: "Suma",
    descricao: "Demitido de seu emprego em São Paulo, Fabrício Machado retorna a sua terra natal, no interior do Piauí. Ali, espera reavaliar sua vida para decidir o rumo a seguir.",
    imagem:
      "//livros/terror/img/Terra_Amaldiçoada.PNG",
  },
   {
    id: "30",
    titulo: "O Paciente",
    preco: 99.9,
    categoria: "terror",
    autor: "Jasper DeWitt",
    editora: "Planeta Minotauro",
    descricao: "Nesse hospital, Parker assume a tarefa de tratar um misterioso paciente. Trata-se do mais antigo caso do lugar: Joe, um homem considerado de grande risco, internado na instituição desde que tinha apenas seis anos de idade.",
    imagem:
      "//livros/terror/img/O_Paciente.PNG",
  },
 
];

// ---- Função de formatação ----
const formatBRL = (n: number): string => `R$ ${n.toFixed(2).replace(".", ",")}`;

// ---- Componente Principal ----
export default function Loja() {
  const [categoria, setCategoria] = useState<string>("todos");

  const produtosFiltrados = useMemo(() => {
    if (categoria === "todos") return PRODUCTS;
    return PRODUCTS.filter((p) => p.categoria === categoria);
  }, [categoria]);

  // ---- Render Categoria ----
  const renderCategoria = ({ item }: ListRenderItemInfo<Categoria>) => (
    <TouchableOpacity
      style={[styles.chip, categoria === item.key && styles.chipActive]}
      onPress={() => setCategoria(item.key)}
    >
      <Text style={[styles.chipText, categoria === item.key && styles.chipTextActive]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  // ---- Render Produto ----
  const renderProduto = ({ item }: ListRenderItemInfo<Produto>) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.capa} />
      <Text style={styles.cardTitulo}>{item.titulo}</Text>
      <Text style={styles.cardPreco}>{formatBRL(item.preco)}</Text>
      <Text style={styles.cardDescricao}>{item.descricao}</Text>
      <Text style={styles.cardInfo}>Autor: {item.autor}</Text>
      <Text style={styles.cardInfo}>Editora: {item.editora}</Text>
      <TouchableOpacity style={styles.btnPri}>
        <Text style={styles.btnPriText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      {/* Logo fixa no topo */}
      <View style={styles.logoFixedContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logoFixed}
          resizeMode="contain"
        />
      </View>

      {/* Conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Filtro por categoria */}
        <FlatList
          data={CATEGORIES}
          keyExtractor={(i) => i.key}
          renderItem={renderCategoria}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsList}
        />

        {/* Grid de produtos */}
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(i) => i.id}
          renderItem={renderProduto}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ---- Estilos ----
const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 80 }, // espaço para a logo fixa

  // Logo fixa
  logoFixedContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90, // altura da logo
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logoFixed: { width: 180, height: 80 }, // aumenta a logo

  // Chips
  chipsList: { paddingVertical: 8, marginTop: 10 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  chipActive: { backgroundColor: "#007BFF", borderColor: "#007BFF" },
  chipText: { color: "#333", fontWeight: "600" },
  chipTextActive: { color: "#fff" },

  // Cards
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  capa: { width: 120, height: 180, borderRadius: 6, marginBottom: 10 },
  cardTitulo: { fontSize: 16, fontWeight: "700", textAlign: "center" },
  cardPreco: { color: "#555", marginBottom: 4 },
  cardDescricao: { fontSize: 12, color: "#666", textAlign: "center", marginBottom: 4 },
  cardInfo: { fontSize: 12, color: "#333", marginBottom: 2 },
  btnPri: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 8,
  },
  btnPriText: { color: "#fff", fontWeight: "700" },

  // Column Wrapper
  columnWrapper: { justifyContent: "space-between", marginBottom: 16 },
});
