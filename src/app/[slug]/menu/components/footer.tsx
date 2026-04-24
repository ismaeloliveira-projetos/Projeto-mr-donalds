const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Mr Donalds © {new Date().getFullYear()} • Experiência de pedido rápido.</p>
        <p className="text-slate-500">Carrinho persistente, design responsivo e navegação simples.</p>
      </div>
    </footer>
  );
};

export default Footer;
