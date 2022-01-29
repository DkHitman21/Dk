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
            command: 'school',
            description: `Will send you random school bitch girls images .`,
            aliases: ['school'],
            category: 'nsfw',
            usage: `${client.config.prefix}school`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
                if (!(await this.client.getGroupData(M.from)).nsfw)
         return void M.reply(
        `Don't be a pervert, masaka! This is not an NSFW group.`
         );
        // fetch result of https://api.ichikaa.xyz/api/randomimage?q=school&apikey=Kuxw2RRu from the API using axios
        return void M.reply( await request.buffer(`https://velgrynd.herokuapp.com/api/randomimage?q=school&apikey=jxhcCGrCtIavLMAe6JY8xrwTX`),
        MessageType.image,
                    undefined,
                    undefined,
                    `💗 Here you go.\n`,
                    undefined
                ).catch((reason: any) =>
            M.reply(`✖ An error occurred. Please try again later.`))
    }
}
