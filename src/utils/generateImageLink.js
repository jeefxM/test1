import { stageImageUpload } from "./shopifyadmin";
export const sendUpdatedImage = async (file) => {

    
    return new Promise(async (resolve, reject) => {
        try{

    const reader = new FileReader();

    reader.onload = async function () {

      const base64data = reader.result.split(',')[1];
      
  
      const data = {
        name: file.name,
        type: file.type,
        data: base64data,

      };

// generate image link
const uploadImg = await stageImageUpload({input:[
  {
    resource: "IMAGE", 
    filename: data.name,
    mimeType: data.type,
    httpMethod: "POST"
  }
]})

const [{ url, parameters }] = uploadImg.data.stagedUploadsCreate.stagedTargets
const formData = new FormData()

parameters.forEach(({name, value}) => {
    formData.append(name, value)
  })

  formData.append('file', file)

//put image into link
const uploadImageToShopify = await fetch(url, {
    method:"POST",
    body: formData
    
})
//update collection

    const key = parameters.find(p => p.name === 'key')
    resolve({key,url})

}
reader.readAsDataURL(file)

        }catch(error){
            reject(error)
        }
    })





}
