'use client'

import excelStore from "@/store/excelStore";
import SelectUnits from "@/Home/components/SelectUnits";
import ShowTT from "@/Home/components/ShowTT";
import Image from "next/image";

export default function HomePage() {
    const {myUnits, readFile, generateTable} = excelStore();

    return (
        <div className="w-full h-full grid gap-4">
            <span className={"w-[95%] m-auto h-max flex "}>
                <h1 className={"w-max h-max absolute z-[4] text-white top-0 bottom-0 left-0 right-0 m-auto "}>KCA TIMETABLE APP</h1>
                <img src={"/kcaGate.jpeg"}  loading={"eager"} alt={"kca gate"} width={0} height={0} className={"w-full m-auto h-[50vh] filter brightness-50 object-center object-cover"} />
            </span>
            <div className={"w-[95%] m-auto grid grid-flow-row gap-4"}>
                <span className={"step"}>
                    <h3>Step 1</h3>
                    <p>Upload File</p>
                    <input type={"file"} accept={".xlsx"} onChange={readFile} onError={()=>{
                        console.log("zii hufanyika")
                    }} />
                </span>
                <SelectUnits />
                {myUnits.length > 0 && <button
                    className={"w-max pl-5 pr-5 hover:bg-blue-500 active:bg-biscay-800 bg-biscay-600 h-[3em] text-white m-auto"}
                    onClick={generateTable}>
                    Generate table
                </button>}
                <ShowTT />
            </div>
        </div>
    )
}

