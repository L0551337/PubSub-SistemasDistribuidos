import PubSub from "./PubSub.ts";

// definindo interface para eventos de tráfego
interface TrafficEvent {
  type: string;
  location: string;
  details: string;
}

// definindo interface para sistemas assinantes
interface Subscriber {
  id: number;
  name: string;
  notify(event: TrafficEvent): void;
}

// classe que representa o sistema de tráfego
class BasicSubscriber implements Subscriber {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

    // método para receber notificações de eventos de tráfego
    notify(event: TrafficEvent): void {
    console.log(
      `Notificação ${this.name}: ${event.type} em ${event.location} - ${event.details}`
    );
  }
}

// criando instância do PubSub
const pubSub = new PubSub();

// criando função para reportar eventos de tráfego
function reportTrafficEvent(event: TrafficEvent) {
  console.log("*".repeat(50));
  console.log(
    `Evento Reportado: ${event.type} em ${event.location} - ${event.details}`
  );
  console.log("*".repeat(50));
  // publicando o evento para os sistemas assinantes, type para saber quais sistemas e location para saber quais 
  // viaturas notificar.
  pubSub.publish(event.type, event);
  pubSub.publish(event.location, event);
}


// criando instâncias dos sistemas assinantes e armazenando as funções de notificação vinculadas
const centroDeControle = new BasicSubscriber(1, "Sistema de Controle de Tráfego");
const sistemaDeMultas = new BasicSubscriber(2, "Sistema de Multas de Tráfego");
const viaturaPolicial1 = new BasicSubscriber(3, "Sistema da Viatura Policial 1");
const viaturaPolicial2 = new BasicSubscriber(4, "Sistema da Viatura Policial 2");

const boundSystem1Notify = centroDeControle.notify.bind(centroDeControle);
const boundSystem2Notify = sistemaDeMultas.notify.bind(sistemaDeMultas);
const boundSystem3Notify = viaturaPolicial1.notify.bind(viaturaPolicial1);
const boundSystem4Notify = viaturaPolicial2.notify.bind(viaturaPolicial2);

// subscrevendo os sistemas aos eventos de tráfego


pubSub.subscribe("Acidente", boundSystem1Notify);
pubSub.subscribe("Enchente", boundSystem1Notify);
pubSub.subscribe("Velocidade Excessiva", boundSystem2Notify);
pubSub.subscribe("Avenida", boundSystem3Notify);
pubSub.subscribe("Centro", boundSystem4Notify);
pubSub.subscribe("Assalto em Progresso", boundSystem3Notify);
pubSub.subscribe("Assalto em Progresso", boundSystem4Notify);


// Simulando a publicação de eventos de trânsito

// Acidente e Centro, sistemas 1 e 4 serão notificados. Sys 1 por tipo de evento e Sys 4 por localização.
reportTrafficEvent({
  type: "Acidente",
  location: "Centro",
  details: "Dois carros envolvidos, trânsito pesado.",
});

// Velocidade Excessiva e Rodovia, sistema 2 será notificado.
reportTrafficEvent({
  type: "Velocidade Excessiva",
  location: "Rodovia",
  details: "Veículo com placa \"ABC-1234\" detectado a 150 km/h, ultrapassando o limite.",
});
// Enchente e Avenida, sistemas 1 e 3 serão notificados. Sys 1 por tipo de evento e Sys 3 por localização.
reportTrafficEvent({
  type: "Enchente",
  location: "Avenida",
  details: "Chuva forte causando alagamentos nas ruas.",
});

// Simulando Viatura Policial 2 saindo dos arredores de Centro.
console.log("*".repeat(100), `\nViatura Policial 2 saindo dos arredores de Centro.\n`, "*".repeat(100));
pubSub.unsubscribe("Centro", boundSystem4Notify);


// Novo evento no Centro, porem ambas as viaturas sero notificadas graças ao tipo do evento.
reportTrafficEvent({
  type: "Assalto em Progresso",
  location: "Centro",
  details: "Assalto a banco em andamento, viaturas policiais necessárias.",
});

//Novo evento em Centro porém apenas a viatura policial 1 será notificada, pois a viatura policial 2 foi desinscrita do evento.
reportTrafficEvent({
  type: "Enchente",
  location: "Centro",
  details: "Chuva forte causando alagamentos nas ruas.",
});

