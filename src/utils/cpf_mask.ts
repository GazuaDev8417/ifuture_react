export const cpfInputMask = (cpf:string):string=>{
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}


export const inputDate = (date:string):string=>{
    return date.replace(/(\d{2})(\d{2})/g, '$1/$2')
}


export const cepInputMask = (cep:string):string=>{
    return cep.replace(/(\d{2})(\d{3})(\d{3})/g, '$1.$2-$3')
}
