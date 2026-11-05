function InfoBlock({ icon: Icon, title, text }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-gray-900" />
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <p className="mt-1 pl-7 text-xs text-gray-500">{text}</p>
    </div>
  );
}

export default InfoBlock;