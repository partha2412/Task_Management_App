const StatusIcon = ({ status }) => {
  const icons = {
    pending: {
      name: "clock-outline",
      color: "#F59E0B",
    },
    "in-progress": {
      name: "progress-clock",
      color: "#3B82F6",
    },
    completed: {
      name: "check-circle",
      color: "#22C55E",
    },
  };

  const icon = icons[status];

  return (
    <MaterialCommunityIcons name={icon.name} size={24} color={icon.color} />
  );
};
