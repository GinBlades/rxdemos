/// <reference path="./typings/main.d.ts"/>

// Basic Sequence operators.
let logValue = val => console.log(val);
let src = Rx.Observable.range(1, 5);

// Map
// Note that if you want to mutate the values, use 'flatMap'.
let upper = src.map((name) => {
    return name * 2;
});
upper.subscribe(logValue);

// Filter
let isEven = (val) => {
    return val % 2 === 0;
};
let even = src.filter(isEven);
even.subscribe(logValue);

// Reduce
let sum = src.reduce((acc: number, x: number) => {
    return acc + x;
});
sum.subscribe(logValue);

let avg = src.reduce((prev, cur) => {
    return {
        sum: prev.sum + cur,
        count: prev.count + 1
    };
// You can initialize reduce with an object
}, { sum: 0, count: 0 }).map((o) => {
    return o.sum / o.count;
});

avg.subscribe(x => console.log("Average is: ", x));

// Canceling Sequences
let counter = Rx.Observable.interval(1000);

let subscription1 = counter.subscribe(i => console.log("Subscription 1:", i));
let subscription2 = counter.subscribe(i => console.log("Subscription 2:", i));

setTimeout(() => {
    console.log("Cancel sub2");
    subscription2.dispose();
}, 2000);

let getJSON = (arr: string[]) => {
    return Rx.Observable.from(arr).map((str: string) => {
        let parsedJSON = JSON.parse(str);
        return parsedJSON;
    })
};

// Handling errors
let arrayOfJSON = [
    '{"1": 1, "2": 2}',
    '{"success: true}', // Invalid JSON
    '{"enabled": true}'
];

// Stops at second string, does not continue.
getJSON(arrayOfJSON).subscribe(
    json => console.log("Parsed JSON:", json),
    err => console.log(err.message)
)

let caught = getJSON(arrayOfJSON).catch(
    Rx.Observable.return({ error: "There was an error parsing JSON" })
);

caught.subscribe(
    json => console.log("Parsed JSON:", json),
    err => console.log("Erroneous Error:", err.message)
)