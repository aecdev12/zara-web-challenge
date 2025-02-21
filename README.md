# ZARA WEB CHALLENGE

**By Albert Español Castillo**

Bienvenidos a esta versión de la prueba de Front End, la cual permite visualizar y filtrar por nombre los personajes de Dragon Ball además de entrar en el detalle (imagen, nombre, descripción y transformaciones ordenadas ascendentemente por ki) de cada uno. También brinda la posibilidad de añadir estos personajes a una lista de favoritos persistente, la cual también se puede visualizar y filtrar. La aplicación sigue de forma pixel perfect los diseños propuestos en Figma y es completamente responsive.

## Tecnologías

- **React 19**
- **React Context API**
- **Typescript 5**
- **SASS 1.84 con módulos**
- **Jest 29.7**
- **Next.js 15**
- **pnpm**
- **ESLint**
- **Prettier**

Next.js se ha elegido para brindar una mejor experiencia de usuario y de desarrollo, usando muchas de las features que vienen de fábrica, como pueden ser:

- SSR.
- SSG.
- Minimización automática en producción con SWC.
- App Router: Sencillez, rutas dinámicas, code splitting automático y next/navigation.
- Optimización automática con sus extensiones sobre los links (pre-renderizado de las páginas a las que el usuario puede ir) y de las imágenes (optimización, lazy-loading y cache), su extensión sobre la Fetch API añadiendo cache y revalidación para reducir el número de llamadas, y su code splitting automático con el App Router.

## Inicialización

Una vez clonado el repositorio:

1. `pnpm install` para instalar los módulos necesarios.
2. Crear un .env en la _root_ del proyecto que contenga las siguientes variables:

```env
API_BASE_URL=https://dragonball-api.com/api/
```

3. `pnpm dev` para probar el modo desarrollo.
4. `pnpm build && pnpm start` para probar el modo producción.

## Estructura

En el _root_ del proyecto nos encontramos con 3 directorios principales:

1. `__tests__`: Encargado de recoger todos los tests unitarios realizados con Jest.
2. `public`: El cual guarda los assets estáticos. En este caso es simplemente el logo de Marvel.
3. `src`: Encargado de recoger el App Router, los componentes y toda la lógica necesaria para que la aplicación funcione. El directorio `__tests__` tiene una estructura similar a este. Se divide en diversas capas:
   1. `api`: Dónde se gestiona el cliente, se almacenan los _schemas_ y se generan los servicios.
   2. `app`: El App Router. Cada directorio dentro del mismo representa una ruta real de la aplicación.
   3. `assets`: Dónde se guardan _assets_ reutilizables. En este caso, solamente hay iconos.
   4. `contexts`: Dónde se crean los contextos y se generan sus correspondientes providers con su lógica.
   5. `hooks`: Dónde se almacenan los _hooks_ propios.
   6. `lib`: Directorio misceláneo donde se encuentran constantes, tipos y enumerados globales, cada uno en su fichero correspondiente (p. ej.: `constants.ts`).
   7. `styles`: Dónde se almacenan los estilos globales, variables y mixins, para ser reutilizados en toda la aplicación.
   8. `ui`: Todos los componentes de la aplicación. Cada uno es guardado dentro de una carpeta con el mismo nombre, en donde comparte espacio con su módulo `.scss` correspondiente.
   9. `utils`: Carpeta de funciones puras reutilizables en toda la aplicación.

Bajo estos nos encontramos con las configuraciones de las distintas tecnologías usadas: `eslint.config.mjs`, `jest.config.ts`, `next.config.ts`, `tsconfig.json`. Las más relevantes son las de Jest y Next:

- `next.config.ts`: En esta hay 3 cambios:
  1. `redirects`: Sirve para redirigir a la ruta "/home" cualquier intento de entrada a la ruta "/". Simplemente organizativo.
  2. `images`: Se le dice a Next que las imágenes provenientes de la ruta de la API pueden ser utilizadas. En caso de no añadir esto, al usar next/image se lanzaría un error.
  3. `removeConsole`: Se le dice a Next que borre cualquier uso de `console` únicamente en el entorno de producción.
- `jest.config.ts`: En esta se ha usado `next/jest.js` para integrar al completo Jext con Next. Adicionalmente, se ha indicado el uso de `coverage` para ofrecer reportes sobre el % de cobertura de los tests, usando el motor v8. Finalmente, el entorno elegido es `jsdom` por ser el más similar a un navegador.

## Implementación

### 1. Rutas, _layouts_ y _error, not found & loading boundaries_

El App Router de Next nos permite una creación de rutas basada en las carpetas bajo el directorio `app`. Para esta aplicación se han creado 3:

- `home`: La ruta de entrada, donde se muestra la lista de 50 personajes y se permite el filtrado.
- `favorites`: Similar a la de `home`, pero solamente se muestran los personajes favoritos.
- `characters`: Ruta destinada a ver los detalles de los personajes. En concreto, solamente se usa una subruta dinámica (`[id]`) la cual acepta como parámetro la ID del personaje. P. ej.: `localhost:3000/characters/3` nos mostraría la información del personaje con ID 3; en cambio, `localhost:3000/characters` nos redirigiría a la página de 404.

Todas estas páginas se renderizan como hijos del componente `layout.tsx`, encontrado directamente bajo del directorio `app`. Este contiene los metadatos de la página, aplica la fuente _Roboto Condensed_ usando "next/font/google" y coloca el `<Header />` para que este sea visible en todas las rutas, con el logo para volver a `/home`. En caso de que se lanzara un error no controlado en un componente bajo de este layout, sería cazado por el fichero `error.tsx` y se mostraría el componente implementado dentro de este. Pasa igual con el fichero `loading.tsx` mientras la página se está cargando.

Particularmente, las rutas de `home` y `favorites` tienen un _sublayout_ compartido, el cual contiene la barra de búsqueda, y puede contener un título para la página. Se encuentra en el componente `SharedLayout.tsx` y este es usado dentro de los `layout.tsx` de `home` y `favorites` de forma adiente en base a las necesidades del diseño.

### 2. API

La capa de la API usa un cliente HTTP customizado muy básico para gestionar la URL base y extender la lógica de la _Fetch API_.

La API elegida ha sido la de Dragon Ball, ya que al intentar conectarse a la de Marvel, aparecía un error `409 conflict "You must provide a user key"`, el cual no está contemplado en la documentación y no tiene solución aparente. De esta forma se ha usado [la página de Swagger de la API](https://dragonball-api.com/api-docs#/) para probar y recoger la información necesaria para crear los schemas con Typescript. Finalmente, se ha implementado un servicio que expone las dos operaciones que forman las llamadas a los dos endpoints necesarios: `/characters` para la lista y `/characters/{id}` para el detalle.

### 3. Estilos

Se ha elegido SASS para este proyecto por la facilidad que brinda a la hora de reutilizar, con las variables y mixins. Estas variables, mixins y estilos globales se encuentran en la carpeta de `styles` bajo `src` y se usan a lo largo de los distintos módulos .scss que encontramos en cada componente que los necesite.

Las variables construyen la base de la aplicación, definiendo todos los colores que van a ser usados, cantidades de espaciado, breakpoints, etc.
Los mixins representan 4 funciones muy repetidas en toda la implementación:

- `flex`: Aplica `display: flex` y brinda la opción de configurar el alineado, el gap, la dirección, etc.
- `breakpoint`: Aplica una media query en el breakpoint indicado.
- `bottomRightCornerTriangle`: Aplica una pseudoclase ::after que representa el _chip_ de la punta inferior derecha de las cartas de los personajes.
- `scrollbars`: Permite customizar la _scrollbar_.

### 4. Listas y filtrado

El filtrado de la lista se ha implementado con un estado basado en los parámetros de la URL, consiguiendo de esta forma la oportunidad de compartir la página con un filtro aplicado.

La barra de filtrado es un simple input de búsqueda, el cual está envuelto en el componente `<InputWithURLState />` que usa el patrón de _render props_ para asegurar que cada vez que se realiza un cambio en el input, este se vea reflejado en el parámetro correspondiente de la URL (en este caso, después de un tiempo de _debounce_ de 300 ms, garantizado por el hook custom `useDebouncedCallback` para evitar re-renderizados por cada tecla que el usuario presione), y que en caso de que el parámetro ya existiera, rellenar el input inicialmente con su valor.

Entrando en el `page.tsx` de la ruta `home` observamos que es un componente asíncrono que toma `searchParams` como _props_. Esto significa que es un componente renderizado en el servidor, que solamente se re-renderiza y se sirve de nuevo en caso de que los parámetros de la URL cambien. De esta forma nos aseguramos de recoger los cambios realizados en la URL y de pasarlos al componente `<MainList />`, que a su vez se encarga de hacer el _fetch_ de todos los personajes con el filtro pertinente apoyándose en el servicio de la API. Este también es renderizado en el servidor y asíncrono, lo cual nos permite hacer _streaming_ y envolver al mismo componente en un `<Suspense />` y en un `<ErrorBoundary />` para controlar los estados de la promesa que devuelve el componente.

Algo a añadir es que la API nos devuelve mucha más información de la necesaria para mostrar cada personaje en la lista, y el componente `<MainList />` se encarga de mapear y pasar solamente los datos necesarios a las cartas.

### 5. Detalle

El detalle sigue la misma lógica que la página `home` pero tiene una pequeña diferencia. Es un componente asíncrono renderizado en el servidor, el cual solamente se re-renderiza y se sirve de nuevo si el parámetro [id] cambia. Como varía en función del `parameter` y no del `searchParameter`, Next nos ofrece la opción de generar estas páginas estáticamente para optimizar su carga al máximo. Se puede observar el uso de la función `generateStaticParams`, la cual se ejecuta al hacer una _build_ y asegura que todas las páginas de detalle de los 50 personajes iniciales sean servidas estáticamente (SSG). Como existen más de 50, el detalle de los que no estén en ese fetch hecho en build, será re-renderizado dinámicamente.

### 6. Favoritos

La implementación de esta _feature_ se ha hecho con el uso de React Context API, ya que la API de Dragon Ball no ofrece un soporte para la misma. El contexto, aplicado en el layout principal, usa un estado que guarda un listado de la información necesaria de cada personaje (la suficiente para construir una carta: nombre, imagen e ID), consiguiendo su persistencia entre las diferentes rutas. Basándose en esto, ofrece la opción de añadir, quitar o comprobar que un personaje exista dentro de la misma. Para conseguir una mayor persistencia, el estado usa el `localStorage` del navegador; en concreto, se inicializa con el valor guardado en el item correspondiente si existe, y cada vez que se actualiza, lo hace también en el `localStorage`.

La página de favoritos es más simple que la de la lista principal, ya que no precisa de un _fetch_ a la API, sino que usa la lista guardada en el mismo contexto.

### 7. Testing

Se ha conseguido un 100% de _code coverage_ en todos los apartados en tests unitarios, visible al ejecutar `pnpm test` y yendo al `index.html` de la carpeta emergente de `coverage`.

## TO-DO

1. Tests de integración y E2E
2. Ampliar el filtrado para abarcar todas las posibilidades que nos brinda la API.
3. Internacionalización.
4. Modal al clicar en un personaje de la lista en vez de ir a una nueva página para una navegación más fluida.
5. Mejorar la accesibilidad.
