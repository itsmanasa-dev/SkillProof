import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { loader } from '@monaco-editor/react'

self.MonacoEnvironment = {
  getWorker: () => new EditorWorker(),
}

loader.config({ monaco })

export { monaco }