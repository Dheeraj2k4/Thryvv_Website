import { Asterisk } from "lucide-react";

const disciplines = ["Strategy", "Design", "Development", "Performance", "Growth"];

export function StatsBar() {
  return (
    <section className="discipline-band" aria-label="Our disciplines">
      <div className="page-shell discipline-track">
        {disciplines.map((discipline) => (
          <div key={discipline}><span>{discipline}</span><Asterisk size={24} aria-hidden="true" /></div>
        ))}
      </div>
    </section>
  );
}