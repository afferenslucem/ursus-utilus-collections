import _ from './index'
import fs from 'fs';
import { group } from 'console';

interface Module {
    name: string;
    benches: Bench[];
}

interface Bench {
    arrayLength: string;
    meassures: Meassure[];
}

interface Meassure {
    name: string;
    value: string;
}

function parseModules(data: string): Module[] {
    const modules =  _(data.split('***\r\n')).where(item => !!item);
    return modules.select(item => parseModule(item)).toArray();
}

function parseModule(moduleText: string): Module {
    const nameMatch = new RegExp('Bench\\sName:\\s[A-za-z\\s\\d\\(\\)]+\\r\\n').exec(moduleText);

    if(nameMatch) {
        let name = nameMatch[0];

        const benchesText = moduleText.replace(name, '');
        
        name = name.replace('Bench Name: ', '').trim();

        return {
            name,
            benches: parseBenches(benchesText)
        }
    } else {
        console.warn(moduleText, 'name wrong');

        // @ts-ignore
        return null;
    }
}

function parseBenches(benchesText: string): Bench[] {
    const benches =  _(benchesText.split('###\r\n')).where(item => !!item);
    return benches.select(item => parseBench(item)).toArray();
}

function parseBench(benchText: string): Bench {
    const lengthMatch = new RegExp('Array\\sLength\\:\\s\\d+\\r\\n').exec(benchText);

    if(lengthMatch) {
        let length = lengthMatch[0];

        const meassuresText = benchText.replace(length, '');
        
        length = length.replace('Array Length: ', '').trim();

        return {
            arrayLength: length,
            meassures: parseMeassures(meassuresText)
        }
    } else {
        console.warn(benchText, 'length wrong');

        // @ts-ignore
        return null;
    }
}

function parseMeassures(meassuresText: string): Meassure[] {
    const meassures =  _(meassuresText.split('\r\n')).where(item => !!item);
    return meassures.select(item => parseMeassure(item)).toArray();
}

function parseMeassure(meassureText: string): Meassure {
    const cleaned = cleanMeassure(meassureText);

    if(cleaned !== null) {
        const values = cleaned.split(' x ');

        const name = values[0];

        const valueParts = values[1].split(',');
        const value = valueParts.join('');

        return {
            name,
            value
        }
    } else {
        console.warn(meassureText, 'wrong meassure');

        // @ts-ignore
        return null;
    }
}

function cleanMeassure(meassureText): string | null {
    const meassureMatch = new RegExp('.+\\sops/sec').exec(meassureText);

    if(!!meassureMatch) {
        return meassureMatch[0].replace(' ops/sec', '');
    } else {
        return null;
    }
}

const data = fs.readFileSync('benchmark-output.txt', {
    encoding: "utf8"
}).toString();

const modules = parseModules(data);

console.log('readed:', modules.length);

function writeModule(filename: string, module: Module) {
    const separator = ',';

    const benches = _(module.benches);

    const temp = benches.selectMany(item => _(item.meassures).select(m => ({len: item.arrayLength, messure: m})).toArray());

    const grouped = temp.groupBy(
        item => item.messure.name, 
        group => group
            .select(item => ({len: item.len, value: item.messure.value}))
            .orderBy(item => item.len, (a, b) => Number(a) - Number(b))
        );

    const toStrings = grouped
    .select(item => item.group.select(item => item.value).prepend(item.key).aggregate((acc, str) => acc + separator + str)).toArray()

    const legend = ' ' + separator + grouped.select(item => item.group).first().select(item => item.len).aggregate((a, b) => a + separator + b);

    fs.appendFileSync(filename, `${module.name}\r\n`);

    _(toStrings).select(item => {
        fs.appendFileSync(filename, `${item}\r\n`);
    }).toArray();

    fs.appendFileSync(filename, legend);
    fs.appendFileSync(filename, '\r\n\r\n');
}

const filename = 'data.csv'

fs.truncateSync(filename, 0)

_(modules).select(item => {
    writeModule(filename, item);
}).toArray();