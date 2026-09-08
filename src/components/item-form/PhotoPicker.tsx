import { useRef, type ChangeEvent } from 'react'
import { usePhotoUrl } from '../../utils/image'
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder'

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
      <p className="text-xs tracking-[0.14em] text-ink-faint uppercase">Photo</p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-3 block aspect-3/4 w-40 overflow-hidden bg-surface transition-opacity duration-200 active:opacity-80"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Selected item" className="h-full w-full object-cover" />
        ) : (
          <PhotoPlaceholder iconClassName="h-8 w-8" />
        )}
      </button>

      <div className="mt-3 flex gap-5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm text-ink underline underline-offset-4"
        >
          {photo ? 'Replace' : 'Add photo'}
        </button>
        {photo && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-sm text-ink-muted underline underline-offset-4"
          >
            Remove
          </button>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  )
}
