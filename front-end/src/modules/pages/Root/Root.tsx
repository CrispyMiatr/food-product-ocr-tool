import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from '../App';

const queryClient = new QueryClient()
// import '../App/i18n.config.ts';

export const Root = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
}