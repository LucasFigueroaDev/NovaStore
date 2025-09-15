# NovaStore - E-commerce App

## Descripción del Proyecto

NovaStore es una aplicación móvil de **e-commerce** desarrollada con **React Native** y **Expo**, que permite a los usuarios navegar por categorías de productos, ver detalles, registrarse e iniciar sesión, y mantener la sesión activa. La app está pensada para ofrecer una experiencia fluida y responsiva, con notificaciones tipo toast para mejorar la interacción.

## Features

* **Autenticación**: Login y Registro de usuarios.
* **Categorias y productos**: Navegación por categorías y listado de productos.
* **Detalles del producto**: Vista completa con imagen, descripción y precio.
* **Sesión persistente**: Mantener al usuario logueado usando SQLite.
* **Notificaciones**: Mensajes tipo toast para confirmar acciones.
* **Navegación**: Bottom Tabs y Stack Navigation.
* **Gestión de estado**: Redux para manejar el estado global de usuario y carrito.
* **Carga de imágenes**: Uso de Expo Image Picker para subir imágenes.

## Librerías Utilizadas y Por Qué

* **@react-navigation/native & @react-navigation/bottom-tabs & @react-navigation/stack**
  Para gestionar la navegación entre pantallas y tabs.
* **redux & @reduxjs/toolkit & react-redux**
  Para manejar el estado global de la aplicación de forma estructurada.
* **firebase**
  Para autenticación y almacenamiento en tiempo real de datos.
* **expo-sqlite**
  Para guardar la sesión de usuario y mantenerla abierta.
* **expo-image-picker**
  Para permitir a los usuarios seleccionar imágenes desde su dispositivo.
* **react-native-toast-message**
  Para mostrar notificaciones tipo toast al usuario.
* **expo**
  Framework base para React Native que facilita el desarrollo multiplataforma.

## Instalación y Puesta a Punto

1. Clonar el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd novastore
   ```

2. Instalar dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Configurar variables de entorno (`.env`):
   Crear un archivo `.env` en la raíz del proyecto con la configuración de Firebase:

   ```env
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Ejecutar la aplicación:

   ```bash
   expo start
   ```

5. Escanear el QR en un dispositivo físico o usar un emulador.

## Estructura del Proyecto

```
novastore/
├─ App.js
├─ package.json
├─ .env
├─ src/
│  ├─ screens/        # Pantallas: Login, Signup, Productos, DetalleProducto
│  ├─ components/     # Componentes reutilizables
│  ├─ store/          # Redux slices
│  ├─ services/       # API y Firebase config
│  └─ db/             # SQLite: manejo de sesión
```

## Autor

Lucas Figueroa

* Email: [lucas@example.com](mailto:lucas@example.com)
* LinkedIn: [linkedin.com/in/lucasfigueroa](https://linkedin.com/in/lucasfigueroa)
* Portafolio: [lucasportfolio.com](https://lucasportfolio.com)