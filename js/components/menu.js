const imagens = document.querySelectorAll(".imagem"); 

const texto = document.querySelector(".texto");

const secao1 = document.querySelector(".natureza");
const secao2 = document.querySelector(".praias");
const secao3 = document.querySelector(".montanhas");
const secao4 = document.querySelector(".florestas");

export default function Navigation() {
// percorre as imagens
imagens.forEach(function(imagem) {
    // quando a imagem for clicada
    imagem.addEventListener("click", function(){

        // verifica em qual imagem está
        var secao = imagem.dataset.secao;

        if(secao === "natureza"){
            texto.innerHTML = secao1.innerHTML;

        }

        else if(secao === "praias"){
            texto.innerHTML = secao2.innerHTML;
        }

        else if(secao === "montanhas"){
            texto.innerHTML = secao3.innerHTML;

        }

        else if(secao === "florestas"){
            texto.innerHTML = secao4.innerHTML;
        }
    });
}); 

}