import React from 'react'

const AIPicker = ({prompt, setPrompt, generateImg, handleSubmit}) => {
  return (
    <div className='aipicker-container'>
        <textarea className='aipicker-textarea' placeholder='Ask AI...' rows={5} value={prompt} onChange={(e) => setPrompt(e.target.value)} ></textarea>
        {generateImg? (
            <button className="bg-button color-white p-3  text-white rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond " onClick={() => readFile('logo')}>
            Asking AI...
          </button>
        ) :<>
        <button onClick={() => handleSubmit('logo') } className="bg-button color-white p-3  text-white rounded-md w-auto h-10  font-bold text-sm border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond " >
            AI Logo
          </button> <button onClick={() => handleSubmit('full') } className="bg-buttonsecond color-white p-3 w-auto h-10 text-center font-bold text-sm text-white rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond " >
            AI Full Image
          </button></> }
      
    </div>
  )
}

export default AIPicker
