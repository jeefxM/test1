import React, {useState} from 'react'
import CanvasModel from '@/canvasJeefx';
import {motion, AnimatePresence} from 'framer-motion'
import { useSnapshot } from "valtio";
import state from "../store";
import { slideAnimation } from "@/config/motionJeefx";
import { downloadCanvasToImage, reader } from '@/config/helpersJeefx';
import Link from 'next/link';
import { EditorTabs,FilterTabs, DecalTypes } from '@/config/constantsJeefx'; 
import { AIPicker, ColorPicker,FilePicker,Tab  } from '@/components/3dJeefx';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Configurator = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {

      setGeneratingImg(true);

      const response = await fetch('/api/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const notify = () => toast("Please Upload An Image");

  const readFile = (type) => {
    if(!file){
      notify()
    }else{
    
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
    }
  }

  return (
    <AnimatePresence>
    
      <>  

       <div className='flex items-center h-screen sm:h-auto'>
       <ToastContainer/>


       <CanvasModel />


        <div className='editortabs-container tabs absolute right-0'>

          {EditorTabs.map((tab) => {
            return(
            <Tab key={tab.name} tab={tab}  handleClick={() => {setActiveEditorTab(tab.name)}}/>)
          })}

            {generateTabContent()}
        </div>
       </div>
       <div className='absolute z-10 top-20 right-5'>
        <Link href='/'>
       <button className="bg-button text-center font-bold whitespace-nowrap color-white p-3 text-white rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond w-auto">
            GO BACK
          </button>
          </Link>
          

       </div>
       <div className='absolute z-30 bottom-5 right-5'>
       <button className="bg-[#FFAA00] color-white p-3  text-white rounded-md border-b-4 border-2 border-black dark:border-white hover:bg-hover active:bg-buttonsecond " onClick={() => toast('Coming Soon...')}>
            Add to Cart
          </button>
       </div>

       <motion.div className='filtertabs-container' {...slideAnimation('right')}>
       {FilterTabs.map((tab) => {
            return(
            <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]}  handleClick={() => handleActiveFilterTab(tab.name)}/>)
          })}
       </motion.div>
          </>

    
    </AnimatePresence>
  )
}

export default Configurator
