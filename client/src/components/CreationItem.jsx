import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({ item }) => {

    const [expanded, setExpanded] = useState(false)

  return (
    <div onClick={()=>setExpanded(!expanded)} className='bg-white border border-orange-100 rounded-xl p-5 hover:shadow-lg hover:border-[#FA8D16]/30 transition-all duration-300 cursor-pointer'>
      <div className='flex justify-between items-center gap-4'>
        <div className='flex-1'>
          <h2 className='font-semibold text-gray-800 line-clamp-1'>
            {item.prompt}
          </h2>

          <p className='text-sm text-gray-500 mt-1'>
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <span className='bg-orange-100 text-[#FA8D16] px-4 py-1.5 rounded-full text-xs font-medium capitalize'>
          {item.type}
        </span>
      </div>
      {
        expanded && (
            <div className='mt-5 pt-5 border-t border-orange-100'>
            {item.type === 'image' ? (
                <div className='flex justify-center'>
                <img
                    src={item.content}
                    alt="image"
                    className='w-full max-w-lg rounded-2xl border border-orange-100 shadow-md'
                />
                </div>
            ) : (
                <div className='bg-orange-50/40 border border-orange-100 rounded-2xl p-6 shadow-sm'>
                <div className='reset-tw text-slate-700 leading-7'>
                    <Markdown>{item.content}</Markdown>
                </div>
                </div>
            )}
            </div>
        )
    }
    </div>
  )
}

export default CreationItem