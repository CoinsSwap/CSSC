import exists from './tasks/exists'
import setup from './tasks/setup'
import download from './tasks/download'
import cleanup from './tasks/cleanup'
import run from './tasks/run'
import account from './tasks/account'
import prompts from './tasks/prompts'

import { platform } from './constants'

export default async () => {
  const folder = await exists.folder()
  if (!folder) await setup.folder()
  if (folder) {
    if (folder.indexOf('genesis.json') === -1) await setup.genesis()
    if (folder.indexOf('geth.exe') == -1) {
      await download.geth()
      await cleanup.download()
    }
    if (folder.indexOf('data') === -1) {
      await setup.data()
      await account.create(await prompts.password())
    }
    return run()
  }
  await setup.genesis()
  await download.geth()
  await setup.data()
  await cleanup.download()
  await account.create(await prompts.password())
  return run()
}
