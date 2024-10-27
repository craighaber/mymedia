import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import './Tiptap.scss'
import StarterKit from '@tiptap/starter-kit'
import FormattingToolbar from '../FormattingToolbar/FormattingToolbar'
import { useEffect } from 'react'

export default function Tiptap({description, descriptionElement, onChange} : {description: string | undefined, descriptionElement:  React.RefObject<HTMLDivElement>, onChange: (description: string) => void}){
    useEffect(() => {
        // if (descriptionElement.current){
        //    editor?.setOptions({element: descriptionElement.current})
        // }
        // console.log(editor?.options)
    }, [descriptionElement])
    
    const extensions = [
        StarterKit.configure(),
    ]
    const content = description
    const editor = useEditor({
        extensions,
        content,
        onUpdate({editor}) {
            onChange(editor.getHTML())
        }
    })
    return (
    <>
        <FormattingToolbar editor={editor}/>
        <EditorContent editor={editor} />
        {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
      </>
    )
}