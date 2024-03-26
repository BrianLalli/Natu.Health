import PageIllustration from '@/components/page-illustration';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grow">
      <div style={{
        position: 'absolute',
        top: 0,
        right: -50,
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 1
      }}>
        {/* Replace "auth" with the actual name of the page you want the illustration for */}
        <PageIllustration pageName="auth" /> {/* Illustration to the right */}
      </div>
      {children}
    </main>
  );
}
