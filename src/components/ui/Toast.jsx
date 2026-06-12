import { Toaster } from 'react-hot-toast'

// Centralized toast styling — bark background, bottom-left placement
export default function Toast() {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        style: { background: '#2C3E2D', color: '#fff' },
        duration: 3000,
      }}
    />
  )
}
