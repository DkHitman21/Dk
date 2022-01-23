import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'support',
            aliases: ['support'],
            description: 'Gets the support group links',
            category: 'general',
            usage: `${client.config.prefix}Support`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        (await this.client.sendMessage(
        M.sender.jid,
        `    *Well...*
       *📱Title:Bitch Club*\n*📲 Invite:https://chat.whatsapp.com/LfhRgUxgHoQELSf50kG6Z6*`,
           MessageType.text
        ))
        const n = [
            './assets/videos/Becky/laina.honey.mp4'
        ]
        let chitoge = n[Math.floor(Math.random() * n.length)]
        return void M.reply(`Sent you personal message regarding this.`)
        return void this.client.sendMessage(M.from, { url:chitoge }, MessageType.video, {quoted:M.WAMessage,
            mimetype: Mimetype.gif,
         caption:`Sent you the support Link in personal message \n` }
        )

        }
}

           
