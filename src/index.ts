import type { Plugin } from 'vite'
import { transformAsync } from '@babel/core'
import babelPluginRewriteModulePath, { RewriteModulePathOptions } from 'babel-plugin-rewrite-module-path'
import path from 'path'

export type SharedModulesPluginOption = {
  packageName: string,
  subpath?: string,
  nodeModules?: string,
  sourceMap?: boolean,
}

export const defaultSharedModules = {
  subpath: '',
  nodeModules: 'node_modules',
  sourceMap: true,
}

export const sharedModulesPlugin = (sharedModulesPluginOption: SharedModulesPluginOption): Plugin => {
  const { packageName, subpath, nodeModules, sourceMap } = { ...defaultSharedModules, ...sharedModulesPluginOption }

  const sharedModulesString = path.join(packageName, subpath)
  const nodeModulesString = path.join(packageName, nodeModules)

  return ({
    name: 'sharedModulesPlugin',

    async transform (src) {
      if (src.includes(sharedModulesString)) {

        const rewriteModulePathOptions: RewriteModulePathOptions = {
          rewriteMapper: {
            [sharedModulesString]: nodeModulesString
          }
        }
        const transformed = await transformAsync(src, {
          sourceMaps: sourceMap ? true : false,
          plugins: [
            [babelPluginRewriteModulePath, rewriteModulePathOptions]
          ]
        })

        return {
          code: transformed?.code ?? undefined,
          map: transformed?.map ?? undefined,
        }
      }

      return
    },
  })
}