import { useRef, type ChangeEvent } from 'react'
import { usePhotoUrl } from '../../utils/image'

interface PhotoPickerProps {
  photo?: Blob
  onChange: (photo: Blob | undefined) => void
}

export function PhotoPicker({ photo, onChange }: PhotoPickerProps) {
  const previewUrl = usePhotoUrl(photo)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    onChange(file)
    event.target.value = ''
  }

  return (
    <div>
      <span className="text-sm font-medium text-stone-700">Photo</span>
      <div className="mt-2 flex items-center gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-stone-100">
          {previewUrl ? (
            <img src={previewUrl} alt="Selected item" className="h-full w-full object-cover" />
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              className="h-8 w-8 text-stone-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3a2 2 0 0 1 2 2 5 5 0 0 1 5 5l2 7a1 1 0 0 1-1 1.3H4a1 1 0 0 1-1-1.3l2-7a5 5 0 0 1 5-5 2 2 0 0 1 2-2Z"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full border border-stone-300 px-4 py-1.5 text-sm font-medium text-stone-700"
          >
            {photo ? 'Replace photo' : 'Add photo'}
          </button>
          {photo && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="text-sm font-medium text-red-600"
            >
              Remove photo
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
