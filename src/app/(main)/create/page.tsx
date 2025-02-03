"use client"

import axiosInstance from '@/axios';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
// import "./_components/editor.css"
export default function CreateBlog() {
  const editorRef = useRef<any>(null);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const {toast} = useToast()
  const {logout} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      async function loadEditor() {
        const EditorJS = (await import('@editorjs/editorjs')).default;
        const Header = (await import('@editorjs/header')).default;
        // import ToggleBlock from 'editorjs-toggle-block';
        const List = (await import('@editorjs/list')).default;
        const  SimpleImage = (await import('@editorjs/simple-image')).default;
        const CodeTool = (await import('@editorjs/code')).default
        const editor = new EditorJS({
          holder: 'editorjs',
          tools: {
            header: {
              class: Header as unknown as EditorJS.BlockToolConstructable,
              config: {
                placeholder: 'Enter a header',
                defaultLevel: 2,
              },
              inlineToolbar: true,
            },
            list : List,
            image: SimpleImage as unknown as EditorJS.BlockToolConstructable,
            code : CodeTool
          },
          onReady: () => {
            setEditorInstance(editor);
            setIsEditorLoaded(true);
          },
        });

        editorRef.current = editor;
      }
      loadEditor();
    }
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
        setEditorInstance(null);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorInstance) return;

    const savedData = await editorInstance.save();

    const blogData = {
      title,
      image : thumbnail,
      content: savedData,
    };
    try{

        const response = axiosInstance.post('api/blogs/blog', blogData);
        
        toast({
            title : "Success",
                description : "Blog posted successfully",
        })
        router.push('/')
    }catch(error){
        if (error === "logout"){
            // LogOut
            logout()
        }else{

            toast({
                title : "Error",
                description : "Some Error occured",
            })
            console.error('Error creating blog:', error);
            return;
        }
    }

    console.log('Blog Data:', blogData);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-700 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
            Thumbnail URL
          </label>
          <Input
            id="thumbnail"
            type="url"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <div
            id="editorjs"
            className="min-h-full border  p-4 rounded-md"
          >
            {!isEditorLoaded && (
              <p className="text-gray-500">Loading editor...</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Blog
        </button>
      </form>
    </div>
  );
}
