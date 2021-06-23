const Discord = require ('discord.js')

module.exports = {
    run: message => {
        
        class crééUneEquipe {
            constructor(nomdelateam, commande) {
                this.commande = commande
                this.nomdelateam = nomdelateam 
            }
            
            get laCommande() {
                return `j'en ais ra le cul`
            }
            
            set laCommande(laCommande) {
                var split = laCommande.split(' ')
                this.commande = split [0]
                this.nomdelateam = split [1]
            }
        }
        
        

        console.log(`J'ai réussis !`)

    },
    
    name: `createteam`

}






