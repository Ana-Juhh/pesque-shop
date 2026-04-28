interface StaticContentPageProps {
  page: {
    title: string;
    subtitle: string;
    content: string[];
  };
}

export default function StaticContentPage({ page }: StaticContentPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h2 className="text-5xl font-black text-primary uppercase tracking-tighter italic mb-6 text-center">
        {page.title}
      </h2>

      <p className="text-center text-ink/60 font-bold uppercase text-xs tracking-widest mb-12">
        {page.subtitle}
      </p>

      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-primary/5 leading-relaxed text-base text-ink space-y-6">
        {page.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}