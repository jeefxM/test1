


export const createStore = async (info)=> {
    try{
     const res = await fetch('/api/db/createstore', {
        method:"POST",
        body: JSON.stringify(info),

    })

    return res

    }catch(error){
        console.log(error)
    }
}