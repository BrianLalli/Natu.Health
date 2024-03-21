import PageIllustration from '@/components/page-illustration';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grow">
      {/* Ensure you pass a valid string that corresponds to one of the page names 
          expected by PageIllustration. Replace 'yourPageName' with the actual name. */}
      <PageIllustration pageName="auth" />
      {children}
    </main>
  );
}
