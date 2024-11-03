export const TechnicalConsiderations = () => {
  const considerations = [
    {
      title: "Scalability",
      items: [
        "Layer 2 optimization",
        "Batch processing for rewards",
        "Optimistic & ZK rollups",
        "Efficient data management",
      ],
    },
    {
      title: "Security",
      items: [
        "Multi-layered verification",
        "Game data validation",
        "Economic security measures",
        "Emergency pause mechanisms",
      ],
    },
    {
      title: "Integration",
      items: ["API Gateway implementation", "WebSocket services", "Real-time updates", "Cross-platform compatibility"],
    },
  ];

  return (
    <div className="bg-base-200 rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Technical Considerations</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {considerations.map((section, index) => (
          <div key={index} className="bg-base-100 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
