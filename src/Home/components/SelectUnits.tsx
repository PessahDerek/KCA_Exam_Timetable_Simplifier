'use client'


import excelStore from "@/store/excelStore";
import {useState} from "react";
import {BiSolidTrash} from "react-icons/bi";

export default function SelectUnits(){
    const {myUnits, units, addMyUnit, delMyUnit } = excelStore();
    const [value, setValue] = useState("")

    const addUnit = (unit: string) => {
        addMyUnit(unit)
        setValue("")
    }

    const delUnit = (index: number) => {
        delMyUnit(index)
    }

    if(units.length < 1) return <></>
    return <div className={"step w-full md:grid grid-flow-col md:grid-cols-2 gap-4"}>
        <span className={"grid auto-rows-max gap-4"}>
            <h3>Step 2</h3>
            <p>Pick your units</p>
            <input placeholder={"Search"} className={""} type={"text"} value={value} onChange={e=>setValue(e.target.value)} />
            <div className={"w-full grid gap-2"}>
                {value.length >= 2 && units.filter(unit => unit.includes(value.toString())).map((unit, i) =>
                    <button onClick={()=>addUnit(unit)} className={"h-[3em] active:bg-blue-300 hover:bg-blue-50 cursor-pointer"} key={i}>
                    <p className={"w-full truncate pointer-events-none"}>{unit}</p>
                </button>)}
            </div>
        </span>
        <div className={"w-full grid grid-flow-row auto-rows-max gap-4"}>
            <h3>Selected Units</h3>
            <div className={"w-full gap-2"}>
                {myUnits.map((my, i) => <div className={"w-full min-h-[3em] leading-[3em] grid gap-2 grid-flow-col auto-cols-max"} key={i}>
                    <button onClick={()=>delUnit(i)} className={"w-[2em] h-[2em] m-auto flex bg-blue-50 "}>
                        <BiSolidTrash className={"m-auto fill-red-500"} />
                    </button>
                    <p className={"w-full break-all truncate"}>{my}</p>
                </div>)}
            </div>
        </div>
    </div>
}

