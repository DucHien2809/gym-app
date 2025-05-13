'use client';

// We don't need additional layout logic here since we're using the parent admin layout
export default function AdminMembershipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 