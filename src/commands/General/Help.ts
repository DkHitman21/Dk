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
			let text = `๐ฉ๐ปโ๐ฆฐ Hey! *@${
				user.split("@")[0]
			}*, ๐'๐ฆ ๐ก๐ข๐ญ๐ฆ๐๐ง ๐ ๐๐จ๐ญ ๐๐ฎ๐ข๐ฅ๐ญ ๐ญ๐จ ๐ฆ๐๐ค๐ ๐ฒ๐จ๐ฎ๐ซ ๐ ๐ซ๐จ๐ฎ๐ฉ ๐๐ง๐ฃ๐จ๐ฒ๐๐๐ฅ๐โค๏ธ.\n\nMy prefix is - "${
				this.client.config.prefix
			}"\n\n*โใโขMy Cmd Listโขใโ*.\n\n`;
			const keys = Object.keys(categories);
			for (const key of keys)
				text += `*โโโฐ๐น${this.client.util.capitalize(
					key
				)} โฑโโ*\nโ \`\`\`${categories[key]
					.map((command) => command.config?.command)
					.join(" , ")}\`\`\`\n\n`;
			return void this.client.sendMessage(
				M.from,
				{ url: beckylynch },
				MessageType.video,
				{
					quoted: M.WAMessage,
					mimetype: Mimetype.gif,
					caption: `${text} โจ *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`,
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
			`๐ *Command:* ${this.client.util.capitalize(
				command.config?.command
			)}\n๐ *Status:* ${
				state ? "Disabled" : "Available"
			}\nโฉ *Category:* ${this.client.util.capitalize(
				command.config?.category || ""
			)}${
				command.config.aliases
					? `\nโฆ๏ธ *Aliases:* ${command.config.aliases
							.map(this.client.util.capitalize)
							.join(", ")}`
					: ""
			}\n๐ *Group Only:* ${this.client.util.capitalize(
				JSON.stringify(!command.config.dm ?? true)
			)}\n๐ *Usage:* ${command.config?.usage || ""}\n\n๐ *Description:* ${
				command.config?.description || ""
			}`
		);
	};
}
