

let id = 0
export const getNewID = () =>{
    console.log(id)
    return id++
}

export const getNewID2 = () =>{
    var timestamp = Date.now(); 
    return timestamp;
}

