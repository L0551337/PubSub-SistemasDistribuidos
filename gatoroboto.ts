import PubSub from "./PubSub";

// 
interface TrafficEvent {
  type: string;
  location: string;
  details: string;
}

interface Subscriber {
  id: number;
  name: string;
  notify(event: TrafficEvent): void;
}

class BasicSubscriber implements Subscriber {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

    notify(event: TrafficEvent): void {
    console.log(
      `Notificação ${this.name}: ${event.type} em ${event.location} - ${event.details}`
    );
  }
}

