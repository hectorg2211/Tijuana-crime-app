'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient()

interface ReactQueryProviderProps {
  children: React.ReactNode
}

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
  return (
    // Provide the client to your ReactQueryProvider
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

// function Todos() {
//   // Access the client
//   const queryClient = useQueryClient()

//   // Queries
//   const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

//   // Mutations
//   const mutation = useMutation({
//     mutationFn: postTodo,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ['todos'] })
//     },
//   })

//   return (
//     <div>
//       <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

//       <button
//         onClick={() => {
//           mutation.mutate({
//             id: Date.now(),
//             title: 'Do Laundry',
//           })
//         }}
//       >
//         Add Todo
//       </button>
//     </div>
//   )
// }

export default ReactQueryProvider
