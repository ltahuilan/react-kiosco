import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { KioscoProvider } from './context/KioscoProvider';
import router from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <KioscoProvider>
            <RouterProvider router={router} />
        </KioscoProvider>
    </React.StrictMode>
    // <h1>Hola Mundo desde React main.jsx</h1>
);
