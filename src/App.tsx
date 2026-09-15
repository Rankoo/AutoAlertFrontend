import './styles/globals.css';
import { AppRouter } from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from 'react-toastify';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    }
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}