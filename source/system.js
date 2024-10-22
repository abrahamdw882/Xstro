const { command, runtime } = require('../lib');
const { spawn, exec } = require('child_process');
const path = require('path');
const os = require('os');
const { tiny } = require('xstro');

command(
 {
  pattern: 'ping',
  desc: 'To check ping',
  type: 'system',
 },
 async (message) => {
  const msg = await message.reply('ᴄʜᴇᴄᴋɪɴɢ...');
  const updateInterval = 1000;

  for (let i = 0; i < 10; i++) {
   const start = new Date().getTime();
   await new Promise((resolve) => setTimeout(resolve, 20));
   const latency = new Date().getTime() - start;
   await msg.edit(`ʟᴀᴛᴇɴᴄʏ ${latency} ᴍs`);
   await new Promise((resolve) => setTimeout(resolve, updateInterval));
  }
 }
);

command(
 {
  pattern: 'restart',
  desc: 'Restart System',
  type: 'system',
 },
 async (message) => {
  await message.reply('Restarting the bot...');
  const filePath = path.resolve(__dirname, '..', 'index.js');
  spawn(process.execPath, [filePath], {
   detached: true,
   stdio: 'inherit',
  });
  process.exit();
 }
);

command(
 {
  pattern: 'shutdown',
  desc: 'Shutdown System',
  type: 'system',
 },
 async (message) => {
  await message.reply('Shutting down the bot...');
  process.exit();
 }
);

command(
 {
  pattern: 'cpu',
  desc: 'Get CPU details',
  type: 'system',
 },
 async (message) => {
  const cpus = os.cpus();
  const coreCount = cpus.length;
  const model = cpus[0].model;
  const averageSpeed = (cpus.reduce((acc, cpu) => acc + cpu.speed, 0) / coreCount).toFixed(2);

  const coreDetails = cpus.map((cpu, index) => `Core ${index + 1}: *${cpu.speed} MHz*`).join('\n');

  const output = `*CPU Information*\n\n` + `Total Cores: *${coreCount}*\n` + `Model: *${model}*\n` + `Average Speed: *${averageSpeed} MHz*\n\n` + `*Core Speeds:*\n${coreDetails}`;

  await message.reply(tiny(output));
 }
);

command(
 {
  pattern: 'network',
  desc: 'Get network interfaces details',
  type: 'system',
 },
 async (message) => {
  const interfaces = os.networkInterfaces();
  const interfaceDetails = Object.keys(interfaces)
   .map((iface) => {
    const addresses = interfaces[iface].map((addr) => `${addr.family} - ${addr.address} ${addr.internal ? '(internal)' : ''}`).join('\n');
    return `*${iface}*\n${addresses}`;
   })
   .join('\n\n');
  const output = `*Network Interfaces*\n\n${interfaceDetails}`;
  await message.reply(tiny(output));
 }
);

command(
 {
  pattern: 'runtime',
  desc: 'Get Runtime Of Bot',
  type: 'system',
 },
 async (message) => {
  const uptime = await runtime(process.uptime());
  return await message.send(tiny(`Running Since ${uptime}`));
 }
);

ommand(
    {
      pattern: 'join',
      desc: 'Join a group using an invite link',
      type: 'private',
    },
    async (message, match, m, client) => {
      if (!match) return await message.reply('Please provide a valid invite link.');
  
      const inviteLink = match.trim();
  
      
      const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
      const [_, code] = inviteLink.match(linkRegex) || [];
  
      if (!code) {
        return await message.reply('The invite link provided is invalid. Please check and try again.');
      }
  
      try {
        
        const response = await client.groupAcceptInvite(code);
  
        if (response) {
        
          const groupName = await client.groupMetadata(response); // Fetch group name
          return await message.reply(`Successfully joined the group: *${groupName.subject}*!`);
        } else {
          
          return await message.reply('Failed to join the group. The invite link may be invalid or expired.');
        }
      } catch (error) {
        
        console.error('Error joining the group:', error);
  
       
        return await message.reply('An error occurred while trying to join the group. Please check the invite link and try again.');
      }
    }
  );
