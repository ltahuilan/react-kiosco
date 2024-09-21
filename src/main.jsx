import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { KioscoProvider } from './context/KioscoProvider';
import { AppProvider } from './context/AppProvider';
import router from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <KioscoProvider>
            <RouterProvider router={router} />
        </KioscoProvider>
    </React.StrictMode>
);
