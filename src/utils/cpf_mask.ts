export const cpfInputMask = (cpf:string):string=>{
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}


export const cepInputMask = (cpf:string):string=>{
    return cpf.replace(/(\d{2})(\d{3})(\d{3})/g, '$1.$2-$3')
}
