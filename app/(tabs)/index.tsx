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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/acao/img/Box_Harry_Potter_vermelho_(edi%C3%A7%C3%A3o_%E2%80%9Cbrit%C3%A2nica%E2%80%9D).PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/acao/img/Jogos_vorazes.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/acao/img/O_nome_do_vento_(A_Cr%C3%B4nica_do_Matador_do_Rei%20%E2%80%93%20Livro_1).PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/acao/img/O_temor_do_s%C3%A1bio_(A_Cr%C3%B4nica_do_Matador_do_Rei%E2%80%93Livro_2).PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/acao/img/A_m%C3%BAsica_do_sil%C3%AAncio_(A_Cr%C3%B4nica_do_Matador_do_Rei%E2%80%93Livro_3).PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/comedia/img/The_Comedy_Bible.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/comedia/img/Cad%C3%AA_voc%C3%AA_Bernadette..PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/comedia/img/A_Mandragora.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/comedia/img/Super_piadas_e_charadas.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/comedia/img/Auto_da_Compadecida.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/F%C3%A1bula/IMG/A_galinha_dos_ovos_de_ouro.jpg",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/F%C3%A1bula/IMG/A_lebre_e_a_tartaruga.jpg",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/F%C3%A1bula/IMG/a_cigarra_e_a_formiga.jpg",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/F%C3%A1bula/IMG/Moral_da_historia.jpg",
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
      " https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/F%C3%A1bula/IMG/proverbios_em_fabulas.jpg",
  },

{
    id: "16",
    titulo: "Drácula",
    preco: 29.9,
    categoria: "hq",
    autor: "Bram Stoker",
    editora: "Principis",
    descricao: "Retrata um mito literário que hoje conhecemos como vampiro.",
    imagem:
   "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/HQ/IMG/Dr%C3%A1cula.png",
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
  "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/HQ/IMG/Mem%C3%B3rias%20Postumas%20de%20Br%C3%A1s%20Cubas.jpg",
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
 "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/HQ/IMG/Tom%20Strong-Um%20s%C3%A9culo%20de%20aventuras.png",
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
"https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/HQ/IMG/DEXTER.jpg",
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
   "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/HQ/IMG/O%20livro%20de%20Deus.jpg",
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
"https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/romance/img/A_Culpa_E_Das_Estrelas.PNG",
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
"https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/romance/img/Para_todos_os_garotos_que_j%C3%A1_amei_Vol_1.PNG",
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
"https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/romance/img/P.S_Ainda_amo_voc%C3%AA_Vol_2.PNG",
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
"https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/romance/img/Agora_e_para_sempre_Lara_Jean_Vol_3.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/romance/img/O_grande_Gatsby.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/terror/img/O_GATO_PRETO.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/terror/img/O_cemit%C3%A9rio.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/terror/img/O_Vilarejo.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/terror/img/Terra_Amaldi%C3%A7oada.PNG",
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
      "https://raw.githubusercontent.com/VitorSantos007/LiteraTech01/VitorB/livros/terror/img/O_Paciente.PNG",
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
