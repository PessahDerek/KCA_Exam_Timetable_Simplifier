import {create} from "zustand";
import React from "react";
import readXlsxFile, {Row} from "read-excel-file";

interface tableObj {
    date: string,
    time: string,
    code: number,
    unit: string,
    venue: string
}

interface excelStoreObj {
    excel: Row[];
    importantKeys: Row;
    units: string[];
    myUnits: string[];
    table: tableObj[];

    addMyUnit: (unitCode: string) => void;
    delMyUnit: (index: number) => void;
    getUnits: (rows: Row[]) => void;
    readFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
    generateTable: () => void;
}


function correctDate(serial: number) {
    const date = new Date((serial - 2) * 86400000 + Date.UTC(1900, 0, 1));

    // Array of month names (adjust if needed for your language/locale)
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
}


const excelStore = create<excelStoreObj>((set, get) => ({
    excel: [],
    units: [],
    myUnits: [],
    importantKeys: [],
    table: [],

    addMyUnit: (value) => {
        let list = get().myUnits
        if (!list.includes(value)) list.push(value)
        set(prev => ({...prev, myUnits: list}))
    },
    delMyUnit: (index) => {
        let filtered = get().myUnits.filter((u, i)=>i !== index)
        set(prev=>({...prev, myUnits: filtered}))
    },
    readFile: (event) => {
        event.preventDefault()
        let file = event.target.files
        if (!file || !file[0]) {
            set(prev=>({...prev, units: []}))
            return event.target.files = null
        }
        readXlsxFile(file[0])
            .then(rows => {
                // get indexes to fetch the when_what_where
                // get the array
                rows = rows.map(r => r.map(x => typeof x === 'string' ? x.toLowerCase() : x))
                let keyIndex = rows.findIndex(r => r.includes("unit code"))
                let keyArr = rows[keyIndex]
                set(prev => ({...prev, importantKeys: keyArr, excel: rows}))
                get().getUnits(rows)
            })
            .catch(err => {
                console.log(err)
            })
    },
    generateTable: () => {
        let table: tableObj[] = []
        for (let unit of get().myUnits) {
            let hold: tableObj = {date: "", time: "", code: 0, unit: "", venue: ""}
            for (let row of get().excel) {
                if (row.includes(unit.split("-")[0].toLowerCase())) {
                    // @ts-ignore
                    hold["date"] = row[get().importantKeys.findIndex(p => p.includes("date"))]
                    // @ts-ignore
                    console.log(get().importantKeys.findIndex(p => p.includes("date")))
                    // @ts-ignore
                    hold["time"] = row[get().importantKeys.findIndex(p => p.includes("time"))]
                    // @ts-ignore
                    hold["code"] = row[get().importantKeys.findIndex(p => p.includes("code"))]
                    // @ts-ignore
                    hold["unit"] = row[get().importantKeys.findIndex(p => p.includes("name"))]
                    // @ts-ignore
                    hold["venue"] = row[get().importantKeys.findIndex(p => p.includes("venue") || p.includes("room"))]
                }
            }
            table.push(hold)
            table = table.sort((a, b) => Number(a.date) - Number(b.date))
        }
        let modified = table.map(rec => {
            const date_ = correctDate(Number(rec.date)); // Modify the date
            return {...rec, date: date_}; // Create a new object with modified 'date'
        });
        set(prev=>({...prev, table: modified}))
        setTimeout(()=>{
            window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})
        }, 1500)
    },
    getUnits: (rows) => {
        let units: string[] = []
        // @ts-ignore
        let code = get().importantKeys.findIndex(p => p.includes("code"))
        // @ts-ignore
        let name = get().importantKeys.findIndex(p => p.includes("unit name"))

        for (let row of rows) {
            if (row[code] && !units.includes(row[code] as string)) units.push(`${(row[code] as string).toUpperCase()}-${row[name]}`)
        }
        set(prev => ({...prev, units: units}))
    }
}))

export default excelStore;

