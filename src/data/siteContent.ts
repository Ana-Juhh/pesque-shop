import type { PageType } from "../types/navigation";
import {
  acessoriosProducts,
  iscasProducts,
  linhasProducts,
  molinetesProducts,
  varasProducts,
} from "./products";

export const defaultCategoryProducts = [
  ...varasProducts.map((product) => ({
    ...product,
    mainCategory: "varas" as const,
    images: [product.image],
    description:
      "Produto selecionado para pescarias com foco em resistencia, conforto no uso e bom desempenho em diferentes situacoes.",
  })),
  ...molinetesProducts.map((product) => ({
    ...product,
    mainCategory: "molinetes" as const,
    images: [product.image],
    description:
      "Equipamento pensado para oferecer recolhimento confiavel, boa durabilidade e controle durante a fisgada.",
  })),
  ...iscasProducts.map((product) => ({
    ...product,
    mainCategory: "iscas" as const,
    images: [product.image],
    description:
      "Isca indicada para aumentar a atratividade na agua e ajudar em pescarias mais produtivas.",
  })),
  ...linhasProducts.map((product) => ({
    ...product,
    mainCategory: "linhas" as const,
    images: [product.image],
    description:
      "Linha escolhida para unir resistencia, sensibilidade e seguranca durante o trabalho do peixe.",
  })),
  ...acessoriosProducts.map((product) => ({
    ...product,
    mainCategory: "acessorios" as const,
    images: [product.image],
    description:
      "Acessorio util para organizar, proteger ou facilitar sua rotina antes, durante e depois da pescaria.",
  })),
];

export const navigationOptions: Array<{ value: PageType; label: string }> = [
  { value: "home", label: "Home" },
  { value: "catalogo", label: "Catalogo" },
  { value: "ofertas", label: "Ofertas" },
  { value: "lancamentos", label: "Lancamentos" },
  { value: "sobre", label: "Sobre" },
  { value: "privacidade", label: "Privacidade" },
  { value: "contato", label: "Contato" },
  { value: "faq", label: "FAQ" },
  { value: "trocas", label: "Trocas" },
  { value: "status", label: "Status do Pedido" },
  { value: "register", label: "Minha Conta" },
];

export const defaultSiteContent = {
  catalogSeeded: true,
  hero: {
    eyebrow: "Aventura & Performance",
    titleTop: "DOMINE AS",
    titleBottom: "AGUAS",
    description:
      "Equipamentos profissionais para quem leva a pesca a serio. Sinta a forca da natureza em cada arremesso.",
    discountValue: "60%",
    discountLabel: "De Desconto",
    primaryButtonLabel: "EXPLORAR EQUIPAMENTOS",
    primaryButtonTarget: "ofertas" as PageType,
    secondaryButtonLabel: "VER LANCAMENTOS",
    secondaryButtonTarget: "lancamentos" as PageType,
    backgroundImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600",
    featuredImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=900",
  },

  offers: [
    {
      id: 1,
      name: "Molinete Shimano FX 2500",
      oldPrice: 299.9,
      price: 179.9,
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=900",
      discount: "40% OFF",
      category: "Molinetes",
      targetPage: "molinetes" as PageType,
      targetLabel: "Ver categoria",
    },
    {
      id: 2,
      name: "Isca Artificial Marine Sports Inna 90",
      oldPrice: 159.9,
      price: 89.9,
      image:
        "https://images.unsplash.com/photo-1583244532610-2ca22117f4ae?auto=format&fit=crop&q=80&w=900",
      discount: "44% OFF",
      category: "Iscas",
      targetPage: "iscas" as PageType,
      targetLabel: "Ver categoria",
    },
    {
      id: 3,
      name: "Vara Shimano Trevala Carbon 1.80m",
      oldPrice: 1589.9,
      price: 849.9,
      image:
        "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=900",
      discount: "47% OFF",
      category: "Varas",
      targetPage: "varas" as PageType,
      targetLabel: "Ver categoria",
    },
  ],

  bestSellers: [
    {
      id: 1011,
      name: "Molinete Shimano SLX DC",
      price: 1299.9,
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=900",
      discount: "",
      category: "Molinetes",
      targetPage: "molinetes" as PageType,
      targetLabel: "Abrir secao",
    },
    {
      id: 1012,
      name: "Isca Artificial Popper Marine",
      price: 49.9,
      image:
        "https://images.unsplash.com/photo-1583244532610-2ca22117f4ae?auto=format&fit=crop&q=80&w=900",
      discount: "",
      category: "Iscas",
      targetPage: "iscas" as PageType,
      targetLabel: "Abrir secao",
    },
    {
      id: 1013,
      name: "Linha Multifilamento 8X",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=900",
      discount: "",
      category: "Linhas",
      targetPage: "linhas" as PageType,
      targetLabel: "Abrir secao",
    },
    {
      id: 1014,
      name: "Bolsa de Pesca G Marine",
      price: 245,
      image:
        "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=900",
      discount: "",
      category: "Acessorios",
      targetPage: "acessorios" as PageType,
      targetLabel: "Abrir secao",
    },
    {
      id: 1015,
      name: "Alicate de Contencao c/ Balanca",
      price: 65,
      image:
        "https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&q=80&w=900",
      discount: "",
      category: "Acessorios",
      targetPage: "acessorios" as PageType,
      targetLabel: "Abrir secao",
    },
  ],

  customProducts: defaultCategoryProducts,

  pages: {
    sobre: {
      title: "Nossa Historia",
      subtitle: "Conheca a trajetoria da Pesque Shop",
      content: [
        "A Pesque Shop nasceu da paixao por pesca esportiva e pelo desejo de oferecer produtos de qualidade para todos os perfis de pescador.",
        "Nosso objetivo e unir performance, bom atendimento e produtos selecionados para tornar cada pescaria ainda melhor.",
        "Aqui voce encontra equipamentos, acessorios e ofertas pensadas para quem realmente vive a experiencia da pesca.",
      ],
    },

    privacidade: {
      title: "Politica de Privacidade",
      subtitle: "Transparencia e seguranca para os seus dados",
      content: [
        "A Pesque Shop respeita a sua privacidade e protege os dados informados durante a navegacao e as compras.",
        "As informacoes coletadas sao utilizadas para processar pedidos, melhorar a experiencia no site e enviar comunicacoes importantes sobre a sua compra.",
        "Nao compartilhamos dados pessoais de forma indevida e adotamos boas praticas de seguranca para proteger suas informacoes.",
      ],
    },

    contato: {
      title: "Fale Conosco",
      subtitle: "Estamos prontos para ajudar voce",
      content: [
        "Nosso atendimento esta disponivel para tirar duvidas, ajudar com pedidos e orientar na escolha dos produtos.",
        "Voce pode entrar em contato pelo WhatsApp, e-mail ou pelas nossas redes sociais oficiais.",
        "Nossa equipe busca responder o mais rapido possivel em horario comercial.",
      ],
    },

    faq: {
      title: "Duvidas Frequentes",
      subtitle: "As perguntas mais comuns dos nossos clientes",
      content: [
        "Os prazos de entrega variam conforme o CEP e a forma de envio escolhida no momento da compra.",
        "Caso voce precise trocar ou devolver um produto, consulte nossa politica e fale com o atendimento.",
        "Se tiver qualquer outra duvida, nossa equipe esta pronta para ajudar.",
      ],
    },

    trocas: {
      title: "Trocas e Devolucoes",
      subtitle: "Saiba como funciona nossa politica",
      content: [
        "Voce pode solicitar troca ou devolucao dentro do prazo previsto por lei, respeitando as condicoes do produto.",
        "Para agilizar o processo, entre em contato com nossa equipe informando o numero do pedido e o motivo da solicitacao.",
        "Nossa equipe vai orientar cada etapa para que tudo aconteca da forma mais simples possivel.",
      ],
    },

    status: {
      title: "Status do Pedido",
      subtitle: "Acompanhe as etapas da sua compra",
      content: [
        "Assim que o pedido for confirmado, voce recebera atualizacoes sobre pagamento, separacao e envio.",
        "Caso precise de ajuda para localizar seu pedido, entre em contato com nosso atendimento.",
        "Nosso compromisso e manter voce informado durante todo o processo de compra.",
      ],
    },

    termos: {
      title: "Termos e Condicoes",
      subtitle: "Leia os termos de uso da Pesque Shop",
      content: [
        "Ao utilizar a Pesque Shop, voce concorda com os termos e condicoes estabelecidos nesta pagina.",
        "O usuario e responsavel por manter a confidencialidade de suas informacoes de acesso e pelas atividades realizadas em sua conta.",
        "A Pesque Shop se reserva no direito de modificar estes termos a qualquer momento. O uso continuado do site implica na aceitacao das alteracoes.",
      ],
    },
  },
};
