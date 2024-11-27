"use client";

import excelStore from "@/store/excelStore";
import SelectUnits from "@/components/SelectUnits";
import ShowTT from "@/components/ShowTT";
import Uploader from "../components/Uploader";

export default function HomePage() {
  const { myUnits, readFile, generateTable } = excelStore();

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center flex-col p-10">
      <div className="text-center grid gap-2">
        <h1 className="font-semibold text-5xl text-primary">
          KCA TimeTable Simplifier
        </h1>
        <h4 className="text-gray-500">
          Make Your Timetable Simpler With Just a Few Clicks
        </h4>
      </div>
      <div className="my-10 w-full flex justify-center">
        <Uploader />
      </div>
        <SelectUnits />
        <div className={"w-[95%] m-auto grid grid-flow-row gap-4"}>
          {myUnits.length > 0 && (
            <button
              className="bg-primary px-4 py-2 rounded-md my-4 w-1/4 mx-auto"
              onClick={generateTable}
            >
              Generate
            </button>
          )}
          <ShowTT />
      </div>
    </div>
  );
}
