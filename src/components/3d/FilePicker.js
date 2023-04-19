import React from 'react'

const FilePicker = ({file, setFile, readFile}) => {
  return (
    <div className='filepicker-container'>
        <div className='flex-1 flex flex-col'>
        <label htmlFor='file-upload' className='filepicker-label '>Upload File</label>

            <input id='file-upload' type='file' accept='image/' onChange={(e) => setFile(e.target.files[0])} />
            <p className='mt-2 text-gray-500 text-xs truncate'>
            {file === '' ? "No file selected" : file.name}
        </p>
        </div>
        
        <div className='mt-4 flex flex-wrap gap-3'>
        <button className="bg-[#FFAA00] color-white p-3  text-white rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond " onClick={() => readFile('logo')}>
            Logo
          </button>
          <button className="bg-button color-white p-3  text-white rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond " onClick={() => readFile('full')}>
            Full
          </button>

        </div>
      
    </div>
  )
}

export default FilePicker
