//Anime Menu
//Animer le texte apparaitre un par un
let h1 = document.querySelector("h1")

let texte = "Bienvenue sur La site " +"" + "VIN"
let index = 0

function menu()
{
    h1.innerHTML += texte.charAt(index)
    index++
    if (index === texte.length)
    {
        clearInterval(timer)
    }
}

let timer = setInterval(menu, 100)  

//gauche au centre
let titre = document.getElementById("caracteristique")
function caract(){
    let apparition = anime({
        targets: titre,
        opacity: [0,1],
        translateX: ['-50%', '0%'],
        duration: 1000,
        easing: 'easeOutQuad'
    })
    
}        

//gauche au centre
let list = document.getElementById("liste")

function liste(){
    let apparition = anime({
        targets: list,
        opacity: [0,1],
        translateX: ['-50%', '0%'],
        duration: 1000,
        easing: 'easeOutQuad'
    })

    
}            

let regionL = document.getElementById("regionL")
let regionC = document.getElementById("regionC")

function region(){
    anime({
        targets: regionL,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
    })
    anime({
        targets: regionC,
        opacity: [0,1],
        translateX: ['-50%', '0%'],
        delay: 700,
        duration: 1000,
        easing: 'easeOutQuad'
    })
    
}

let valide = document.getAnimations("Valider")
function ajouteVin(){
    anime({
        targets: valide,
        rotate: '45deg',
        duration: 1000,
        easing: 'easeInOutQuad'
    })
}
        

//Atao anaty tableau ny descri anilay vin
let listeVin = []

function ajouterVin() {
    let nom = document.getElementById("nom").value
    let type = document.getElementById("type").value
    let provenance = document.getElementById("provenance").value
    let niveau = document.getElementById("niveau").value
    let nombre = document.getElementById("nombre").value
    let prix = document.getElementById("prix").value
    if(isNaN(niveau)||niveau< 8.5||niveau>15){
        alert("ERREUR:(niveau)degre non correspondant")
        return
    }
    if(isNaN(nombre)||nombre< 0||nombre>= 500){
        alert("ERREUR:(nombre)nombre de vin ajoute non valide")
        return
    }
    if(isNaN(prix)||prix<15000||prix>40000){
        alert("ERREUR:minimum est de 15000 et maximum est 40000")
        return
    } 
    //Atao anaty objet vin ny zavatra voasoratra ao @ID("...")
    let vin = {
        nom: nom,
        type: type,
        provenance: provenance,
        niveau: niveau,
        nombre: nombre,
        prix: prix
    }
    //mi-enregistre anaty fichier JSON 
    //enregisterVin();
    document.getElementById("nom").value="";
    document.getElementById("type").value="";
    document.getElementById("provenance").value="";
    document.getElementById("niveau").value="";
    document.getElementById("nombre").value="";
    document.getElementById("prix").value="";
    //Apidirina anaty tableau listevin[] ny objet vin
    listeVin.push(vin)
    alert("Stock du vin Enregistre!")
    afficherListeVin(listeVin)
}

//Miaficher liste vin
function afficherListeVin(liste) {
    let table = document.getElementById("listeVin")
    table.innerHTML = ""



    liste.forEach(function(vin, index) {
        let row = table.insertRow(index)

        row.insertCell(0).innerHTML = vin.nom
        row.insertCell(1).innerHTML = vin.type
        row.insertCell(2).innerHTML = vin.provenance
        row.insertCell(3).innerHTML = vin.niveau
        row.insertCell(4).innerHTML = vin.nombre
        row.insertCell(5).innerHTML = vin.prix


        let actionCell = row.insertCell(6)
        let modifierBtn = document.createElement("button")
        modifierBtn.innerHTML = "Modifier"
        modifierBtn.onclick = function() {
            let nouveauVin = {
                nom: document.getElementById("nom").value,
                type: document.getElementById("type").value,
                provenance: document.getElementById("provenance").value,
                niveau: document.getElementById("niveau").value,
                nombre: document.getElementById("nombre").value,
                prix: document.getElementById("prix").value
            }
            modifierVin(index, nouveauVin)
        }
        actionCell.appendChild(modifierBtn)

        let actionCell1 = row.insertCell(7)
        let supprimerBtn = document.createElement("button")
        supprimerBtn.innerHTML = "Supprimer"
        supprimerBtn.onclick = function() {
            supprimerVin(index)
        }
        actionCell1.appendChild(supprimerBtn)

    })
}
function EnregistrerVin(){
    fetch("StockVin.JSON")
    method: "POST",
    Headers= {
        "Content-type": "application/JSON"
    }
}

function modifierVin(index, nouveauVin) {
    listeVin.splice(index, 1, nouveauVin)
    afficherListeVin(listeVin)
}

function supprimerVin(index) {
    listeVin.splice(index, 1)
    afficherListeVin(listeVin)
}

function rechercherVin() {
    let recherche = document.getElementById("recherche").value.toLowerCase()

    let resultatRecherche = listeVin.filter(function(vin) {
        return vin.nom.toLowerCase().includes(recherche) || vin.type.toLowerCase().includes(recherche) || vin.provenance.toLowerCase().includes(recherche) || vin.niveau.toString().includes(recherche) || vin.prix.toString().includes(recherche)
    })

    afficherListeVin(resultatRecherche)
}

const links = document.querySelectorAll('a[href^="#"]')

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        const targetId = link.getAttribute('href')
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('show')
        })
        document.querySelector(targetId).classList.add('show')
    })
})