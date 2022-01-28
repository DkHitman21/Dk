import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import akaneko from "akaneko";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
// import { MessageType, Mimetype } from '@adiwajshing/baileys'
const w5botapi = require('w5-textmaker');

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "advanceglow",
			description: `Get text image`,
			aliases: ["adglow"],
			category: "creation",
			usage: `${client.config.prefix}advanceglow`,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
		 if (!joined) return void (await M.reply(`Provide the text, Baka!`))
        const cara = joined.trim()
		const wall = await w5botapi.textpro("https://textpro.me/free-advanced-glow-text-effect-873.html",
    cara
    );
		const buffer = await request.buffer(wall).catch((e) => {
			return void M.reply(e.message);
		});
		while (true) {
			try {
				M.reply(
					buffer || "Could not fetch image. Please try again later",
					MessageType.image,
					undefined,
					undefined,
					`🌟 Here you go.\n`,
					undefined
				).catch((e) => {
					console.log(
						`This Error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
					);
					// console.log('Failed')
					M.reply(`Could not fetch image. Here's the URL: ${wall}`);
				});
				break;
			} catch (e) {
				// console.log('Failed2')
				M.reply(`Could not fetch image. Here's the URL : ${wall}`);
				console.log(
					`This Error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
				);
			}
		}
		return void null;
	};
}
