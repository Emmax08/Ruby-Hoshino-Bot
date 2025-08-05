import PhoneNumber from 'awesome-phonenumber'

async function handler(m, { conn }) {
  m.react('📇')

//me la re chupan :) 

  const contactos = [
    {
      numero: '5217225305296',
      nombre: ' ࣪˖👑𝙀𝙢𝙢𝙖-𝙠𝙪𝙣 ִֶָ🪽་༘', 
      cargo: 'Creador de la bot ♡',
      nota: 'Creador y editor',
      correo: 'emmanuelben2009@gmail.com',
      region: '🇲🇽 CDMX',
      web: 'https://github.com/Emmax08',
      biografia: await conn.fetchStatus('5217225305296@s.whatsapp.net').then(res => res.status).catch(_ => 'Sin biografía')
    },
    {
      numero: '18096758983',
      nombre: '⟆⃝༉⃟⸙ ᯽ N͙e͙v͙i͙-D͙e͙v͙ ⌗⚙️࿐',
      cargo: 'Desarrollador y ayudante',
      nota: 'Soporte Técnico',
      correo: 'sin información',
      region: '🇩🇴 República Dominicana',
      web: 'https://github.com/nevi-dev',
      biografia: await conn.fetchStatus('18096758983@s.whatsapp.net').then(res => res.status).catch(_ => 'Sin biografía')
    },
    {
      numero: '18294868853',
      nombre: '⏤͟͞ू⃪ ፝͜⁞𝘿𝙞𝙤𝙣𝙚𝙞𝙗𝙞-ʳⁱᵖ ִֶ ࣪˖ ִֶָ👑་༘', 
      cargo: 'Decorador e editor',
      nota:  '┐(￣ー￣)┌',
      correo: 'selinapasena@gmail.com',
      region: '🇩🇴 RepúblicaDominicana',
      web: 'https://github.com/Dioneibi-rip',
      biografia: await conn.fetchStatus('18294868853@s.whatsapp.net').then(res => res.status).catch(_ => 'Sin biografía')
    }
  ]

  const contactArray = contactos.map(c => [
    c.numero,
    c.nombre,
    c.cargo,
    c.nota,
    c.correo,
    c.region,
    c.web,
    c.biografia
  ])

  await sendContactArray(conn, m.chat, contactArray, m)
}

handler.help = ['owner', 'creador', 'creator']
handler.tags = ['info']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
  let contacts = []
  for (let [number, name, title, note, email, region, url, bio] of data) {
    number = number.replace(/[^0-9]/g, '')
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${title}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${note}
item2.EMAIL;type=INTERNET:${email}
item2.X-ABLabel:Correo
item3.ADR:;;${region};;;;
item3.X-ABADR:ac
item3.X-ABLabel:Región
item4.URL:${url}
item4.X-ABLabel:Sitio Web
item5.X-ABLabel:${bio}
END:VCARD`.trim()
    contacts.push({ vcard, displayName: name })
  }

  return await conn.sendMessage(jid, {
    contacts: {
      displayName: 'Propietarios del Bot',
      contacts,
    }
  }, {
    quoted,
    ...options
  })
}