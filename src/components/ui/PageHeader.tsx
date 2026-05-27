interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <div className="text-hud text-[10px] text-momentum mb-2">{eyebrow}</div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-sm text-foreground/60 max-w-[60ch]">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
