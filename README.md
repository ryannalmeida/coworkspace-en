# CoworkSpace

A modern workspace reservation management system built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Reservation Management**: Create, view, and manage workspace reservations
- **Real-time Notifications**: Stay updated with reservation status changes
- **Dashboard**: Overview of your reservations and account activity
- **Reports & Analytics**: Monitor and analyze workspace usage
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation
- **TanStack Query** - Data fetching and state management
- **Zod** - Schema validation
- **date-fns** - Date manipulation
- **Chart.js** - Data visualization

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ryannalmeida/coworkspace-en.git
cd coworkspace-en
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🏗️ Build

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # shadcn/ui components
│   └── reports/   # Report-specific components
├── contexts/       # React contexts (Auth, Reservations, Notifications)
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
└── utils/          # Helper functions (localStorage management)
```

## 🔐 Demo Credentials

For demonstration purposes, you can use:
- **Email**: `demo@example.com`
- **Password**: `password`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Routes

- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard
- `/reservations` - View all reservations
- `/reservations/new` - Create new reservation
- `/notifications` - View notifications
- `/profile` - User profile management
- `/reports` - Usage reports and analytics

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Ryann Almeida**

- GitHub: [@ryannalmeida](https://github.com/ryannalmeida)

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com)
