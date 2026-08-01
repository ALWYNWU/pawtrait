/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
