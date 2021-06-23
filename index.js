const Discord = require ('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json')
    fs = require('fs')

client.login(config.token)
client.commands = new Discord.Collection()

client.login(process.env.TOKEN);

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file =>{
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(`${member} a rejoint le server. Nous sommes désormais ${member.guild.memberCount} ! 🎉`)
    member.roles.add(config.greeting.role)
})

client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if(!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reactionQ.users.remove(user)
    reaction.message.guild.member(user).roles.remove("856590653995745330")
})

client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if(!reactionRoleElem || reactionRoleElem.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})

client.on('ready', () => {
    const statuses = [
        'RL Scrims',
        'https://discord.gg/j9pTnryDKm'
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i], {type: 'PLAYING'})
        i = ++i % statuses.length
    }, 1e4)
    
})










