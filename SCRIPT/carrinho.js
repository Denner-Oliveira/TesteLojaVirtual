let carrinhoDeCompras = [];                                 //ARRAY DO CARRINHO
let itens = document.querySelectorAll('.add');              //SELETOR DOS BOTÕES ADIÇÃO
let itens2 = document.querySelectorAll('.remove');          //SELETOR DOS BOTÕES REMOÇÃO
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

for(p=0;p<itens.length;p++){                                //LINKANDO ATRIBUTOS PARA CHAMAR ADD ITEM
    let valor = JSON.stringify(produtos[p])
    itens[p].setAttribute("onmousedown", "adicionarItem("+valor+")")
    itens2[p].setAttribute("onmousedown", "removerItem("+valor+")")
}

function mudar(){                                           //MUDAR DISPLAY DO CARRINHO
    let a = document.querySelector('.Carrinho_janela');
    if(a.style.display == 'none' || a.style.display == ''){
        a.style.display = "block"
    }else{
        a.style.display = 'none'
    }
}

function removerItem(element){                        //REMOÇÃO DE ITENS
    if(carrinhoDeCompras.length > 0){   
        for(i = 0;i < carrinhoDeCompras.length;i++){
            let a = carrinhoDeCompras[i]
            if(element.id == a.id && a.qtd > 1){
                carrinhoDeCompras[i].qtd = a.qtd - element.qtd
                rProdutosNoCarrinho(element)
                break
            }else if(element.id == a.id && a.qtd == 1){     //RETIRAR ARRAY CARRINHO
                let a = carrinhoDeCompras.indexOf(carrinhoDeCompras[i]);
                carrinhoDeCompras.splice(a, 1);
                rProdutosNoCarrinho(element)
                break
            }
        }
    }
}
function adicionarItem(element){                      //ADIÇÃO DE ITENS
    if(carrinhoDeCompras.length == 0){
        carrinhoDeCompras.push(element)
        produtosNoCarrinho(element)
    }else{
        for(i = 0;i < carrinhoDeCompras.length;i++){
            let a = carrinhoDeCompras[i]
            if(element.id == a.id){
                carrinhoDeCompras[i].qtd = element.qtd + carrinhoDeCompras[i].qtd
                produtosNoCarrinho(element)
                break
            }else if(i == carrinhoDeCompras.length-1 && carrinhoDeCompras[i].id != element.id){ 
                carrinhoDeCompras.push(element)
                produtosNoCarrinho(element)
                break
            }
        }
    }
}

function produtosNoCarrinho(element){                 //ADICIONAR PRODUTOS NA DIV CARRINHO
    let elementoPai = document.querySelector('.Carrinho_janela')
    let itensNoCarrinho = document.createElement('ul')
    let texto = document.createElement('p')
    let textosrc = document.createTextNode(element.item)
    texto.setAttribute('class','nomeItem')
    texto.appendChild(textosrc)
    let img = document.createElement('img')
    let preco = document.createElement('p')
    let precoItem = document.createTextNode(`R$ ${element.preco},00`)
    preco.setAttribute('class','precoItem')
    preco.appendChild(precoItem)
    let qtdd = document.createElement('p')
    let qtddItem = document.createTextNode(element.qtd)
    qtdd.append(qtddItem)
    qtdd.setAttribute('class','qtdItem')
    for(m=0;m<carrinhoDeCompras.length;m++){
        let qtd = carrinhoDeCompras[m].qtd
        let id = carrinhoDeCompras[m].id
        let d = document.querySelectorAll('.Carrinho_janela ul')
        let c = d[m]
        let e = carrinhoDeCompras[m]    
        if(qtd > 1 && id == element.id){
            let t = c.querySelector('.qtdItem')
            t.innerHTML = e.qtd 
            break
        }else if(m == carrinhoDeCompras.length -1 && qtd>=1){
            for(i = 0; i < carrinhoDeCompras.length;i++){
                img.setAttribute('src', imagens[element.id - 1])
                itensNoCarrinho.appendChild(img)
                itensNoCarrinho.appendChild(texto)
                itensNoCarrinho.appendChild(preco)
                itensNoCarrinho.appendChild(qtdd)
                elementoPai.appendChild(itensNoCarrinho)
                break
            }
        }
    }
}

function rProdutosNoCarrinho(element){                  //REMOVER PRODUTOS NA DIV CARRINHO
    let a = document.querySelectorAll('.Carrinho_janela ul');
    let carro = document.querySelector('.Carrinho_janela')
    for(i=0;i<a.length;i++){
        valor = a[i];
        if(element.item == a[i].childNodes[1].textContent){
            if(a[i].childNodes[3].textContent > 1){
                let b = a[i].childNodes[3].textContent
                let valor = parseInt(b,10)    
                a[i].childNodes[3].innerHTML = valor - 1
            }else{
                carro.removeChild(a[i])
            }
        }
    }
}
