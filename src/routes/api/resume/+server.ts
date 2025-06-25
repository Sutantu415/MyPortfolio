export async function GET() {
  const res = await fetch('https://my-portfolio-sutantu415s-projects.vercel.app/Resume.pdf');

  if (!res.ok) {
    return new Response('Resume not found', { status: 404 });
  }

  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Sutantu_Balamurugan_Resume.pdf"',
    },
  });
}
