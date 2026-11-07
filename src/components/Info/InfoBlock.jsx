function InfoBlock({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-900/15">
        <Icon className="size-5 text-emerald-900" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-gray-500">{text}</p>
      </div>
    </div>
  );
}

export default InfoBlock;