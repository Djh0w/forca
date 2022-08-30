const palavra = document.querySelector('.palavra')
const categoria = document.querySelector('.categoria')
const jogar = document.querySelector('.jogar')
const form = document.querySelector('.form')
const categoriaTela = document.getElementById('categoria')
const palavraSecreta = document.getElementById('palavra-secreta')

let listaDinamica = []


const validadeInput = ({ target }) => {
   /*console.log(event.target.value)
   event = recupera o target (tag input)
   target = tag do input
   value = valor da tag input*/
   
   if (target.value.length > 2) {
        jogar.removeAttribute('disabled')  
        return      
   } 
        
   jogar.setAttribute('disabled', '')
}

const handleSubmit = (event) => {
    event.preventDefault()
    /*Local Storage e o local do browser onde salvam informacoes
     recebe dois parametros, chave e valor do input */    
    localStorage.setItem('palavra', palavra.value)
    localStorage.setItem('categoria', categoria.value)

    //limpar os campos depois de cliar no botao    
    palavra.value = ''
    categoria.value = ''

    writeWord()
        
}


palavra.addEventListener('input', validadeInput)
form.addEventListener('submit', handleSubmit)


const writeWord = () => {
    categoriaTela.innerHTML = localStorage.getItem('categoria').toUpperCase()
    palavraSecreta.value = localStorage.getItem('palavra').toUpperCase()

    console.log(palavraSecreta.value)

    for (i = 0; i < palavraSecreta.value.length; i++) {
        if (listaDinamica[i] == undefined) {
            listaDinamica[i] = '&nbsp;'
            palavraSecreta.innerHTML = palavraSecreta.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
        } else {
            palavraSecreta.innerHTML = palavraSecreta.innerHTML + 
            "<div class='letras'>" + listaDinamica[i] + "</div>"
        }
    }
}

