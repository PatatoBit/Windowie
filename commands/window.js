const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

const file = new MessageAttachment('window.png');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('window')
        .setDescription("Takes a picture of Pat's Window"),
    async execute(interaction) {

        const now = new Date().toLocaleTimeString()

        const embed = new MessageEmbed()
            .setTitle(now)
            .setDescription("Yo pat's window")
            .setImage('attachment://window.png');

        return interaction.reply({ embed: [embed], files: [file] });
    },
};