import parser from 'fast-xml-parser'
import describeGPX from 'Utils/mapUtils/describeGPX'

const readGpxUpload = (e) => {
  return new Promise(async (resolve, reject)=>{
    
    const data = e.dataTransfer

    const xmlOptions = {
      ignoreAttributes: false,
    }

    const parseFiles = (files) => {
      return new Promise((resolve) => {
        if (parser.validate(files) === true) {
          resolve(parser.parse(files, xmlOptions))
        } else {
          throw new Error("File is not a valid GPX file")
        }
      })
    }

    function readFiles(data){
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        //Check files
        if (!window.FileReader) { throw new Error("Browser not supported") }
        if (!data.files) { throw new Error("Error Loading Files") }
        if (data.files.length != 1) { throw new Error("May only upload one file at a time") }
        reader.onerror = () => {
          reader.abort();
          reject(new DOMException("Problem parsing input file."));
        };
        reader.onload = () => {
          resolve(reader.result);
          data.clearData()
        };
        reader.readAsText(data.files[0]);
      })
    }

    try{
      const files = await readFiles(data);
      const parsedFiles = await parseFiles(files)
      const gpx = await describeGPX(parsedFiles.gpx)
      resolve(gpx)
    }catch(err){
      reject(err)
    }    
  })
}

export default readGpxUpload