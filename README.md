# Detrás de cada taza — Alquimistas del Café

Versión preparada para GitHub Pages + Google Apps Script + Google Sheets.
Estado: no activada; requiere desplegar el receptor y configurar su URL.

## Activar en tu cuenta personal
1. Abrí https://script.google.com/ con dariotower@gmail.com y creá un proyecto.
2. Pegá Code.gs en el archivo del proyecto. Ejecutá setup una sola vez y autorizá la creación de la planilla. La URL aparece en el registro de ejecución. La planilla es privada: no la publiques ni habilites acceso por enlace.
3. Implementar → Nueva implementación → Aplicación web. Ejecutar como: vos. Acceso: cualquier persona (sin inicio de sesión). Implementar y copiar la URL que termina en /exec, no /dev.
4. Pegá esa URL entre las comillas de config.js.
5. Subí index.html y config.js al repositorio de GitHub elegido. Activá Settings → Pages → Deploy from a branch, rama correspondiente y carpeta raíz. Si usás una subcarpeta de un sitio existente, conservá su configuración.
6. Abrí el sitio sin iniciar sesión. Enviá una respuesta de prueba y verificá que aparezca exactamente una fila. Reintentá el mismo envío: no debe duplicarse. Eliminá solamente esa fila de prueba antes de difundir.

## Qué incluye
12 preguntas sobre territorio, trayectorias, formación y oportunidades; contacto opcional y autorizaciones separadas. Sin anuncio del curso de tueste. Los campos de género, edad y experiencias personales son opcionales. No se afirma que sea el primer relevamiento de la provincia.

Paleta basada en el manual: crema, marrón y terracota. Tipografía Alegreya Sans si está instalada, con Arial como respaldo. No incluye archivos de fuentes.

## Funcionamiento
El navegador envía un formulario HTML por POST al receptor de Google; la confirmación se muestra en Google después del guardado. No usa peticiones no-cors ni confirma un guardado que no se haya comprobado. No necesita claves en el sitio público. La planilla queda bajo la propiedad de la cuenta que ejecuta setup. Los correos se guardan junto con las respuestas, tal como informa el formulario.

Validación de servidor, neutralización de fórmulas en textos, bloqueo de escrituras simultáneas, identificador para reintentos y campo trampa básico contra bots. Este campo no reemplaza protección antispam robusta; Apps Script tiene cuotas y no es un servicio ilimitado. No hay lectura pública de respuestas.

## Antes de difundir
Revisar textos con Maru y Adri; acordar quién accede, plazo de conservación y devolución de resultados. El sondeo es voluntario y no representa por sí solo a todo el sector. Revisar los textos libres antes de publicar resultados para evitar identificar personas.

## Verificación
Sintaxis y validaciones probadas localmente. Pendiente: prueba real de publicación, permisos, envío anónimo y guardado en Sheets. No se ha desplegado ni creado la Sheet desde este paquete.
