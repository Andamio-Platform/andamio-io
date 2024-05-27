import { Editor } from '@tiptap/react'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Surface } from '../../ui/Surface'
import { Toggle } from '../../ui/Toggle'
import { useState, useCallback, useMemo } from 'react'

export type LinkEditorPanelProps = {
  initialUrl?: string
  initialOpenInNewTab?: boolean
  editor: Editor
}

export const useLinkEditorState = ({ initialUrl, initialOpenInNewTab, editor }: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl || '')
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab || false)

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }, [])

 
  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (isValidUrl) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
      }
    },
    [url, isValidUrl, openInNewTab],
  )

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  }
}

export const LinkEditorPanel = ({ initialOpenInNewTab, initialUrl, editor }: LinkEditorPanelProps) => {
  const state = useLinkEditorState({ initialOpenInNewTab, initialUrl, editor })

  return (
    <Surface className="p-2">
      <form onSubmit={state.handleSubmit} className="flex items-center gap-2">
        <label className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 cursor-text">
          <Icon name="Link" className="flex-none text-foreground dark:text-primary-foreground" />
          <input
            type="url"
            className="flex-1 bg-transparent outline-none min-w-[12rem] text-foreground text-sm dark:text-primary-foreground"
            placeholder="Enter URL"
            value={state.url}
            onChange={state.onChange}
          />
        </label>
        <Button variant="primary" buttonSize="small" type="submit" disabled={!state.isValidUrl}>
          Set Link
        </Button>
      </form>
      <div className="mt-3">
        <label className="flex items-center justify-start gap-2 text-sm font-semibold cursor-pointer select-none text-neutral-500 dark:text-neutral-400">
          Open in new tab
          <Toggle active={state.openInNewTab} onChange={state.setOpenInNewTab} />
        </label>
      </div>
    </Surface>
  )
}
