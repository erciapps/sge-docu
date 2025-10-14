import React from "react";

export default function EntregaCard({
  unidad,
  title,
  description,
  date,
  time,
  link,
  imageSrc = "https://educamosclm.castillalamancha.es/portal/sites/default/files/LogoEducamos_206x30.jpg",
}) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gray-800 text-center border border-gray-200">
      {/* Logo */}
      <div className="flex justify-center items-center py-4 bg-white">
        <img
          src={imageSrc}
          alt="Logo EducamosCLM"
          className="h-7 object-contain"
        />
      </div>

      {/* Contenido principal */}
      <div className="px-6 pb-6" >
        {/* Unidad didáctica + título */}
<div className="flex flex-col items-center leading-tight">
  {unidad && (
    <span className="text-xl font-semibold uppercase text-orange-600 tracking-wide mb-2">
      {unidad}
    </span>
  )}
  <span className="text-lg font-semibold uppercase text-black dark:text-white tracking-wide mb-1">
    {title}
  </span>
</div>



        {/* Descripción */}
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

        {/* Fecha y hora */}
        <div className="mt-4 space-y-2 text-gray-800 dark:text-gray-200">
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8ZM6 7h12V6H6v1Z" />
            </svg>
            <span>{date}</span>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 8a1 1 0 0 1 1 1v3.586l2.707 2.707a1 1 0 1 1-1.414 1.414l-3-3A1 1 0 0 1 11 13V9a1 1 0 0 1 1-1Zm0-6a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
            </svg>
            <span>{time}</span>
          </div>
        </div>

        {/* Botón */}
        <div className="mt-6">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-orange-600 text-white font-semibold py-2 rounded-md hover:bg-orange-700 transition-colors"
          >
            ENTREGAR
          </a>
        </div>
      </div>
    </div>
  );
}
