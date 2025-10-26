// src/app/(auth)/layout.tsx
import { Layout } from '@/components/layout/Layout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}