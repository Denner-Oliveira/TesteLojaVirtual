let carrinhoDeCompras = [];                                 //ARRAY DO CARRINHO
let itens = document.querySelectorAll('.add');              //SELETOR DOS BOTÕES ADIÇÃO
let itens2 = document.querySelectorAll('.remove');          //SELETOR DOS BOTÕES REMOÇÃO
let tagCarrinho = document.querySelector('.carrinho_janela')
let elementosNoCarrinho;
let botao = document.querySelector('.botao_carrinho')

let produtos = [{id:01,qtd:1,preco:25,item:'caneca1'},       //PRODUTOS
                {id:02,qtd:1,preco:30,item:'caneca2'},
                {id:03,qtd:1,preco:35,item:'caneca3'},
                {id:04,qtd:1,preco:40,item:'caneca4'},
                {id:05,qtd:1,preco:45,item:'caneca5'},
                {id:06,qtd:1,preco:50,item:'caneca6'},
                {id:07,qtd:1,preco:55,item:'caneca7'},
                {id:08,qtd:1,preco:60,item:'caneca8'}
]

let imagens = ['../imagens/CANECA1.jpg',                     //IMAGENS DOS ITENS NO CARRINHO
               '../imagens/CANECA2.jpg',
               '../imagens/CANECA3.jpg',
               '../imagens/CANECA4.jpg',
               '../imagens/CANECA5.jpg',
               '../imagens/CANECA6.jpg',
               '../imagens/CANECA7.jpg',
               '../imagens/CANECA8.jpg',
]

botao.addEventListener('click', mudar)

for(p=0;p<itens.length;p++){                                //LINKANDO ATRIBUTOS PARA CHAMAR ADD ITEM
    let valor = JSON.stringify(produtos[p]);
    itens[p].setAttribute("onmousedown", "adicionarItem("+valor+")");
    itens2[p].setAttribute("onmousedown", "removerItem("+valor+")");
}

function mudar(){                                           //MUDAR DISPLAY DO CARRINHO
    tagCarrinho.classList.toggle('hide');
}

function removerItem(element){                        //REMOÇÃO DE ITENS
    if(carrinhoDeCompras.length > 0){   
        for(i = 0;i < carrinhoDeCompras.length;i++){
            let a = carrinhoDeCompras[i];
            if(element.id == a.id && a.qtd > 1){
                carrinhoDeCompras[i].qtd = a.qtd - element.qtd;
                removeProdutosNoCarrinho(element);
                break
            }else if(element.id == a.id && a.qtd == 1){     //RETIRAR ARRAY CARRINHO
                let a = carrinhoDeCompras.indexOf(carrinhoDeCompras[i]);
                carrinhoDeCompras.splice(a, 1);
                removeProdutosNoCarrinho(element);
                break
            }
        }
    }
}
function adicionarItem(element){                      //ADIÇÃO DE ITENS
    if(carrinhoDeCompras.length == 0){
        carrinhoDeCompras.push(element);
        adicionaProdutosNoCarrinho(element);
    }else{
        for(i = 0;i < carrinhoDeCompras.length;i++){
            let a = carrinhoDeCompras[i];
            if(element.id == a.id){
                carrinhoDeCompras[i].qtd = element.qtd + carrinhoDeCompras[i].qtd;
                adicionaProdutosNoCarrinho(element);
                break
            }else if(i == carrinhoDeCompras.length-1 && carrinhoDeCompras[i].id != element.id){ 
                carrinhoDeCompras.push(element);
                adicionaProdutosNoCarrinho(element);
                break
            }
        }
    }
}

function adicionaProdutosNoCarrinho(element){                 //ADICIONAR PRODUTOS NA DIV CARRINHO
    let elementoFilho = document.createElement('ul');
    let quantidade = document.createTextNode(element.qtd); 
    let valor = document.createTextNode(`R$ ${element.preco},00`); 
    let itemNome = document.createTextNode(element.item);
    let nomeItem = document.createElement('p'); nomeItem.setAttribute('class','nomeItem'); nomeItem.appendChild(itemNome);
    let itemPreco = document.createElement('p');itemPreco.setAttribute('class','precoItem'); itemPreco.appendChild(valor); 
    let itemQtd = document.createElement('p'); itemQtd.setAttribute('class','qtdItem'); itemQtd.append(quantidade); 
    let itemImg = document.createElement('img');itemImg.setAttribute('src', imagens[element.id - 1])
    for(m = 0; m<carrinhoDeCompras.length;m++){
        elementosNoCarrinho = document.querySelectorAll('.carrinho_janela ul');
        if(carrinhoDeCompras[m].qtd > 1 && carrinhoDeCompras[m].id == element.id){
            let it = elementosNoCarrinho[m].querySelector('.qtdItem');
            it.innerHTML = carrinhoDeCompras[m].qtd;
            break
        }else if(m == carrinhoDeCompras.length -1 && carrinhoDeCompras[m].qtd>=1){
            elementoFilho.appendChild(itemImg);
            elementoFilho.appendChild(nomeItem);
            elementoFilho.appendChild(itemPreco);
            elementoFilho.appendChild(itemQtd);
            tagCarrinho.appendChild(elementoFilho);
            break
        }
    }
}

function removeProdutosNoCarrinho(element){                  //REMOVER PRODUTOS NA DIV CARRINHO
    elementosNoCarrinho = document.querySelectorAll('.carrinho_janela ul');
    for(i=0;i<elementosNoCarrinho.length;i++){
        valor = elementosNoCarrinho[i];
        if(element.item == elementosNoCarrinho[i].childNodes[1].textContent){
            if(elementosNoCarrinho[i].childNodes[3].textContent > 1){
                let b = elementosNoCarrinho[i].childNodes[3].textContent;
                let valor = parseInt(b,10);
                elementosNoCarrinho[i].childNodes[3].innerHTML = valor - 1;
            }else{
                tagCarrinho.removeChild(elementosNoCarrinho[i]);
            }
        }
    }
}
