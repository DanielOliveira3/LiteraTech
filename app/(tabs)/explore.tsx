import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Carrinho() {

  // carrinho
  const [carrinho, setCarrinho] = useState([
    {
      id: "30",
      titulo: "O Paciente",
      preco: 99.9,
      quantidade: 1,
      imagem: "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/terror/img/O_Paciente.PNG",
    },
    {
      id: "18",
      titulo: "Tom Strong-Um século de aventuras",
      preco: 34.9,
      quantidade: 2,
      imagem: "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/HQ/IMG/Tom%20Strong-Um%20s%C3%A9culo%20de%20aventuras.png",
    },
  ]);

  // Função para aumentar quantidade
  const aumentarQuantidade = (id: string) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  // Função para diminuir quantidade
  const diminuirQuantidade = (id: string) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantidade > 1
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };



  // Calcular 
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛒 Meu Carrinho</Text>

      {carrinho.length === 0 ? (
        <Text style={styles.emptyCart}>Seu carrinho está vazio 😢</Text>
      ) : (
        <>
          <FlatList
            data={carrinho}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.imagem }} style={styles.imagem} />
                <View style={styles.info}>
                  <Text style={styles.nome}>{item.titulo}</Text>
                  <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

                  <View style={styles.quantidadeContainer}>
                    <TouchableOpacity
                      style={styles.botaoQtd}
                      onPress={() => diminuirQuantidade(item.id)}
                    >
                      <Text style={styles.botaoQtdTexto}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantidade}>{item.quantidade}</Text>

                    <TouchableOpacity
                      style={styles.botaoQtd}
                      onPress={() => aumentarQuantidade(item.id)}
                    >
                      <Text style={styles.botaoQtdTexto}>+</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalTexto}>Total: R$ {total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.finalizar}>
              <Text style={styles.finalizarTexto}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyCart: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
    color: "#555",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagem: {
    width: 70,
    height: 100,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  preco: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  quantidadeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  botaoQtd: {
    backgroundColor: "#007bff",
    padding: 6,
    borderRadius: 6,
  },
  botaoQtdTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    width: 20,
    textAlign: "center",
  },
  quantidade: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  remover: {
    marginTop: 4,
  },
  removerTexto: {
    color: "red",
    fontSize: 14,
  },
  totalContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  finalizar: {
    backgroundColor: "green",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  finalizarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
