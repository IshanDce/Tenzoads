import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="text-6xl font-extrabold text-amber-500">404</div>
      <h1 className="text-2xl font-bold text-ink">Page Not Found</h1>
      <p className="text-sm text-muted max-w-md">
        The admin page you requested does not exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-sm shadow-sm transition-all"
      >
        <Home className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
