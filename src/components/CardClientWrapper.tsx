interface CardClientWrapperProps {
  children: React.ReactNode;
}

export const CardClientWrapper = ({ children }: CardClientWrapperProps) => {
  return (
    <div className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl bg-zinc-900 shadow-lg ring-1 ring-white/10 transition-shadow hover:shadow-2xl hover:shadow-brand-primary/20">
      {children}
    </div>
  );
};
