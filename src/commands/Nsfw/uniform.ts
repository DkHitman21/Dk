import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'uniform',
            description: `Will send you random uniform girl img 🌚.`,
            aliases: ['uf'],
            category: 'nsfw',
            usage: `${client.config.prefix}uniform`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
         if (!(await this.client.getGroupData(M.from)).nsfw)
         return void M.reply(
        `Don't be a pervert, Baka! This is not an NSFW group.`
         );
        // fetch result of https://velgrynd.herokuapp.com/api/randomimage?q=uniform&apikey=Kuxw2RRu from the API using axios
        return void M.reply( await request.buffer(`https://velgrynd.herokuapp.com/api/randomimage?q=uniform&apikey=jxhcCGrCtIavLMAe6JY8xrwTX`),
        MessageType.image,
                    undefined,
                    undefined,
                    `❣️ Here you go.\n`,
                    undefined
                ).catch((reason: any) =>
            M.reply(`✖ An error occurred. Please try again later.`))
    }
}
