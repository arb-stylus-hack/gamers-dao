interface PhaseCardProps {
  title: string;
  timing: string;
  features: string[];
  status: "active" | "upcoming" | "planned";
}

export const PhaseCard = ({ title, timing, features, status }: PhaseCardProps) => {
  const statusColors = {
    active: "bg-success",
    upcoming: "bg-warning",
    planned: "bg-primary",
  };

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="card-title text-2xl">{title}</h2>
            <p className="text-lg opacity-70">{timing}</p>
          </div>
          <div className={`badge ${statusColors[status]} badge-lg`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-primary">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
