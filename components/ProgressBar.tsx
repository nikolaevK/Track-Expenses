interface Progress {
  progressPercent: number;
}

const ProgressBar = ({ progressPercent }: Progress) => {
  return (
    <div className="h-3 w-full bg-gray3 rounded-sm">
      <div
        style={{ width: `${progressPercent}%` }}
        className={`h-full rounded-sm ${
          progressPercent < 50
            ? "bg-green"
            : progressPercent > 50 && progressPercent < 75
            ? "bg-orange1"
            : "bg-red"
        }`}
      ></div>
    </div>
  );
};

export default ProgressBar;
