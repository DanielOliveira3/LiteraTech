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
    titulo: "Box Harry Potter vermelho (edição “britânica”)",
    preco: 342.90,
    categoria: "acao",
    autor: "J.K. Rowling",
    editora: "Rocco",
    descricao: "A série Harry Potter, de J.K. Rowling, acompanha um órfão que descobre ser bruxo ao receber um convite para estudar em Hogwarts. Lá, ele faz amigos, aprende magia e enfrenta perigos enquanto se prepara para confrontar o bruxo que matou seus pais. Ao longo de sete livros, a saga mistura aventura, mistério e emoção, explorando temas como amizade, coragem e amor.",
    imagem:
      "\litera\LiteraTech01\livros\acao\img\Box_Harry_Potter_vermelho_(edição_“britânica”).PNG",
  },
  {
    id: "2",
    titulo: "Jogos vorazes",
    preco: 22.40,
    categoria: "acao",
    autor: "Suzanne Collins",
    editora: "Rocco",
    descricao: "Em Panem, uma nação controlada pela Capital, jovens de cada distrito são forçados a participar dos Jogos Vorazes, uma luta mortal transmitida ao vivo. Para proteger a irmã, Katniss se oferece para competir. Vinda do pobre Distrito 12, ela precisará usar toda sua coragem para sobreviver e vencer.",
    imagem:
      "\litera\LiteraTech01\livros\acao\img\Jogos_vorazes.PNG",
  },
  {
    id: "3",
    titulo: "O nome do vento (A Crônica do Matador do Rei – Livro 1)",
    preco: 54.90,
    categoria: "acao",
    autor: "Patrick Rothfuss",
    editora: "Editora Arqueiro",
    descricao: "Ninguém sabe ao certo quem é o herói ou o vilão desse fascinante universo criado por Patrick Rothfuss. Na realidade, essas duas figuras se concentram em Kote, um homem enigmático que se esconde sob a identidade de proprietário da hospedaria Marco do Percurso.Da infância numa trupe de artistas itinerantes, passando pelos anos vividos numa cidade hostil e pelo esforço para ingressar na escola de magia, O nome do vento acompanha a trajetória de Kote e as duas forças que movem sua vida: o desejo de aprender o mistério por trás da arte de nomear as coisas e a necessidade de reunir informações sobre o Chandriano – os lendários demônios que assassinaram sua família no passado.",
    imagem:
      "\litera\LiteraTech01\livros\acao\img\O_nome_do_vento_(A_Crônica_do_Matador_do_Rei – Livro_1).PNG",
  },
  {
    id: "4",
    titulo: "O temor do sábio (A Crônica do Matador do Rei – Livro 2)",
    preco: 69.50,
    categoria: "acao",
    autor: "Patrick Rothfuss",
    editora: "Editora Arqueiro",
    descricao: "O temor do sábio dá continuidade à impressionante história de Kvothe, o Arcano, o Sem-Sangue, o Matador do Rei.Quando é aconselhado a abandonar seus estudos na Universidade por um período, por causa de sua rivalidade com um membro da nobreza local, Kvothe é obrigado a tentar a vida em outras paragens.Em busca de um patrocinador para sua música, viaja mais de mil quilômetros até Vintas. Lá, é rapidamente envolvido na política da corte. Enquanto tenta cair nas graças de um nobre poderoso, Kvothe usa sua habilidade de arcanista para impedir que ele seja envenenado e lidera um grupo de mercenários pela floresta, a fim de combater um bando de ladrões perigosos.",
    imagem:
      "\litera\LiteraTech01\livros\acao\img\O_temor_do_sábio_(A_Crônica_do_Matador_do_Rei–Livro_2).PNG",
  },
  {
    id: "5",
    titulo: "A música do silêncio (A Crônica do Matador do Rei – Livro 3)",
    preco: 34.90,
    categoria: "acao",
    autor: "Patrick Rothfuss",
    editora: "Editora Arqueiro",
    descricao: "Nesse livro, Patrick Rothfuss nos leva ao mundo de uma das personagens mais enigmáticas da série A Crônica do Matador do Rei. Repleto de segredos e mistérios, A música do silêncio é uma narrativa sobre uma jovem ferida em um mundo devastado.",
    imagem:
      "\litera\LiteraTech01\livros\acao\img\A_música_do_silêncio_(A_Crônica_do_Matador_do_Rei–Livro_3).PNG",
  },
  {
    id: "6",
    titulo: "The Comedy Bible",
    preco: 93.93,
    categoria: "comedia",
    autor: "Judy Carter",
    editora: "OEM",
    descricao: "A primeira vez que me falaram sobre Stand-up Comedy eu não fazia a menor ideia do que se tratava. Entendi que era algo que conseguiria fazer, mas mais por instinto, por identificação. Estreei no palco na cara e na coragem e sem nenhuma informação sobre como desenvolver esse tipo de humor. Hoje ele já está bem difundido no Brasil. Mas até agora ainda não havia aqui nada que ensinasse para quem está começando como se preparar para esse mundo. Até agora.",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\comedia\img\The_Comedy_Bible.PNG",
  },
  {
    id: "7",
    titulo: "Cadê você Bernadette?",
    preco: 74.90,
    categoria: "comedia",
    autor: "Maria Semple",
    editora: "Companhia das Letras",
    descricao: "Em Cadê você, Bernadette?, de Maria Semple, Bee, uma adolescente de 15 anos, tenta descobrir o paradeiro de sua mãe, Bernadette Fox — uma arquiteta genial, excêntrica e antissocial que desaparece pouco antes de uma viagem prometida à Antártida. A busca é narrada por meio de e-mails, documentos e cartas reunidos por Bee, revelando segredos, conflitos e o relacionamento imperfeito, mas cheio de amor, entre mãe e filha.",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\comedia\img\Cadê_você_Bernadette..PNG",
  },
  {
    id: "8",
    titulo: "A Mandrágora",
    preco: 49.90,
    categoria: "comedia",
    autor: "MAQUIAVEL",
    editora: "Library",
    descricao: "A Mandrágora é uma peça de teatro escrita em 1503 e publicada pela primeira vez em 1524, escrita pelo italiano Nicolau Maquiavel.Conta a história do jovem florentino Calímaco, que por conta de uma aposta, conhece e passa a desejar furiosamente uma mulher casada que não consegue ter filhos com seu marido. Para conquistá-la, com ajuda de um jovem embusteiro, de um frei sem escrúpulos e da mãe da recatada esposa, ele finge ser médico e receita um tratamento a base de mandrágora, uma planta afrodisíaca.",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\comedia\img\A_Mandragora.PNG",
  },
  {
    id: "9",
    titulo: "Super piadas e charadas",
    preco: 9.90,
    categoria: "comedia",
    autor: "Ciranda Cultural",
    editora: "Ciranda Cultural",
    descricao: " Rir é sempre bom, e é melhor ainda quando outras pessoas riem junto com você. Encontre aqui as melhores piadas e charadas para fazer seus amigos e familiares darem boas gargalhadas!. ",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\comedia\img\Super_piadas_e_charadas.PNG",
  },
  {
    id: "10",
    titulo: "Auto da Compadecida",
    preco: 39.64,
    categoria: "comedia",
    autor: "Ariano Suassuna",
    editora: "Nova Fronteira",
    descricao: " Auto da Compadecida representa o equilíbrio perfeito entre a tradição popular e a elaboração literária ao recriar para o teatro episódios registrados na tradição popular do cordel.É uma peça teatral em forma de Auto em 3 atos, escrita em 1955 pelo autor paraibano Ariano Suassuna.Sendo um drama do Nordeste brasileiro, mescla elementos como a tradição da literatura de cordel, a comédia, traços do barroco católico brasileiro e, ainda, cultura popular e tradições religiosas. ",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\comedia\img\Auto_da_Compadecida.PNG",
  },
  {
    id: "11",
    titulo: "A galinha dos ovos de ouro",
    preco: 14.90,
    categoria: "fabula",
    autor: "Roberto Belli",
    editora: "Todolivro",
    descricao: "  Os protagonistas destas breves histórias são animaizinhos que apresentam características humanas, contendo ensinamentos que estimulam a reflexão dos pequenos leitores. Como conteúdo extra, ao final de cada história, há um material de apoio para os adultos com dicas de como tornar esta experiência ainda mais proveitosa. ",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\Fábula\IMG\A_galinha_dos_ovos_de_ouro.jpg",
  },
  {
    id: "12",
    titulo: "A Lebre e a Tartaruga Todolivro",
    preco: 9.90,
    categoria: "fabula",
    autor: "Roberto Belli",
    editora: "Todolivro",
    descricao: "  Os protagonistas destas breves histórias são animaizinhos que apresentam características humanas, contendo ensinamentos que estimulam a reflexão dos pequenos leitores. Como conteúdo extra, ao final de cada história, há um material de apoio para os adultos com dicas de como tornar esta experiência ainda mais proveitosa. ",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\Fábula\IMG\A_lebre_e_a_tartaruga.jpg",
  },
  {
    id: "13",
    titulo: "A cigarra e a formiga",
    preco: 6.99,
    categoria: "fabula",
    autor: "Esopo",
    editora: "Florear Livros",
    descricao: "  Encante as crianças com histórias que ensinam valores importantes para a vida com o Livro Infantil Ilustrado Fábulas - Lições para a Vida. Esta coleção reúne clássicas fábulas, ricamente ilustradas, que estimulam a imaginação e o aprendizado de forma divertida e envolvente.",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\Fábula\IMG\a_cigarra_e_a_formiga.jpg",
  },
  {
    id: "14",
    titulo: "Moral da historia",
    preco: 9.99,
    categoria: "fabula",
    autor: "Rosane Pamplona",
    editora: "Elementar",
    descricao: "  As fábulas contadas por Esopo atravessaram milênios! E continuam atuais.Elas nos permitem filosofar sobre o ser humano e compreender melhor o mundo.Esopo, que viveu como escravo na Grécia Antiga, conseguiu a liberdade graças às histórias que narrava.E elas não eram criação sua: muitas foram encontradas em papiros egípcios, datados de quase mil anos antes.E até hoje nos surpreendem com sua sabedoria!",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\Fábula\IMG\Moral_da_historia.jpg",
  },
  {
    id: "15",
    titulo: "Provérbios em Fábulas",
    preco: 29.99,
    categoria: "fabula",
    autor: "Paulo Debs",
    editora: "Vida",
    descricao: "  Quem de nós não se lembra de uma bela fábula contada na infância? Quem poderia se esquecer das fábulas que deram asas à imaginação e embalaram os doces tempos da infância? Em ''Provérbios em fábulas'' você encontrará na simplicidade de cada história, a aplicação profunda de conceitos bíblicos ao coração da criança. Com histórias criadas a partir de provérbios bíblicos e adaptadas ao imaginário infantil, Paulo Debs ensina, de forma divertida, preciosas lições como: obediência, honestidade, gratidão e outras tantas. Haverá maneira mais divertida de aprender e ensinar os princípios da Palavra de Deus aos pequeninos?",
    imagem:
      "C:\Users\segundo\Documents\litera\LiteraTech01\livros\Fábula\IMG\proverbios_em_fabulas.jpg",
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
