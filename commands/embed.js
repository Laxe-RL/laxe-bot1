const Discord = require ('discord.js')

module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Mon titre')
            .setDescription('La descriprion de mon embed'))
    },
    name: 'embed'
}



