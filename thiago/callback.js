const testar = () =>{
    console.log('teste')
}

const testarCB = (arg, cb) => {
    // cb(null, arg)
    cb('erro qualquer', null)

}

testarCB('string',(err, result)=>{
    if(err)
        console.log(`Err: ${err}`)
    
    if(result)
        console.log(`Result: ${result}`)
})