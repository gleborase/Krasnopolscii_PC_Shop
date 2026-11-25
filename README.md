# Krasnopolscii PC Shop

Учебный проект: интернет-магазин компьютерных комплектующих (React, Vite, Tailwind CSS).

## Запуск

```bash
npm install
npm run dev
```

Команда `npm run dev` запускает одновременно Vite и json-server.

Сайт: http://localhost:5173  
API: http://localhost:3001

Адрес API настраивается переменной `VITE_API_URL`. Для локального запуска используется значение `http://localhost:3001`; чтобы изменить его, задайте переменную в `.env.local` по примеру из `.env.example` и перезапустите Vite.

Доступные ресурсы REST API:

- `http://localhost:3001/products`
- `http://localhost:3001/categories`
- `http://localhost:3001/adminSections`
- `http://localhost:3001/siteData`
- `http://localhost:3001/orders`
- `http://localhost:3001/customers`
- `http://localhost:3001/settings`

Товар ссылается на категорию через `categoryId`; название категории берётся из ресурса `categories`.