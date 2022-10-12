//Validação para o campo email
export const emailValidation = (value) => {
    if (value.trim().length == 0)
        return 'Por favor, informe o seu endereço de email.';
    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(value))
        return 'Por favor, informe um endereço de email válido.'
 
    return true;
}
 
//Validação para o campo senha
export const senhaValidation = (value) => {
    if (value.trim().length < 8)
        return 'Por favor, informe uma senha com no mínimo 8 caracteres.';
    else if (value.trim().length > 20)
        return 'Por favor, informe uma senha com no máximo 20 caracteres.';
    else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value.trim()))
        return 'Por favor, informe uma senha pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial (!@#$).';
 
    return true;
}
 

