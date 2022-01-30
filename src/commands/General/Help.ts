import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from "@adiwajshing/baileys";
export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "help",
			description:
				"Displays the help menu or shows the info of the command provided",
			category: "general",
			usage: `${client.config.prefix}help (command_name)`,
			aliases: ["h"],
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		parsedArgs: IParsedArgs
	): Promise<void> => {
		const user = M.sender.jid;
		const beckylynch =
			"assets/VID-20220129-WA0274.mp4";
		if (!parsedArgs.joined) {
			const commands = this.handler.commands.keys();
			const categories: { [key: string]: ICommand[] } = {};
			for (const command of commands) {
				const info = this.handler.commands.get(command);
				if (!command) continue;
				if (!info?.config?.category || info.config.category === "dev") continue;
				if (
					!info?.config?.category ||
					(info.config.category === "nsfw" &&
						!(await this.client.getGroupData(M.from)).nsfw)
				)
					continue;
				if (Object.keys(categories).includes(info.config.category))
					categories[info.config.category].push(info);
				else {
					categories[info.config.category] = [];
					categories[info.config.category].push(info);
				}
			}
			let text = `👩🏻‍🦰 Hey! *@${
				user.split("@")[0]
			}*, I'm Dk👾Hitman💫 a bot built to make your group enjoyable⚠️.\n\nMy prefix is - "${
				this.client.config.prefix
			}"\n\n*╚『•My Cmd List•』╝*.\n\n`;
			const keys = Object.keys(categories);
			for (const key of keys)
				text += `*╚━❰😈${this.client.util.capitalize(
					key
				)} ❱━╝*\n❐ \`\`\`${categories[key]
					.map((command) => command.config?.command)
					.join(" , ")}\`\`\`\n\n`;
			return void this.client.sendMessage(
				M.from,
				{ url: beckylynch },
				MessageType.video,
				{
					quoted: M.WAMessage,
					mimetype: Mimetype.gif,
					caption: `${text} 🔥 *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`,
					contextInfo: { mentionedJid: [user] },
				}
			);
		}
		const key = parsedArgs.joined.toLowerCase();
		const command =
			this.handler.commands.get(key) || this.handler.aliases.get(key);
		if (!command) return void M.reply(`No Command of Alias Found | "${key}"`);
		const state = await this.client.DB.disabledcommands.findOne({
			command: command.config.command,
		});
		M.reply(
			`🚀 *Command:* ${this.client.util.capitalize(
				command.config?.command
			)}\n📉 *Status:* ${
				state ? "Disabled" : "Available"
			}\n⛩ *Category:* ${this.client.util.capitalize(
				command.config?.category || ""
			)}${
				command.config.aliases
					? `\n♦️ *Aliases:* ${command.config.aliases
							.map(this.client.util.capitalize)
							.join(", ")}`
					: ""
			}\n🎐 *Group Only:* ${this.client.util.capitalize(
				JSON.stringify(!command.config.dm ?? true)
			)}\n💎 *Usage:* ${command.config?.usage || ""}\n\n💞 *Description:* ${
				command.config?.description || ""
			}`
		);
	};
}
