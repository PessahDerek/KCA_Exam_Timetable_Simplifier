"use client";

import excelStore from "@/store/excelStore";
import { useEffect, useMemo, useRef } from "react";
import { BiDownload } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import html2canvas from "html2canvas";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function ShowTT() {
  const { importantKeys, table } = excelStore();
  let important = ["date", "time", "unit code", "unit name", "venue"];
  let tb = useRef<HTMLTableElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const downloadTable = () => {
    const table = document.getElementById("table");

    if (tb.current)
      html2canvas(tb.current)
        .then((canvas) => {
          const link = document.createElement("a");
          link.download = "exam_timetable.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        })
        .catch((err) => {
          alert("Sorry, something went wrong!");
        });
  };


  if (table.length < 1) return <></>;
  return (
    <div
      className={
        "w-full min-h-screen grid auto-rows-max gap-4 justify-items-center justify-center "
      }
    >
      <p className={"text-xl md:hidden font-semibold text-red-400"}>
        Rotate your phone for full view
      </p>
      <h3 className="text-xl text-left">Final Timetable</h3>
      <Table
        ref={tb}
        className={"w-full h-max shadow-xl bg-white bg-opacity-50 grid m-auto "}
      >
        <TableHeader className={"w-full"}>
          <TableRow
            className={
              "text-left bg-primary text-white grid grid-cols-3 md:grid-cols-5"
            }
          >
            {important
              .filter((p) => important.includes(String(p)))
              .map((h, i) => (
                <TableHead className={"w-full h-[3em] pl-2 leading-[3em]"} key={i}>
                  {h.toUpperCase()}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody className={"w-full"}>
          {table.map((t, i) => (
            <TableRow
              className={
                "w-full border-solid border border-[#ccc] text-left grid grid-cols-3 md:grid-cols-5"
              }
              key={i}
            >
              {Object.values(t).map((v, x) => (
                <TableCell
                  className={`w-full pl-2 min-h-[3em] leading-[3em] truncate ]`}
                  key={x}
                >
                  {v}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span className={"flex flex-wrap gap-2"}>
        <button
          onClick={downloadTable}
          className={
            "w-max h-[3em] grid gap-2 grid-flow-col bg-primary text-white pl-5 pr-5 "
          }
        >
          <p className={"m-auto"}>Save Image</p>
          <BiDownload className={"m-auto"} />
        </button>
      </span>
    </div>
  );
}
