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
    id: "1",
    titulo: "Amor nas Estrelas",
    preco: 39.9,
    categoria: "romance",
    autor: "Maria Silva",
    editora: "Editora Alfa",
    descricao: "Uma história de amor que atravessa galáxias.",
    imagem:
      "https://images.unsplash.com/photo-1529078155058-5d716f45d604?w=600&q=80",
  },
  {
    id: "2",
    titulo: "A Galinha dos Ovos de Ouro",
    preco: 39.9,
    categoria: "fabula",
    autor: "Autor Clássico",
    editora: "Contos & Fábulas",
    descricao: "Uma fábula sobre ganância e consequências.",
    imagem:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
  },
  {
    id: "3",
    titulo: "A Mandrágora",
    preco: 39.9,
    categoria: "comedia",
    autor: "Nicolau Maquiavel",
    editora: "Teatro Clássico",
    descricao: "Comédia clássica em cinco atos.",
    imagem:
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=600&q=80",
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
