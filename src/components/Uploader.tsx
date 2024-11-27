    import excelStore from "@/store/excelStore";
    import { useState } from "react";
    import { FaFileUpload, FaTrashAlt } from "react-icons/fa";

    const Uploader = () => {
    const { readFile } = excelStore();
    const[fileName, setFileName] = useState<string>("Click here to upload a file")
    const[fileUploaded, setFileUploaded] = useState<boolean>(false)


    const handleDeleteFile = () => {
        setFileName("Click here to upload a file")
        setFileUploaded(false)
    }

    return (
        <main className="w-[90%] md:w-[50%]">
        <form className="border-2 border-primary/50 border-dashed rounded-md p-5 flex flex-col justify-center item-center gap-5">
            <FaFileUpload className="text-5xl mx-auto" />
            <div className="text-center">
                <label
                htmlFor="uploadBtn"
                className="text-primary underline cursor-pointer flex justify-center items-center gap-5"
                >
                {fileName} 
                <span>
                    {fileUploaded === true ? <FaTrashAlt className="cursor-pointer" onClick={handleDeleteFile}  /> : "" }
                    </span>
                </label>
                <input
                type={"file"}
                accept={".xlsx"}
                onChange={(event) => {
                    // Handling file read
                    readFile(event);
            
                    // Handling file name setting
                    const files = event.target.files;
                    if (files && files[0]) {
                    setFileName(files[0].name); // Assuming you have a state for fileName
                    }

                    setFileUploaded(true)
                }}
                id="uploadBtn"
                hidden
                />
            </div>
        </form>
        </main>
    );
    };

    export default Uploader;
