import { MessageType } from '@adiwajshing/baileys'
import request from '../../lib/request'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'pinterest',
            aliases: ['pi', 'pin'],
            description: 'Search wallpaper from pinterest.com. ',
            category: 'media',
            dm: true,
            usage: `${client.config.prefix}pinterest [name]`
        })
    }
    // static count = 0
    run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void (await M.reply(`Give me a term to search, Baka!`));
		const chitoge: any = joined.trim().split("|");
		const term: string = chitoge[0];
		const amount: number = chitoge[1];
		if (!amount)
			return void M.reply(
				`Give me the number , Baka!\n\nExample: *${this.client.config.prefix}pin tomioka|5*`
			);
		if (amount > 20)
			return void M.reply(`Do you want me to spam in this group?`);
   
         const { data } = await axios.get(`https://api-xcoders.xyz/api/search/pinterest?query=${term}&apikey=Zl0clXuAbx`)
        if (data.result[0] == undefined) return void M.reply( await request.buffer(`https://www.linkpicture.com/q/IMG-20220118-WA0387.png`),
        MessageType.image,
                    undefined,
                    undefined,
                    `404 Error can not find *${term}*`,
                    undefined
                )
        const buffer = await request.buffer(data.result[Math.floor(Math.random() * data.result.length)]).catch((e) => {
            return void M.reply(e.message)
        })
        for (let i = 0; i < amount; i++) {
			const res = `*🌟 Here you go.*`;
			this.client.sendMessage(
				M.from,
				{ url: data.result[Math.floor(Math.random() * data.result.length)] },
				MessageType.image,
				{
					quoted: M.WAMessage,
					caption: `${res}`,
				}
			);
		}
}
}
