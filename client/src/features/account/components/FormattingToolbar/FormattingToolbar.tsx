import { Editor } from '@tiptap/react'
import './FormattingToolbar.scss'
import { Bold } from 'lucide-react'

export default function FormattingToolbar({editor} : {editor : Editor | null}){

    // Need editor to render toolbar
    if (!editor) {
        return null
    } else {
        console.log(editor)
    }

    return (
        <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        >
            Bold
        </button>
            
       
    )
   
}

