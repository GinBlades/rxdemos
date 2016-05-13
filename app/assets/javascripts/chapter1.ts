/// <reference path="./typings/main.d.ts"/>

// The Observer pattern.
class Producer {
    public listeners: any[] = [];
    
    add(listener: any) {
        this.listeners.push(listener);
    }
    
    remove(listener: any) {
        let index = this.listeners.indexOf(listener);
        this.listeners.splice(index, 1);
    }
    
    notify(message: any) {
        this.listeners.forEach((listener: any) => {
            listener.update(message);
        });
    }
}

let listener1 = {
    update: (message: any) => {
        console.log("Listener 1 received:", message);
    }
}

let notifier = new Producer();
notifier.add(listener1);
notifier.notify("Hello there!");

// The Iterator pattern.
class IterateOnMultiples {
    private cursor = 0;
    constructor(public array: number[], public divisor: number) {
        this.divisor = divisor || 1;
    }
    
    next() {
        while (this.cursor < this.array.length) {
            let value = this.array[this.cursor++];
            if (value % this.divisor === 0) {
                return value;
            }
        }
    }
    
    hasNext() {
        let cur = this.cursor;
        while (cur < this.array.length) {
            if (this.array[cur++] % this.divisor === 0) {
                return true;
            }
        }
        return false;
    }
}

let consumer = new IterateOnMultiples([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
console.log(consumer.next(), consumer.hasNext());
console.log(consumer.next(), consumer.hasNext());
console.log(consumer.next(), consumer.hasNext());

// Creating Observables - This doesn't actually do anything because we haven't subscribed to it.
let observable = Rx.Observable.create((observer: any) => {
    observer.onNext("Simon");
    observer.onNext("Jen");
    observer.onNext("Sergi");
    observer.onCompleted();
});

// Setup what is done on observer, but not actually doing anything.
let observer = Rx.Observer.create(
    (x) => console.log("Next:", x),
    (err) => console.log("Error:", err),
    () => console.log("Completed")    
)

// Wrap Ajax call in observerable
let get = (url) => {
    return Rx.Observable.create((observer) => {
        // Traditional AJAX request
        let req = new XMLHttpRequest();
        req.open("GET", url);
        
        req.onload = () => {
            if (req.status == 200) {
                // Yield results
                observer.onNext(req.response);
                observer.onCompleted();
            } else {
                // Signal listeners of errors
                observer.onError(new Error(req.statusText));
            }
        };
        
        req.send();
    });
}

// Use with observable
let test = get("/posts.json");
test.subscribe(
    (x) => console.log("Result: ", x),
    (err) => console.log("Error: ", err),
    () => console.log("Completed!")
);

// Ajax specific operator
Rx.DOM.get("/comments.json").subscribe(
    (data) => console.log(data.response),
    (err) => console.log("Error:", err)
)