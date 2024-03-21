import PageIllustration from '@/components/page-illustration'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <main className="grow">

      {/* Replace "YourPageName" with the actual name of the page you want the illustration for */}
      <PageIllustration pageName="auth" />

      {children}

    </main>
  )
}
