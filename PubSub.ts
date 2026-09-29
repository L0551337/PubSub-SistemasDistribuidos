interface subscriber{
    (message: any): void;
}

class PubSub{

    private topics:{[key: string]: subscriber[]} = {};

    subscribe(topic: string, subscriber: subscriber): void{
        if(!this.topics[topic]){
            this.topics[topic] = [];
        }
        this.topics[topic].push(subscriber);
    }
    
    unsubscribe(topic: string, subscriber: subscriber): void{
        if(!this.topics[topic]) return;
        this.topics[topic] = this.topics[topic].filter(sub => sub !== subscriber);
    }

    publish(topic: string, message: any): void{
        if(!this.topics[topic]) return;
        this.topics[topic].forEach(subscriber => subscriber(message));
    }


}

export default PubSub;