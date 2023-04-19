

export default async function handler(req, res) {

    const {prompt} = req.body

    try{

       

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({prompt:prompt, n:1, size:'1024x1024', response_format:'b64_json'})
            
        })




        const image =  await  response.json()



        if (response.status === 200) {
            const realImage = image.data[0].b64_json 
            res.status(200).json({ photo: realImage });
          } else {
            console.log(response.status, response.statusText);
            res.status(500).json({ message: 'Something went wrong' });
          }

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"})

    }

}
