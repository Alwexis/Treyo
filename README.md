# Treyo - Clon simple de Trello con Vue.js

Treyo es un gestor de tareas estilo Trello/Jira construido con Vue.js 3.
Su objetivo es ser un proyecto frontend **simple y funcional**, sin backend, usando solo `localStorage` para persistencia local.

---

## Características

- Gestión de tableros con columnas y tarjetas (drag & drop). 
- Autenticación simulada con sesión guardada en `localStorage`.
- Rutas protegidas con Vue Router (`Home` y `Login`).
- Drag & Drop con `vue-draggable-next` (o la librería que uses).
- Validaciones básicas en el formulario de login.
- Diseño responsivo y accesible con Tailwind CSS.
- Estado reactivo usando Composition API.
- Exportación e importación de tableros

---

## Instalación

```bash
git clone https://github.com/Alwexis/Treyo.git
cd treyo
npm install
npm run dev
```

## Tecnologías
1. Vue 3 + Composition API
2. Vue Router
3. Tailwind CSS & Tailwind Animated
4. LocalStorage para persistencia
5. vue-draggable-next

## Estructura del proyecto
```sh
src/
│   App.vue
│   main.ts
│   style.css
│   vite-env.d.ts
│   
├───assets/
├───components/
├───composables/
│       auth.ts
│
├───lib/
│       types.ts
│       utils.ts
│
├───router/
│       index.ts
│
└───views/
        Home.vue
        Login.vue
```