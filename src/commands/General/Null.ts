import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: '${client.config.prefix}',
            description: '💻 play a song with just search term!',
            category: 'media',
            usage: `${client.config.prefix}`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            './assets/VID-20220129-WA0274.mp4'
        ]
        let lucy = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: lucy }, MessageType.video, {
            quoted: M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `No such command ${M.sender.username}! Do you mean *${this.client.config.prefix}help*? \n` }
        )
    }
}
          
       


    
        
           
           
            
            
        
    

    
        
           
           
           
   
