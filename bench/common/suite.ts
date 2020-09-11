import { Suite, Event } from "benchmark";
import { Func, Test, describe } from "mocha";
import _ from '../../src';

const fs = require('fs');

const outFileName = 'benchmark-output.txt'

const onError = (err) => {
    if(err) {
        throw err;
    }
}

function clenFile() {    
    try {
        fs.truncateSync(outFileName, 0, function(){console.log('done')})
    }
    catch(e) {
        console.log('file not found')
    }
}

clenFile();

function appendLog(value: string): void {
    fs.appendFileSync(outFileName, `${value}\r\n`);
}

export const BENCH_TIMEOUT = '200s';

export function getSuite(name: string, onStart?: () => void, onComplite?: () => void): Suite {
    const suite = new Suite(name, {
        onCycle: (event: Event) => {
            const log = String(event.target);
            appendLog(log);
            console.log(log)
        },
        onStart: () => {
            if(onStart != undefined) {
                onStart();
            }
        },
        onComplete: () => {            
            if(onComplite != undefined) {
                onComplite();
            }
        },
        onError: function() {
            console.warn(...arguments)
        }
    })

    return suite;
}

export const values = [
    1_000,
    100,
    10
];

export function b_chain(func: (array: any[]) => Suite): Test[] {
    return values.map(item => 
        bit(`${item} array`, () => {
            appendLog(`Array Length: ${item}`)
            const array = _.random(item, 50).select(item => item % 3).toArray();

            func(array).run();
            
            appendLog(`###`)
        })
    )
}

export function bit(title: string, func: Func): Test {
    const test = it(title, func);
    test.timeout(BENCH_TIMEOUT);

    return test;
}

export function bench_describe(title: string, func: (this: Mocha.Suite) => void) : Mocha.Suite {  
    const desc = describe(title, func)

    desc.beforeAll(() => {
        appendLog(`Bench Name: ${title}`);
    })

    desc.afterAll(() => {
        appendLog('***');
    })

    return desc;
}