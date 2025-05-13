'use client';

// We don't need additional layout logic here since we're using the parent admin layout
export default function AdminSubscriptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 