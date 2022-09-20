const palavra = document.querySelector('.palavra') // instancia objeto do input class .palavra
const categoria = document.querySelector('.categoria') //instancia objeto do input categoria class .categoria
const jogar = document.querySelector('.jogar') // instancia objeto do botao tipo botao
const JogarDeNovo = true

//para melhor visualizacao no codigo - variaveis globais
let categoriaSecreta  
let palavraSecreta 

let tentativas = 6

//lista dinamica para ser usada nas letras
let listaDinamica = []

//metodo para validar se digitou mais de 2 letras na palavra
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

//funcao para setar palavra e categoria no Storage do chrome
const handleSubmit = (event) => {
    event.preventDefault()

    //variavel temporaria apenas para poder transformar em caixa alta
    let categoriaUpper = categoria.value
    let palavraUpper = palavra.value

    //atribui o valor digitado so que em caixa alta
    categoriaSecreta = categoriaUpper.toUpperCase()
    palavraSecreta = palavraUpper.toUpperCase()

    console.log(categoriaSecreta)
    console.log(palavraSecreta)

    //chama a funcao para escrever o pontilhado e trazer categoria
    writeWord()

    //limpar os campos depois de cliar no botao    
    palavra.value = ''
    categoria.value = ''
        
}

//executa as funcoes de validacao e armazenamento no storage
palavra.addEventListener('input', validadeInput)
//Quando clicar em jogar chama a funcao para escrever palavra/categoria na tela
jogar.addEventListener('click', handleSubmit)


//funcao que escreve a palavra e categoria na tela
const writeWord = () => {

    //Categoria na tela 
    const categoriaTela = document.getElementById('categoria')
    categoriaTela.innerHTML = categoriaSecreta
    //Inicia a palavra com espaço na tela
    const palavraTela = document.getElementById('palavra-secreta')
    palavraTela.innerHTML = ''
  
    //Laco para montar a lista com a palavra
    for (i = 0; i < palavraSecreta.length; i++) {
        //verifica letra a letra e monta a quantidade de espaços
        if (listaDinamica[i] == undefined) {
            if (palavraSecreta[i] == ' ') {
                listaDinamica[i] = ' '
                //inclusive palavras compostas (letrasEspaco)
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>"+listaDinamica[i]+"</div>"
            } else {
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>"+listaDinamica[i]+"</div>"
            }

        } else{ //se nao for undefined
            if (palavraSecreta[i] == ' '){
                listaDinamica[i] = ' '
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>"+listaDinamica[i]+"</div>"
            } else {
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>"+listaDinamica[i]+"</div>"
            }
            
        }
    }    
}

//verifica a letra do HTML e chama funcoes
const checkLetter = (letra) => {
    //disabled no mouse apos click na letra
    document.getElementById('tecla-'+ letra).disabled = true
    //Se tentativas forem maior que zero
    if (tentativas > 0) {
        //executa a estilizacao da letra, compara as letras e escreve na tela
        changeStyleLetter('tecla-'+ letra, false)
        compareLists(letra)
        writeWord()

    }
    
}

//muda a estilizacao da letra quando clicada
const changeStyleLetter = (tecla, condicao) => {
    //condicao para estilizar botao quando clicado
    if (condicao == false) {
    document.getElementById(tecla).style.background = '#c71585'
    document.getElementById(tecla).style.color = '#ffffff'
    }else {
    document.getElementById(tecla).style.background = '#daa520'
    document.getElementById(tecla).style.color = '#8b008b'
    }
    
    
}

//compara a letra em cada posicao da palavra do storage com a lista
const compareLists = async (letra) => {   
    //variavel que guarda a posicao 
    const pos = palavraSecreta.indexOf(letra)
    //decresce as tentativas quando nao aceta a posicao
    if (pos < 0) {
        tentativas--
        //chama a imagem da forca
        loadImage()
        //acabando as tentativas apresenta o bootstrap de derrota
        if (tentativas == 0) {
            //chama a funcao modal com a mensagem como parametro
            openModal('OPS!', 'JUDAS FOI ENFORCADO! <br> A palavra correta é: '+ palavraSecreta)

            await color()
        }

    } else {//senao entra na lista e armazena letra ate length da palavra
        //se vitoria mantem a estilizacao
        changeStyleLetter('tecla-'+ letra, true)

        for(i = 0; i < palavraSecreta.length; i++) {            
            if(palavraSecreta[i] == letra) {//se existir a letra naquela posicao
                listaDinamica[i] = letra //guarda a letra na lista 
            }
        }
    }
    //variavel logica para vitoria
    let vitoria = true
    //percorre ate o tamanho da palavra
    for (i = 0; i < palavraSecreta.length; i++) {

        //CONDICAO PRINCIPAL ONDE COMPARA POSICAO A POSICAO DA LETRA ENTRE A PALAVRA COM A LISTA, SE FOR != A VARIAVEL LOGICA VITORIA = FALSE
        if (palavraSecreta[i] != listaDinamica[i]) {
            vitoria = false 
        }
    }
    //caso variavel continue verdadeira apresenta mensagem de vitoria
    if (vitoria == true) {
        openModal('PARABENS!', 'VOCÊ VENCEU!')
        //e zera as tentativas
        tentativas = 0
        
        await color()

    }
}

const color = async () => {
    while (JogarDeNovo == true) {
        document.getElementById('btnReiniciar').style.backgroundColor = 'red'
        document.getElementById('btnReiniciar').style.scale = 1.3
        await delay(500)
        document.getElementById('btnReiniciar').style.backgroundColor = 'yellow'
        document.getElementById('btnReiniciar').style.scale = 1
        await delay(500)

    }
}

const delay = async (tempo) => {
    return new Promise(x => setTimeout(x, tempo))
}

//Carrega as imagens na forca (bkground) conforme as tentativas
const loadImage = () => {
    switch (tentativas) {
        case 5:
            document.getElementById('imagem').style.background = "url('./img/forca01.png')"
            break

        case 4:
            document.getElementById('imagem').style.background = "url('./img/forca02.png')"
            break
    
        case 3:
            document.getElementById('imagem').style.background = "url('./img/forca03.png')"
            break

        case 2:
            document.getElementById('imagem').style.background = "url('./img/forca04.png')"
            break

        case 1:
            document.getElementById('imagem').style.background = "url('./img/forca05.png')"
            break

        case 0:
            document.getElementById('imagem').style.background = "url('./img/forca06.png')"
            break //nunca esquecer do brake
        //condicao importante
        default:
            document.getElementById('imagem').style.background = "url('./img/forca.png')"
            break
    }
}

//funcao para controlar o modal do bootstrap no HTML
const openModal = (titulo, mensagem) => {
    let modalTitulo = document.getElementById('exampleModalLabel')
    modalTitulo.innerHTML = titulo

    let modalBody = document.getElementById('modalBody')
    modalBody.innerHTML = mensagem
    //ativa o modal
    $('#myModal').modal({
        show: true
    })
}

//RESET DE TELA QUANDO CLICA NO BOTAO DO JOYSTICK
let btnReiniciar = document.querySelector('#btnReiniciar')
btnReiniciar.addEventListener('click', () => {    
    location.reload()

    JogarDeNovo = false
})

