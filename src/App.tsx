
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Routes'
import ErrorBoundary from './ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App