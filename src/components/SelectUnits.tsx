"use client";

import { Input } from "@/components/ui/input";
import excelStore from "@/store/excelStore";
import { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";

export default function SelectUnits() {
  const { myUnits, units, addMyUnit, delMyUnit } = excelStore();
  const [value, setValue] = useState("");

  const addUnit = (unit: string) => {
    addMyUnit(unit);
    setValue("");
  };

  const delUnit = (index: number) => {
    delMyUnit(index);
  };

  if (units.length < 1) return <></>;
  return (
    <div className={"step grid gap-4 w-[90%] md:w-[60%]"}>
      <span className={"grid auto-rows-max gap-4"}>
        <p className="text-xl">Select your units</p>
        <Input
          placeholder={"Search"}
          className={""}
          type={"text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className={"w-full grid gap-2"}>
          {value.length >= 2 &&
            units
              .filter((unit) =>
                unit.toLowerCase().includes(value.toLowerCase())
              )
              .map((unit, i) => (
                <button
                  onClick={() => addUnit(unit)}
                  className={
                    "h-[3em] active:bg-primary/20 hover:bg-primary/20 px-2 rounded-md cursor-pointer text-left text-gray-400"
                  }
                  key={i}
                >
                  <p className={"w-full truncate pointer-events-none"}>
                    {unit}
                  </p>
                </button>
              ))}
        </div>
      </span>
      <div className={"w-full grid grid-flow-row auto-rows-max gap-4 mt-4"}>
        <h3 className="text-xl">Selected units</h3>
        <div className={"w-full gap-2"}>
          {myUnits.map((my, i) => (
            <div
              className={
                "w-full min-h-[3em] leading-[3em] flex justify-between hover:bg-primary/10 px-2 rounded-md"
              }
              key={i}
            >
              <p className={"w-full break-all truncate text-gray-400"}>{my}</p>
              <button
                onClick={() => delUnit(i)}
                className={"w-[2em] h-[2em] m-auto flex"}
              >
                <BiSolidTrash className={"m-auto fill-primary"} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
