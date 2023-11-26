'use client'

import excelStore from "@/store/excelStore";
import {useEffect, useMemo, useRef} from "react";
import {BiDownload} from "react-icons/bi";
import {FaXTwitter} from "react-icons/fa6";
import {FaGithub} from "react-icons/fa";
import html2canvas from "html2canvas";


export default function ShowTT(){
    const { importantKeys, table } = excelStore();
    let important = ['date', 'time', 'unit code', 'unit name', 'venue']
    let tb = useRef<HTMLTableElement>(null)

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: "smooth"})
    }, [])

    const downloadTable = () => {
        const table = document.getElementById("table")

        if(tb.current)html2canvas(tb.current)
            .then(canvas=>{
                const link = document.createElement("a");
                link.download = 'examTT.png'
                link.href = canvas.toDataURL("image/png")
                link.click()
            })
            .catch(err => {
                alert("Sorry, something went wrong!")
            })
    }
    
    const followTwitter = () => window.open("https://twitter.com/devDerek_", "_blank")
    const followGithub = () => window.open("https://github.com/PessahDerek", "_blank")

    if(table.length < 1) return <></>
    return (
        <div className={"w-full min-h-screen grid justify-items-center justify-center "}>
            <div className={"w-[50vmin] h-[50vmin] rounded-full bg-gradient-to-tr from-red-600 to-blue-500 opacity-60 blur-3xl absolute bottom-0 top-0 m-auto "} />
            <p className={"text-xl md:hidden font-bold text-red-400"}>Rotate your phone for full screenshot of the table</p>
            <table ref={tb} className={"w-full h-max shadow-xl bg-white bg-opacity-50 grid m-auto "}>
                <thead className={"w-full"}>
                    <tr className={"text-left bg-biscay-600 text-white grid grid-cols-3 md:grid-cols-5"}>
                    {important.filter(p => important.includes(String(p))).map((h, i)=>
                        <th className={"w-full h-[3em] pl-2 leading-[3em]"} key={i}>{h.toUpperCase()}</th>)}
                    </tr>
                </thead>
                <tbody className={"w-full"}>
                    {table.map((t, i) => <tr className={"w-full border-solid border border-[#ccc] text-left grid grid-cols-3 md:grid-cols-5"} key={i}>
                        {Object.values(t).map((v, x)=>
                            <td className={`w-full pl-2 min-h-[3em] leading-[3em] truncate ]`} key={x}>{v}</td>)}
                    </tr>)}
                </tbody>
                <p className={"m-auto"}>Generated by KCA Simple TT</p>
            </table>
            <span className={"flex flex-wrap gap-2"}>
                <button onClick={downloadTable} className={"w-max h-[3em] grid gap-2 grid-flow-col bg-biscay-600 text-white pl-5 pr-5 "}>
                    <p className={"m-auto"}>Save Image</p>
                    <BiDownload className={"m-auto"} />
                </button>
                <button onClick={followTwitter} className={"w-max h-[3em] leading-[3em] pl-5 pr-5 grid gap-2 bg-biscay-400 text-white grid-flow-col"} >
                    follow me on <FaXTwitter className={'m-auto'} />
                </button>
                <button onClick={followGithub} className={"w-max h-[3em] leading-[3em] pl-5 pr-5 grid gap-2 bg-biscay-400 text-white grid-flow-col"}>
                    follow/star on github <FaGithub className={"m-auto"} />
                </button>
            </span>
        </div>
    )
}

