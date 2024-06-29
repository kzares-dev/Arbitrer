"use client"
import { NextSeo } from 'next-seo';

const MyServerComponent = () => {
  return (
    <>
      <NextSeo
        title="Título de la página"
        description="Descripción de la página"
        openGraph={{
          title: 'Título para Open Graph',
          description: 'Descripción para Open Graph',
        }}
      />
      <div>
        Contenido del componente de servidor
      </div>
    </>
  );
};

export default MyServerComponent;