export const deleteStore = async (id) => {
    try{
    const res = await fetch('/api/db/removestore', {
        method:"POST",
        body: JSON.stringify({id})

    })
    const data = await res.json()
    return data
    }catch(error){
        console.log(error)
    }

}