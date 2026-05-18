import Container from "@/components/Container";

export default function Stats() {
  const stats = [
    { label: "Years of Experience", value: "11+" },
    { label: "Industries Served", value: "4+" },
    { label: "Successful Projects", value: "100+" },
    { label: "Team Members", value: "50+" },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-brand mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
