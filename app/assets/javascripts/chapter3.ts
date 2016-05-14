/// <reference path="./typings/main.d.ts"/>

// An Observable Pipeline
Rx.Observable
    .from([1, 2, 3, 4, 5, 6, 7, 8])
    .filter(val => { return val % 2 == 0; })
    .map(val => { return val * 10 });
    
// Using scan to run functions in observables

let updateDistance = (accumulator: number, current: number) => {
    if (current % 2 == 0) {
        accumulator += 1;
    }
    return accumulator;
}

let ticksObservable = Rx.Observable.interval(1000).scan(updateDistance, 0);
let ticksSubscriber = ticksObservable.subscribe((evenTicks: number) => {
    console.log(`Subscriber 1 - evenTicks: ${evenTicks} so far`);
})

setTimeout(() => {
    console.log("Cancel ticksObservable");
    ticksSubscriber.dispose();
}, 5000);