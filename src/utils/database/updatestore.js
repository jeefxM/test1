export const updateStore = async (info) => {
    try{
    const res = await fetch('/api/db/updatestore', {
        method:"POST",
        body: JSON.stringify({info})

    })
    const data = await res.json()
    return data
    }catch(error){
        console.log(error)
    }

}