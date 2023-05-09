import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Drive from '@ioc:Adonis/Core/Drive'
import axios from 'axios'

export async function generateAttachmentFromUrl(destPath: string, url: string, name: string) {
  //create file from url using axios
  const { data, headers } = await axios.get(url, {
    responseType: 'arraybuffer',
  })
  const fav = new Attachment({
    extname: 'png',
    mimeType: 'image/png',
    size: headers['content-length'],
    name: `${destPath}/${name}`,
  })
  fav.isPersisted = true
  await Drive.put(fav.name, data)

  return fav
}
