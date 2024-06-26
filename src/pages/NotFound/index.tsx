import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-2">Página não encontrada</p>
        <a href="/" className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">Voltar para a página inicial</a>
      </div>
    </div>
  );
};

export default NotFound;